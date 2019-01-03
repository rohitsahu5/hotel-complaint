import React from "react";
import firebase from "firebase"
import {Recap} from "./recapt"
export class OtpSwitch extends React.Component{
constructor(){
    super()
    this.state={
        value:false,
        BtnDisbled:true,
        Error:false,
        number:0
    }
    this.RenderNumberForm=this.RenderNumberForm.bind(this)
    this.onChangeText=this.onChangeText.bind(this)
    this.SignInFirebase=this.SignInFirebase.bind(this)
    this.onChangeOtp=this.onChangeOtp.bind(this)
    this.VerifyOtp=this.VerifyOtp.bind(this)
    firebase.auth().languageCode = 'en';
    this.do=this.do.bind(this)
}
onChangeOtp(e){
    this.setState({
        otp:e.target.value
    })
}
VerifyOtp(){
    this.state.ConformationResult.confirm(this.state.otp).then(result=>{
        console.log("verified")
        this.props.SendToParent("PhoneNumber",this.state.number)

        this.setState({optVerified:true})
    })
    
}
RenderOtpForm(){

    var Markup
    if(this.state.SmsSent)
     Markup=<div className="input-field row">
      
    <div className="col s6">

      <input required onChange={this.onChangeOtp} maxLength="10" id="OtpCode" type="number" />
<label  className="blue-text" htmlFor="OtpCode">Enter OTP</label>
</div>
    <div className="col s6">  <button onClick={this.VerifyOtp}  type="button" className="waves-effect waves-light btn white blue-text"> Verify</button></div>
    </div>
if(this.state.optVerified){
    Markup=<div className="input-field row">
      
<h3 className="Blue-text"> <i className="material-icons">check</i> Verified</h3>
    </div>
}
    
    return Markup
}
do(){
    this.SignInFirebase("+91"+this.state.number)
}
SignInFirebase(number){
    console.log("starting to send ")
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(number,appVerifier).then(
        ConformationResult=>{
            this.setState({ConformationResult:ConformationResult})
           this.setState({SmsSent:true})
        }
    )
}

onChangeText(e){
    this.setState({number:e.target.value})
    if(e.target.value.toString().length !==10){
        this.setState({Error:true,errorText:"Enter full 10 digit number",BtnDisbled:true})
        
    }
    else{
        this.setState({Error:false,errorText:"Ok",BtnDisbled:false})
    }
}
RenderNumberForm(){
 
      var Markup= <div ><div className="input-field row">
      
      <div className="col s9">

        <input required  className={ this.state.Error? "validate invalid" : ""}  onChange={this.onChangeText} maxLength="10" id="NoForOtp" type="number" />
  <label  className="blue-text" htmlFor="NoForOtp">Enter number</label>
  <span className="helper-text" data-error={this.state.errorText} data-success="OK"> </span>
  </div>
      <div className="col s3">  <button onClick={this.do}  type="button" id="SendOtpBtn" disabled={this.state.BtnDisbled?"disabled" :""} className="waves-effect waves-light btn white blue-text"> Send Otp</button></div>
      </div>
      
      <Recap/>
      </div>

      
 
    if(this.state.value){
        return Markup
    }
 
}

render(){
    

   var onSwitch=function(e){
        this.setState({
            value:!this.state.value
        })
    }
    onSwitch=onSwitch.bind(this)

   var Markup=<div><div className="switch" style={{margin:"15px 0"}}>
    <label className="blue-text" style={{fontSize:"14px"}}>{this.props.title}</label>
          <label>
  <div style={{height:"15px"}}></div>
  <input onChange={onSwitch} type="checkbox"/>
  <span className="lever"></span>
  {this.state.value?"Yes":"no"}
    </label></div>
{ this.RenderNumberForm()  }
{ this.RenderOtpForm()}
    </div>
  
    return Markup
}

}