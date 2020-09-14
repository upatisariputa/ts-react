import * as React from "react";
import { useRef, useState, useCallback } from "react";
import Try from "./Try";
import { TryInfo } from "./types";

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const BaseBall = () => {
  console.log("야구");
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [tries, setTries] = useState<TryInfo[]>([]);
  const inputEl = useRef<HTMLInputElement | null>(null);

  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (value === answer.join("")) {
        setTries((t) => [...t, { try: value, result: "Homerun!" }]);
        setResult("HomeRun!");
        alert("Reload The Game!");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        if (input) {
          input.focus();
        }
      } else {
        const answerArray = value.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(
            `You try to 10times! You are defeated the game! Answer is ${answer.join(
              ","
            )}`
          );
          alert("Reload The Game!");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
          if (input) {
            input.focus();
          }
        } else {
          console.log("Answer : ", answer.join(""));
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === answer[i]) {
              console.log("strike", answerArray[i], answer[i]);
              strike += 1;
            } else if (answer.includes(answerArray[i])) {
              console.log(
                "ball",
                answerArray[i],
                answer.indexOf(answerArray[i])
              );
              ball += 1;
            }
          }
          setTries((t) => [
            ...t,
            { try: value, result: `${strike} Strike, ${ball} Ball` },
          ]);
          setValue("");
          if (input) {
            input.focus();
          }
        }
      }
    },
    [value, answer]
  );
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Input!</button>
      </form>
      <div>Try: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`{${i + 1} try : ${v.try}}`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default BaseBall;
