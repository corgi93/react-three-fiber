import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


// 아래와 같이 직접 태그를 넣어서 render해줄 수 있다
const root = ReactDOM.createRoot(
  document.getElementById('root')
)

function tick() {
   const el = (
   <div>
      <h1>hello!</h1>
      <h2>it is {new Date().toLocaleTimeString()}.</h2>
  </div>
  )

  root.render(el)
}

setInterval(tick, 1000)

// const e = <h1>hello! world</h1>
//  root.render(e)
