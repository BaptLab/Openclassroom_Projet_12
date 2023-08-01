import * as d3 from "d3";
import { useRef, useEffect } from "react";
import "./linechart.css";
import Proptypes from "prop-types";

LineChart.propTypes = {
  data: Proptypes.array.isRequired,
};

function LineChart(props) {
  const dayOfTheWeek = ["L", "M", " M", "J", "V", "S", "D"];

  const boxWidth = 258;
  const boxHeight = 263;
  const padding = { top: 53, left: 14, bottom: 37, right: 14 };
  const dotOffset = -5; // Adjust this value to set the offset of the dots from the line

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${boxWidth} ${boxHeight}`);

    const xScale = d3
      .scalePoint()
      .domain(dayOfTheWeek)
      .range([20, boxWidth - 20]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(props.data, function (d) {
          return d.sessionLength;
        }),
      ])
      .range([boxHeight - padding.top, padding.top + 25]);

    const line = d3
      .line()
      .x((d, i) => xScale(dayOfTheWeek[i]))
      .y((d) => yScale(d.sessionLength))
      .curve(d3.curveBasis);

    const path = svg
      .append("path")
      .datum(props.data)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("id", "line")
      .attr("d", line);

    // Move the invisible circles to the end of the SVG, so they are drawn on top of the line
    const circlesContainer = svg.append("g").attr("id", "circles-container");

    const pathLength = path.node().getTotalLength(); // Get the total length of the path

    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${boxHeight - padding.bottom})`)
      .call(xAxis);

    // Tooltip
    const tooltip = d3
      .select("body") // Attach the tooltip to the body element
      .append("div")
      .style("position", "absolute") // Use absolute positioning for proper placement
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "8px 7px")
      .style("color", "black")
      .style("font-size", "8px");

    const points = circlesContainer.selectAll(".line-point").data(props.data);

    points
      .enter()
      .append("circle")
      .attr("class", "line-point")
      .attr("cx", (d, i) => {
        const pathNode = path.node();
        const point = pathNode.getPointAtLength(
          (i / (dayOfTheWeek.length - 1)) * pathLength + dotOffset // Add the offset to adjust the position of the dots
        );
        return point.x;
      })
      .attr("cy", (d, i) => {
        const pathNode = path.node();
        const point = pathNode.getPointAtLength(
          (i / (dayOfTheWeek.length - 1)) * pathLength + dotOffset // Add the offset to adjust the position of the dots
        );
        return point.y;
      })
      .attr("r", 7)
      .attr("fill", "white")
      .attr("fill-opacity", 0) // Set the initial opacity to 0 (invisible)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill-opacity", 1); // Set the opacity to 1 on mouseover
        tooltip.style("visibility", "visible");
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        tooltip.style("left", mouseX + 15 + "px");
        tooltip.style("top", mouseY - 30 + "px");
        tooltip.text(`${d.sessionLength} min`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill-opacity", 0); // Set the opacity back to 0 on mouseout
        tooltip.style("visibility", "hidden");
      });
  }, []);

  return (
    <div className="line-chart-container">
      <h4 className="line-chart-title">
        Durée moyenne des <br /> sessions
      </h4>
      <svg id="line-chart-box" ref={svgRef} />
    </div>
  );
}

export default LineChart;
