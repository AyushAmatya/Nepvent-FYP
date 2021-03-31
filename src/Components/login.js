import React, { Component } from 'react';
import './loginStyle.css';
import {Grid, TextField, Button} from '@material-ui/core';
import '../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import LogoBlack from '../img/logoBlack.jpg';

export default class Login extends Component {
    constructor (props){
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    
                    this.setState({
                        alreadyRegisteredUsername: response.data.map(user=> user.userName)
                    });
                    
                }
            });
    }

    onChangeUserName(e){
        this.setState({
            userName: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
    
    handleSubmit(event) {
        
        event.preventDefault();
        // console.log(this.state.alreadyRegisteredUsername);
        
        if (this.state.alreadyRegisteredUsername.includes(this.state.userName)){
            // console.log("yes");
            axios.get('http://localhost:5000/users/getPassword/' + this.state.userName)
                .then(response => {
                    if(response.data.length > 0){
                        this.setState({
                            originalPass: response.data.map(user=> user.password)
                        });
                    }
                });
            console.log(this.state.password);
            console.log(this.state.originalPass);
            if(this.state.password == this.state.originalPass){
                window.location = '/'+ this.state.userName;
            }else{
                alert('Incorrect email or password!!!');
            }
        }else{
            alert('Incorrect email or password!!!');
        }
      }
    
    state={
        alreadyRegisteredUsername:'',
        userName: '',
        password: '',
        originalPass:''
    }

    handleCancleBtn(e){
        window.location = '/';
        
    }
    
    render(){
        const {profileImg} = this.state
        return (
            <div>
                <div className="formContainer">
                    <div style={{display:"flex", textAlign:"left"}}>
                        <img src={LogoBlack} alt="logo" className="formLogo"/>
                        <div className='title'>
                            <h1 style={{fontFamily:"Comic Sans MS", fontSize:"70px", marginTop:"20px"}}>Nepvent</h1>
                            <h4 style={{fontFamily:"MV Boli", fontWeight:"normal", marginTop:"-35px", fontSize:"30px"}}>Event Publishing and Ticket Booking</h4>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>                        
                        <div style={{marginTop:'30px'}}>
                            <TextField required label="User Name" value={this.state.userName} onChange={this.onChangeUserName} style={{marginLeft:"55px", width:"35%"}}/>
                        </div>
                        <div style={{marginTop:'30px'}}>
                            <TextField required label="Password" value={this.state.password} onChange={this.onChangePassword} style={{marginLeft:"55px", width:"35%"}}/>
                        </div>
                        <div style={{marginTop:'15px'}}>
                            <Link to='/passwordReset' style = {{marginLeft:"50px"}}><i>Forgot Password</i></Link>
                            <Link to='/register' style = {{marginLeft:"20px"}}><i>Register</i></Link>
                        </div>
                        <Button variant="contained" color="primary" type="submit" style = {{marginTop:'20px',  marginLeft:'50px'}}> Submit </Button>
                        <Button variant="contained" color="secondary" type="button" style = {{marginTop:'20px', marginLeft:'20px'}} onClick={this.handleCancleBtn}> Cancle </Button>
                    </form>
                </div>
            </div>
        )
    }
}
