import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import LoginTab from "../Login-PopUp/mdb-login"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import log from '../logger.service'

const useStyles = makeStyles((theme) => ({
    dialog:{
      
    }
}))
export default function FormDialog() {
  const classes = useStyles();  
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    log('user clicked on login')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen} style={{marginLeft:'9px'}}>
        Login
      </Button>
      <Dialog
      className={classes.dialog} 
      open={open} 
      fullScreen={fullScreen}
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      >
      
           
       {fullScreen === true ?  <IconButton> <CloseIcon onClick={handleClose} /> </IconButton> : "" } 
       <LoginTab close={handleClose}/>
      
      </Dialog>
    </div>
  );
}
