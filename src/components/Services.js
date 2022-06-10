import React from 'react'
import Lang from './Lang'
import logo from '../images/logo_comp.svg';
import levier_icon from '../images/levier_icon_comp.svg';
import chart_icon from '../images/chart_icon_comp.svg';
import sum_icon from '../images/sum_icon_comp.svg';
import flexible_icon from '../images/flexible_icon_comp.svg';

import "./services.css"
import Footer from './Footer';
import { HashLink as Link } from 'react-router-hash-link';
import { LangContext } from "../index";

import moiCoursBig from "../images/moi_cours_big.png"
import dashboardBuilding from "../images/dashboard_building.png"
import dataLake from "../images/data_lake.jpg"
import IA from "../images/IA.jpg"
import Back from './Back';
import SeeOther from './SeeOther';
import MetaDescriptor from '../utils/MetaDescriptor';



var parse = require('html-react-parser');

function Services(props) {

    

    const {lang} = React.useContext(LangContext)
    const content = require('./servicesContent.json');
    const service_id = props.service
    const banderol = content[lang][service_id]["banderol"];
    const services = content[lang][service_id]["services"];
    let banderolStyle;


    switch (service_id) {
        case "data":
            banderolStyle = {
                "backgroundImage": `url(${dataLake})`
            }
            break

        case "ml":
            banderolStyle = {
                "backgroundImage": `url(${IA})`
            }
            break

        case "vizu":
        banderolStyle = {
            "backgroundImage": `url(${dashboardBuilding})`
        }
        break

        case "formation":
            banderolStyle = {
                "backgroundImage": `url(${moiCoursBig})`
            }
            break
    
        default:
            break;
        }

    const ImgChoice = (props) => {

        switch (props.img) {
            case "oil_barril":
                return <img className="illustration" src={require('../images/oil.jpg')} alt={props.alt}></img>
            
            case "lego":
                return <img className="illustration" src={require("../images/illustration_lego_graphique.png")} alt={props.alt}></img>

            case "ctrl-c-v":
                return <img className="illustration" src={require("../images/ctrl-c-v.png")} alt={props.alt}></img>

            case "dashboard":
                return <img className="illustration" src={require("../images/dashboard_img.png")} alt={props.alt}></img>

            case "etagere":
                return <img className="illustration" src={require("../images/etagere.png")} alt={props.alt}></img>
        
            case "data_cleaning":
                return <img className="illustration" src={require("../images/data_cleaning.jpeg")} alt={props.alt}></img>
        
            case "meca_brain":
                return <img className="illustration" src={require("../images/meca_brain.png")} alt={props.alt}></img>
            
            case "graph_pred":
                return <img className="illustration" src={require("../images/graph_pred.png")} alt={props.alt}></img>

            case "decision_making_process":
                return <img className="illustration" src={require("../images/decision_making_process.png")} alt={props.alt}></img>
                      
            case "tableau_periodique_lang":
                return <img className="illustration" src={require("../images/tableau_periodique_lang.png")} alt={props.alt}></img>
                      
            case "stats_infs":
                return <img className="illustration" src={require("../images/stats_infs.png")} alt={props.alt}></img>
                      
            case "cameleon":
                return <img className="illustration" src={require("../images/Caméléon.jpg")} alt={props.alt}></img>
            
            default:
                return <img className="illustration" src="" alt="null photo"></img>
        }
    }

    const Icon = (props) => {
        if (props.anchor.TYPE === "fontawesome"){
            return <i className={props.anchor.ICON}></i>;
        }else if (props.anchor.TYPE === "custom"){
            if (props.anchor.ICON === "levier"){
                const url = `url(${levier_icon})`
                return <div className="icon" style={{"backgroundImage": url}}></div>;
            }else if (props.anchor.ICON === "chart"){
                const url = `url(${chart_icon})`
                return <div className="icon" style={{"backgroundImage": url}}></div>;
            }else if (props.anchor.ICON === "sum"){
                const url = `url(${sum_icon})`
                return <div className="icon" style={{"backgroundImage": url}}></div>;
            }else if (props.anchor.ICON === "flexible"){
                const url = `url(${flexible_icon})`
                return <div className="icon" style={{"backgroundImage": url}}></div>;
            }      
            
        }
    }

    if (window.navigator.platform.match(/iP/g) !== null){
        banderolStyle["backgroundAttachment"] = "scroll"
    }

    return (
        <article>
            <MetaDescriptor title={banderol.title} description={banderol.description} />
            <Back href="/#posts"/>
            <section id="banderol" className="banderol" style={banderolStyle}> 
                
                <Lang/>

                <div className="bull-msg">
                    <div className="welcome_speech">
                        <div  className="banderol_main_msg">
                            <h1>{banderol["title"]}</h1>
                        </div>
                        <p>
                        <span className="description">{banderol["description"]}</span>
                        </p>
                    </div>
                    <div className="btn-banderol">
                        {(banderol["anchors"]).map((anchor, i) => {
                            return <button className="btn-banderol-btn" key={i} onClick={() => document.location.href=anchor["URL"]}><Icon anchor={anchor} />{parse(anchor["label"])}</button>
                        })}
                    </div>
                    <div className="logo">
                        <Link to="/#posts"><img src={logo} alt="logo"/></Link>
                    </div>
                </div>

            </section>

            {services.map((service, i) => {

                return (
                    <section id={service.ID} key={i} className={i%2 === 0 ? "card-service left" : "card-service right"}>
                        <h2 className="title-card-serv">{parse(service["title"])}</h2>
                        <div className="problem-serv">
                            <p className="citation">{parse(service["citation"])}<span className="source-cit"> - {service.hasOwnProperty('SOURCE') ? service['SOURCE'] : service['source']} </span></p>
                            <div>
                                <h3 className="sub-title-serv">{service["h3"][0]}</h3>
                                <p className="description">{parse(service["problematique"])}</p>
                            </div>
                        </div>
                        <div className="propo-serv">
                            <ImgChoice img={service["img"]["NAME"]} alt={service["img"]["alt"]}/>
                            <div className="propo-list">
                                <h3 className="sub-title-serv">{service["h3"][1]}</h3>
                                <ul>
                                    {
                                        (service["propositions"]).map((proposition, j) => {
                                            return <li key={j}>{parse(proposition)}</li>;
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        
                    </section>
                )
            })}

            <SeeOther postType="services" id={service_id}/>

            <Footer bg_col="rgba(0, 160, 255, .6)"/>

        </article>
    )
}

export default Services