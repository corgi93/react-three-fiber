import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// function Clock(props) {
//   const [date, setDate] = useState(new Date().toLocaleTimeString());
//   setInterval(() => {
//     setDate(new Date().toLocaleTimeString());
//   }, 1000);

//   return (
//     <div>
//       <h1>hello world</h1>
//       <h2 onClick={() => {props.onClockClick(date)}}>It is {date}</h2>
//     </div>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Clock onClockClick = {(time) => {
//   alert(time)
// }} />);
