const mongoose = require('mongoose');

// event schema
const eventScheama = new mongoose.Schema(
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
        unique: true
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
      },
      event_category:{
        type: String,
        trim: true,
        required: true,
        unique: false
      },
      event_category_title:{
        type: String,
        trim: true,
        required: true,
        unique: false
      },
      other_category_description:{
        type: String,
        trim: true,
        required: false,
        unique: false
      },
      event_type:{
        type: String,
        trim: true,
        required: true,
        unique: false
      },
      proposed_venue: {
        type: String,
        trim: true,
        required: false,
        unique: false
      },
      link:{
        type: String,
        trim: true,
        required: false,
        unique: false
      },
      no_of_days:{
        type: Number,
        trim: true,
        required: true,
        unique: false
      },
      number_of_expected_guest:{
        type: Number,
        trim: true,
        required: true,
        unique: false
      },
      ticket_limit:{
        type: Number,
        trim: true,
        required: true,
        unique: false
      },
      ticket_type:{
        type: String,
        trim: true,
        required: true,
        unique: false
      },
      ticket_price:{
        type:Number,
        trim:true,
        required:false,
        unique:false
      }
    },
    {
      timestamps: true
    }
  );
  
  module.exports = mongoose.model('Event', eventScheama);