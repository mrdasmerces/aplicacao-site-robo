module.exports = function(app){
    var api = app.api.noticia;

    app.get('/listarNoticias', api.listarNoticias);
}

