var Noticia = require('../models/noticia.js');

var api = {};

api.listarNoticias = function(req, res){

    Noticia
        .find({})
        .then(function(noticias){
            res.json(noticias);
        }, function(error){
            console.log(error);
            res.status(500).json(error);
        });
};


api.removerNoticia = function(req, res){ 
    Noticia
        .remove({_id: req.params.id})
        .then(function(){
        res.sendStatus(204);
        }, function(error){
            console.log(errror);
            res.status(500).json(error);
        })
};
module.exports = api;