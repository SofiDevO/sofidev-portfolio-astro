import React from "react"
import Styles from "../styles/button.css"
const Button = ({ href, src, text, target,clase} )=>{
    return(
        <a class="link__boton boton titulo__dark  span"
        href={href}  target={target}>
        {text}<img class={`${clase} icono__boton`}
            src={src} />
    </a>
    )
}
export default Button;


