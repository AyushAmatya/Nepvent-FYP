const mongoose = require('mongoose');

// event schema
const eventPurposeScheama = new mongoose.Schema(
    {
      objectives:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      event_id:{
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      details:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      guest_category:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      vip_name:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      host:{
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
      executives:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      executives_role:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      executives_date_time:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      speech_points:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      other_speakers:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      media:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      av:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      catering:{
        type: String,
        trim: true,
        required: false,
        unique: false,
      }
    },
    {
      timestamps: true
    }
  );
  
  module.exports = mongoose.model('EventPurpose', eventPurposeScheama);