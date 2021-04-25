import React, { useEffect } from 'react';
import './myStyle.css';
import {Grid, Card, CardActionArea, CardContent} from '@material-ui/core';
import Nav from './nav.js';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
                    <Link to={'/eventDetails/'+events.event_id} style={{textDecoration:'none'}}>
                        <Card style={{backgroundColor:'silver'}}>
                            <CardActionArea>
                                <CardContent>
                                    <h1 style={{fontFamily:"Comic Sans MS", marginTop:'0px', textAlign:'center'}}>{events.event_name}</h1>
                                    <Grid container spacing={2} style={{fontFamily:"MV Boli"}}>
                                        <Grid item xs={12} md={6} >
                                            <b>From: </b>{events.from_date.slice(0,10)}
                                        </Grid>
                                        <Grid item xs={12} md={6} >
                                            <b>To: </b>{events.to_date.slice(0,10)}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                        <b>Ticket Price: </b>{events.ticket_price?events.ticket_price:'Free'}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                        <b>Available Ticket: </b>{events.ticket_limit}
                                        </Grid>
                                    </Grid>
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
            <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"185px"}}>Upcomming Events</h1>

                <Grid container spacing={2}>
                    {renderAllOtherEvents(allOtherEvents)}
                </Grid>
            <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"155px"}}>Ongoing Events</h1>
            <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"120px"}}>Past Events</h1>
            
            </div>
        </div>
    )
}
export default Home;
