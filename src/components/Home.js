import React, { useEffect } from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import "./banderol.css"
import logo from '../images/logo_comp.svg';
import Posts from './Posts';
import "./img_band.css"
import "./video.css"
import "./carousel.css"
import Contact from './Contact';
import Footer from './Footer';
import Lang from './Lang';
import { LangContext } from "../index";


function Main() {

    useEffect( () => {
        window.scrollTo(0, 0);
        document.title = "Alexandre Conanec : data scientist freelance"
    })


    const {lang} = React.useContext(LangContext)
    const content = require('./homeContent.json');
    const banderol = content[lang].banderol;
    const recommandations = content[lang].trust.recommandations;
    

    
    return (
        <article>
            <section id="index_band" className="banderol-home" style={window.navigator.platform.match(/iP/g) !== null ? {"backgroundAttachment": "scroll"} : null}>

                <Lang/>
                
                <div  className="title-home">
                    <h1>{banderol.h1}</h1>
                    <h2>{banderol.h2}</h2>
                    <div className="diplome">
                        <span className="diplome"><i className="fa-solid fa-graduation-cap"></i>{banderol.diplome1}</span><br/>
                        <span className="diplome"><i className="fa-solid fa-graduation-cap"></i>{banderol.diplome2}</span><br/>        
                    </div>
                    
                </div>
                <div className="logo-home">
                    <Link to="/"><img src={logo} alt="logo"/></Link>
                </div>

                <div className="btn-banderol-home">
                        <a href={"mailto:alexandre@conanec.com"} className="btn-banderol-btn"><i className="fa-solid fa-envelope"></i>{banderol.button_mail}</a>
                        <Link to='/mon-histoire#banderol' className="btn btn-banderol-btn"><i className="fa-solid fa-book"></i>{banderol.button_story}</Link>
                        <Link to='/CV#entete_cv' className="btn btn-banderol-btn"><i className="fa-solid fa-id-card-clip"></i>{banderol.button_CV}</Link>
                        <button onClick={() => document.location.href="#posts"} className="btn-banderol-btn"><i className="fa-solid fa-screwdriver-wrench"></i>{banderol.button_services}</button>      
                    </div>
            </section>

            <Posts/>

            <section id="img_desktop"></section>

            <section id="presentation_video">
                <div className="yt-vid">
                    <iframe title="Alexandre Conanec data scientist freelance" src="https://www.youtube.com/embed/2Fqr4Eqkd20" frameBorder="0" allowFullScreen></iframe>
                </div>
            </section>

            <section id="img_paysage"></section>

            <section id="trust2">
                <h2>{content[lang].trust.title}</h2>
                
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-interval="10000">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <i className="fas fa-quote-left fa-2x guillemet open"></i>

                        {recommandations.map((recommandation, index) => {
                            return(
                                <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                    <p className = "recomandation">{recommandation.message}</p>
                                    <p className = "recomandation_author">{recommandation.AUTHOR} <br/> {recommandation.poste} <a href={recommandation.company.LINK} target="_blank" rel="noopener noreferrer">{recommandation.company.NAME}</a></p>
                                </div>
                            )
                        })}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>

            <Contact/>

            <Footer bg_col="rgba(0, 160, 255, .6)"/>
            
        </article>
    )
}

export default Main