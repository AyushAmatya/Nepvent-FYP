import React, { Component } from 'react';
import './myStyle.css';
import imgE1 from '../img/e1.jpg';
import imgE2 from '../img/e2.png';
import imgE3 from '../img/e3.jpg';
import imgE4 from '../img/e4.jpg';
import imgE5 from '../img/e5.jpg';
import imgE6 from '../img/e6.jpg';
import {Grid} from '@material-ui/core';
import Nav from './nav.js';
import { isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';

export default class Home extends Component {
    componentDidMount(){
        // if(isAuth()){
        //     toast.success(`Hey ${JSON.parse(localStorage.getItem('user'))['first_name']}, Welcome back!`);
        // }else{
        //     toast.error(`Please login to use all services`);
        // }
    }
    render(){
        
        return (
            <div>
                <ToastContainer />
                <Nav userName = {this.props.match.params.userName}/>
                
                <div className="container">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE1} alt = '' style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE2} alt = '' style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE3} alt = '' style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE4} alt = '' style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE5} alt = '' style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE6} alt = '' style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE4} alt = '' style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE5} alt = '' style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE6} alt = '' style={{width:'100%'}}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
