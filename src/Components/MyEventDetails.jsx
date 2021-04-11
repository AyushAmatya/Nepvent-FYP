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




const MyEvents = ({ match }) => {
  

  // const [allEventData, setAllEventData]= useState({
  //   eventDetails:'',
  //   eventCoordiation:'',
  //   eventPurpose:'',
  //   eventImage:''
  // });
  const [eventDetails, setEventDetails] = useState();
  const [eventPurpose, setEventPurpose] = useState();
  const [eventCoordiation, setEventCoordiation] = useState();
  const [eventImages, setEventImages] = useState();
  const [eventId, setEventId] = useState();
  useEffect(() => {
    let eventId = match.params.event_id;
    setEventId(eventId);
    if(eventId){
      axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getEventDteails`, {event_id:eventId})
      .then(res => {
        const eventDetails = res.data[0];
        setEventDetails(eventDetails);
      })
      .catch(err => {
        console.log(err);
      });

      axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getEventPurpose`, {event_id:eventId})
      .then(res => {
        const eventPurpose = res.data[0];
        setEventPurpose(eventPurpose);
      })
      .catch(err => {
        console.log(err);
      });

      axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getEventCoordination`, {event_id:eventId})
      .then(res => {
        const eventCoordiation = res.data[0];
        setEventCoordiation(eventCoordiation);
      })
      .catch(err => {
        console.log(err);
      });

      axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getEventImages`, {event_id:eventId})
      .then(res => {
        const eventImages = res.data;
        setEventImages(eventImages);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, []);

  const handleBtnClick =()=>{
    console.log(eventDetails);
    console.log(eventPurpose);
    console.log(eventCoordiation);
    console.log(eventImages);
  }

  const renderPhotos = (source) => {
    return source.map((photo) => {
        return <img src={photo.path} alt="" key={photo.path} style={{width:'334px',height:'190px',objectFit:'cover',padding:'0.75rem'}} />;
    });
  };

  if(eventId){
    return(
      <div>
        {/* <Nav/>
        <div className="container2">
          <h1>{eventId}</h1>
         
        </div> */}
        <Nav/>
                <div className="container2">
                  
                <button type='button' onClick={handleBtnClick}>console all data</button>
                    <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"30px"}}>Event Details</h1>
                    <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"140px"}}>Event Details</h1>
                    <form style={{width:"100%"}} >     
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                        required label="Event Name"
                                        readonly  
                                        value={eventDetails?eventDetails.event_name:''} 
                                        style={{ width:"100%", color:'black'}}
                                    />
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={2}> 
                                <div style={{marginTop:'30px'}}>
                                  <TextField 
                                      required label="From Date"
                                      readonly  
                                      value={eventDetails?eventDetails.from_date.slice(0,10):''} 
                                      style={{ width:"100%"}}
                                  />
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <div style={{marginTop:'30px'}}>
                                <TextField 
                                      required label="From Time"
                                      readonly  
                                      value={eventDetails?eventDetails.from_time:''} 
                                      style={{ width:"100%"}}
                                  />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={2}> 
                            <div style={{marginTop:'30px'}}>
                                  <TextField 
                                      required label="To Date"
                                      readonly  
                                      value={eventDetails?eventDetails.to_date.slice(0,10):''} 
                                      style={{ width:"100%"}}
                                  />
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <div style={{marginTop:'30px'}}>
                                  <TextField 
                                      required label="To Time"
                                      readonly  
                                      value={eventDetails?eventDetails.to_time:''} 
                                      style={{ width:"100%"}}
                                  />
                                </div>
                             
                            </Grid>
                            <Grid item xs={12} md={4}> 
                              <div style={{marginTop:'30px'}}>
                                <TextField 
                                    required label="Event Categories"
                                    readonly  
                                    value={eventDetails?eventDetails.event_category_title:''} 
                                    style={{ width:"100%"}}
                                />
                              </div> 
                            </Grid>
                            {eventDetails && eventDetails.other_category_description?<Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    readonly
                                    label="Other Category Description"
                                    value={eventDetails.other_category_description} 
                                    style={{ width:"100%"}}
                                    />
                                </div>                  
                            </Grid>:null}
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                  <TextField 
                                    required label="Event Type"
                                    readonly  
                                    value={eventDetails?eventDetails.event_type:''} 
                                    style={{ width:"100%"}}
                                  />
                                </div>
                            </Grid>
                            {eventDetails && eventDetails.proposed_venue?<Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    readonly
                                    value={eventDetails.proposed_venue}
                                    label="Proposed Venue" 
                                    style={{ width:"100%"}}
                                    />
                                </div>                  
                            </Grid>:<Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    readonly
                                    value={eventDetails?eventDetails.link:''}
                                    label="Link" 
                                    style={{ width:"100%"}}
                                    />
                                </div>                  
                            </Grid>}
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="No. of Days" 
                                    value={eventDetails?eventDetails.no_of_days:''} 
                                    readonly s
                                    tyle={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    readonly
                                    value={eventDetails?eventDetails.number_of_expected_guest:''}
                                    label="Number of expected guests"  
                                    style={{ width:"100%"}}
                                    />
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={12}>
                            <div>
                                <h3 style={{fontFamily:"MV Boli", fontWeight:"bold", marginTop:"20px", color:'#BF9000'}}>Images:</h3>
                                <div className="result">{eventImages?renderPhotos(eventImages):null}</div>
                            </div>
                            </Grid>
                            {/* 
                            <Grid item xs={12} md={12}>
                            <div>
                                <input type="file" id="file" multiple onChange={handleImageChange} />
                                <h3 style={{fontFamily:"MV Boli", fontWeight:"bold", marginTop:"20px", color:'#BF9000'}}>Insert Images:</h3>
                                <div className="label-holder">
                                
                                    <label htmlFor="file" className="label">
                                        
                                        <i className="material-icons">add_a_photo</i>
                                    </label>
                                </div>
                                <div className="result">{renderPhotos(selectedFiles)}</div>
                            </div>
                            </Grid> */}
                            
                        </Grid>
                        
                        <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", marginTop:'50px', borderBottom:'2px Solid', width:"150px"}}>Event Purpose</h1>
                        <Grid container spacing={5}>
                          <Grid item xs={12} md={12}>
                              <div style={{marginTop:'30px'}}>
                                  <h4 style={{color:'gray'}}>Strategic Objectves / Expected Outcomes:</h4>
                                  <TextareaAutosize 
                                  style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                  rowsMin={3}
                                  readonly
                                  value={eventPurpose?eventPurpose.objectives:''}
                                  placeholder="Strategic Objectves / Expected Outcomes:" 
                                  />
                              </div>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <div style={{marginTop:'-40px'}}>
                                <h4 style={{color:'gray'}}>Details of the Event:</h4>
                                <TextareaAutosize 
                                style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                rowsMin={3} 
                                readonly
                                placeholder="Details of the Event:" 
                                value={eventPurpose?eventPurpose.details:''}
                                />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <div style={{marginTop:'-40px'}}>
                                <h4 style={{color:'gray'}}>Categories of Expected Guests:</h4>
                                <TextareaAutosize 
                                style={{ width:"95%", fontSize:'17px', padding:'10px'}} 
                                rowsMin={3} 
                                readonly
                                placeholder="Categories of Expected Guests:"
                                value={eventPurpose?eventPurpose.guest_category:''}
                                />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <div style={{marginTop:'-40px'}}>
                                <h4 style={{color:'gray'}}>Name of Expected External VIPs, if any:</h4>
                                <TextareaAutosize 
                                style={{ width:"95%", fontSize:'17px', padding:'10px'}} 
                                rowsMin={3} 
                                readonly
                                placeholder="Name of Expected External VIPs, if any:" 
                                value={eventPurpose?eventPurpose.vip_name:''}
                                />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <div style={{marginTop:'-20px'}}>
                                <TextField 
                                required 
                                readonly
                                label="Master of Ceremony (Host)"  
                                style={{ width:"100%"}}
                                value={eventPurpose?eventPurpose.host:''}
                                />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <div style={{marginTop:'-20px'}}>
                                <h4 style={{color:'gray'}}>Executives Required for this Event:</h4>
                                <TextareaAutosize 
                                style={{ width:"95%", fontSize:'17px', padding:'10px'}} 
                                rowsMin={3} 
                                readonly
                                placeholder="Executives Required for this Event:" 
                                value={eventPurpose?eventPurpose.executives:''}
                                />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <div style={{marginTop:'-20px'}}>
                                <h4 style={{color:'gray'}}>Proposed role of Executives:</h4>
                                <TextareaAutosize 
                                style={{ width:"95%", fontSize:'17px', padding:'10px'}} 
                                rowsMin={3} 
                                readonly
                                placeholder="Proposed role of Executives:" 
                                value={eventPurpose?eventPurpose.executives_role:''}
                                />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <div style={{marginTop:'-40px'}}>
                                <h4 style={{color:'gray'}}>Date and Time Executive will be required:</h4>
                                <TextareaAutosize 
                                style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                rowsMin={3} 
                                readonly
                                placeholder="Date and Time Executive will be required:"
                                value={eventPurpose?eventPurpose.executives_date_time:''} 
                                />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Proposed speech points will be provided for the Executives:</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}}
                                    rowsMin={3} 
                                    readonly
                                    placeholder="Proposed speech points will be provided for the Executives:" 
                                    value={eventPurpose?eventPurpose.speech_points:''} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Other speakers</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    readonly
                                    placeholder="Other speakers" 
                                    value={eventPurpose?eventPurpose.other_speakers:''} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Are media invited / expected</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    readonly
                                    placeholder="Are media invited / expected" 
                                    value={eventPurpose?eventPurpose.media:''} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Is any AV required (Please Specify)</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    readonly
                                    placeholder="Is any AV required (Please Specify)" 
                                    value={eventPurpose?eventPurpose.av:''} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Will there be catering (Please Specify)</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    readonly
                                    placeholder="Will there be catering (Please Specify)" 
                                    value={eventPurpose?eventPurpose.catering:''}
                                    />
                                </div>
                            </Grid>
                        </Grid>

                        <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", marginTop:'60px', borderBottom:'2px Solid', width:"200px"}}>Event Coordination</h1>
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={8}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="Name of Event Manager"  
                                    style={{ width:"100%"}}
                                    readonly
                                    value={eventCoordiation?eventCoordiation.event_manager_name:''}
                                    />
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="Department"  
                                    style={{ width:"100%"}}
                                    readonly
                                    value={eventCoordiation?eventCoordiation.manager_department:''}
                                    />
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    label="Telephone Number"  
                                    style={{ width:"100%"}}
                                    readonly
                                    value={eventCoordiation?eventCoordiation.manager_telephone_number:''}
                                    />
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="Mobile Number"  
                                    style={{ width:"100%"}}
                                    readonly
                                    value={eventCoordiation?eventCoordiation.manager_mobile_number:''}
                                    />
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="Email"  
                                    style={{ width:"100%"}}
                                    readonly
                                    value={eventCoordiation?eventCoordiation.manager_email:''}
                                    />
                                </div> 
                            </Grid>
                          </Grid>
                        {/* 
                        <Button variant="contained" color="primary" type="submit" style = {{marginTop:'40px', width:'25%'}}> Submit </Button>   */}
                    </form>
                </div>
      </div>
    );
  }else{
    return null;
  }
};

export default MyEvents;