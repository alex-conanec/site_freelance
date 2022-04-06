import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import CV from './components/CV';
import MyStory from './components/blog/MyStory';
import Services from './components/Services';


export const LangContext = React.createContext();

function Router(){

  const [lang, setLang] = useState('fr')
  
  return(

      <LangContext.Provider value={{lang, setLang}}>
        <BrowserRouter>
          <Routes> 
            <Route exact path = '/' element = {<Home/>} />
            <Route exact path = '/CV' element = {<CV/>} />
            <Route exact path = '/service-data' element = {<Services service="data"/>} />
            <Route exact path = '/service-IA' element = {<Services service="ml"/>} />
            <Route exact path = '/service-training' element = {<Services service="formation"/>} />
            <Route exact path = '/service-visualisation' element = {<Services service="vizu"/>} />
            <Route exact path = '/mon-histoire' element = {<MyStory/>} />
          </Routes>
        </BrowserRouter>
      </LangContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
