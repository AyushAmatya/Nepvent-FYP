const mongoose = require('mongoose');

// event schema
const eventTicketScheama = new mongoose.Schema(
    {
      user_id:{
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
      event_id:{
        type: String,
        trim:true,
        require: true,
        unique: false
      },
      ticket_id:{
        type: String,
        trim:true,
        require: true,
        unique: true
      },
      attended:{
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
      event_name:{
        type: String,
        trim: true,
        required: true,
        unique: false,
      },
      from_date:{
        type: Date,
        trim: true,
        required: true,
        unique: false
      },
      from_time:{
        type: String,
        trim: true,
        required: true,
        unique: false
      },
      to_date:{
        type: Date,
        trim: true,
        required: true,
        unique: false
      },
      to_time:{
        type: String,
        trim: true,
        required: true,
        unique: false
      }
    },
    {
      timestamps: true
    }
  );
  
  module.exports = mongoose.model('EventTicket', eventTicketScheama);