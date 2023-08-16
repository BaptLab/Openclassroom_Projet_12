import "./nutritioncard.css";
import PropType from "prop-types";

NutritionCard.propTypes = {
  unit: PropType.string.isRequired,
  value: PropType.number.isRequired,
};

function NutritionCard(props) {
  return (
    <div className="nutrition-card">
      <div className="icon-container">{props.children}</div>
      <div className="nutritions-infos">
        <span className="value">
          {props.unit === "Calories" ? props.value + "kCal" : props.value + "g"}{" "}
        </span>
        <span className="unit">{props.unit}</span>
      </div>
    </div>
  );
}

export default NutritionCard;
