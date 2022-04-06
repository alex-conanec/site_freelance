import React, { useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import { LangContext } from "../index";
import "./seeOther.css"

function SeeOther(props) {
    
    const {lang} = React.useContext(LangContext)
    const content = require('./postsContent.json');
    const posts = content[lang][props.postType]; 
    const others = posts.list.map((post, index) => {
        if (props.id !== post.id){
            return(post)
        }else{
            return null;
        }
    }).filter(n => n) 

    const [justifyContent, setjustifyContent] = useState("center")
    
    const ImgChoice = (props) => {

        switch (props.img) {
            case "service_data":
                return <img src={require("../images/data_service_white.png")} alt={props.alt}></img>
            
            case "service_IA":
                return <img src={require("../images/ML_service_white.png")} alt={props.alt}></img>

            case "service_vizu":
                return <img src={require("../images/dashboard_building_mini.png")} alt={props.alt}></img>

            case "service_formation":
                return <img src={require("../images/moi_cours.png")} alt={props.alt}></img>

            case "moi_famille":
                return <img src={require("../images/devant_hangar_famille.png")} alt={props.alt}></img>

            case "mon_site":
                return <img src={require("../images/capture_site.png")} alt={props.alt}></img>
            
            default:
                return <img src="" alt="null photo"></img>
        }
    }

    window.onresize = () =>{
        if (others.length * 0.94 * 200 + (others.length + 1)*20 < document.body.clientWidth ){
            setjustifyContent("center")
        }else{
            setjustifyContent("flex-start")
        }
    }

    if (others.length > 0){
        
        return (
            <section className="other-services">
                <h3>{posts.see_other}</h3>
                <div style = {{"justifyContent": justifyContent}}>
                    {others.map((other, index) => {
                        return(
                            <Link key={index} to={other.more.LINK}>
                                <div>
                                    <ImgChoice img={other.img.NAME} alt={other.img.alt}/>
                                    <h4>{other.title}</h4>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        )
    }else{
        return null;
    }

}

export default SeeOther