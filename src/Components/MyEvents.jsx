import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';
import './registerStyle.css';
import {Grid, Card, CardActionArea, CardContent} from '@material-ui/core';
import Nav from './nav.js';

const EventDetails = ({ match }) => {
  
  const [myEventDetails, setMyEventDetails] = useState([]);
  const [imageList, setImageList] = useState([[]]);
  const [eventId, setEventId] = useState();
  useEffect(() => {
    let eventId = match.params.event_id;
    setEventId(eventId);
    console.log(imageList)
    if(!imageList[1]){
      setImageList([]);
      const user_id = JSON.parse(localStorage.getItem('user'))['_id'];

      if(user_id){
        axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getMyEvents`, {user_id:user_id})
        .then(res => {
            if(res.data.length != 0){
                const myEventDetails = res.data;
                setMyEventDetails(myEventDetails);
                setImageList([]);
                console.log(imageList);
                for (var i=0; i < res.data.length; i++) {
                 axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getImageList`, {event_id:res.data[i].event_id})
                 .then(res => {
                   if(res.data.length != 0){
                    var imageListTemp = imageList;
                    var eachEventImage = res.data;
                    imageListTemp.push(eachEventImage);
                    setImageList(imageListTemp);
                   }else{
                    var imageListTemp = imageList;
                    var eachEventImage = [];
                    imageListTemp.push(eachEventImage);
                    setImageList(imageListTemp);
                   }
                 }).catch(err => {
                  console.log("jhadskjfhk");
                  });
                }
            }
        })
        .catch(err => {
        console.log(err.response);
        });
      }
    }
    
    
  }, []);

  const renderEvents = (myEventDetails) => {
    return myEventDetails && myEventDetails.map((myEvent, i) => {
      return (
        <Grid item xs={12} key={i} md={4} style={{marginTop:'20px'}}>
          <Link to={'/myEventDetails/'+myEvent.event_id} style={{textDecoration:'none'}}>
            <Card className='items' style={{backgroundColor:'silver'}}>
                <CardActionArea>
                    <CardContent>
                        <h1 style={{fontFamily:"Comic Sans MS", marginTop:'0px', textAlign:'center'}}>{myEvent.event_name}</h1>
                        <Grid container spacing={2} style={{fontFamily:"MV Boli"}}>
                            <Grid item xs={12} md={6} >
                                <b>From: </b>{myEvent.from_date.slice(0,10)}
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <b>To: </b>{myEvent.to_date.slice(0,10)}
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <b>Ticket Price: </b>{myEvent.ticket_price?myEvent.ticket_price:'Free'}
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <b>Available Ticket: </b>{myEvent.ticket_limit}
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
          </Link>
        </Grid>
      );
    });
  }
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        
        <Nav/>
        <div className="container2">
          <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"30px"}}>My Events </h1>
          <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"185px"}}>Upcomming Events</h1>
          <Grid container spacing={2}>
            {renderEvents(myEventDetails)}
          </Grid> 
          <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"120px"}}>Past Events</h1>
        </div>
      </div>
  );
};

export default EventDetails;