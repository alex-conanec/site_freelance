import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./contact.css"
import { LangContext } from "../index";
require('dotenv').config()

var parse = require('html-react-parser');
function Contact() {
    const form = useRef();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const {lang} = React.useContext(LangContext)
    const content = require('./homeContent.json');


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_USER_ID)
        .then((result) => {
            console.log(result.text);
            setName("")
            setEmail("")
            setMessage("")
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <section id="contact">
            <h2>{content[lang].contact.title}</h2>
            <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="user_name" className="identification name" placeholder="Jean Dupont" onChange={(e) => setName(e.target.value)} value={name}/>
            <input type="email" name="user_email" className="identification email" placeholder="jean.dupont@gmail.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <textarea name="message" className="content" placeholder={parse(content[lang].contact.placeholder_msg)} onChange={(e) => setMessage(e.target.value)} value={message}/>
            <input className="btn submit" type="submit" value="Envoyer" />
            </form>
        </section>
    );
};

export default Contact