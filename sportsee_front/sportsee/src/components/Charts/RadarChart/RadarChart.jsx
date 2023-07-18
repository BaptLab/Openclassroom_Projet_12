import data from "../../../datas/userperformance.json";
import * as d3 from "d3";
import { useRef, useEffect } from "react";

const radarData = [];
function formatData(data) {
  for (let i = 0; i < data.data.length; i++) {
    radarData.push(new Axis(data.kind[i + 1], data.data[i].value));
  }
}

class Axis {
  constructor(kind, value) {
    this.axis = kind;
    this.value = value;
  }
}

formatData(data);

function RadarChart() {
  const width = 258;
  const height = 263;

  const radarWidth = 250;
  const axes = [
    radarWidth * 0.2,
    radarWidth * 0.4,
    radarWidth * 0.6,
    radarWidth * 0.8,
    radarWidth * 1,
  ];

  const padding = 20;

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const radialScale = d3
      .scaleLinear()
      .domain([0, d3.max(axes)])
      .range([0, width / 2 - padding]);

    svg
      .selectAll("circle")
      .data(axes)
      .join("circle")
      .attr("cy", height / 2)
      .attr("cx", width / 2)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("r", (d) => d / 2 - padding);

    function angleToCoordinate(angle, value) {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      console.log("coodrinates", x, y);
      return { x: width / 2 + x, y: height / 2 - y };
    }

    const angleSlice = (2 * Math.PI) / radarData.length;

    const featureData = radarData.map((f, i) => {
      const angle = i * angleSlice;
      return {
        name: f.axis,
        angle: angle,
        label_coord: angleToCoordinate(angle, d3.max(axes) + padding),
      };
    });

    svg
      .selectAll(".axislabel")
      .data(featureData)
      .join("text")
      .attr("class", "axislabel")
      .attr("x", (d) => d.label_coord.x)
      .attr("y", (d) => d.label_coord.y)
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-size", "8px")
      .style("font-weight", "bold");

    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    function getPathCoordinates(data_point) {
      console.log("data", data_point);
      let coordinates = [];
      for (var i = 0; i <= axes.length; i++) {
        let ft_name = i;
        let angle = Math.PI / 2 + (2 * Math.PI * i) / axes.length;
        console.log("angel : ", angle, ft_name, data_point[ft_name]);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name].value));
      }
      console.log("coordinates", coordinates);
      return coordinates;
    }

    svg
      .selectAll("path")
      .data(radarData)
      .join((enter) =>
        enter
          .append("path")
          .datum(getPathCoordinates(radarData))
          .attr("d", line)
          .attr("stroke-width", 3)
          .attr("stroke", (_, i) => "none")
          .attr("fill", (_, i) => "red")
          .attr("stroke-opacity", 1)
          .attr("opacity", 0.15)
      );
  }, [axes]);

  return <svg ref={svgRef} id="radar-chart"></svg>;
}

export default RadarChart;
