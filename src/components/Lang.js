import React from 'react'
import { LangContext } from "../index";

function Lang() {

    const {lang, setLang} = React.useContext(LangContext)

    return (
        <div className="language_btn">
            <button id="fr" className={lang==='fr' ? "active" : ""} onClick={() => setLang('fr')}></button>
            <button id="en" className={lang==='en' ? "active" : ""} onClick={() => setLang('en')}></button>
        </div>
    )
}

export default Lang