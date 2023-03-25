import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DefaultDialog(props) {

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(prevState => !prevState)}>
            <DialogTitle>
                {props.title}
                <IconButton
                    aria-label="close"
                    onClick={() => props.setOpen(prevState => !prevState)}
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
                    {props.children}                                                                        
                </DialogContentText>
            </DialogContent>              
        </Dialog>
    )};
