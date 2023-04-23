import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FolderIcon from '@mui/icons-material/Folder';


export default function UploadDialog({localImage, setLocalImage, setBackdropOpen, uploadImage}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setBackdropOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
        setBackdropOpen(false);

        if(e.target.innerText.toUpperCase() === "UPLOAD"){
            
            console.log("uploading")
            uploadImage(localImage);
        }

    };

    return (
        <div>
            <FolderIcon 
                sx={{ 
                    fontSize: "15vmin", 
                    position: 'fixed',
                    top: 10, // 16px + 56px of BottomNavigation
                    left: 10,
                }} 
                color="primary" 
                onClick={handleClickOpen} 
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select a picture to upload
                    </DialogContentText>
                    
                    <form>
                        <input 
                            accept="image/*" 
                            type="file" 
                            onChange={(e) => setLocalImage(e.target.files[0])}
                        />
                    </form>

                    {localImage &&                    
                        <img
                            src={URL.createObjectURL(localImage)}
                            alt="upload"
                            style={{
                                width: "40%",
                                height: "auto",
                            }}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!localImage} onClick={handleClose}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}