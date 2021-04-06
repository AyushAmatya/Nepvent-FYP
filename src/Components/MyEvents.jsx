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
const MyEvents = ({ match }) => {
  
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
    manager_telephone_number : '',
    manager_mobile_number : '',
    manager_email : ''
  });
  const [eventPurpose, setEventPurpose] = useState({
     objectives:'',
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
  let from_date_temp = JSON.stringify(new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedDate.getHours(), selectedDate.getMinutes())));
  from_date_temp = from_date_temp.slice(1,11);
  let to_date_temp = JSON.stringify(new Date(Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), toDate.getHours(), toDate.getMinutes())));
  to_date_temp = to_date_temp.slice(1,11);
  const [eventDetailsData, setEventDetailsData] = useState({
    user_id:'',
    event_id:'',
    event_name:'',
    from_date:from_date_temp,
    from_time:toTime,
    to_date:to_date_temp,
    to_time:fromTime,
    event_category:'',
    event_category_title:'',
    other_category_description:'',
    event_type:eventTypeOptions,
    proposed_venue: '',
    link:'',
    no_of_days:noOfDays,
    number_of_expected_guest: ''
  });
  const [noOfExpectedGuests, setNoOfExpectedGuests] = useState();
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');
  const [otherCategory, setOtherCategory] = useState(false);
  const [typeOnline, setTypeOnline] = useState(false);
  const [selectedFiles, setSelectedFiles ] = useState([]);
  
  const [eventType, setEventType] = React.useState('');
  
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
    setValue(newValue);
    if(newValue != null){
        if(newValue.title == 'Other'){
            setOtherCategory(true);
        }else{
            setOtherCategory(false);
            const other_category_description = '';
            console.log(newValue.category);
            const event_category = newValue.category;
            const event_category_title = newValue.title;
            setEventDetailsData({ ...eventDetailsData, other_category_description, event_category, event_category_title});
        }
    }else{
        setOtherCategory(false);
        const other_category_description = '';
        const event_category = newValue.category;
        const event_category_title = newValue.title;
        setEventDetailsData({ ...eventDetailsData, other_category_description, event_category, event_category_title});
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
            }else{
                const event_id = 1;
                setEventDetailsData({...eventDetailsData, event_id, user_id});
            }
        })
        .catch(err => {
        console.log(err.response);
        });
    }
    
  }, [match.params]);
  const { first_name, middle_name, last_name } = formData;
  const {other_category_description, link, proposed_venue} = eventDetailsData;

  const handleSubmit = e => {
    e.preventDefault();
    // window.location.reload();
    console.log(eventDetailsData);
    console.log('lol');
    console.log(eventCoordination);
    console.log('hehe');
    console.log(eventPurpose);
    console.log('wtf');
    console.log(selectedDate, toDate, eventType, noOfDays, toTime, fromTime, value, inputValue, otherCategory, selectedFiles, formData);
    axios
          .post(`${process.env.REACT_APP_EVENT_API_URL}/add`, 
            eventDetailsData
          )
          .then(res => {
            toast.success(res.data.message);
          })
          .catch(err => {
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
    window.location('/myEvents')
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
    return source.map((photo) => {
        return <img src={photo} alt="" key={photo} style={{width:'334px',height:'190px',objectFit:'cover',padding:'0.75rem'}} />;
    });
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        
        <Nav/>
        <div className="container2">
        <h1>MY EVENTS</h1>
        </div>
                
      </div>
  );
};

export default MyEvents;