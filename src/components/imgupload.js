import React from "react";


export class ImgUpload extends React.Component{
render(){

    var handleChange=function(e){
        this.props.SendToParent(this.props.FieldName,e.target.files[0])
    }
    handleChange=handleChange.bind(this)
   var Markup=<div className = "row">
        
    <label  style={{fontSize:"14px"}} className="blue-text">{this.props.title}</label>
    <div className = "file-field input-field">
       <div className = "btn blue">
          <span>Browse</span>
          <input type = "file" onChange={handleChange} required accept="image/*"/>
       </div>
       <div className = "file-path-wrapper">
          <input   className = "file-path validate" type = "text"
             placeholder = "Upload file" />
       </div>
       </div>
    
       </div>
    return Markup
}}