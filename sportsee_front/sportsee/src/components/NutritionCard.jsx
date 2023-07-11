import "../styles/nutritioncard.css";

function NutritionCard(props) {
  return (
    <div className="nutrition-card">
      <div className="icon-container">{props.children}</div>
      <div className="nutritions-infos">
        <span className="value">{props.value}</span>
        <span className="unit">{props.unit}</span>
      </div>
    </div>
  );
}

export default NutritionCard;
