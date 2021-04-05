import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticate, isAuth, getCookie } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import LogoBlack from '../img/logoBlack.jpg';
import '../App.css';
import './registerStyle.css';
import { blue } from '@material-ui/core/colors';
import {TextField, Button, Grid, TextareaAutosize } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Nav from './nav.js';
import DateFnsUtils from '@date-io/date-fns';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import TimePicker from '@material-ui/lab/TimePicker';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const type = [{ title: 'Seminars', category: 'Corporate events' },
  { title: 'Conferences', category: 'Corporate events' },
  { title: 'Trade shows', category: 'Corporate events' },   
  { title: 'Workshops', category: 'Corporate events' },
  { title: 'Other', category: 'Corporate events' },     
  { title: 'Reunions', category: 'Social events' }, 
  { title: 'Themed parties', category: 'Social events' },   
  { title: 'Other', category: 'Social events' }, 
  { title: 'Webinars', category: 'Virtual events' },   
  { title: 'Classes', category: 'Virtual events' },     
  { title: 'Interactive performances', category: 'Virtual events' }, 
  { title: 'Summits', category: 'Virtual events' },  
  { title: 'Other', category: 'Virtual events' },  
  { title: 'Auctions', category: 'Fundraising events' },   
  { title: 'Sponsored sporting events', category: 'Fundraising events' },     
  { title: 'Sales', category: 'Fundraising events' }, 
  { title: 'Gala dinners', category: 'Fundraising events' },   
  { title: 'Other', category: 'Fundraising events' },
  { title: 'Music festivals', category: 'Festivals' }, 
  { title: 'Food festivals', category: 'Festivals' },  
  { title: 'Other', category: 'Festivals' }, 
  { title: 'Street parties', category: 'Community events' },   
  { title: 'Swap shops', category: 'Community events' }, 
  { title: 'Litter-picking', category: 'Community events' },  
  { title: 'Other', category: 'Community events' },  
  { title: 'Boutique shops', category: 'Pop-up events' },   
  { title: 'Food collaborations', category: 'Pop-up events' }, 
  { title: 'Exercise classes', category: 'Pop-up events' },
  { title: 'Other', category: 'Pop-up events' }                    
];

function handleCancle(){
    window.location='/';
}
function handleRegister(){
    window.location='/register';
}
const optionForEventType = ['Online', 'On Site'];
const CreateEvent = ({ match }) => {
  
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    event_name: ''
  });
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const [noOfDays, setNoOfDays] = useState((toDate.setHours(0, 0, 0, 0)  - selectedDate.setHours(0, 0, 0, 0))/86400000 +1);
  const [toTime, setToTime] = useState('19:00');
  const [fromTime, setFromTime] = useState('07:00');
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');
  const [otherCategory, setOtherCategory] = useState(false);
  const [typeOnline, setTypeOnline] = useState(false);
  const [selectedFiles, setSelectedFiles ] = useState([]);
  const [eventTypeOptions, setEventTypeOptions] = React.useState(optionForEventType[1]);
  const [eventType, setEventType] = React.useState('');
  
  const handleDateChange = (date) => {
    if(date.setHours(0, 0, 0, 0) > toDate.setHours(0, 0, 0, 0)){
        toast.error('From-date cant be greater than To-date');
    }else{
        setSelectedDate(date);
        setNoOfDays((toDate.setHours(0, 0, 0, 0)  - date.setHours(0, 0, 0, 0))/86400000 +1);
        setToTime('--:--');
        setFromTime('--:--');
    }
    
  };
  const handleCategoryChange = (event, newValue) => {
    setValue(newValue);
    if(newValue != null){
        if(newValue.title == 'Other'){
            setOtherCategory(true);
        }else{
            setOtherCategory(false);
        }
    }else{
        setOtherCategory(false);
    }
  }
  const handleTypeChange = (event, newValue) => {
    setEventTypeOptions(newValue);
    if(newValue != null){
        if(newValue == 'Online'){
            setTypeOnline(true);
        }else{
            setTypeOnline(false);
        }
    }else{
        setTypeOnline(false);
    }
  }
  const handleToDateChange = (date) => {
    if(date.setHours(0, 0, 0, 0) < selectedDate.setHours(0, 0, 0, 0)){
        toast.error('To-date cant be less than from-Date');
    }else{
        setToDate(date);
        setNoOfDays((date.setHours(0, 0, 0, 0)  - selectedDate.setHours(0, 0, 0, 0))/86400000 +1);
        setToTime('--:--');
        setFromTime('--:--');
    }    
  }
  const handleToTimeChange = (e) => {
    if(selectedDate.setHours(0, 0, 0, 0) == toDate.setHours(0, 0, 0, 0)){
        if(e.target.value.split(":")[0]<fromTime.split(":")[0]){
            toast.error('To-time cant be less than from-time on same day');
        }else if(e.target.value.split(":")[0] == fromTime.split(":")[0]){
            if(e.target.value.split(":")[1]<fromTime.split(":")[1]){
                toast.error('To-time cant be less than from-time on same day');
            }else{
                setToTime(e.target.value);
            }
        }else{
            setToTime(e.target.value);
        }
    }else{
        setToTime(e.target.value);
    }    
  }
  const handleFromTimeChange = (e) => {
    if(selectedDate.setHours(0, 0, 0, 0) == toDate.setHours(0, 0, 0, 0)){
        if(e.target.value.split(":")[0]>toTime.split(":")[0]){
            toast.error('From-time cant be more than To-time on same day');
        }else if(e.target.value.split(":")[0] == toTime.split(":")[0]){
            if(e.target.value.split(":")[1]>toTime.split(":")[1]){
                toast.error('From-time cant be more than To-time on same day');
            }else{
                setFromTime(e.target.value);
            }
        }else{
            setFromTime(e.target.value);
        }
    }else{
        setFromTime(e.target.value);
    }    
  }
