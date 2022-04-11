import React from 'react';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createRoot} from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CalendarView from './routes/CalendarView';
import { TestCalendarController } from './controllers/TestCalendarController';


let controller = new TestCalendarController()

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
        <Route path="/calendar" element={<CalendarView controller={controller}/>}/>
      </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );

}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
