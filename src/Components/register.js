import React, { Component } from 'react';
import './registerStyle.css';
import imgE1 from '../img/e1.jpg';
import imgE2 from '../img/e2.png';
import imgE3 from '../img/e3.jpg';
import imgE4 from '../img/e4.jpg';
import imgE5 from '../img/e5.jpg';
import imgE6 from '../img/e6.jpg';
import {Grid, TextField, Button} from '@material-ui/core';
import '../App.css';
import axios from 'axios';

import LogoBlack from '../img/logoBlack.jpg';

export default class Register extends Component {
    constructor (props){
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    }
    onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeMiddleName(e){
        this.setState({
            middleName: e.target.value
        });
    }
    onChangeLastName(e){
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeCountry(e){
        this.setState({
            country: e.target.value
        });
    }
    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }
    onChangeContactNumber(e){
        this.setState({
            contactNumber: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
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
    onChangeConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.confirmPassword
        });
    }
    handleCancleBtn(e){
        window.location = '/';
    }
    // componentDidMount(){
    //     document.querySelector(".navbar").className = "navbar invisible";
    //     document.querySelector(".mainHeader").className = "mainHeader invisible";
    // }
    handleSubmit(event) {
        
        event.preventDefault();
        const user = {
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            country: this.state.country,
            address: this.state.address,
            contactNumber: this.state.contactNumber,
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password,
        }

        console.log(user);

        if(this.state.password == this.state.confirmPassword){
            axios.post('http://localhost:5000/users/add', user)
                .then(res => console.log(res.data));
        }else{
            alert('Password Confirmation Failed!');
        }
        

        this.setState({
            firstName: '',
            middleName: '',
            lastName: '',
            country: '',
            address: '',
            contactNumber: '',
            email: '',
            userName: '',
            password: '',
            confirmPassword: ''
        })
      }
    
    state={
        profileImg : LogoBlack,
        firstName: '',
        middleName: '',
        lastName: '',
        country: '',
        address: '',
        contactNumber: '',
        email: '',
        userName: '',
        password: '',
        confirmPassword: ''
    }

    // imageHandler = (e) => {
    //     var file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = (event) =>{
    //         if (reader.readyState === 2){
                
    //             this.setState({profileImg: reader.result})
    //         }
           
    //     };
    //     reader.readAsDataURL(file);
    // }
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
                        {/* <input type = "file" name="image-upload" id="input" accept="image/*" onChange={this.imageHandler}/> */}
                        {/* <img src={profileImg} id="img" className="img"/> */}
                        <div>
                            <TextField style={{marginLeft:"55px"}}
                            // error
                            required
                            value={this.state.firstName}
                            // id="standard-error-helper-text"
                            id = "standard-required"
                            label="First Name"
                            onChange={this.onChangeFirstName}
                            // defaultValue="Hello World"
                            // helperText="Incorrect entry."
                            />
                            <TextField label="Middle Name" value={this.state.middleName} onChange={this.onChangeMiddleName} style={{marginLeft:"55px"}}/>
                            
                        </div>
                        <div style={{marginTop:'30px'}}>
                            <TextField required label="Last Name" value={this.state.lastName} onChange={this.onChangeLastName} style={{marginLeft:"55px"}}/>
                            <TextField label="Country" value={this.state.country} onChange={this.onChangeCountry} style={{marginLeft:"55px"}}/>
                            
                        </div>
                        <div style={{marginTop:'30px'}}>
                            <TextField required label="Address" value={this.state.address} onChange={this.onChangeAddress} style={{marginLeft:"55px"}}/>
                            <TextField required label="Contact Number" value={this.state.contactNumber} onChange={this.onChangeContactNumber} style={{marginLeft:"55px"}}/>
                        </div>
                        <div style={{marginTop:'30px'}}>
                            <TextField required label="Email" value={this.state.email} onChange={this.onChangeEmail} style={{marginLeft:"55px"}}/>
                            <TextField required label="User Name" value={this.state.userName} onChange={this.onChangeUserName} style={{marginLeft:"55px"}}/>
                        </div>
                        <div style={{marginTop:'30px'}}>
                            <TextField required label="Password" value={this.state.password} onChange={this.onChangePassword} style={{marginLeft:"55px"}}/>
                            <TextField required label="Confirm Password"  onChange={this.onChangeConfirmPassword} style={{marginLeft:"55px"}}/>
                        </div>
                        <Button variant="contained" color="primary" type="submit" style = {{marginTop:'40px',  marginLeft:'50px'}}> Submit </Button>
                        <Button variant="contained" color="secondary" type="button" style = {{marginTop:'40px', marginLeft:'20px'}} onClick={this.handleCancleBtn}> Cancle </Button>
                    </form>
                </div>
            </div>
        )
    }
}
