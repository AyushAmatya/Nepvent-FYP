import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { isAuth } from '../helpers/auth';
import '../App.css';
import './registerStyle.css';
import {TextField, Button, Grid, TextareaAutosize} from '@material-ui/core';
import Nav from './nav.js';

const EventDetails = ({ match, history }) => {
  const [eventDetails, setEventDetails] = useState();
  const [eventPurpose, setEventPurpose] = useState();
  const [eventCoordiation, setEventCoordiation] = useState();
  const [eventImages, setEventImages] = useState();
  const [eventId, setEventId] = useState();
  const [ticketId, setTicketId] = useState();
  const [enrolled, setEnrolled] = useState(false);
  useEffect(() => {
    let eventId = match.params.event_id;
    setEventId(eventId);
    if(eventId){
      if(isAuth()){
        const user_id = JSON.parse(localStorage.getItem('user'))['_id'];
        axios.post(`${process.env.REACT_APP_EVENT_API_URL}/getEnrolled`,{user_id:user_id, event_id:eventId})
        .then(res => {
          if(res.data.length != 0){
            setEnrolled(true);
          }else{
            setEnrolled(false);
          }
        })
      }
      axios.get(`${process.env.REACT_APP_EVENT_API_URL}/getMaxTicketId`)
        .then(res => {
            if(res.data.length != 0){
                console.log(res.data)
                const ticketId = Number(res.data[0].ticket_id) + 1;
                setTicketId(ticketId);
            }else{
              const ticketId = 1;
              setTicketId(ticketId);
            }
          })
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


  const handleBuyBtnClick = () => {
    if(isAuth()){
      const user_id = JSON.parse(localStorage.getItem('user'))['_id'];
      const attended = 'N';
      const event_id = eventId;
      const ticket_id = ticketId;
      const event_name = eventDetails.event_name;
      const from_date = eventDetails.from_date.slice(0,10);
      const from_time = eventDetails.from_time;
      const to_date = eventDetails.to_date.slice(0,10);
      const to_time = eventDetails.to_time;
      axios.post(`${process.env.REACT_APP_EVENT_API_URL}/addTickets`, {
        user_id,
        attended,
        event_id,
        ticket_id,
        event_name,
        from_date,
        from_time,
        to_date,
        to_time
      })
      .then(res => {
        toast.success(res.data.message);
        history.push('/myTickets');
      }).catch(err => {
        console.log(err);
      });

    }else{
      toast.error("You need to login to use this feature")
    }
  }

  const renderPhotos = (source) => {
    return source.map((photo) => {
        return <img src={photo.path} alt="" key={photo.path} style={{width:'334px',height:'190px',objectFit:'cover',padding:'0.75rem'}} />;
    });
  };
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showEventCoordination, setShowEventCoordination] = useState(false);
  const [showEventPurpose, setShowEventPorpose] = useState(false);

  const handleEventDetailsBtnClick = () => {
    setShowEventDetails(true);
    setShowEventCoordination(false);
    setShowEventPorpose(false);
  }
  const handleEventCoordinationBtnClick =() =>{
    setShowEventDetails(false);
    setShowEventCoordination(true);
    setShowEventPorpose(false);
  }
  const handleEventPurposeBtnClick = () => {
    setShowEventDetails(false);
    setShowEventCoordination(false);
    setShowEventPorpose(true);
  }
  if(eventId){
    return(
      <div>
        <Nav/>
                <div className="container2">
                  
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={12}>
                      <div>
                          <div className="result">{eventImages?renderPhotos(eventImages):null}</div>
                      </div>
                    </Grid>
                  </Grid>
                  
                    <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"30px"}}>{eventDetails?eventDetails.event_name:''}</h1>
                    <Grid container spacing={2} style={{fontFamily:"MV Boli"}}>
                      <Grid item xs={12} md={3} >
                          <b>From-Date: </b>{eventDetails?eventDetails.from_date.slice(0,10):''}
                      </Grid>
                      <Grid item xs={12} md={3} >
                          <b>From-Time: </b>{eventDetails?eventDetails.from_time:''}
                      </Grid>
                      <Grid item xs={12} md={3} >
                          <b>To-Date: </b>{eventDetails?eventDetails.to_date.slice(0,10):''}
                      </Grid>
                      <Grid item xs={12} md={3} >
                          <b>To-Time: </b>{eventDetails?eventDetails.to_time:''}
                      </Grid>
                      {eventDetails?eventDetails.proposed_venue?<Grid item xs={12} md={3} ><b>Proposed-Venue: </b>{eventDetails.proposed_venue}</Grid>:<Grid item xs={12} md={3} ><b>Link: </b>{eventDetails.link}</Grid>:''}
                      <Grid item xs={12} md={3}>
                        <b>Expected Guests: </b>{eventDetails?eventDetails.number_of_expected_guest:''}
                      </Grid>
                      <Grid item xs={12} md={3}>
                      <b>Ticket Price: </b>{eventDetails?eventDetails.ticket_price?eventDetails.ticket_price:'Free':''}
                      </Grid>
                      <Grid item xs={12} md={3}>
                      <b>Available Ticket: </b>{eventDetails?eventDetails.ticket_limit:''}
                      </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={1}>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Button variant="outlined" color="primary" type="button"  onClick={handleEventDetailsBtnClick} style={{marginTop:'60px', width:'100%'}}> Show Event Details </Button>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <Button variant="outlined" color="primary" type="button"  onClick={handleEventPurposeBtnClick} style={{marginTop:'60px', width:'100%'}}> Show Event Purpose </Button>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <Button variant="outlined" color="primary" type="button"  onClick={handleEventCoordinationBtnClick} style={{marginTop:'60px', width:'100%'}}> Show Event Coordination </Button>
                    </Grid>
                    <Grid item xs={12} md={1}>
                    </Grid>
                    
                  </Grid>
                  {showEventDetails?
                  <div style={{width:'100%'}}>
                    <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"140px", marginTop:'40px'}}>Event Details</h1>
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
                      </Grid>
                  </div>:''} 
                  
                  {showEventPurpose?
                  <div style={{width:'100%'}}>
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
                  </div>:''}

                  {showEventCoordination?
                  <div style={{width:'100%'}}>
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
                  </div>:''}
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={9}>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Button disabled={enrolled?'disabled':''} variant="contained" color="primary" type="button" onClick={handleBuyBtnClick} style = {{marginTop:'40px', width:'100%'}}> {enrolled?'Already Enrolled':eventDetails?eventDetails.ticket_price?'Buy Tickets':'Participate in this Event':''} </Button>
                    </Grid>
                  </Grid>
                  
                   
                </div>
      </div>
    );
  }else{
    return null;
  }
};

export default EventDetails;