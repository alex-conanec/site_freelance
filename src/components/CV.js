import React, { Fragment } from 'react'
import logo from '../images/logo_comp.svg';
import "./cv.css"
import "./skills.css"
import Footer from './Footer';
import Lang from './Lang';
import { Link } from 'react-router-dom'
import { LangContext } from "../index";
import Back from './Back';


var parse = require('html-react-parser');
function CV() {

    const {lang} = React.useContext(LangContext)
    const content = require('./cvContent.json');
    const entete = content[lang].entete;
    const skills = content[lang].skills;
    const diplomes = content[lang].diplomes;
    const experiences = content[lang].experiences;
    const dev = content[lang].dev;
    const publis = content[lang].publis;


    const Topic = (props) => {

        const topic = props.topic
        if (topic.content.length === 1){
            return(
                <Fragment>
                    <strong>{topic.label} </strong>
                    {topic.content[0]}<br/>
                </Fragment>
            )

        }else{
            return(
                <Fragment>
                    <strong>{topic.label} </strong>
                    <ul>
                        {topic.content.map((content, index) => {
                            return(
                                <li key={index}>
                                    {content}
                                </li>
                            )
                        })}
                    </ul>
                </Fragment>
            )       
        }
    }

    return (
        <article>
            <Back href="/#banderol"/>
            <section id="entete_cv">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <Lang/>
                <h1>{entete.NAME}</h1>
                <h2>{entete.job}</h2>
                <div className="infos-generales">
                    <span>{entete.age}</span>
                    <span><i className="fa-solid fa-location-dot"></i>{entete.CITY}</span>
                    <span><i className="fa-solid fa-at"></i>{entete.EMAIL}</span>
                    <span><i className="fa-solid fa-car"></i>{entete.car}</span>
                </div>
                <div className="download-btn">
                    <p><a href={require("../images/CV_long.pdf")} download="CV.pdf"><i className="fa-solid fa-download"></i>{entete.version_longue}</a></p>
                    <p><a href={require("../images/CV_court.pdf")} download="CV.pdf"><i className="fa-solid fa-download"></i>{entete.version_courte}</a></p>
                </div>
                
            </section>

            <section id="skills"  className="cate_cv">
                <h2>{skills.title}</h2>
                <ul>
                    {skills.skills_clusters.map((skills_cluster, index) => {
                        return(
                            <li key={index}>
                                <h3>{skills_cluster.name}</h3>
                                {skills_cluster.skills_sub_clusters.map((skills_sub_cluster, index) => {
                                    return(
                                        <div key={index} className="sub-skill">
                                            <h4>{skills_sub_cluster.name}</h4>
                                            <ul className="skill-list">
                                                {skills_sub_cluster.skills_list.map((skill, index) => {
                                                    return(
                                                        <li key={index} className={skills_sub_cluster.class}>{skill}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>        
                                    )
                                })}
                                
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section id="education" className="cate_cv">
                <h2>{diplomes.title}</h2>
                <ul>
                    {diplomes.diplomes_list.map((diplome, index) => {
                        return(
                            <li key={index}>
                                <h3>{diplome.title}</h3>
                                <h4>{diplome.ecole}</h4>
                                <div>
                                    <i className="fa-solid fa-calendar"></i><span>{diplome.date}</span>
                                    <i className="fa-solid fa-location-dot"></i><span>{diplome.lieu}</span> 
                                </div>
                            </li>
                        )
                    })}
                </ul>
                
            </section>

            <section id="experience"  className="cate_cv">
                <h2>{experiences.title}</h2>
                <ul>
                    {experiences.list.map((experience, index) => {
                        return(
                            <li key={index}>
                                <h3>{experience.title}</h3>
                                <h4>{experience.COMPANY}</h4>
                                <div>
                                    <i className="fa-solid fa-calendar"></i><span>{experience.date}</span>
                                    <i className="fa-solid fa-location-dot"></i><span>{experience.lieu}</span> 
                                </div>
                                <ul className="skill-list">
                                    {experience.skills_list.map((skill, index) => {
                                        return(
                                            <li key={index} className={skill.class}>{skill.label}</li>
                                        )
                                    })}
                                </ul>
                                <Topic topic={experience.topic}/>                                
                                {experience.contact_clusters.map((contact_cluster, index) => {
                                    return(
                                        <Fragment key={index}>
                                            <strong>{contact_cluster.label} </strong>
                                            {contact_cluster.list.map((contact, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <a href={contact.URL} target="_blank" rel="noopener noreferrer">{contact.NAME}</a><span>, </span> 
                                                    </Fragment>
                                                )
                                            })}
                                            <br/>
                                        </Fragment>
                                    )
                                })}
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section id="developpement"  className="cate_cv">
                <h2>{dev.title}</h2>
                <ul>
                    {dev.list.map((dev_item, index) => {
                        return(
                            <li key={index}>
                                <h3>{dev_item.name}</h3>
                                <div>
                                    <i className="fa-solid fa-calendar"></i><span>{dev_item.date}</span>
                                    <a href={dev_item.repo.URL} target="_blank" rel="noopener noreferrer"><i className={dev_item.repo.ICON}></i>{dev_item.repo.TEXT}</a> 
                                </div>
                                <ul className="skill-list">
                                    {dev_item.skills_list.map((skill, index) => {
                                        return(
                                            <li key={index} className={skill.class}>{skill.label}</li>
                                        )
                                    })}
                                </ul>
                                <p><strong>{dev_item.object.title} </strong>{dev_item.object.content}</p>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section id="publication"  className="cate_cv">
                <h2>{publis.title}</h2>
                <h3>{publis.articles.title}</h3>
                <ol>
                    {publis.articles.list.map((article, index) => {
                        return(
                            <li key={index}>
                                <p>
                                    {article.AUTHORS.map((author, index) => {
                                        let balise_author;
                                        if (author === "Conanec A."){
                                            balise_author = '<strong className="author-me">' + String(author) + '</strong>'
                                        }else{
                                            balise_author = String(author)   
                                        }
                                        
                                        if (index === article.AUTHORS.length - 2){
                                            return(
                                                <Fragment key={index}>{parse(balise_author)} et </Fragment>
                                            )
                                        }else if (index === article.AUTHORS.length - 1){
                                            return(
                                                <Fragment key={index}>{parse(balise_author)}</Fragment>
                                            )
                                        }else{
                                            return(
                                                <Fragment key={index}>{parse(balise_author)}, </Fragment>
                                            )
                                        } 
                                    })} ({article.DATE}).<strong className="title"> {article.TITLE}</strong><em> {article.REVUE}</em>, {article.NUM}. DOI : <a href={article.DOI} target="_blank" rel="noopener noreferrer">{article.DOI}</a>
                                </p>
                            </li>
                        )
                    })}
                </ol>

                <h3>{publis.communications.title}</h3>
                <ol>
                    {publis.communications.list.map((communication, index) => {
                        return(
                            <li key={index}>
                                <p>
                                    {communication.AUTHORS.map((author, index) => {
                                        let balise_author;
                                        if (author === "Conanec A."){
                                            balise_author = '<strong className="author-me">' + String(author) + '</strong>'
                                        }else{
                                            balise_author = String(author)   
                                        }
                                        
                                        if (index === communication.AUTHORS.length - 2){
                                            return(
                                                <Fragment key={index}>{parse(balise_author)} et </Fragment>
                                            )
                                        }else if (index === communication.AUTHORS.length - 1){
                                            return(
                                                <Fragment key={index}>{parse(balise_author)}</Fragment>
                                            )
                                        }else{
                                            return(
                                                <Fragment key={index}>{parse(balise_author)}, </Fragment>
                                            )
                                        } 
                                    })} ({communication.DATE}).<strong className="title"> {communication.TITLE}</strong><em> {communication.CONF}</em>, {communication.lieu}. URL : <a href={communication.URL} target="_blank" rel="noopener noreferrer">{communication.URL}</a>
                                </p>
                            </li>
                        )
                    })}
                </ol>

            </section>

            <Footer bg_col="white"/>

        </article>
    )
}

export default CV