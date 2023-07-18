import * as d3 from "d3";
import { useRef, useEffect } from "react";
import "../styles/barchart.css";

//Data + padding
import activityData from "../datas/useractivity.json";
const calories = activityData.sessions.map((d) => {
  return d.calories;
});
const kilograms = activityData.sessions.map((d) => {
  return d.kilogram;
});

function BarChart() {
  const xAxisValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const width = 835;
  const height = 320;
  const padding = { top: 112, right: 90, bottom: 63, left: 43 };
  const svgRef = useRef(null);

  useEffect(() => {
    //création du conteneur de graph
    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width)
      .attr("viewbox", `0 0 ${width} ${height}`);

    //Scale ordonnées
    const xScale = d3
      .scaleBand()
      .domain(
        xAxisValues.map((d) => {
          return d;
        })
      )
      .range([padding.left, width - padding.right])
      .padding(0.2);

    //ajout de l'échelle
    svg
      .append("g")
      .attr("transform", "translate(0," + (height - padding.bottom / 2) + ")")
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(0,0)");

    //scale abcisses
    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          kilograms.map((d) => {
            return d;
          })
        ),
      ])
      .range([height - padding.bottom, padding.top]);

    //2nd scale ordonnées
    const subxScale = d3
      .scaleBand()
      .domain(
        calories.map((d) => {
          return d;
        })
      )
      .range([padding.left, xScale.bandwidth()])
      .padding([0.2]);

    const subyScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          calories.map((d) => {
            return d;
          })
        ),
      ])
      .range([height - padding.bottom, padding.top]);

    //ajout de l'échelle au DOM
    svg
      .append("g")
      .call(d3.axisRight(yScale))
      .attr("transform", `translate(${width - padding.right / 1.5}, 0)`);

    svg
      .selectAll("myKilogramBar")
      .data(kilograms)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i + 1))
      .attr("class", "red-bar bar")
      .attr("transform", "translate(20,0)")
      .attr("y", function (d) {
        return yScale(d);
      })
      .attr("width", "5px")
      .attr("height", function (d) {
        return height - padding.bottom - yScale(d);
      })
      .attr("fill", "red");

    svg
      .selectAll("myCalorieBars")
      .data(calories)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i + 1))
      .attr("transform", "translate(30,0)")
      .attr("class", "blue-bar bar")
      .attr("y", function (d) {
        return subyScale(d);
      })
      .attr("width", "5px")
      .attr("height", function (d) {
        return height - padding.bottom - subyScale(d);
      })
      .attr("fill", "#282D30");
  });

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-text-container">
        <h4 className="bar-chart-title">Activité quotidienne</h4>
        <div className="scales-container">
          <div id="weight" className=" scale-container scale-container-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
            >
              <path d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z" />
            </svg>
            <span className="scale-text">{"Poids (kg)"}</span>
          </div>
          <div id="height" className="scale-container scale-container-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
            >
              <path d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z" />
            </svg>
            <span className="scale-text">{"Calories brûlées (kCal)"}</span>
          </div>
        </div>
      </div>
      <svg id="bar-chart" ref={svgRef} />
    </div>
  );
}

export default BarChart;
