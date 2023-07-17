import activityData from "../datas/userdata.json";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import "../styles/arcchart.css";

const goalPourcent = activityData.todayScore * 100;

function ArcChart() {
  useEffect(() => {
    const data = activityData.todayScore;
    const width = 258;
    const height = 263;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;
    const pathWidth = 11;
    console.log(data, radius);

    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${width} ${height}`);

    const arc = d3
      .arc()
      .innerRadius(radius - pathWidth)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle((2 * Math.PI * data) / 1)
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
