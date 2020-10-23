import React from "react";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import IndexHeader from "../components/Headers/IndexHeader.js";
import DarkFooter from "../components/Footer/DarkFooter.js";


import CompleteExamples from "./index-sections/CompleteExamples.js";
import SignUp from "./index-sections/SignUp.js";
import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";

function Index() {
 
  return (
    <>
    <div style={{margin:'-7px'}}>
       <IndexNavbar />
      <div className="wrappers">
        <IndexHeader />
        <div className="main">
          <CompleteExamples />
          <SignUp />
          
          <Download />
        </div>
        <DarkFooter />
      </div>
      </div>
    </>
  );
}

export default Index;
