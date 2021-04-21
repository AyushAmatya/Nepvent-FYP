import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { isAuth, signout } from '../helpers/auth';
import { toast } from 'react-toastify';

function NotLoggedIn(){
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <div>
      <Button aria-controls="profile-menu" aria-haspopup="true" onClick={handleProfileClick} style={{marginTop:'-10px',marginLeft:'25px'}}>
        <AccountCircleIcon style={{
                            fontSize:'45px',
                            color:'whitesmoke',
                            
        }}/>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        style={{marginTop:'53px'}}
      >
        
        <MenuItem style={{borderBottom: '1px Solid', fontWeight:'bold', backgroundColor:'whitesmoke'}}>Profile:</MenuItem>
        <MenuItem onClick={handleProfileClose}><Link className="linkRemoveStyle" to='/register'>Register</Link></MenuItem>
        <MenuItem onClick={handleProfileClose}><Link className="linkRemoveStyle" to='/login'>Login</Link></MenuItem>
      </Menu>
    </div>
  );
}

function LoggedIn(props){
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    signout( () => {
      toast.success(`Successfully Logged Out`);
    });
  };
  var viewProfile = '/' + props.userName + '/viewProfile'
  return (
    <div>
      <Button aria-controls="profile-menu" aria-haspopup="true" onClick={handleProfileClick} style={{marginTop:'-10px',marginLeft:'25px'}}>
        <AccountCircleIcon style={{
                            fontSize:'45px',
                            color:'whitesmoke',
                            
        }}/>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        style={{marginTop:'53px'}}
      >
        
        <MenuItem style={{borderBottom: '1px Solid', fontWeight:'bold', backgroundColor:'whitesmoke'}}>Profile:</MenuItem>
        <MenuItem onClick={handleProfileClose}><Link className="linkRemoveStyle" to='/viewProfile'>View Profile</Link></MenuItem>
        <MenuItem onClick={handleLogout}><Link className="linkRemoveStyle" to='/'>Logout</Link></MenuItem>
        
      </Menu>
    </div>
  );
}
export default function SimpleMenu(props) {
  if(isAuth()){
    return <LoggedIn/>;
    
  }else{
    return <NotLoggedIn/>;
  }
  
}