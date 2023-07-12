import activityData from "../datas/usersession.json";
import * as d3 from "d3";

const dayOfTheWeek = ["L", "M", "M", "J", "V", "S", "D"];

const boxWidth = 258;
const boxHeight = 263;

function LineChart() {
  /*   console.log(activityData);
  console.log(dayOfTheWeek); */

  const xScale = d3
    .scalePoint()
    .domain(
      activityData.sessions.map((d) => {
        return d.day;
      })
    )
    .range([0, boxWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(activityData.sessions, function (d) {
        return d.sessionLength;
      }),
    ])
    .range([boxHeight, 0]);

  const line = d3
    .line()
    .x((d) => xScale(d.day))
    .y((d) => yScale(d.sessionLength))
    .curve(d3.curveMonotoneX);

  console.log(line(activityData.sessions));
  d3.select("#line-chart")
    .select("path")
    .attr("d", () => line(activityData.sessions));

  const xAxis = d3.axisBottom(xScale);

  d3.select("#line-chart")
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${boxHeight - 20})`)
    .call(xAxis);

  return (
    <svg id="line-chart" viewBox={`0 0 ${boxWidth} ${boxHeight}`}>
      <path d="" fill="none" stroke="black" strokeWidth={1} />
    </svg>
  );
}

export default LineChart;
