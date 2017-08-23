var Mongoose = require('Mongoose');

  var schema = Mongoose.Schema({
    titulo: {
      type: String,
      required: true
    },
    autor: {
      type: String,
      required: true
    },
    data: {
      type: Number,
      required: true
    },
    conteudo: {
      type: String,
      required: true
    },
    urlImagem: {
      type: String,
      required: true
    },
  });

module.exports = Mongoose.model('Noticia', schema);