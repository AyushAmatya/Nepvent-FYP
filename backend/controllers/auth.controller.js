const User = require('../models/auth.model');
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

exports.registerController = (req,res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    //custom validations
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
          errors: firstError
        });
    } else {
        User.findOne({
          email
        }).exec((err, user) => {
          //if user exists
          if (user) {
            return res.status(400).json({
              errors: 'Email is taken'
            });
          }
        });
        //generate token
        const token = jwt.sign(
            {
              name,
              email,
              password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
              expiresIn: '15m'
            }
        );
        //email data sending
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link',
            html: `
                      <h1>Please use the following to activate your account</h1>
                      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                      <hr />
                      <p>This email may containe sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `
        };
        sgMail
        .send(emailData)
        .then(sent => {
            return res.json({
            message: `Email has been sent to ${email}`
            });
        })
        .catch(err => {
            return res.status(400).json({
            success: false,
            errors: errorHandler(err)
            });
        });
    }
}