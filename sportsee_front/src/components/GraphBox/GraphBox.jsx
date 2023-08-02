import "./graphbox.css";

//Box layout - the graph is being passed as a prop

function GraphBox(props) {
  return <div className="graph-box">{props.children}</div>;
}

export default GraphBox;
