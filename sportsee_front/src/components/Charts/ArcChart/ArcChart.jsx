import * as d3 from "d3";
import { useRef, useEffect } from "react";
import "./arcchart.css";
import PropTypes from "prop-types";

ArcChart.propTypes = {
  data: PropTypes.number.isRequired,
};

function ArcChart(props) {
  useEffect(() => {
    const width = 258;
    const height = 263;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;
    const pathWidth = 11;

    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${width} ${height}`);

    const arc = d3
      .arc()
      .innerRadius(radius - pathWidth)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle((2 * Math.PI * props.data) / 1)
      .cornerRadius(20); // Calculate the angle based on the data value

    const insidePie = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - pathWidth)
      .startAngle(0)
      .endAngle((2 * Math.PI * 1) / 1);

    svg
      .append("path")
      .attr("id", "arc-line")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    svg
      .append("path")
      .attr("id", "arc-inside")
      .attr("d", insidePie)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  }, []);

  const svgRef = useRef(null);
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
