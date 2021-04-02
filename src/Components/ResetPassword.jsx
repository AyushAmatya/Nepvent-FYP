import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import LogoBlack from '../img/logoBlack.jpg';
import '../App.css';
import './registerStyle.css';
import { blue } from '@material-ui/core/colors';
import {TextField, Button} from '@material-ui/core';
const ResetPassword = ({match}) => {
  const [formData, setFormData] = useState({
      password1: '',
      password2: '',
      token: '',
    textChange: 'Submit'
  });
    const { password1, password2, textChange, token } = formData;
    
    useEffect(() => {
        let token = match.params.token
        if(token) {
            setFormData({...formData, token,})
        }
        
    }, [])
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
    const handleSubmit = e => {
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
            newPassword: password1,
            resetPasswordLink: token
        })
        .then(res => {
          console.log(res.data.message)
            setFormData({
              ...formData,
               password1: '',
              password2: ''
            });

            toast.success(res.data.message);
        })
        .catch(err => {
          toast.error(err.response.data.error);
          toast.error(err.response.data.errors);
          
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="formContainer">
            <div style={{display:"flex", textAlign:"left"}}>
                <img src={LogoBlack} alt="logo" className="formLogo"/>
                <div className='title'>
                    <h1 style={{fontFamily:"Comic Sans MS", fontSize:"70px", marginTop:"20px"}}>Nepvent</h1>
                    <h4 style={{fontFamily:"MV Boli", fontWeight:"normal", marginTop:"-35px", fontSize:"30px"}}>Event Publishing and Ticket Booking</h4>
                </div>
            </div>
            <h1 style={{color:'goldenrod', fontFamily:"Comic Sans MS", fontSize:"30px", marginLeft:'30px'}}>
              Reset Your Password
            </h1>
            <form onSubmit={handleSubmit}>                        
                <div style={{marginTop:'30px'}}>
                    <TextField required label="Password" type='password' value={password1} onChange={handleChange('password1')} style={{marginLeft:"55px", width:"35%"}}/>
                </div>
                <div style={{marginTop:'30px'}}>
                    <TextField required label="Confirm Password" type='password' value={password2} onChange={handleChange('password2')} style={{marginLeft:"55px", width:"35%"}}/>
                </div>
                <Button variant="contained" color="primary" type="submit" style = {{marginTop:'40px', marginLeft:'45px', width:'25%'}}> Submit </Button>  
            </form>
          </div>
    </div>
  );
};

export default ResetPassword;