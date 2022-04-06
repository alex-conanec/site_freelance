import React, { useEffect, useState } from 'react'
import "./posts.css"
import "./skills.css"
import { HashLink as Link } from 'react-router-hash-link';
import { LangContext } from "../index";

var t0 = true;
var parse = require('html-react-parser');
function Posts() {

    const [activeNav, setActiveNav] = useState("services")

    const {lang} = React.useContext(LangContext)
    const content = require('./postsContent.json');

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


    function ServicesCard (){

        const services = content[lang]["services"].list;
    
        return(
            <div id="services" className="post-list">
                {services.map((service, index) => {
                    return(
                        <div key={index} className="post-item">
                            <div className="text-card">
                                <h2>{service.title}</h2>
                                <p>{parse(service.description)}</p>
                                <Link to={service.more.LINK}>{service.more.label}<i className="fa-solid fa-arrow-right"></i></Link>
                            </div>
                            <ImgChoice img={service.img.NAME} alt={service.img.alt} />
                        </div>
                    )
                })}
            </div>
        )
    };

    function Blog(){

        const blog_posts = content[lang]["blog"].list;

        return(
            <div id="blog" className="post-list">
                {blog_posts.map((blog_post, index) => {
                    return(
                        <div key={index} className="post-item">
                            <div className="text-card">
                                <h2>{blog_post.title}</h2>
                                <p>{parse(blog_post.description)}</p> 
                                <div>
                                    <ul className="skill-list">
                                        {(blog_post.key_words).map((word, index) => {
                                            return(
                                                <li key={index} className={word.class}>{word.text}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <Link to={blog_post.more.LINK}>{blog_post.more.label}<i className="fa-solid fa-arrow-right"></i></Link>
                                <span className="date">{blog_post.date.label} {blog_post.date.value}</span>
                            </div>
                            <ImgChoice img={blog_post.img.NAME} alt={blog_post.img.alt} />
                        </div>
                    )
                })}
            </div>
        )

    };

    function Projects(){

        const projects = content[lang]["projects"].list;

        return(
            <div id="blog" className="post-list">
                {projects.map((project, index) => {
                    return(
                        <div key={index} className="post-item">
                            <div className="text-card">
                                <h2>{project.title}</h2>
                                <p>{parse(project.description)}</p> 
                                <div>
                                    Mots clés :
                                    <ul className="skill-list">
                                        {(project.key_words).map((word, index) => {
                                            return(
                                                <li key={index} className={word.class}>{word.text}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <a href={project.more[0].LINK} target="_blank" rel="noopener noreferrer">{project.more[0].label}<i className={project.more[0].ICON}></i></a>
                                {/* <ul>
                                    {project.LINKS.map((link, index) => {
                                        return(
                                            <li key={index}><Link to={link.LINK}><i className={link.ICON}></i></Link></li>
                                        )
                                    })}
                                </ul> */}
                                <span className="date">{project.date.label} {project.date.value}</span>
                            </div>
                            <ImgChoice img={project.img.NAME} alt={project.img.alt} />
                        </div>
                    )
                })}
            </div>
        )
        
    };

    function DisplayContent(){
        switch (activeNav) {
            case "services":
                return <ServicesCard/>;
            case "blog":
                return <Blog/>;
            case "projects":
                return <Projects/>
        
            default:
                return null;
        }
    }

    const handleNavClick = (post) => {
        
        for (let tag of document.querySelectorAll("ul#tab_posts li")){
            tag.classList.remove("active")
        }
        document.getElementById("tab_" + post).classList.add("active")
        setActiveNav(post)
        document.location.href = "/#posts"
        
    }


    // blocker nav en mode reduit
    var check = {};
    
    for (let elt of Array.from(document.querySelectorAll("section"))){
        check[elt.id] = false;
    };

    const observer = new IntersectionObserver(entries => {

        if (t0){
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                if (entry.intersectionRatio > 0) {
                    check[id] = true;
                };
		    });
            t0 = false;
        }else{
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                
                check[id] = !check[id]
                
                let fix = true
                for (const [key, value] of Object.entries(check)) {
                    if (key === "posts" && !value){
                        fix = false;
                    };
                    if (key !== "posts" && value){
                        fix = false;
                    };
                };

                if (fix){
                    document.querySelector("section#posts > aside").classList.add("fixed");
                }else{
                    document.querySelector("section#posts > aside").classList.remove("fixed");
                };

            });
        };
	});


    useEffect(() => {
        document.querySelectorAll("section").forEach((section) => {
            observer.observe(section);
        });
    })
    
    
    
    return(
        <section id="posts">
            <aside>
            <nav>
                <ul id="tab_posts">
                    <li id="tab_services" className="active"><button onClick={() => handleNavClick("services")}><i className="fa-solid fa-screwdriver-wrench"></i><span>{content[lang].nav.services}</span></button></li>
                    <li id="tab_blog"><button onClick={() => handleNavClick("blog")}><i className="fa-regular fa-newspaper"></i><span>{content[lang].nav.blog}</span></button></li>
                    <li id="tab_projects"><button onClick={() => handleNavClick("projects")}><i className="fa-regular fa-images"></i><span>{content[lang].nav.project}</span></button></li>
                </ul>
            </nav>
            </aside>
            
        
            <DisplayContent/>
            
        </section>
    )
}

export default Posts