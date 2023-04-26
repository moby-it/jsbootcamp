import { useState } from "react";

function useCounter() {

  const [counter, setCounter] = useState(0);
  return [counter, setCounter];
}

function Button(props) {
  console.log("button reran");
  return <button onClick={props.increment}>{props.counter}</button>;
}
export default function Home() {
  console.log("rendered");
  const [counter, setCounter] = useCounter();
  return (
    <>
      <h2>Hello from react</h2>
      <Button counter={counter} increment={() => setCounter(counter + 1)} />
      <Button counter={counter} increment={() => setCounter(counter + 1)} />
    </>
  );
}
