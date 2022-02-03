const { Router } = require('express');
const { usGet, usPut, usPost, usDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usGet);

router.put('/:id', usPut);

router.post('/', usPost);

router.delete('/', usDelete);


module.exports = router;