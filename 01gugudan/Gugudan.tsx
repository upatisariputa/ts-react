import * as React from "react";
import { useState, useRef } from "react";

const Gugudan = () => {
  const randomNumber = (): number => {
    return Math.ceil(Math.random() * 9);
  };

  const [first, setFirst] = useState(randomNumber());
  const [second, setSecond] = useState(randomNumber());
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputEl.current;
    if (parseInt(value) === first * second) {
      setResult("True");
      setFirst(randomNumber());
      setSecond(randomNumber());
      setValue("");
      if (input) {
        input.focus();
      }
    } else {
      setResult("False");
      setValue("");
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <>
      <div>
        {first} X {second} = ?
      </div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        <button>Input!</button>.0
      </form>
      <div id="result">{result}</div>
    </>
  );
};

export default Gugudan;
