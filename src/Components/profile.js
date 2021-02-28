import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function SimpleMenu() {
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