    const {Router} = require("express");

    const{
        usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioDelete,
    } = require("../controllers/usuarios");

    const router = Router();

    //localhost:3001/usuarios

    router.get('/', usuarioGet);
    router.post('/', usuarioPost);
    router.put('/:id', usuarioPut);
    router.delete('/', usuarioDelete);
    module.exports = router;