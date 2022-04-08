import React, { Fragment, useEffect } from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import "./article.css"
import Lang from '../Lang'
import logo from '../../images/logo_comp.svg';
import Footer from '../Footer';
import { LangContext } from "../../index";
import ImgBanderol from "../../images/famille_not_retouch.jpg"
import Back from '../Back';
import SeeOther from '../SeeOther';

var parse = require('html-react-parser');
function MyStory() {


    const {lang} = React.useContext(LangContext)
    const content = require('./myStoryContent.json');
    const banderol = content[lang].banderol;
    const p_content = content[lang].p;
    const illustrations = content[lang].illustrations;
    const citations = content[lang].citations;
    const ds_disciplines = content[lang].ds_disciplines;
    const banderolStyle = {"backgroundImage": `url(${ImgBanderol})`}


    useEffect(() => {
        document.title = banderol.title
    }, [])


    const ImgChoice = (props) => {

        switch (props.img) {
            case "me_6900":
                return <img src={require("../../images/moi_ac_6900.jpg")} alt={props.alt}></img>
            
            case "flappy_bird":
                return <img src={require("../../images/flappy.gif")} alt={props.alt}></img>

            case "rdd_hugo":
                return <img src={require("../../images/rdd_hugo.png")} alt={props.alt}></img>

            
            default:
                return <img src="" alt="null photo"></img>
        }
    }


    return (
        <Fragment>
            <Back href="/#posts"/>
            <section id="banderol" className="banderol" style={banderolStyle}>
                
                <Lang/>

                <div className="bull-msg">
                    <div className="welcome_speech">
                        <div  className="banderol_main_msg">
                            <h1>{banderol.title}</h1>
                        </div>
                        <p>
                        <span className="description">{banderol.description}</span>
                        </p>
                    </div>
                    <div className="logo">
                        <Link to="/#posts"><img src={logo} alt="logo"/></Link>
                    </div>
                </div>
                <p className="legend">{banderol.legend}</p>

            </section>
            <article className="article">
                {/* <aside className="article">
                    <nav id="toc">
                        <div className="logo">
                            <Link to="/" ><img src={logo} alt="logo"/></Link>
                        </div>
                    </nav>
                </aside> */}
                
                

                <section className="article-content">
                    <p>{parse(p_content[0])}</p>
                    
                    
                    <h2 className="citation">“{parse(citations[0])}”</h2>
                    
                    <p>{parse(p_content[1])}</p>
                    
                    <div className="blog-pic">
                        <ImgChoice img={illustrations[0].NAME} alt={illustrations[0].alt} />
                        <p>{illustrations[0].legend}</p>
                    </div>                    
                    
                    {/* <h2 className="citation">“{parse(citations[1])}”</h2> */}

                    <p>{parse(p_content[2])}</p>

                    
                    <div className="blog-pic">
                        <ImgChoice img={illustrations[1].NAME} alt={illustrations[1].alt} />
                        <p>{illustrations[1].legend}</p>
                    </div>

                    
                    {/* <h2 className="citation">“{parse(citations[2])}”</h2> */}

                    <p>{parse(p_content[3])}</p>
                    
                    
                    <h2 className="citation">“{parse(citations[3])}”</h2>

                    <p>{parse(p_content[4])}</p>
                    
                    
                    <h2 className="citation">“{parse(citations[4])}”</h2>

                    <p>{parse(p_content[5])}</p>

                    <div className="blog-pic">
                        <ImgChoice img={illustrations[2].NAME} alt={illustrations[2].alt} />
                        <p>{illustrations[2].legend}</p>
                    </div>

                    <p>{parse(p_content[6])}</p>
                    <ul>
                        <li>{parse(ds_disciplines[0])}</li>
                        <li>{parse(ds_disciplines[1])}</li>
                        <li>{parse(ds_disciplines[2])}</li>
                    </ul>
                    

                    <h2 className="citation">“{parse(citations[5])}”</h2>

                    <p>{parse(p_content[7])}</p>

                </section>
            </article>
            <SeeOther postType="blog" id="myStory"/>

            <Footer bg_col="rgba(0, 160, 255, .6)"/>
        </Fragment>
    )
}

export default MyStory