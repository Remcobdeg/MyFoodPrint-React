import * as React from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Help from '../../Help/pages/help';
import { StyledHeader } from '../MuiStyledComponents/MuiStyledComponents';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function HelpPages(props) {
  const [open, setOpen] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {props.fromPage ?
        <Fab
          color="primary"
          aria-label="help"
          size="small" 
          onClick={handleClickOpen}
            sx={{
                position: 'fixed',
                top: 10, // 16px + 56px of BottomNavigation
                right: 10,
            }}
          > 

          <QuestionMarkIcon />
        </Fab>:
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClickOpen}
        >
          FAQs
        </Button>
      }

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={fullScreen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <StyledHeader variant="h4">FAQs</StyledHeader> 
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Help {...props}/>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}