import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./radarchart.css";
import PropTypes from "prop-types";

RadarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

function RadarChart(props) {
  const width = 258;
  const height = 263;
  const radarWidth = 250;

  const padding = 45;

  //defining the 5 hexagon of the radar chart, each on is 20% further of the center of the svg
  const axes = [
    radarWidth * 0.2,
    radarWidth * 0.4,
    radarWidth * 0.6,
    radarWidth * 0.8,
    radarWidth * 1,
  ];

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width)
      .attr("viewBox", `0 0 ${width} ${height}`);

    //Scale radial
    const radialScale = d3
      .scaleLinear()
      .domain([0, d3.max(axes)])
      .range([0, width / 2 - padding]);

    //calculating the coordinate of the datapoint on the hexagon
    function angleToCoordinate(angle, value) {
      const x = Math.cos(angle) * radialScale(value);
      const y = Math.sin(angle) * radialScale(value);
      return { x: width / 2 + x, y: height / 2 - y };
    }

    //Generating path based on the datapoint coordinates
    const hexPathGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .context(null);

    const hexData = axes.map((axisValue, i) => {
      const radius = radialScale(axisValue);
      const coordinates = [];
      for (let j = 0; j < 6; j++) {
        const angle = (j * 2 * Math.PI) / 6;
        coordinates.push(angleToCoordinate(angle, axisValue));
      }
      return { coordinates, radius };
    });

    svg
      .selectAll(".hexagon")
      .data(hexData)
      .join("path")
      .attr("class", "hexagon")
      .attr("d", (d) => hexPathGenerator(d.coordinates) + "Z")
      .attr("stroke-width", 3)
      .attr("stroke", "gray")
      .attr("fill", "none")
      .attr("stroke-opacity", 1)
      .attr("opacity", 0.15);

    const featureData = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * 2 * Math.PI) / 6;
      const labelCoord = angleToCoordinate(angle, d3.max(axes) + padding * 1.2);
      const name = props.data[i].kind;
      featureData.push({ name, angle, label_coord: labelCoord });
    }

    svg
      .selectAll(".axislabel")
      .data(featureData)
      .join("text")
      .attr("class", "axislabel")
      .attr("x", (d) => d.label_coord.x)
      .attr("y", (d) => d.label_coord.y)
      .text((d) => d.name)
      .attr("text-anchor", "middle") // Center the labels on the hexagons
      .attr("dy", "-0.1em") // Adjust vertical position for the top labels
      .attr("dx", "-0.2em"); // Adjust vertical position for the top labels

    const area = d3
      .areaRadial()
      .angle((d, i) => (i * 2 * Math.PI) / 6) // Use exact angles for the data points
      .radius((d) => radialScale(d.value))
      .curve(d3.curveLinearClosed);

    const pathCoordinates = props.data.map((d, key) => {
      const angle = (key * (2 * Math.PI)) / 6;
      return angleToCoordinate(angle, d.value);
    });

    svg
      .append("polygon")
      .attr("points", pathCoordinates.map((d) => `${d.x},${d.y}`).join(" "))
      .attr("class", "data-area")
      .attr("fill", "rgba(100, 149, 237, 0.7)")
      .attr("stroke", "rgba(100, 149, 237, 1)")
      .attr("stroke-width", 2);
  }, [axes, props.data.kind, props.data.data]);

  return <svg ref={svgRef} id="radar-chart"></svg>;
}

export default RadarChart;
