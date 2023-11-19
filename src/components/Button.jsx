import React from "react"
import Styles from "../styles/button.css"
const Button = ({ href, text, target} )=>{
    return(
        <>
        <a class="link__boton boton titulo__dark  span"
        href={href}  target={target}>
        {text}
    </a>
    </>
    )
}
export default Button;


