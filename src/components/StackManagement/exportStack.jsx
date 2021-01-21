import React, { Component } from "react";
// Icons
import Download from "../icons/export";
// hooks
// import useDB_Connection from "../../Data/DB-hook/connection-hook";
// Icons

export default class ExportStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      currentStack: props.currentStack,
    };
    // methods
    this.prepareData = this.prepareData.bind(this);
    this.exportHandler = this.exportHandler.bind(this);
    this.exportButton = this.exportButton.bind(this);
    this.infoOnExport = this.infoOnExport.bind(this);
  }

  ////////////////
  // Implemntation methods
  ////////////////

  prepareData() {
    // Data selection: omits the '_id' and 'created by id' of the stack for security reasons
    let dataToExport = this.state.currentStack;
    delete dataToExport.id;
    dataToExport.createdBy =
      this.state.currentUser.firstName + " " + this.state.currentUser.lastName;
    // Data preparation
    let data = JSON.stringify(dataToExport, null, 4);
    console.log("export:", data, typeof data);
    this.exportHandler(data);
  }

  exportHandler(stackData) {
    // Data exporting to file
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([stackData], { type: "text/plain" }));
    a.setAttribute("download", "yourStackData.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log("Export handler");
  }

  ////////////////
  // View methods
  ////////////////

  exportButton() {
    return (
      <div id="exportStackButton_Positioning">
        <div className="flipContainer">
          <div className="flipInner">
            <button
              className="buttonStyle"
              type="button"
              onClick={this.prepareData}
            >
              <div className="flipFront">
                <Download />
              </div>
              <div className="flipBack">
                <span className="buttonMessage">Download</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  infoOnExport() {
    return (
      <React.Fragment>
        <div>
          <h3>
            Your current stack is:
            <strong className="currentSelectedStack">
              {" "}
              {this.state.currentStack.stackName}
            </strong>
          </h3>
          <p>
            Clicking the button will export the current stack to a file. This
            file will be downloaded by your browser. Depending on local
            system/OS configurations, you night need to authorize this or allow
            it.
          </p>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div id="exportCurStackWrapper">
          <div>{this.infoOnExport()}</div>
          <div>{this.exportButton()}</div>
        </div>
      </React.Fragment>
    );
  }
}
