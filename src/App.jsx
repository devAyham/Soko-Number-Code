// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import { Router } from "react-router";
import {BrowserRouter as Router} from 'react-router-dom';

import "./App.css";
// import Stracture from "./classes/structure";
import Main from "./components/main";



function App() {



  // let previosState = ()=>{
  //   if(state.length >=2){
  //     SetCurArray(state[state.length-2])
  //   }
  // }

 
  return(<>
      <Router>
      <div className="App">
        <Main/>
      </div>
    </Router>
    </>)
}

export default App;
