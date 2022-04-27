const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/usuario')

const generarJWT = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) =>{

    const {correo, password} = req.body;
    
    try {
        
        //Verificar si existe email
        const usuario = await Usuario.findOne({correo});
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correcto - correo'
            })
        }

        //si el usuario esta activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correcto - estado: false'
            })
        }

        //verificar password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correcto - password'
            })
        }

        //generar el JWT*/
        const token = await generarJWT (usuario.id);

        res.json({
           usuario,
           token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el adm'
        })
    }

}

const googleSignin = async (req, res = response) =>{

    const {id_token} = req.body
    
    try {
        const {correo, nombre, img} = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Tengo q crearlo
            const data = {
                nombre,
                correo,
                password: 'P:',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en DB
        if (!usuario.estado) {
            res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generarJWT (usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {

        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no valido'
        })
    }


}

module.exports = {
    login,
    googleSignin
}