import activityData from "../../../datas/usersession.json";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import "./linechart.css";

const dayOfTheWeek = ["L", "M", "M ", "J", "V", "S", "D"];

const boxWidth = 258;
const boxHeight = 263;
const padding = { top: 53, left: 14, bottom: 37, right: 14 };

function LineChart() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${boxWidth} ${boxHeight}`);

    const xScale = d3
      .scalePoint()
      .domain(dayOfTheWeek) // Use dayOfTheWeek array instead of activityData.sessions
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
      .range([boxHeight - padding.top, padding.top + 25]);

    console.log("yScale domain:", yScale.domain());
    console.log("yScale range:", yScale.range());

    const line = d3
      .line()
      .x((d, i) => {
        console.log("x value:", d.day);
        return xScale(dayOfTheWeek[i]); // Use dayOfTheWeek values instead of d.day
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
      .attr("transform", `translate(0, ${boxHeight - padding.bottom})`)
      .call(xAxis);
  }, []);

  return (
    <div className="line-chart-container">
      <h4 className="line-chart-title">
        Durée moyenne des <br></br> sessions
      </h4>
      <svg id="line-chart-box" ref={svgRef} />
    </div>
  );
}

export default LineChart;
