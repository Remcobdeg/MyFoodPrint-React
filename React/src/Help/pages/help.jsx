import React, {useRef, useEffect} from "react";
import { HelpCard } from "../components/HelpCard";
import HelpPageContent from "../components/HelpContent";


import "./Help.css";

// page has title, components that contain the help for each page
// each component has an icon, title, and text
// components have subcomponents that are the help for each section of the page -- these can be expanded/collapsed




// NOTE: below some code is commented out. This is an unfinished attempt to make specific help cards expandable/collapsible based on the page that the help is opened from; and to scroll this section into view. The code is not working yet, but I am leaving it in for now in case I may want to come back to it later.

export default function Help(props) {
    const elementsRef = useRef(Object.keys(HelpPageContent).map(() => React.createRef()));

    // const [expanded, setExpanded] = React.useState(['false','false','false','false']) //Object.keys(HelpPageContent).map(() => false));

    // const handleChange = (index) => (
    //     setExpanded(expanded.map((item, i) => i === index ? !item : item))
    // )

    // console.log("expanded ", expanded)

    // {!!props.fromPage && elementsRef.current[props.fromPage].current.scrollIntoView()}

  return (
    <div>
        {Object.keys(HelpPageContent).map((page, index) => {
            return <HelpCard 
                ref = {elementsRef.current[index]}
                key = {index}
                index = {index}
                page={page} 
                icon={HelpPageContent[page].icon} 
                title={HelpPageContent[page].title} 
                content={HelpPageContent[page].content}
                // expanded={expanded[index]}
                // handleChange={handleChange}
                />
        })}
        {/* <button style={{position: 'fixed', bottom: "10vh", left: "10vh"}} onClick={() => elementsRef.current[1].current.scrollIntoView()}>
            Scroll
      </button>
      {console.log(elementsRef.current[1].current)} */}
      <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>


    </div>
  );
}