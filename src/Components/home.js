import React, { Component, useEffect } from 'react';
import './myStyle.css';
import {Grid, Card, CardActionArea, CardContent} from '@material-ui/core';
import Nav from './nav.js';
import { isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


const Home = () => {
    const [userId, setUserId] = React.useState();
    const [allOtherEvents, setAllOtherEvents] = React.useState();
    useEffect(()=>{
        if(localStorage.getItem('user')){
            const user_id = JSON.parse(localStorage.getItem('user'))['_id']
            setUserId(user_id);
            axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getAllOtherEvents`, {user_id:user_id})
        .then(res => {
            const allOtherEvents = res.data;
            setAllOtherEvents(allOtherEvents);
        })
        .catch(err => {
            console.log(err);
        });
        }else{
            const user_id='';
            axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getAllOtherEvents`, {user_id:user_id})
        .then(res => {
            const allOtherEvents = res.data;
            setAllOtherEvents(allOtherEvents);
        })
        .catch(err => {
            console.log(err);
        });
        }
        
    },[]);

    const renderAllOtherEvents=(allOtherEvents)=>{
        return allOtherEvents && allOtherEvents.map((events,i)=>{
            return(
                <Grid item xs={12} key={i} md={4} style={{marginTop:'20px'}}>
                    <Link to={'/myEventDetails/'+events.event_id} style={{textDecoration:'none'}}>
                        <Card className='items' style={{backgroundColor:'silver'}}>
                            <CardActionArea>
                                <CardContent>
                                    <h2 className='item-name'>{events.event_name}</h2>
                                    <div className='item-price'>{events.from_date.slice(0,10)} - {events.to_date.slice(0,10)}</div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            )
        })
    }
    return (
        <div>
            <ToastContainer />
            <Nav/>
            
            <div className="container">
                <Grid container spacing={2}>
                    {renderAllOtherEvents(allOtherEvents)}
                </Grid>
            </div>
        </div>
    )
}
export default Home;
