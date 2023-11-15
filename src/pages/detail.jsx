import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toolsInfo from "./ToolsInfo.js";

const Detail = () => {
  const { slug } = useParams();
  const [currentTool, setCurrentTool] = useState(null);

  // Busca la herramienta cuando el slug cambia
  useEffect(() => {
    const tool = toolsInfo.find(tool => tool.title === slug);
    setCurrentTool(tool);
  }, [slug]);

  // Asegúrate de que currentTool no sea null antes de intentar acceder a sus propiedades
  return currentTool ? (
    <div>
      <h2>{currentTool.title}</h2>
      <img src={currentTool.src} alt={currentTool.title} />
      <p>{currentTool.description}</p>
      {/* Agrega cualquier otra información que desees mostrar */}
    </div>
  ) : null;
};

export default Detail;
