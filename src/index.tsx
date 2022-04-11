import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createRoot} from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CalendarView, { CalendarData } from './routes/CalendarView';


let testData : CalendarData = {

  monthsInYear :  12,
  daysInYear : 365,
  daysInMonth : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  daysInWeek : 7,
  leapYear : {
    month : 2,
    recurrence : 4
  },
  state : {  
    name : "Earth",
    day : 12,
    month: 2,
    year : 1422,
    date : `February 12, 1422`
  }
}


const container = document.getElementById("root")
let root
if (container)
{
  root = createRoot(container)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/calendar" element={<CalendarView data={testData}/>}/>
      </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );

}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
