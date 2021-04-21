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
import QRCode from 'qrcode.react';
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




const EventTickets = ({ match }) => {
  

  
  const [myEventDetails, setMyEventDetails] = useState([]);
  const [imageList, setImageList] = useState([[]]);
  const [eventId, setEventId] = useState();
  const [myTickets, setMyTickets] = useState([]);
  useEffect(() => {
    const user_id = JSON.parse(localStorage.getItem('user'))['_id'];
    if(user_id){
      axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getMyTickets`,{user_id:user_id})
      .then(res => {
        if(res.data.length != 0){
          setMyTickets(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
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
    console.log(myTickets);
    console.log('haha');
  }

  const renderTickets = (myTickets) => {
    return myTickets && myTickets.map((myTicket, i) => {
      return (
        <Grid key={i} container spacing={2}>
        <Grid xs={12} key={i} md={3} style={{marginTop:'100px'}}>
          <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"17px", textAlign:'center'}}>{myTicket.event_name}</h1>
        </Grid>
        <Grid xs={12} key={i} md={3} style={{marginTop:'100px'}}>
        <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"17px", textAlign:'center'}}>{myTicket.from_date.slice(0,10)} ({myTicket.from_time})</h1>
        </Grid>
        <Grid xs={12} key={i} md={3} style={{marginTop:'100px'}}>
        <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"17px", textAlign:'center'}}>{myTicket.to_date.slice(0,10)} ({myTicket.to_time})</h1>
        </Grid>
        <Grid xs={12} key={i} md={3} style={{marginTop:'25px', textAlign:'center'}}>
        <QRCode
          id={myTicket.ticket_id}
          value={JSON.stringify(myTicket)}
          size='200'
          level='M'
        />
        <Button variant='outlined' style={{marginTop:'10px'}} color='primary' onClick={ () => {
          const canvas = document.getElementById(myTicket.ticket_id);
          const pngUrl = canvas.toDataURL("image/png").replace("image/png","image/octet-stream");
          let downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = myTicket.event_name + '.png';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }}>Download Ticket</Button>
        </Grid>
        <Grid xs={12} key={i} md={12}>
          <hr style={{marginTop:'25px'}}/>
        </Grid>
        </Grid>
        
      );
    });
  }
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        
        <Nav/>
        <div className="container2">
        {/* <button onClick={handleClick}>lol</button> */}
          <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"30px"}}>My Events Tickets </h1>
          <Grid container spacing={2}>
            <Grid xs={12} md={3} style={{marginTop:'20px'}}>
            <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"20px",  borderBottom:'2px Solid', width:"90%", textAlign:'center'}}>Event Name</h1>
            </Grid>
            <Grid xs={12} md={3} style={{marginTop:'20px'}}>
            <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"20px",  borderBottom:'2px Solid', width:"90%", textAlign:'center'}}>From Date and Time</h1>
            </Grid>
            <Grid xs={12} md={3} style={{marginTop:'20px'}}>
            <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"20px",  borderBottom:'2px Solid', width:"90%", textAlign:'center'}}>To date and Time</h1>
            </Grid>
            <Grid xs={12} md={3} style={{marginTop:'20px'}}>
            <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"20px",  borderBottom:'2px Solid', width:"90%", textAlign:'center'}}>Ticket</h1>
            </Grid>
          </Grid>
          {renderTickets(myTickets)}
           
            
        </div>
                
      </div>
  );
};

export default EventTickets;