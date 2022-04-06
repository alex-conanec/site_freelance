import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import "./back.css"

function Back(props) {
  return (
    <Link className="back" to={props.href}><i class="fa-solid fa-circle-arrow-left"></i></Link>
  )
}

export default Back