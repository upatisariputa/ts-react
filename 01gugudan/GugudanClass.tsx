import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";

interface State {
  first: number;
  second: number;
  value: string;
  result: string;
}

class Gugudan extends Component<{}, State> {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState((prevState) => {
        return {
          result: "True: " + prevState.value,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: "",
        };
      });
      if (this.input) {
        this.input.focus();
      }
    } else {
      this.setState({
        result: "False",
        value: "",
      });
      if (this.input) {
        this.input.focus();
      }
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };
  input: HTMLInputElement | null = null;
  onRefInput = (c: HTMLInputElement) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>
          {this.state.first} X {this.state.second} = ?{" "}
        </div>
        <form onSubmit={this.onSubmit}>
          <input ref={this.onRefInput} type="number" value={this.state.value} onChange={this.onChange} />
          <button>Input!</button>
        </form>
      </>
    );
  }
}

export default Gugudan;
