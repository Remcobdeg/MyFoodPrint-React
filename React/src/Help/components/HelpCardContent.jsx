import {useState} from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import "./HelpCardContent.css";
import { trackEvent } from "../../shared/modules/googleAnalyticsModules";

export default function HelpCardContent(props) {

  const [expanded, setExpanded] = useState(false);
  const [detialExpanded, setDetailExpanded] = useState(false);

  let helpContentText = props.text;
  if(!(helpContentText instanceof Array)){helpContentText = new Array(props.text)};

  return (
    <Paper
      elevation={0}
      className={expanded?"help-card-content-expanded":"help-card-content"}
      // variant="outlined"
    >
        <Grid 
          container 
          direction="row" 
          className="help-content-topic" 
          justifyContent="center" 
          alignItems="center" 
          onClick={(event) => {
            event.stopPropagation();
            setExpanded(!expanded);
            trackEvent("Help: "+ props.topic,"clicked topic", !expanded?"expanded":"collapsed")
          }}
        >
          <Grid item xs={10}>
            <Typography variant="subtitle2"  display="block" gutterBottom>
              {props.topic}
            </Typography>
          </Grid>
          <Grid item xs={2} textAlign= "center">
              {expanded ? <ExpandMoreIcon sx={{transform: "rotate(0deg)"}}/> : <ExpandMoreIcon sx={{transform: "rotate(-90deg)"}}/>}
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={10}>
            {expanded && helpContentText.map((text, index) => {
              return <div>
                <Typography key={index} variant="body1"  className="help-content-text" display="block" gutterBottom>{text}</Typography>
                {/* <p>
                  {index}
                </p> */}


              </div>
            })}  

            {/* if there is no detail text, but there are links, show these immediately */}
            {expanded && !props.textDetail && props.links && props.links.map((link, index) => {
              return (
                <Link 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener" 
                  underline="hover" 
                  color="primary.main"
                  onClick={(event) => {
                    event.stopPropagation();
                    trackEvent("Help: " + props.topic,"clicked link","link " + link.text)}
                  }
                  >
                  <Typography variant="body1"  className="help-content-text" display="block" gutterBottom>{link.text}</Typography>
                </Link>
              )
            })}

            {/* show a message if there is detail text */}
            {expanded && 
              props.textDetail && 
                <Typography 
                onClick={(event)=>{
                  event.stopPropagation();
                  setDetailExpanded(!detialExpanded); 
                  trackEvent("Help: " + props.topic,"clicked detail","detail " + !detialExpanded?"expanded":"collapsed")
                  }} 
                variant="subtitle2"  
                display="block" 
                color="primary.main" 
                gutterBottom
                >
                  {detialExpanded?<u>Hide detail</u>:<u>Tell me more...</u>}
                </Typography>
            }

            {/* show the detail text */}
            {expanded && detialExpanded && props.textDetail && props.textDetail.map((text, index) => {
              return <div key={index} >
                <Typography variant="body1"  className="help-content-text" display="block" gutterBottom>{text}</Typography>

              </div>}
            )}

            {/* show the links */}
            {expanded && detialExpanded && props.links && 
                <Typography variant="body1"  className="help-content-text" display="block" gutterBottom>Sources:</Typography>
            }
            {expanded && detialExpanded && props.links && props.links.map((link, index) => {
              return (
                <Link 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener" 
                  underline="hover" 
                  color="primary.main"
                  onClick={(event) => {
                    event.stopPropagation();
                    trackEvent("Help: " + props.topic,"clicked link","link " + link.text)
                  }}
                  >
                  <Typography variant="body1"  className="help-content-text" display="block" gutterBottom>{link.text}</Typography>
                </Link>
              )
            })}

            
          </Grid>
          <Grid item xs={2} textAlign= "center">
          </Grid>
        </Grid>

        

    </Paper>
  );
}