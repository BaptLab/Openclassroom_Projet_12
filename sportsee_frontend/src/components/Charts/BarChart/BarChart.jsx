import * as d3 from "d3";
import { useRef, useEffect } from "react";
import "./barchart.css";
import PropTypes from "prop-types";

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

function BarChart(props) {
  //Dividing the two type of data : calories and kilograms
  const calories = props.data.map((d) => {
    return d.calories;
  });
  const kilograms = props.data.map((d) => {
    return d.kilogram;
  });

  //creating an array for the x-axis values
  const xAxisValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //size of the graph
  const width = 835;
  const height = 320;
  const padding = { top: 112, right: 90, bottom: 63, left: 43 };

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Scale x-axis = KILOGRAMS
    const xScale = d3
      //scaleband = spaced evenly according to the number of data (roughly speaking)
      .scaleBand()
      //domain = data being traited (in our case, all the data from the array)
      .domain(xAxisValues.slice(0, kilograms.length))
      //range = size of the scale
      .range([padding.left, width - padding.right])
      .padding(0.2);

    //Display of the x-axis scale
    svg
      .append("g")
      .attr("class", "scalegroup")
      .attr("transform", "translate(0," + (height - padding.bottom / 2) + ")")
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
      //adjusting the position
      .attr("transform", "translate(0,-18)");

    // Scale y-axis = KILOGRAMS
    const yScale = d3
      //scaleLinear = spaced according to the value of the data
      .scaleLinear()
      //display only the (max value) to (max value-7), can be adjust if the values are really diffrents
      .domain([
        d3.max(
          kilograms.map((d) => {
            return d;
          })
        ) - 7,
        d3.max(
          kilograms.map((d) => {
            return d;
          })
        ) + 1,
      ])
      .range([height - padding.bottom, padding.top]);

    // 2nd scale x-axis = CALORIES
    //useless according to the mockup but there if needed

    /* const subxScale = d3
      .scaleBand()
      .domain(
        calories.map((d) => {
          return d;
        })
      )
      .range([padding.left, xScale.bandwidth()])
      .padding([0.2]); */

    // 2nd scale y-axis = CALORIES
    const subyScale = d3
      .scaleLinear()
      .domain([
        0,
        (d3.max(
          calories.map((d) => {
            return d;
          })
        ) *
          110) /
          100,
      ])
      .range([height - padding.bottom, padding.top]);

    // Display of the Kilogram Y-scale on the right side
    svg
      .append("g")
      .attr("class", "scalegroup")
      .call(d3.axisRight(yScale).ticks(3))
      .attr("transform", `translate(${width - padding.right / 1.5}, 0)`);

    //Creation of the Bar plots (kilograms bars)
    svg
      .selectAll(".kilogram-bar")
      .data(kilograms)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i + 1))
      .attr("class", "red-bar bar kilogram-bar")
      .attr("transform", "translate(28,0)")
      .attr("y", function (d) {
        return yScale(d);
      })
      .attr("width", "6px")
      .attr("ry", "3px")
      .attr("rx", "3px")
      .attr("height", function (d) {
        return height - padding.bottom - yScale(d);
      })
      .attr("fill", "#282D30");

    //Creation of the Bar plots (Calories bars)
    svg
      .selectAll(".calorie-bar")
      .data(calories)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i + 1))
      .attr("class", "blue-bar bar calorie-bar")
      .attr("transform", "translate(42,0)")
      .attr("y", function (d) {
        return subyScale(d);
      })
      .attr("width", "6px")
      .attr("ry", "3px")
      .attr("height", function (d) {
        return height - padding.bottom - subyScale(d);
      })
      .attr("fill", "#E60000");

    //Adding the overlay when hovered with the mouse
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "red")
      .style("padding", "8px 7px")
      .style("color", "white")
      .style("font-size", "8px");

    //size of the bar plots and positioning
    const bandwidthGroups = svg
      .selectAll(".bandwidth-group")
      .data(kilograms)
      .enter()
      .append("g")
      .attr("class", "bandwidth-group")
      .attr("id", (_, i) => `${i}`)
      .attr("transform", (_, i) => `translate(${xScale(i + 1) + 40}, 0)`);

    // Add a rect to each bandwidth group for background darkening
    bandwidthGroups
      .append("rect")
      .attr("class", "background-rect")
      .attr("x", -xScale.bandwidth() / 2)
      .attr("y", padding.top + 2)
      .attr("width", xScale.bandwidth())
      .attr("height", height - padding.top - 2 - padding.bottom)
      .style("fill", "rgba(0, 0, 0, 0)"); // Initially transparent

    // Darken each bandwidth area when hovering over it
    bandwidthGroups
      .on("mouseover", function () {
        d3.select(this).select(".background-rect").style("fill", "rgba(0, 0, 0, 0.2)");
      })
      .on("mouseout", function () {
        d3.select(this).select(".background-rect").style("fill", "rgba(0, 0, 0, 0)");
      });

    // Darken each bandwidth area when hovering over it
    bandwidthGroups
      .on("mouseover", function (event, d, i) {
        d3.select(this).select(".background-rect").style("fill", "rgba(0, 0, 0, 0.2)");
        // Show the tooltip with the corresponding values (kilograms and calories)
        tooltip.style("visibility", "visible");
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        tooltip.style("left", mouseX + 15 + "px");
        tooltip.style("top", mouseY - 30 + "px");
        tooltip.html(`Kilograms: ${d}<br>Calories: ${calories[this.id]}`);
      })
      .on("mouseout", function () {
        d3.select(this).select(".background-rect").style("fill", "rgba(0, 0, 0, 0)");

        // Hide the tooltip on mouseout
        tooltip.style("visibility", "hidden");
      });
  }, [
    calories,
    kilograms,
    padding.left,
    padding.right,
    padding.top,
    padding.bottom,
    xAxisValues,
  ]);

  return (
    <div className="bar-chart-container">
      <span id="stroke1" className="stroke  stroke-full"></span>
      <span id="stroke2" className="stroke  stroke-dot"></span>
      <span id="stroke3" className="stroke stroke-dot"></span>
      <div className="bar-chart-text-container">
        <h4 className="bar-chart-title">Activité quotidienne</h4>
        <div className="scales-container">
          <div id="weight" className="scale-container scale-container-1">
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
