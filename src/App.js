import { db, storage } from "./firebase"
import React, { Component } from 'react';
import { TextField } from "./components/textfield.js";
import { Radio } from "./components/radio.js"
import { Dates } from "./components/dates.js";
import { Chips } from "./components/chips";
import { Select } from "./components/select";
import { TextArea } from "./components/textarea";
import { ImgUpload } from "./components/imgupload"
import { OtpSwitch } from "./components/otpswitch"
import Materialize from 'materialize-css';

import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      DisableSubmit: false
    }
    Materialize.validate_field = function (object) {
      //do nothing
    }

  }
  stateChanger = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  RefeshPage = () => {
    window.location.reload()
  }
  onSubmitForm = (e) => {

    e.preventDefault();
    if (this.state["error_on_First Name"]) {
      Materialize.toast({ html: 'error on First Name', classes: "red" })

    }
    else if (this.state["error_on_Last Name"]) {
      Materialize.toast({ html: 'error on Last Name', classes: "red" })

    }
    else if (typeof this.state.ComplaintTopic == "undefined" || this.state.ComplaintTopic.length === 0) {
      Materialize.toast({ html: 'please select A complaint topic', classes: "red" })
    }
    else if (typeof this.state.likings == "undefined" || this.state.likings.length === 0) {
      this.setState({ likings: [] })
    }

    else {
      Materialize.toast({ html: 'Submitting Form' })
      var Payload = {
        name: this.state.FirstName + " " + this.state.LastName,
        StartDate: this.state.StartDate,
        EndDate: this.state.EndDate,
        Stars: this.state.Stars,
        Likings: this.state.likings,
        ComplaintTopic: this.state.ComplaintTopic,
        Details: this.state.Details,
      };
      if (typeof this.state.PhoneNumber != "undefined" && this.state.PhoneNumber.toString().length === 10) {
        Payload["PhoneNumber"] = "+91" + this.state.PhoneNumber.toString();
      }

      var nextIndex;
      db.ref("complaints/").once("value").then(result => {
        nextIndex = Object.keys(result.val()).length + 1
        db.ref("complaints/" + nextIndex.toString()).set(Payload)
      }).then(
        res => {
          storage.child(nextIndex + this.state.ImgPath.name.split('.').pop()).put(this.state.ImgPath)
        }
      ).then(result => {
        Materialize.toast({ html: 'Submitted Sucessfully ', classes: 'green', completeCallback: this.RefeshPage })
      }).catch(err => {
        console.log(err)
        Materialize.toast({ html: "An Error Occured During Submission", classes: "red" })
      })


    }

  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="card col s10 l4 m6  offset-s1 offset-l4  offset-m3">
            <div className="card-content">
              <span className="card-title blue-text">Submit Complaint</span>
              <form onSubmit={this.onSubmitForm}>
                <TextField SendToParent={this.stateChanger} FieldName="FirstName" title="First Name"></TextField>
                <TextField SendToParent={this.stateChanger} FieldName="LastName" title="Last Name"></TextField>
                <Dates FieldName={["StartDate", "EndDate"]} SendToParent={this.stateChanger} title={["Check in Date", "Check out Date"]}></Dates>
                <div className="divider"></div>
                <Radio FieldName="Stars" SendToParent={this.stateChanger} title="How comfortable was the stay on a scale of 5?"></Radio>

                <Chips FieldName="likings" SendToParent={this.stateChanger} title="What did you like?"></Chips>
                <div className="divider"></div>
                <Select SendToParent={this.stateChanger} FieldName="ComplaintTopic" title="What is the complaint regarding? "></Select>

                <TextArea SendToParent={this.stateChanger} FieldName="Details" title="Some Details "></TextArea>

                <ImgUpload SendToParent={this.stateChanger} FieldName="ImgPath" title="Upload An image "></ImgUpload>
                <div className="divider"></div>

                <OtpSwitch SendToParent={this.stateChanger} FieldName="OtpVerified" title="Should we call you in case we need more info"></OtpSwitch>

                <button disabled={this.state.DisableSubmit ? true : false} style={{ margin: '20px 0', marginLeft: "35%" }} className="  btn waves-effect waves-light blue" type="submit">Submit
    <i className="material-icons right">send</i>
                </button>
              </form>



              <div className="divider"></div>



            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default App;
