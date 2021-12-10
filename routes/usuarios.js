    const {Router} = require("express");

    const{
        usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioDelete,
        usuarioSignin,
    } = require("../controllers/usuarios");

    const router = Router();

    //localhost:3001/usuarios

    router.get('/', usuarioGet);
    router.post('/', usuarioPost);
    router.put('/', usuarioPut);
    router.delete('/', usuarioDelete);
    router.post('/signin', usuarioSignin);

    module.exports = router;