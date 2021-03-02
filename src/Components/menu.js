import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick} style={{marginTop:'-10px',marginLeft:'25px'}}>
        <MenuIcon style={{
                            fontSize:'45px',
                            color:'whitesmoke',
                            
        }}/>
      </Button>
      
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        style={{marginTop:'53px'}}
      >
        <MenuItem style={{borderBottom: '1px Solid', fontWeight:'bold', backgroundColor:'whitesmoke'}}>Menu:</MenuItem>
        <MenuItem onClick={handleMenuClose}>Calendar</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Tickets</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Events</MenuItem>
        <MenuItem onClick={handleMenuClose}>Create Events</MenuItem>
      </Menu>
    </div>
  );
}