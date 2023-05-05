
export default function Square({ value, setter }) {
  function handleClick() {
    if (!value) {
      setter();
    }
  }
  return <button className="square" onClick={handleClick}>{value}</button>;
}