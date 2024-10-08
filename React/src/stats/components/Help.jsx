import React, {useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';

import './Help.css'



export default function Help(props){

    const [open, setOpen] = useState(false);

    return(
        <React.Fragment>
            <Stack alignItems="center">
                <IconButton onClick={() => setOpen(prevState => !open)}><HelpIcon/></IconButton>
                {console.log(open)}
            </Stack>
            <Dialog open={open} onClose={() => setOpen(prevState => !open)}>
                <DialogTitle>
                    What is gCO<sub>2</sub>?
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(prevState => !prevState)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span className='help'>g = grams</span>
                        <span className='help'>gCO<sub>2</sub> = carbon dioxide</span>
                        <span className='help'>e = equivalents</span>
                        
                        Besides CO2, there are other greenhouse gasses that contribute to global warming and have to be accounted for. To harmonise their effect into a single measure, gCO2 equivalents is used.
                    </DialogContentText>
                </DialogContent>

                

            </Dialog>
        </React.Fragment>
    )
}