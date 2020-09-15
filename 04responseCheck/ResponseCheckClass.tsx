import * as React from "react";
import { Component } from "react";

interface State {
  state: "waiting" | "now" | "ready";
  message: string;
  result: number[];
}

class ResponseCheckClass extends Component<{}, State> {
  state: State = {
    state: "waiting",
    message: "Start to Click",
    result: [],
  };

  timeout: number | null = null;
  startTime: number | null = null;
  endTime: number | null = null;

  onClickScreen = () => {
    const { state } = this.state;
    if (state === "waiting") {
      this.timeout = window.setTimeout(() => {
        this.setState({
          state: "now",
          message: "Click Now",
        });
        this.startTime = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000);
      this.setState({
        state: "ready",
        message: "Click if change to green",
      });
    } else if (state === "ready") {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.setState({
        state: "waiting",
        message: `It's to early, click if this is green`,
      });
    } else if (state === "now") {
      this.endTime = new Date().getTime();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "Start to click",
          result: [...prevState.result, this.endTime! - this.startTime!],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>
          Average Time : {result.reduce((a, c) => a + c) / result.length}
        </div>
        <button onClick={this.onReset}></button>
      </>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheckClass;
