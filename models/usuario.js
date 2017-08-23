var Mongoose = require('Mongoose');

  var schema = Mongoose.Schema({
    usuario: {
      type: String,
      required: true
    },
    senha: {
      type: String,
      required: true
    }
  });

  Mongoose.model('Usuario', schema);