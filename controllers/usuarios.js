const {response} = require('express');

const usGet = (req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API - controlador',
        query
    });
};

const usPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'put API - controlador',
        id,
    });
};

const usPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        body
    });
};

const usDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
};

  module.exports = {
      usGet,
      usPost,
      usPut,
      usDelete
  }