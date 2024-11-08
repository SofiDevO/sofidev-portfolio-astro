import "./Skills.css";
import { cardsData } from "../../../data/skillsMastered";

const CardSkill = () => {
  return (
    <>
    <div class="skills__cajas" >

      {
      [...cardsData, ...cardsData].map((cardData) => {
        return (
          <div className="skills__caja caja__dark">
            <div className="img">
              <img
                className={`skills__icono skills__icono__dark ${cardData.clas}`}
                src={cardData.imgSrc}
                alt={cardData.imgAlt}
              />
            </div>
            <div className="skills__texto">
              <p className="text head titulo__dark">{cardData.title}</p>
            </div>
          </div>
        );
      })}
      </div>
    </>
  );
};

export default CardSkill;
