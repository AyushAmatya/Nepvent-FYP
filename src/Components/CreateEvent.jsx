import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from "react-router-dom";
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

const optionForTicketType = ['Paid', 'Free'];

const CreateEvent = ({ match }) => {

  const [allFiles, setAllFiles] = useState([]);
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    event_name: ''
  });
  
  const [eventCoordination, setEventCoordination] = useState({
    event_manager_name : '',
    manager_department : '',
    event_id:'',
    manager_telephone_number : '',
    manager_mobile_number : '',
    manager_email : ''
  });
  const [eventPurpose, setEventPurpose] = useState({
     objectives:'',
     event_id:'',
     details:'',
     guest_category:'',
     vip_name:'',
     host:'',
     executives:'',
     executives_role:'',
     executives_date_time:'',
     speech_points:'',
     other_speakers:'',
     media:'',
     av:'',
     catering:''
  });
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const [noOfDays, setNoOfDays] = useState((toDate.setHours(0, 0, 0, 0)  - selectedDate.setHours(0, 0, 0, 0))/86400000 +1);
  const [toTime, setToTime] = useState('19:00');
  const [fromTime, setFromTime] = useState('07:00');
  const [eventTypeOptions, setEventTypeOptions] = useState(optionForEventType[1]);
  const [ticketTypeOptions, setTicketTypeOptions] = useState(optionForTicketType[0]);
  let from_date_temp = JSON.stringify(new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedDate.getHours(), selectedDate.getMinutes())));
  from_date_temp = from_date_temp.slice(1,11);
  let to_date_temp = JSON.stringify(new Date(Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), toDate.getHours(), toDate.getMinutes())));
  to_date_temp = to_date_temp.slice(1,11);
  const [eventDetailsData, setEventDetailsData] = useState({
    user_id:'',
    event_id:'',
    event_name:'',
    ticket_price:'',
    from_date:from_date_temp,
    from_time:toTime,
    to_date:to_date_temp,
    to_time:fromTime,
    event_category:'',
    event_category_title:'',
    other_category_description:'',
    event_type:eventTypeOptions,
    proposed_venue: '',
    ticket_type:'',
    ticket_limit:'',
    link:'',
    no_of_days:noOfDays,
    number_of_expected_guest: ''
  });
  const [noOfExpectedGuests, setNoOfExpectedGuests] = useState();
  const [ticketLimit, setTicketLimit] = useState();
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');
  const [otherCategory, setOtherCategory] = useState(false);
  const [typeOnline, setTypeOnline] = useState(false);
  const [ticketPaid, setTicketPaid] = useState(true);
  const [selectedFiles, setSelectedFiles ] = useState([]);
  
  const [eventType, setEventType] = React.useState('');
  const [ticketype, setticketType] = useState('');

  const handleDateChange = (date) => {
    if(date.setHours(0, 0, 0, 0) > toDate.setHours(0, 0, 0, 0)){
        toast.error('From-date cant be greater than To-date');
    }else{
        setSelectedDate(date);
        setNoOfDays((toDate.setHours(0, 0, 0, 0)  - date.setHours(0, 0, 0, 0))/86400000 +1);
        setToTime('--:--');
        setFromTime('--:--');
        const no_of_days = (toDate.setHours(0, 0, 0, 0)  - date.setHours(0, 0, 0, 0))/86400000 +1;
        let from_date = JSON.stringify(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())));
        from_date = from_date.slice(1,11);
        setEventDetailsData({ ...eventDetailsData, from_date, no_of_days});
    }
    
  };
  const handleCategoryChange = (event, newValue) => {
    if(newValue != null){
    setValue(newValue);
    const other_category_description = '';
    const event_category = newValue.category;
    const event_category_title = newValue.title;
    setEventDetailsData({ ...eventDetailsData, other_category_description, event_category, event_category_title});
        if(newValue.title == 'Other'){
            setOtherCategory(true);
        }else{
            setOtherCategory(false);
        }
    }else{
        setOtherCategory(false);
    }
  }
  const handleTicketTypeChange = (event, newValue) => {
    setTicketTypeOptions(newValue);
    const ticket_type = newValue;
    setEventDetailsData({ ...eventDetailsData, ticket_type});
    if(newValue != null){
        if(newValue == 'Paid'){
            setTicketPaid(true);
        }else{
            setTicketPaid(false);
        }
    }else{
        setTicketPaid(false);
    }
  }
  const handleTypeChange = (event, newValue) => {
    setEventTypeOptions(newValue);
    const event_type = newValue;
    setEventDetailsData({ ...eventDetailsData, event_type});
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
        const no_of_days = (date.setHours(0, 0, 0, 0)  - selectedDate.setHours(0, 0, 0, 0))/86400000 +1;
        let to_date = JSON.stringify(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())));
        to_date = to_date.slice(1,11);
        setEventDetailsData({ ...eventDetailsData, to_date, no_of_days});
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
                const to_time = e.target.value;
                setEventDetailsData({ ...eventDetailsData, to_time});
            }
        }else{
            setToTime(e.target.value);
            const to_time = e.target.value;
            setEventDetailsData({ ...eventDetailsData, to_time});
        }
    }else{
        setToTime(e.target.value);
        const to_time = e.target.value;
        setEventDetailsData({ ...eventDetailsData, to_time});
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
                const from_time = e.target.value;
                setEventDetailsData({ ...eventDetailsData, from_time});
            }
        }else{
            setFromTime(e.target.value);
            const from_time = e.target.value;
            setEventDetailsData({ ...eventDetailsData, from_time});
        }
    }else{
        setFromTime(e.target.value);
        const from_time = e.target.value;
        setEventDetailsData({ ...eventDetailsData, from_time});
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
    const user_id = JSON.parse(localStorage.getItem('user'))['_id'];

    const email = JSON.parse(localStorage.getItem('user'))['email'];
    let { first_name, middle_name, last_name } = JSON.parse(localStorage.getItem('user'));

    if (email) {
      setFormData({ ...formData, first_name, middle_name, last_name, email });
    }
    if(user_id){
        axios
        .get(`${process.env.REACT_APP_EVENT_API_URL}/getMaxId`)
        .then(res => {
            if(res.data.length != 0){
                console.log(res.data)
                const event_id = Number(res.data[0].event_id) + 1;
                console.log(event_id);
                setEventDetailsData({...eventDetailsData, event_id, user_id});
                setEventCoordination({...eventCoordination, event_id});
                setEventPurpose({...eventPurpose, event_id});
            }else{
                const event_id = 1;
                setEventDetailsData({...eventDetailsData, event_id, user_id});
                setEventCoordination({...eventCoordination, event_id});
                setEventPurpose({...eventPurpose, event_id});
            }
        })
        .catch(err => {
        console.log(err.response);
        });
    }
    
  }, [match.params]);
  const { first_name, middle_name, last_name } = formData;
  const {other_category_description, link, proposed_venue, ticket_price} = eventDetailsData;

  const handleSubmit = e => {
    e.preventDefault();
    for (var i=0; i < allFiles.length; i++) {
        console.log('pragya');
        const fd = new FormData();
        fd.append('image', allFiles[i], allFiles[i].name)
        axios.post(`${process.env.REACT_APP_EVENT_API_URL}/uploadImage`,fd)
        .then(res => {
            const file_name_temp = res.data.eventImage.file_name;
            axios.post(`${process.env.REACT_APP_EVENT_API_URL}/linkImageAndEvent`,{
                file_name: file_name_temp,
                event_id:eventDetailsData.event_id
            }).then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        })
        
    }
    // window.location.reload();
    // const fd = new FormData();
    // fd.append('image', selectedFiles,selectedFiles);
    
    console.log(eventDetailsData);
    console.log('lol');
    console.log(eventCoordination);
    console.log('hehe');
    console.log(eventPurpose);
    console.log('wtf');
    console.log(selectedDate, toDate, eventType, noOfDays, toTime, fromTime, value, inputValue, otherCategory, selectedFiles, formData);
    axios
          .post(`${process.env.REACT_APP_EVENT_API_URL}/add`, {
            eventDetailsData: eventDetailsData,
            eventPurpose: eventPurpose,
            eventCoordination: eventCoordination
          }        
          )
          .then(res => {
            toast.success(res.data.message);
            history.push('/myEvents');
          })
          .catch(err => {
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
    
  };
  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    let allFilesTemp = allFiles;

    
    for (var i=0; i < e.target.files.length; i++) {
        allFilesTemp.push(e.target.files[i]);
    }
    setAllFiles(allFilesTemp);
    if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

        console.log(allFiles);
        console.log("filesArray: ", filesArray);
        console.log(e.target.files);
        setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        Array.from(e.target.files).map(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
        );
    }
    
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
        return <img src={photo} alt="" key={photo} style={{width:'334px',height:'190px',objectFit:'cover',padding:'0.75rem'}} />;
    });
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        
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
                                        // value={event_name} 
                                        style={{ width:"100%"}}
                                        onChange={(event) => {
                                            const event_name=event.target.value;
                                            setEventDetailsData({ ...eventDetailsData, event_name });
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
                                    <TextField 
                                    required 
                                    label="Other Category Description"
                                    value={other_category_description} 
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        const other_category_description=event.target.value;
                                        setEventDetailsData({ ...eventDetailsData, other_category_description });
                                    }}
                                    />
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
                                    <TextField 
                                    required 
                                    value={link}
                                    label="Link" 
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        const link=event.target.value;
                                        const proposed_venue = '';
                                        setEventDetailsData({ ...eventDetailsData, link, proposed_venue });
                                    }}
                                    />
                                </div>                  
                            </Grid>:<Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    value={proposed_venue}
                                    label="Proposed Venue" 
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        const proposed_venue=event.target.value;
                                        const link = '';
                                        setEventDetailsData({ ...eventDetailsData, proposed_venue, link });
                                    }}
                                    />
                                </div>                  
                            </Grid>}
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField required label="No. of Days" value={noOfDays} disabled style={{ width:"100%"}}/>
                                </div>                  
                            </Grid>
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    value={noOfExpectedGuests}
                                    label="Number of expected guests"  
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        console.log(Number(event.target.value));
                                        if(isNaN(Number(event.target.value))){
                                            toast.error("Number of expected guests must be integer value"); 
                                            setNoOfExpectedGuests('');
                                        }else{
                                            const number_of_expected_guest=Number(event.target.value);
                                            setEventDetailsData({ ...eventDetailsData, number_of_expected_guest });
                                            setNoOfExpectedGuests(event.target.value);
                                        }
                                        
                                    }}
                                    />
                                </div>                  
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <Autocomplete
                                        value={ticketTypeOptions}
                                        onChange={handleTicketTypeChange}
                                        inputValue={ticketype}
                                        onInputChange={(event, newInputValue) => {
                                        setticketType(newInputValue);
                                        }}
                                        options={optionForTicketType}
                                        style={{ width: '100%' }}
                                        renderInput={(params) => <TextField {...params} required label="Ticket Type" variant="outlined" />}
                                    />
                                </div>
                            </Grid>
                            {ticketPaid?<Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="Ticket Price (RS)"
                                    value={ticket_price} 
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        if(isNaN(Number(event.target.value))){
                                            toast.error("Ticket Price must be integer value"); 
                                            const ticket_price='';
                                            setEventDetailsData({ ...eventDetailsData, ticket_price })
                                        }else{
                                            const ticket_price=event.target.value;
                                            setEventDetailsData({ ...eventDetailsData, ticket_price });
                                        }
                                    }}
                                    />
                                </div>                  
                            </Grid>:null}
                            <Grid item xs={12} md={4}> 
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    value={ticketLimit}
                                    label="Ticket Limit"  
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        if(isNaN(Number(event.target.value))){
                                            toast.error("Ticket Limit must be integer value"); 
                                            setTicketLimit('');
                                        }else{
                                            const ticket_limit=Number(event.target.value);
                                            setEventDetailsData({ ...eventDetailsData, ticket_limit });
                                            setTicketLimit(event.target.value);
                                        }
                                        
                                    }}
                                    />
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
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Strategic Objectves / Expected Outcomes:" 
                                    onChange={(event) => {
                                        const objectives=event.target.value;
                                        setEventPurpose({ ...eventPurpose, objectives });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Details of the Event:</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Details of the Event:" 
                                    onChange={(event) => {
                                        const details=event.target.value;
                                        setEventPurpose({ ...eventPurpose, details });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Categories of Expected Guests:</h4>
                                    <TextareaAutosize 
                                    style={{ width:"95%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Categories of Expected Guests:" 
                                    onChange={(event) => {
                                        const guest_category=event.target.value;
                                        setEventPurpose({ ...eventPurpose, guest_category });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Name of Expected External VIPs, if any:</h4>
                                    <TextareaAutosize 
                                    style={{ width:"95%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Name of Expected External VIPs, if any:" 
                                    onChange={(event) => {
                                        const vip_name=event.target.value;
                                        setEventPurpose({ ...eventPurpose, vip_name });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-20px'}}>
                                    <TextField 
                                    required 
                                    label="Master of Ceremony (Host)"  
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        const host=event.target.value;
                                        setEventPurpose({ ...eventPurpose, host });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{marginTop:'-20px'}}>
                                    <h4 style={{color:'gray'}}>Executives Required for this Event:</h4>
                                    <TextareaAutosize 
                                    style={{ width:"95%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Executives Required for this Event:" 
                                    onChange={(event) => {
                                        const executives=event.target.value;
                                        setEventPurpose({ ...eventPurpose, executives });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div style={{marginTop:'-20px'}}>
                                    <h4 style={{color:'gray'}}>Proposed role of Executives:</h4>
                                    <TextareaAutosize 
                                    style={{ width:"95%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Proposed role of Executives:" 
                                    onChange={(event) => {
                                        const executives_role=event.target.value;
                                        setEventPurpose({ ...eventPurpose, executives_role });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Date and Time Executive will be required:</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Date and Time Executive will be required:" 
                                    onChange={(event) => {
                                        const executives_date_time=event.target.value;
                                        setEventPurpose({ ...eventPurpose, executives_date_time });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Proposed speech points will be provided for the Executives:</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}}
                                    rowsMin={3} 
                                    placeholder="Proposed speech points will be provided for the Executives:" 
                                    onChange={(event) => {
                                        const speech_points=event.target.value;
                                        setEventPurpose({ ...eventPurpose, speech_points });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Other speakers</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Other speakers" 
                                    onChange={(event) => {
                                        const other_speakers=event.target.value;
                                        setEventPurpose({ ...eventPurpose, other_speakers });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Are media invited / expected</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Are media invited / expected" 
                                    onChange={(event) => {
                                        const media=event.target.value;
                                        setEventPurpose({ ...eventPurpose, media });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Is any AV required (Please Specify)</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Is any AV required (Please Specify)" 
                                    onChange={(event) => {
                                        const av=event.target.value;
                                        setEventPurpose({ ...eventPurpose, av });
                                    }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{marginTop:'-40px'}}>
                                    <h4 style={{color:'gray'}}>Will there be catering (Please Specify)</h4>
                                    <TextareaAutosize 
                                    style={{ width:"98%", fontSize:'17px', padding:'10px'}} 
                                    rowsMin={3} 
                                    placeholder="Will there be catering (Please Specify)" 
                                    onChange={(event) => {
                                        const catering=event.target.value;
                                        setEventPurpose({ ...eventPurpose, catering });
                                    }}
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
                                    onChange={(event) => {
                                        const event_manager_name=event.target.value;
                                        setEventCoordination({ ...eventCoordination, event_manager_name });
                                    }}
                                    />
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="Department"  
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        const manager_department=event.target.value;
                                        setEventCoordination({ ...eventCoordination, manager_department });
                                    }}
                                    />
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    label="Telephone Number"  
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        const manager_telephone_number=event.target.value;
                                        setEventCoordination({ ...eventCoordination, manager_telephone_number });
                                    }}
                                    />
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="Mobile Number"  
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        const manager_mobile_number=event.target.value;
                                        setEventCoordination({ ...eventCoordination, manager_mobile_number });
                                    }}
                                    />
                                </div> 
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{marginTop:'30px'}}>
                                    <TextField 
                                    required 
                                    label="Email"  
                                    style={{ width:"100%"}}
                                    onChange={(event) => {
                                        const manager_email=event.target.value;
                                        setEventCoordination({ ...eventCoordination, manager_email });
                                    }}
                                    />
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