const { response } = require("express")
const { request } = require("express")


const esAdminRole = ( req = request, res = response, next )=>{

    if (!req.usuario) {
        return res.json({
            msg: 'Se quiere verificar el role sin validar el usuario'
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no permitido`
        });
    }

    next()
}

const tieneRole = ( ...roles )=>{
    return ( req = request, res = response, next )=>{
        if (!req.usuario) {
            return res.json({
                msg: 'Se quiere verificar el role sin validar el usuario'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}