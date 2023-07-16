import activityData from "../datas/usersession.json";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import "../styles/linechart.css";

const dayOfTheWeek = ["L", "M", "M", "J", "V", "S", "D"];

const boxWidth = 258;
const boxHeight = 263;
const padding = 35;

function LineChart() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${boxWidth} ${boxHeight}`);

    const xScale = d3
      .scalePoint()
      .domain(
        activityData.sessions.map((d) => {
          return d.day;
        })
      )
      .range([20, boxWidth - 20]);

    console.log("xScale domain:", xScale.domain());
    console.log("xScale range:", xScale.range());

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(activityData.sessions, function (d) {
          return d.sessionLength;
        }),
      ])
      .range([boxHeight - padding, padding]);

    console.log("yScale domain:", yScale.domain());
    console.log("yScale range:", yScale.range());

    const line = d3
      .line()
      .x((d, i) => {
        console.log("x value:", d.day);
        return xScale(d.day);
      })
      .y((d) => {
        console.log("y value:", d.sessionLength);
        return yScale(d.sessionLength);
      })
      .curve(d3.curveBasis);

    svg
      .append("path")
      .datum(activityData.sessions)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("id", "line")
      .attr("d", line);

    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${boxHeight - padding})`)
      .call(xAxis);
  }, []);

  return <svg id="line-chart-box" ref={svgRef} />;
}

export default LineChart;
