import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {TextField, Button} from '@material-ui/core';
import LogoBlack from '../img/logoBlack.jpg';

const ForgetPassword = ({history}) => {
  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Submit'
  });
  const { email } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      console.log(email);
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
            });
            toast.success(`Please check your email`);
          
        })
        .catch(err => {
          toast.error(err.response.data.errors);
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <div className="formContainer">
            <div style={{display:"flex", textAlign:"left"}}>
                <img src={LogoBlack} alt="logo" className="formLogo"/>
                <div className='title'>
                    <h1 style={{fontFamily:"Comic Sans MS", fontSize:"70px", marginTop:"20px"}}>Nepvent</h1>
                    <h4 style={{fontFamily:"MV Boli", fontWeight:"normal", marginTop:"-35px", fontSize:"30px"}}>Event Publishing and Ticket Booking</h4>
                </div>
            </div>
            <h1 style={{color:'goldenrod', fontFamily:"Comic Sans MS", fontSize:"30px", marginLeft:"50px"}}>
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit}>                        
                <div style={{marginTop:'30px'}}>
                    <TextField required label="Email" value={email} onChange={handleChange('email')} style={{marginLeft:"55px", width:"35%"}}/>
                </div>
                <Button variant="contained" color="primary" type="submit" style = {{marginTop:'40px', marginLeft:'45px', width:'25%'}}> Submit </Button>

               
            </form>
        </div>
    </div>
  );
};

export default ForgetPassword;