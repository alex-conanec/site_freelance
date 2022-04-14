import React from 'react'
import logo from '../images/logo_comp.svg';
import "./footer.css"
import { LangContext } from "../index";
import { Link } from 'react-router-dom'

function Footer(props) {
  
    const {lang} = React.useContext(LangContext)
    const content = require('./homeContent.json');

    let style_button = null;
    if (props.bg_col === "white"){
        style_button={"backgroundColor": "rgba(0, 160, 255, .6)", "color": "white"}
    }else{
        style_button={"backgroundColor": "white", "color": "black"}
    }  

    return (
        <footer style={{"backgroundColor": props.bg_col}}>  
            <Link to="/"><img src={logo} alt="logo"/></Link>
            <p>{content[lang].footer.network_msg}</p>
            <div>
                <a href="https://www.youtube.com/channel/UCOVlxFlvew_CGy-8-iylkGw" className="btn" style={style_button} target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="https://github.com/alex-conanec/" className="btn" style={style_button} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/alexandre-conanec/" className="btn" style={style_button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </footer>
    )
}

export default Footer