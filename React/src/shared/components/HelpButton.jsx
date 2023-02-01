import React from "react";
import Fab from '@mui/material/Fab';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useNavigate } from 'react-router-dom';

export default function HelpButton(props) {
  const navigate = useNavigate();

  return (
    <Fab
      color="primary"
      aria-label="help"
      onClick={() => {
        navigate("/Help");
      }}
        sx={{
            position: 'fixed',
            bottom: 72, // 16px + 56px of BottomNavigation
            right: 16,
        }}
    >
      <QuestionMarkIcon />
    </Fab>
  );
}
