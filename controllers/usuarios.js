    const {request, response} = require("express");
    

    const usuarioGet = (req=request,res=response) => {
        res.json({msg:"Hola Samuel!!! >.< GET"});
   };
   const usuarioPost = (req=request,res=response) => {
       const {nombre, apellido, email, edad=0} = req.body;
    res.status(201).json({msg:"Hola Samuel!!! >.< POST", edad});
    };
    const usuarioPut = (req=request,res=response) => {
        const {id} = req.params;
        res.status(400).json({msg:"Hola Samuel!!! >.< PUT"}, id);
   };
   const usuarioDelete = (req=request,res=response) => {
       const {usuario, password} = req.query;
    res.status(500).json({msg:"Hola Samuel!!! >.< DELETE", usuario, password});
    };

    module.exports = {usuarioGet, usuarioPost,usuarioPut,usuarioDelete}