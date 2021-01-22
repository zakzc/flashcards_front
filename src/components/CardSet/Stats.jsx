import React, { Component } from "react";
// hooks
// import { useDB_Connection } from "../../DB/DB-hook/connection-hook";
import RewindIcon from "../icons/rewind";
import StatsIcon from "../icons/stats";

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: props.right,
      wrong: props.wrong,
      lengthOfStack: props.lengthOfStack,
      guesses: props.right + props.wrong,
      percentage: ((props.right / (props.right + props.wrong)) * 100).toFixed(
        2
      ),
    };
    this.reSetGame = props.reSetGame;
    this.reStart = this.reStart.bind(this);
    this.stackLevel = this.stackLevel.bind(this);
    // this.pieChart = this.pieChart.bind(this);
    this.reStartButton = this.reStartButton.bind(this);
    this.gameStatsButton = this.gameStatsButton.bind(this);
    this.gameStatsContents = this.gameStatsContents.bind(this);
    this.statsLayout = this.statsLayout.bind(this);
  }

  ////////////////
  // Implementation methods
  ////////////////

  reStart(event) {
    event.preventDefault();
    // TODO: nodeJs routing to save the data into json (log)??
    // window.location.reload(false);
    this.reSetGame();
    console.log("current card: ", this.state.current);
  }

  // pieChart() {
  //   let correct = parseInt(this.state.percentage, 10) + 0.53;
  //   console.log("correct: ", correct, typeof correct);
  //   let cover = correct.toString() + " 100";
  //   console.log("cover: ", cover, typeof cover);
  //   return (
  //     <div id="pieChartGraph">
  //       {/* <svg id="pieGraph" viewBox="0 0 32 32" transform="rotate(270)">
  //         <circle className="first" strokeDasharray={cover}></circle>
  //       </svg> */}
  //       <svg width="100" height="100" id="pieGraph">
  //         <circle r="25" cx="50" cy="50" class="pie" strokeDasharray={cover} />
  //       </svg>
  //     </div>
  //   );
  // }

  stackLevel() {
    let level = "";
    let infoLevel = "";
    if (this.state.lengthOfStack <= 10) {
      level = " easy";
      infoLevel = " (any stack with less than 10 cards is considered easy).";
    } else if (this.state.lengthOfStack <= 20) {
      level = " in an intermediate level";
      infoLevel =
        " (any stack with more than 10 cards, but less than 20, is considered easy).";
    } else {
      level = " hard";
      infoLevel = " (any stack with more than 20 cards is considered hard).";
    }
    return (
      <div>
        <p>
          {" "}
          This is considered to be
          <strong className="highlight">{level}</strong>
          {infoLevel}
        </p>
      </div>
    );
  }

  ////////////////
  // View methods
  ////////////////

  gameStatsButton() {
    return (
      <button className="buttonStyle" type="button" onClick={this.reStart}>
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <StatsIcon className="buttonStyle" />
            </div>
            <div className="flipBack">
              <span className="buttonMessage">Game statistics</span>
            </div>{" "}
          </div>
        </div>
      </button>
    );
  }

  gameStatsContents() {
    return (
      <div id="gameStatsContents">
        <h2>Game Stats</h2>
        <div>
          You finished your stack. This stack was made up of
          <strong className="highlight"> {this.state.lengthOfStack} </strong>
          cards. {this.stackLevel()}
        </div>
        <p>
          You guessed{" "}
          <strong className="highlight"> {this.state.guesses}</strong> times, of
          which
          <strong className="highlight"> {this.state.wrong} </strong> were
          wrong.
        </p>
        <div id="percentage">
          That means you got{" "}
          <strong className="highlight"> {this.state.percentage}% </strong>of
          your guesses right.
          <br />
          {/* <div id="graphView">
            Graphical view (<strong className="statEmphasis">yellow </strong>{" "}
            represents the right answers):
          </div> */}
          {/* {this.pieChart()} */}
        </div>
      </div>
    );
  }

  gameStats() {
    return (
      <React.Fragment>
        <div>
          {this.gameStatsButton()}
          {this.gameStatsContents()}
        </div>
      </React.Fragment>
    );
  }

  reStartButton() {
    return (
      <button className="buttonStyle" type="button" onClick={this.reStart}>
        <div className="flipContainer">
          <div className="flipInner">
            <div className="flipFront">
              <RewindIcon className="buttonStyle" />
            </div>
            <div className="flipBack">
              <span className="buttonMessage"> Start over</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  reStartTheGame() {
    return (
      <div>
        {this.reStartButton()}
        <h4 id="reStartQuestion">Do you want to re-start the stack?</h4>
      </div>
    );
  }

  //TODO make a an array with the cards that were wrong in CardSet and present them in the stats

  statsLayout() {
    return (
      <div id="gameOverWrap">
        <div id="gameStats">{this.gameStats()}</div>
        <div id="reStartMe">{this.reStartTheGame()}</div>
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.statsLayout()}</React.Fragment>;
  }
}
