    const bcryptjs = require("bcryptjs");
    const {request, response} = require("express");
    const pool = require("../db/conexion");
    const usuarioQueries = require("../models/usuarios");
    

    const usuarioGet = async (req=request,res=response) => {
        let { limite = 5, desde = 0 } = req.query;

        desde = parseInt(desde);
        limite = parseInt(limite);

        if(!Number.isInteger(limite) || !Number.isInteger(desde)){
            res.status(400).json({ msg: "No se puede realizar esta consulta." });
            return;
        }

        let conn;

        try{
            conn = await pool.getConnection();

            const usuarios = await conn.query(usuarioQueries.selectUsuarios,[
                desde,
                limite,
            ]);

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
        const salt = bcryptjs.genSaltSync();
        const passwordHash = bcryptjs.hashSync(password, salt);

        conn = await pool.getConnection();

        const usuarios = await conn.query(usuarioQueries.insertUsuario,[
            nombre, 
            email, 
            passwordHash, 
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

    const usuarioSignin = async (req=request, res=response)=>{
        const {email, password} =req.body;
        let conn;

        try {
            conn = await pool.getConnection();

            const usuarios = await conn.query(usuarioQueries.getUsuarioByEmail,[
                email]);

            if(usuarios.length == 0){
                res.status(404).json({msg:`No se encontro el usuario ${email}.`});
                return;
            }

            const passwordValido = bcryptjs.compareSync(password, usuarios[0].password);

            if(!passwordValido){
                res.status(401).json({msg: "Contraseña no coincide"});
                return;
            }

            res.json({ msg: "Inicio de sesion satisfactorio." });
        } catch ( error ) {
            console.log(error);
            res
                .status(500)
                .json({ msg: "Por favor contacte al administrador.", error });
        } finally {
            if (conn) conn.end();
        }
    }


    //tarea: Hacer un endpoint para actualizar la contraseña

    module.exports = {
        usuarioGet, 
        usuarioPost,
        usuarioPut,
        usuarioDelete,
        usuarioSignin,
    }