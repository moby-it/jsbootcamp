export function ActionsList(props) {
  const { history } = props;
  if (!Array.isArray(history)) throw new Error("history provided is not an array");

  function timeTravel(index) {
    console.log("should reset squares state to index ", index);
    props.setSquares(history[index].state.slice());
    props.setActionsList(history.slice(0, index + 1));
  }

  return <ul>
    {history.map((h, index) => <li key={h.position} onClick={() => timeTravel(index)}>
      {h.value} placed at {h.position}
    </li>)}
  </ul>;
}