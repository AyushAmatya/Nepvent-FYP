import React, { Component } from 'react';
import './loginStyle.css';
import {Grid, TextField, Button} from '@material-ui/core';
import '../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import LogoBlack from '../img/logoBlack.jpg';
import Nav from './nav.js';
export default class CreateEvent extends Component {
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
                <Nav userName="lo"/>
                <div className="container2">
                    <h1>Create event page</h1>
                    <form onSubmit={this.handleSubmit} style={{width:"100%"}}>     
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Event Name" value={this.state.userName} onChange={this.onChangeUserName} style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Location" value={this.state.userName} onChange={this.onChangeUserName} style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Category" value={this.state.userName} onChange={this.onChangeUserName} style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>

                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="From Date" value={this.state.userName} onChange={this.onChangeUserName} style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="To Date" value={this.state.userName} onChange={this.onChangeUserName} style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Targeted Audience" value={this.state.userName} onChange={this.onChangeUserName} style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <input type="file" multiple />
                            </Grid>
                        </Grid>
                        {/* <div style={{marginTop:'30px'}}>
                            <TextField required label="User Name" value={this.state.userName} onChange={this.onChangeUserName} style={{ width:"35%"}}/>
                        </div>
                        <div style={{marginTop:'30px'}}>
                            <TextField required label="Password" value={this.state.password} onChange={this.onChangePassword} style={{ width:"35%"}}/>
                        </div> */}
                        <Button variant="contained" color="primary" type="submit" style = {{marginTop:'20px'}}> Submit </Button>
                        <Button variant="contained" color="secondary" type="button" style = {{marginTop:'20px', marginLeft:'20px'}} onClick={this.handleCancleBtn}> Cancle </Button>
                    </form>
                </div>
            </div>
        )
    }
}
