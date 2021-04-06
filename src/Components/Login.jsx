import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link } from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import LogoBlack from '../img/logoBlack.jpg';

function handleCancle(){
    window.location='/';
}
function handleRegister(){
    window.location='/register';
}

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: ''
  });
  const { email, password1 } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  // const sendGoogleToken = tokenId => {
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
  //       idToken: tokenId
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       informParent(res);
  //     })
  //     .catch(error => {
  //       console.log('GOOGLE SIGNIN ERROR', error.response);
  //     });
  // };
  // const informParent = response => {
  //   authenticate(response, () => {
  //     isAuth() && isAuth().role === 'admin'
  //       ? history.push('/admin')
  //       : history.push('/private');
  //   });
  // };

  // const sendFacebookToken = (userID, accessToken) => {
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
  //       userID,
  //       accessToken
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       informParent(res);
  //     })
  //     .catch(error => {
  //       console.log('GOOGLE SIGNIN ERROR', error.response);
  //     });
  // };
  // const responseGoogle = response => {
  //   console.log(response);
  //   sendGoogleToken(response.tokenId);
  // };

  // const responseFacebook = response => {
  //   console.log(response);
  //   sendFacebookToken(response.userID, response.accessToken)
  // };

  const handleSubmit = e => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {

            isAuth()
            ? history.push(`/`)
            : history.push('/');
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Submitted'
            });
            console.log('asdfasdf');
            toast.success(`Hey ${res.data.user.first_name}, Welcome back!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            textChange: 'Sign In'
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <div>
      {/* {isAuth() ? <Redirect to='/' /> : null} */}
        <div className="formContainer">
            <div style={{display:"flex", textAlign:"left"}}>
                <img src={LogoBlack} alt="logo" className="formLogo"/>
                <div className='title'>
                    <h1 style={{fontFamily:"Comic Sans MS", fontSize:"70px", marginTop:"20px"}}>Nepvent</h1>
                    <h4 style={{fontFamily:"MV Boli", fontWeight:"normal", marginTop:"-35px", fontSize:"30px"}}>Event Publishing and Ticket Booking</h4>
                </div>
            </div>
            <form onSubmit={handleSubmit}>                        
                <div style={{marginTop:'30px'}}>
                    <TextField required label="Email" value={email} onChange={handleChange('email')} style={{marginLeft:"55px", width:"35%"}}/>
                </div>
                <div style={{marginTop:'30px'}}>
                    <TextField type='password' required label="Password" value={password1} onChange={handleChange('password1')} style={{marginLeft:"55px", width:"35%"}}/>
                </div>
                <div style={{marginTop:'15px'}}>
                    <Link to='/users/password/forget' style = {{marginLeft:"50px"}}><i>Forgot Password</i></Link>
                </div>
                <Button variant="contained" color="primary" type="submit" style = {{marginTop:'40px', marginLeft:'45px', width:'25%'}}> Login </Button>
                <div style={{marginTop:'25px', backgroundColor:'whitesmoke', width:'41%', padding:'10px', marginLeft:'30%'}}>
                Or Register New Account
                </div>
                <Button variant="contained" color="primary" type="button" style = {{marginTop:'40px',  marginLeft:'40px', width:'10%'}} onClick={handleRegister}> Register </Button>
                <Button variant="contained" color="secondary" type="button" style = {{marginTop:'40px', marginLeft:'20px', width:'10%'}} onClick={handleCancle}> Cancle </Button>
            </form>
        </div>
    </div>
  );
};

export default Login;