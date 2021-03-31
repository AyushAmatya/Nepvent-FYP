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


export default class Home extends Component {
    
    constructor (props){
        super(props);
    }

    // componentDidMount(){
    //     console.log(this.props.match.params.userName);
    // }
    render(){
        
        return (
            <div>
                
                <Nav userName = {this.props.match.params.userName}/>
                
                <div className="container">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE1} style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE2} style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE3} style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE4} style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE5} style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE6} style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE4} style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE5} style={{width:'100%'}}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src = {imgE6} style={{width:'100%'}}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
