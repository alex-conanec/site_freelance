import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./contact.css"
import { LangContext } from "../index";

var parse = require('html-react-parser');
function Contact() {
    const form = useRef();
    const emailjs_cred = require('../.credentials.json');

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const {lang} = React.useContext(LangContext)
    const content = require('./homeContent.json');
    
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(emailjs_cred.SERVICE_ID, emailjs_cred.TEMPLATE_ID, form.current, emailjs_cred.USER_ID)
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