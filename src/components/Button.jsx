import React from "react"
import Styles from "../styles/button.css"
const Button = ({ href, src })=>{
    return(
        <a class="link__boton boton titulo__dark  span"
        href={href}  target="_blank">
        Download CV <img class="skills__descargar__icono icono__boton"
            src={src} />
    </a>
    )
}
export default Button;


/*
"./docs/Angela_Sofia_Osorio_Cv_2023.pdf" 
"./svg/generate-pdf.svg" alt="download button"
*/