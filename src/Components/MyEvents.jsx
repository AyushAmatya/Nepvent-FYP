import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticate, isAuth, getCookie } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import LogoBlack from '../img/logoBlack.jpg';
import '../App.css';
import './registerStyle.css';
import { blue } from '@material-ui/core/colors';
import {TextField, Button, Grid, TextareaAutosize, Card, CardActionArea, CardContent} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Nav from './nav.js';
import DateFnsUtils from '@date-io/date-fns';

import item1 from '../img/item1.jpg'
import item2 from '../img/item2.jpg'
import item3 from '../img/item3.jpg'
import item4 from '../img/item4.jpg'
import item5 from '../img/item5.jpg'
import item6 from '../img/item6.jpg'
import item7 from '../img/item7.jpg'
import item8 from '../img/item8.jpg'
import item9 from '../img/item9.jpg'
import item10 from '../img/item10.jpg'
import item11 from '../img/item11.jpg'
import item12 from '../img/item12.jpg'
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import TimePicker from '@material-ui/lab/TimePicker';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';




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

  const handleClick=()=>{
    console.log(imageList);
    console.log('haha');
  }

  const renderEvents = (myEventDetails) => {
    return myEventDetails && myEventDetails.map((myEvent, i) => {
      return (
        <Grid item xs={12} key={i} md={4} style={{marginTop:'20px'}}>
          <Link to={'/myEventDetails/'+myEvent.event_id} style={{textDecoration:'none'}}>
            <Card className='items' style={{backgroundColor:'silver'}}>
                <CardActionArea>
                    <CardContent>
                        <h3 className='item-name'>{myEvent.event_name}</h3>
                        <div className='item-price'>{myEvent.from_date} </div>
                    </CardContent>
                </CardActionArea>
            </Card>
          </Link>
        </Grid>
      );
    });
  }
  const renderPhotos = (index) => {
    console.log(imageList.slice());
    console.log(imageList[index+1]);
    if(imageList[index+1]){
      return imageList[index+1].map((photo) => {
          return <img src={photo.path} alt="" key={photo.path} style={{width:'334px',height:'190px',objectFit:'cover',padding:'0.75rem'}} />;
      });
    }else{
      return null;
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        
        <Nav/>
        <div className="container2">
        <button onClick={handleClick}>lol</button>
          <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"30px"}}>My Events </h1>
          <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"185px"}}>Upcomming Events</h1>
          <Grid container spacing={2}>
            {renderEvents(myEventDetails)}
            {/* {myEventDetails && myEventDetails.map((myEvent, i) => {
              return(
                  <Grid item xs={12} key={i} md={4} style={{marginTop:'20px'}}>
                    <Link to={'/myEventDetails/'+myEvent.event_id} style={{textDecoration:'none'}}>
                      <Card className='items' style={{backgroundColor:'silver'}}>
                          <CardActionArea>
                              <CardContent>
                                  <h3 className='item-name'>{myEvent.event_name}</h3>
                                  <div className='item-price'>{myEvent.from_date} </div>
                              </CardContent>
                          </CardActionArea>
                      </Card>
                    </Link>
                    <div className="result">{renderPhotos(i)}</div>
                  </Grid>
              )}
             )}    */}
            </Grid> 
            
          <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"120px"}}>Past Events</h1>
        </div>
                
      </div>
  );
};

export default EventDetails;