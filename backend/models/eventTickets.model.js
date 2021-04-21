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
      }
    },
    {
      timestamps: true
    }
  );
  
  module.exports = mongoose.model('EventTicket', eventTicketScheama);