import * as React from "react";
import { Component } from "react";

const rspCoords = {
  rock: "0",
  scissors: "-142px",
  paper: "-284px",
} as const;
const scores = {
  rock: 0,
  scissors: -1,
  paper: 1,
};

type ImgCoords = typeof rspCoords[keyof typeof rspCoords];
const computerChoice = (imgCoords: ImgCoords) => {
  return (Object.keys(rspCoords) as ["rock", "scissors", "paper"]).find((k) => {
    return rspCoords[k] === imgCoords;
  })!;
};

interface State {
  result: string;
  imgCoords: ImgCoords;
  score: number;
}

class RSP extends Component<{}, State> {
  state: State = { result: "", imgCoords: rspCoords.rock, score: 0 };

  interval: number | null = null;

  componentDidMount() {
    this.interval = window.setInterval(this.changeHand, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval!);
  }

  changeHand = () => {
    const { imgCoords } = this.state;
    if (imgCoords === rspCoords.rock) {
      this.setState({
        imgCoords: rspCoords.scissors,
      });
    } else if (imgCoords === rspCoords.scissors) {
      this.setState({
        imgCoords: rspCoords.paper,
      });
    } else if (imgCoords === rspCoords.paper) {
      this.setState({
        imgCoords: rspCoords.rock,
      });
    }
  };

  onClickBtn = (choice: keyof typeof rspCoords) => () => {
    const { imgCoords } = this.state;
    clearInterval(this.interval!);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoords)!];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "changed",
      });
    } else if ([1, 2].includes(diff)) {
      this.setState((prevState) => {
        return { result: "win", score: prevState.score + 1 };
      });
    } else {
      this.setState((prevState) => {
        return { result: "You lose", score: prevState.score - 1 };
      });
    }
    setTimeout(() => {
      (this.interval! = window.setInterval(this.changeHand, 100)), 1000;
    });
  };

  render() {
    const { result, score, imgCoords } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`,
          }}
        />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("rock")}>
            바위
          </button>
          <button
            id="scissors"
            className="btn"
            onClick={this.onClickBtn("scissors")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("paper")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}
