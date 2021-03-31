import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import LogoBlack from '../img/logoBlack.jpg';
import '../App.css';
import './registerStyle.css';
import { blue } from '@material-ui/core/colors';
import {TextField, Button} from '@material-ui/core';

function handleCancle(){
    window.location='/';
}
function handleRegister(){
    window.location='/register';
}
const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    token: '',
    show: true
  });

  useEffect(() => {
    /**get token from params like /active/token
     * then decode the token to get name
     */
    let token = match.params.token;
    let { first_name, middle_name, last_name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, first_name, middle_name, last_name, token });
    }

    console.log(token, first_name, middle_name, last_name);
  }, [match.params]);
  const { first_name, middle_name, last_name, token, show } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/activation`, {
        token
      })
      .then(res => {
        setFormData({
          ...formData,
          show: false
        });

        toast.success(res.data.message);
      })
      .catch(err => {
        
        toast.error(err.response.data.errors);
      });
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        {isAuth() ? <Redirect to='/' /> : null}
        <ToastContainer />
        <div className="formContainer">
            <div style={{display:"flex", textAlign:"left"}}>
                <img src={LogoBlack} alt="logo" className="formLogo"/>
                <div className='title'>
                    <h1 style={{fontFamily:"Comic Sans MS", fontSize:"70px", marginTop:"20px"}}>Nepvent</h1>
                    <h4 style={{fontFamily:"MV Boli", fontWeight:"normal", marginTop:"-35px", fontSize:"30px"}}>Event Publishing and Ticket Booking</h4>
                </div>
            </div>
            <h1 style={{color:'goldenrod', fontFamily:"Comic Sans MS", fontSize:"30px"}}>
              Welcome {first_name + ' ' + middle_name + ' ' +last_name}
            </h1>
            <form onSubmit={handleSubmit}>
              <Button variant="contained" color="primary" type="submit" style = {{marginTop:'40px', marginLeft:'45px', width:'25%'}}> Activate your Account </Button>
              <div style={{marginTop:'25px', backgroundColor:'whitesmoke', width:'41%', padding:'10px', marginLeft:'30%'}}>
                Or Register Again
              </div>
              <Button variant="contained" color="primary" type="button" style = {{marginTop:'40px',  marginLeft:'40px', width:'10%'}} onClick={handleRegister}> Register </Button>
              <Button variant="contained" color="secondary" type="button" style = {{marginTop:'40px', marginLeft:'20px', width:'10%'}} onClick={handleCancle}> Cancle </Button>
            </form>
          </div>
      </div>
  );
};

export default Activate;