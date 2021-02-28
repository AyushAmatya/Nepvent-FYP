import React from 'react';
import './navStyle.css';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types";
import MenuIcon from '@material-ui/icons/Menu';
import MyMenu from './menu.js'
import MyProfile from './profile.js'
import { withStyles } from "@material-ui/core/styles";
import FilterListIcon from '@material-ui/icons/FilterList';

import LogoBlack from '../img/logoBlack.jpg';
import LogoWhite from '../img/logoWhite.jpg';
import {AppBar, Toolbar, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Menu} from '@material-ui/core';

const CssTextField = withStyles({
    root: {

      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: '#aee5e8',
      },
      '& .MuiInput-underline':{
        '&:hover:not($disabled):before': {
          borderBottomColor: 'white',
        }
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#aee5e8',
      },
      '& underline.Mui-focused': {
        borderBottomColor: '#aee5e8',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);

  const styles = {
    root: {
      background: "#003542"
    },
    input: {
      color: "white",
    }
  };
class nav extends React.Component{
  

  
    constructor(props){
        super(props);
        
    }
    
    componentDidMount() {
      document.querySelector(".navbar").className = "navbar";
      window.addEventListener("scroll", this.handleScroll);
    }
  
    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }
  
    handleScroll = () => {
      if (window.scrollY > 40) {
        document.querySelector(".navbar").className = "navbar activeNav";
        document.querySelector(".mainHeader").className = "mainHeader invisible";
        document.querySelector(".companySubTitle").className = "companySubTitle";
        document.querySelector(".topBlankSpace").className = "topBlankSpace";
        document.querySelector(".bottomBlankSpace").className = "bottomBlankSpace";
        document.querySelector(".navbarItems").className = "navbarItems marginCorrection";
      } else {
        document.querySelector(".navbar").className = "navbar";
        document.querySelector(".mainHeader").className = "mainHeader";
        document.querySelector(".companySubTitle").className = "companySubTitle invisible";
        document.querySelector(".topBlankSpace").className = "topBlankSpace invisible";
        document.querySelector(".bottomBlankSpace").className = "bottomBlankSpace invisible";
        document.querySelector(".navbarItems").className = "navbarItems";
      }
    };
    render(){
        const { classes } =this. props;
        
        return(
            <div>
            <div className="mainHeader">
                <img src={LogoBlack} alt="logo" className="logo1"/>
                <div className='title'>
                    <h1 style={{fontFamily:"Comic Sans MS", color:"black"}}>Nepvent</h1>
                    <h4 style={{fontFamily:"MV Boli", fontWeight:"normal", marginTop:"-20px", color:"black"}}>Event Publishing and Ticket Booking</h4>
                </div>
            </div>
            <div class ="topBlankSpace invisible"></div>
            <AppBar className="navbar" >
                <Toolbar>
                    <Typography variant="h6" >
                    <div className="companySubTitle invisible">
                      
                      <h4 style={{fontFamily:"Comic Sans MS", color:"whitesmoke", marginLeft:"82%", marginTop:"5%"}}><u>Nepvent</u></h4>
                      <img src={LogoWhite} alt="logo" className="smallLogo"/>
                    </div>
                    
                    </Typography>
                    <div className="navbarItems">
                      <div className='searchBox'>
                        <SearchIcon 
                          style={{
                            fontSize:"40px",
                            color:'whitesmoke'
                          }}
                        />
                        <CssTextField 
                          className={classes.margin} 
                          id="custom-css-standard-input" 
                          placeholder="Search Events ..." 
                          size="small"
                          InputProps={{className: classes.input}}
                          style={{ width:'400px', marginLeft:'5px', marginTop:'7px'}}
                        />                      
                      </div>
                      <FormControl variant="outlined" className={classes.formControl} size='small' style={{width:'200px', marginTop:'-3px',marginLeft:'25px'}}>
                        
                        <InputLabel id="demo-simple-select-outlined-label" style={{color:'#5c7e86', backgroundColor:'#003542', marginTop:'7px'}}>
                        <FilterListIcon style={{display:'inline-block', verticalAlign:'middle', marginTop:'-5px'}}/>  FilterBy ...
                        </InputLabel>
                        <Select id="custom-css-outlined-input" label="Age" style={{color:'white', marginTop:'4px'}}>
                        <MenuItem style={{borderBottom: '1px Solid', fontWeight:'bold', backgroundColor:'whitesmoke'}}>Filter By:</MenuItem>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value='free'>Free</MenuItem>
                          <MenuItem value='paid'>Paid</MenuItem>
                        </Select>
                      </FormControl>
                      <MyProfile/>
                      <MyMenu/>
                    </div>        
                </Toolbar>
            </AppBar>
            <div class ="bottomBlankSpace invisible"></div>
        </div>
        )
    }
}
nav.propTypes = {
    classes: PropTypes.object.isRequired
  };
export default withStyles(styles)(nav);