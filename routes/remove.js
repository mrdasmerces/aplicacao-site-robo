module.exports = function(app){
    var api = app.api.noticia;

    app.get('/removerNoticia/:id', api.removerNoticia);
}



