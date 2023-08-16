import * as d3 from "d3";
import { useRef, useEffect } from "react";
import "./arcchart.css";

//props is supposed to be a number between 0 and 1, checking with propTypes
ArcChart.propTypes = {
  data: function (props, propName, componentName) {
    const value = props[propName];
    if (typeof value !== "number" || value < 0 || value > 1) {
      return new Error(
        `Invalid prop : ${propName} supplied to ${componentName} is incorrect, it's supposed to be a number between 0 and 1 while ${propName} is equal to "${value}"`
      );
    }
  },
};

function ArcChart(props) {
  //use of the useRef hook to update the graph after being mounted and also because it's easier to reference it in the JSX component as a variable
  const svgRef = useRef(null);

  useEffect(() => {
    //Mesurement based on the component size
    const width = 258;
    const height = 263;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    //size of the line
    const pathWidth = 11;

    //Defining visual size of the graph
    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${width} ${height}`);

    //Outside arc (red line)
    const arc = d3
      .arc()
      .innerRadius(radius - pathWidth)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle((2 * Math.PI * props.data) / 1)
      .cornerRadius(20);

    //Inside arc/pie (completely filled in white)
    const insidePie = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - pathWidth)
      .startAngle(0)
      .endAngle((2 * Math.PI * 1) / 1);

    //append the line to the svg and placement
    svg
      .append("path")
      .attr("id", "arc-line")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    //append the pie to the svg and placement
    svg
      .append("path")
      .attr("id", "arc-inside")
      .attr("d", insidePie)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  }, [props.data]);

  //value being displayed --> x%
  const goalPourcent = props.data * 100;

  return (
    <div className="arc-chart-container">
      <h4 className="score-title">Score</h4>
      <div className="goal-text">
        <span className="pourcent">{goalPourcent}%</span>
        <span className="subtext-pourcent">
          de votre<br></br> objectif
        </span>
      </div>
      <svg id="arc-chart-box" ref={svgRef}></svg>
    </div>
  );
}

export default ArcChart;
