const Event = require('../models/event.model');
const EventCoordination = require('../models/eventCoordination.model');
const EventPurpose = require('../models/eventPurpose.model');
const EventImage = require('../models/eventImage.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

//custom error handler to get useful database errors
const { errorHandler } = require('../helpers/dbErrorHandling');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

exports.addEventController = (req,res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const firstError = errors.array().map(error => error.msg)[0];
  //   return res.status(422).json({
  //     errors: firstError
  //   });
  // } else {
    const { user_id,event_name,
    from_date,
    event_id,
    from_time ,
    to_date ,
    to_time ,
    event_category,
    event_category_title,
    other_category_description ,
    event_type ,
    proposed_venue,
    link ,
    no_of_days ,
    number_of_expected_guest } = req.body.eventDetailsData;

    const { event_manager_name,
      manager_department,
      manager_telephone_number,
      manager_mobile_number,
      manager_email } = req.body.eventCoordination;
    
    const {
     objectives,
     details,
     guest_category,
     vip_name,
     host,
     executives,
     executives_role,
     executives_date_time,
     speech_points,
     other_speakers,
     media,
     av,
     catering
    } = req.body.eventPurpose;
    const event = new Event({
      user_id,
      event_id,
      event_name,
      from_date,
      from_time ,
      to_date ,
      to_time ,
      event_category ,
      other_category_description ,
      event_type ,
      proposed_venue,
      link ,
      event_category_title,
      no_of_days ,
      number_of_expected_guest
    });

    const eventCoordination = new EventCoordination({
      event_manager_name,
      manager_department,
      manager_telephone_number,
      manager_mobile_number,
      manager_email,
      event_id
    });

    const eventPurpose = new EventPurpose({
     objectives,
     details,
     guest_category,
     vip_name,
     host,
     executives,
     executives_role,
     executives_date_time,
     speech_points,
     other_speakers,
     media,
     av,
     catering,
     event_id
    });

    event.save((err, event) => {
      if (err) {
        console.log(err);
        console.log('Save error', errorHandler(err));
        return res.status(401).json({
          errors: errorHandler(err)
        });
      } else {
        eventCoordination.save((err, event) => {
          if(err){
            console.log(err);
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          }else{
            eventPurpose.save((err, event) => {
              if(err){
                console.log(err);
                console.log('Save error', errorHandler(err));
                return res.status(401).json({
                  errors: errorHandler(err)
                });
              }else{
                return res.json({
                  success: true,
                  message: event,
                  message: 'Event add success'
                });
              }
            });
          
          
          }
        });
      }
    });
  // }
}

exports.getMaxIdController = (req, res) => {
  Event.find().sort({"event_id": -1}).collation({locale: "en_US", numericOrdering: true})
  .then(events=>res.json(events))
  .catch(err => res.status(400).json('Error: ' + err));
}

exports.uploadImageController = (req, res, next) => {
  const eventImage = new EventImage({
    file_name:req.files[0].filename,
    original_name:req.files[0].originalname,
    path:req.files[0].path,
    event_id:''
  });
  eventImage.save((err, eventImage) => {
    if(err){
      console.log(err);
      console.log('Save error', errorHandler(err));
      return res.status(401).json({
        errors: errorHandler(err)
      });
    }else{
      return res.json({
        success: true,
        eventImage: eventImage,
        message: 'Image Upload success'
      });
    }
  })
}

exports.linkImageAndEventController = (req, res) => {
  console.log(req.body);
  EventImage.updateOne(
    { file_name: req.body.file_name },
    {
      $set: { event_id:req.body.event_id }
    }
  ).then(events=>res.json(events))
  .catch(err => res.status(400).json('Error: ' + err));
}