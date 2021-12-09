    const {request, response} = require("express");
    const pool = require("../db/conexion");
    const usuarioQueries = require("../models/usuarios");
    

    const usuarioGet = async (req=request,res=response) => {
        let conn;

        try{
            conn = await pool.getConnection();

            const usuarios = await conn.query(usuarioQueries.selectUsuarios);

            res.json({ usuarios });
        }catch (error){
            console.log(error);
            res
                .status(500)
                .json({ msg: "Por favor contacte al administrador.", error });
        }finally{
            if (conn) conn.end();
        }        


        //res.json({msg:"Hola Samuel!!! >.< GET"});
   };

   const usuarioPost = async (req=request, res=response) => {
    const {nombre, email, password, status = 1} = req.body;
    //res.status(201).json({msg:"Hola Samuel!!! >.< POST.",edad});

    let conn;

        try{
            conn = await pool.getConnection();

            const usuarios = await conn.query(usuarioQueries.insertUsuario,[
                nombre, 
                email, 
                password, 
                status]);

            res.json({ usuarios });
        }catch (error){
            console.log(error);
            res
                .status(500)
                .json({ msg: "Por favor contacte al administrador.", error });
        }finally{
            if (conn) conn.end();
        } 

    };

    const usuarioPut = async (req=request,res=response) => {
        const {email} = req.query;
        const {nombre, status} = req.body;
        //res.status(400).json({msg:"Hola Samuel!!! >.< PUT", id});

        let conn;

        try{
            conn = await pool.getConnection();

            const usuarios = await conn.query(usuarioQueries.updateUsuario,[
                nombre, 
                status, 
                email]);

            res.json({ usuarios });
        }catch (error){
            console.log(error);
            res
                .status(500)
                .json({ msg: "Por favor contacte al administrador.", error });
        }finally{
            if (conn) conn.end();
        }

   };
   
   const usuarioDelete = async (req=request,res=response) => {
    const { email } = req.query;
    //res.status(500).json({msg:"Hola Samuel!!! >.< DELETE", usuario, password});

    let conn;

        try{
            conn = await pool.getConnection();

            const usuarios = await conn.query(usuarioQueries.deleteUsuario,[
                email]);

            res.json({ usuarios });
        }catch (error){
            console.log(error);
            res
                .status(500)
                .json({ msg: "Por favor contacte al administrador.", error });
        }finally{
            if (conn) conn.end();
        }

    };

    module.exports = {usuarioGet, usuarioPost,usuarioPut,usuarioDelete}