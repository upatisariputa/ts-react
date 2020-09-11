import * as React from "react";
import { useState, useCallback, useRef } from "react";

const WordChain = () => {
  const [word, setWord] = useState<string>("Peter");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("Correct!");
        setWord(value);
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
    },
    [word, value]
  );
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordChain;