//   'Corporate events', 'Social events', 'Virtual events', 'Fundraising events', 'Festivals', 'Community events', 'Pop-up events'
  const optionsEventCategories = type.map((option) => {
    const category = option.category;
    return {
      category: category,
      ...option,
    };
  });
 
  useEffect(() => {
    /**get token from params like /active/token
     * then decode the token to get name
     */
    const email = JSON.parse(localStorage.getItem('user'))['email'];
    let { first_name, middle_name, last_name } = JSON.parse(localStorage.getItem('user'));

    if (email) {
      setFormData({ ...formData, first_name, middle_name, last_name, email });
    }

    console.log(email,first_name, middle_name, last_name);
  }, [match.params]);
  const { first_name, middle_name, last_name, event_name } = formData;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(selectedDate, toDate, noOfDays, toTime, fromTime, value, inputValue, otherCategory, selectedFiles, formData);
  };
  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

        // console.log("filesArray: ", filesArray);

        setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        Array.from(e.target.files).map(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
        );
    }
    
  };

  const renderPhotos = (source) => {
    console.log('source: ', source);
    return source.map((photo) => {
        return <img src={photo} alt="" key={photo} style={{width:'334px',height:'190px',objectFit:'cover',padding:'0.75rem'}} />;
    });
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <ToastContainer/>
        <Nav/>
                <div className="container2">
                    <h1 style={{color:'#003542', fontFamily:"Comic Sans MS", fontSize:"30px"}}>Create Your Event</h1>
                    <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", borderBottom:'2px Solid', width:"140px"}}>Event Details</h1>
                    <form style={{width:"100%"}} onSubmit={handleSubmit}>     
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                        required label="Event Name"  
                                        value={event_name} 
                                        style={{ width:"100%"}}
                                        onChange={(event) => {
                                            const event_name=event.target.value;
                                            setFormData({ ...formData, event_name });
                                            console.log(formData)
                                        }}
                                    />
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={2}> 
                                <div style={{marginTop:'15px'}}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            style={{width:'100%'}}
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="From Date"
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField
                                        id="time"
                                        label="From Time"
                                        style={{width:'100%'}}
                                        type="time"
                                        required
                                        value={fromTime}
                                        onChange={handleFromTimeChange}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                    />
                                </div>
                             
                            </Grid>
                            <Grid item xs={12} md={2}> 
                                <div style={{marginTop:'15px'}}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            style={{width:'100%'}}
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="To Date"
                                            format="MM/dd/yyyy"
                                            value={toDate}
                                            onChange={handleToDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField
                                        id="time"
                                        label="To Time"
                                        required
                                        style={{width:'100%'}}
                                        type="time"
                                        value={toTime}
                                        onChange={handleToTimeChange}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        step: 300, // 5 min
                                        }}
                                    />
                                </div>
                             
                            </Grid>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                <Autocomplete
                                    style={{width:'100%'}}
                                    value={value}
                                    onChange={handleCategoryChange}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={optionsEventCategories.sort((a, b) => -b.category.localeCompare(a.category))}
                                    groupBy={(option) => option.category}
                                    getOptionLabel={(option) => option.title}
                                    style={{ width: '100%' }}
                                    renderInput={(params) => <TextField {...params} required label="Event Categories" variant="outlined" />}
                                />    
                                </div>             
                            </Grid>
                            {otherCategory?<Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Other Category Description" style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>:null}
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <Autocomplete
                                        
                                        value={eventTypeOptions}
                                        onChange={handleTypeChange}
                                        inputValue={eventType}
                                        onInputChange={(event, newInputValue) => {
                                        setEventType(newInputValue);
                                        }}
                                        options={optionForEventType}
                                        style={{ width: '100%' }}
                                        renderInput={(params) => <TextField {...params} required label="Event Type" variant="outlined" />}
                                    />
                                </div>
                            </Grid>
                            {typeOnline?<Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Link" style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>:<Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Proposed Venue" style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>}
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="No. of Days" value={noOfDays} disabled style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Number of expected guests"  style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            
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
                            </Grid>
                            
                        </Grid>
                        <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", marginTop:'50px', borderBottom:'2px Solid', width:"150px"}}>Event Purpose</h1>
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'30px'}}>
                                    <h4 style={{color:'gray'}}>Strategic Objectves / Expected Outcomes:</h4>
                                    <TextareaAutosize style={{ width:"98%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Strategic Objectves / Expected Outcomes:" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Details of the Event:</h4>
                                    <TextareaAutosize style={{ width:"98%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Details of the Event:" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Categories of Expected Guests:</h4>
                                    <TextareaAutosize style={{ width:"95%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Categories of Expected Guests:" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Name of Expected External VIPs, if any:</h4>
                                    <TextareaAutosize style={{ width:"95%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Name of Expected External VIPs, if any:" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-20px'}}>
                                    <TextField required label="Master of Ceremony (Host)"  style={{ width:"100%"}}/>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{marginTop:'-20px'}}>
                                    <h4 style={{color:'gray'}}>Executives Required for this Event:</h4>
                                    <TextareaAutosize style={{ width:"95%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Executives Required for this Event:" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{marginTop:'-20px'}}>
                                    <h4 style={{color:'gray'}}>Proposed role of Executives:</h4>
                                    <TextareaAutosize style={{ width:"95%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Proposed role of Executives:" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Date and Time Executive will be required:</h4>
                                    <TextareaAutosize style={{ width:"98%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Date and Time Executive will be required:" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Proposed speech points will be provided for the Executives:</h4>
                                    <TextareaAutosize style={{ width:"98%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Proposed speech points will be provided for the Executives:" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Other speakers</h4>
                                    <TextareaAutosize style={{ width:"98%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Other speakers" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Are media invited / expected</h4>
                                    <TextareaAutosize style={{ width:"98%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Are media invited / expected" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Is any AV required (Please Specify)</h4>
                                    <TextareaAutosize style={{ width:"98%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Is any AV required (Please Specify)" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Will there be catering (Please Specify)</h4>
                                    <TextareaAutosize style={{ width:"98%", fontSize:'17px', padding:'10px'}} rowsMin={3} placeholder="Will there be catering (Please Specify)" />
                                </div>
                            </Grid>
                        </Grid>
                        <h1 style={{color:'#BF9000', fontFamily:"Comic Sans MS", fontSize:"20px", marginTop:'60px', borderBottom:'2px Solid', width:"200px"}}>Event Coordination</h1>
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={8}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Name of Event Manager"  style={{ width:"100%"}}/>
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Department"  style={{ width:"100%"}}/>
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField label="Telephone Number"  style={{ width:"100%"}}/>
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Mobile Number"  style={{ width:"100%"}}/>
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="Email"  style={{ width:"100%"}}/>
                                </div> 
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" type="submit" style = {{marginTop:'40px', width:'25%'}}> Submit </Button>  
                    </form>
                </div>
      </div>
  );
};

export default CreateEvent;