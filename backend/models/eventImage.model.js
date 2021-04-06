const mongoose = require('mongoose');

// event schema
const eventImageScheama = new mongoose.Schema(
    {
      file_name:{
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      original_name:{
        type: String,
        trim:true,
        require: true,
        unique: false
      },
      path:{
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
      event_id:{
        type: String,
        trim: true,
        required: false,
        unique: false
      }
    },
    {
      timestamps: true
    }
  );
  
  module.exports = mongoose.model('EventImage', eventImageScheama);