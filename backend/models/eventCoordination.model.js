const mongoose = require('mongoose');

// event schema
const eventCoordinationScheama = new mongoose.Schema(
    {
      event_manager_name : {
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
      manager_department : {
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
      event_id:{
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      manager_telephone_number : {
        type: String,
        trim: true,
        required: false,
        unique: false,
      },
      manager_mobile_number : {
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
      manager_email : {
        type: String,
        trim: true,
        required: true,
        unique: false,
      }
    },
    {
      timestamps: true
    }
  );
  
  module.exports = mongoose.model('EventCoordination', eventCoordinationScheama);