import React from "react";


export class Radio extends React.Component{
render(){

var handleChange= function(event){
    this.props.SendToParent(this.props.FieldName,event.target.value)
}
handleChange=handleChange.bind(this)
   var Markup=<div style={{margin:"15px 0"}} >
           
           <label className="blue-text" style={{fontSize:"14px"}}>{this.props.title}</label>
           <div style={{height:"15px"}}></div>
            <div className="row" >
              <label style={{margin:"0 8px "}} >
                <input required  onChange={handleChange} value="1" name="group1" type="radio"  />
                <span>1</span>
              </label>
           
          
              <label  style={{marginRight:"8px"}}>
                <input required name="group1" type="radio"   onChange={handleChange} value="2"/>
                <span>2</span>
              </label>
           
           
              <label  style={{marginRight:"8px"}}>
                <input required  name="group1" type="radio"  onChange={handleChange} value="3"  />
                <span>3</span>
              </label>
              <label  style={{marginRight:"8px"}}>
                <input required  name="group1" type="radio"  onChange={handleChange} value="4"  />
                <span>4</span>
              </label>
              <label  style={{marginRight:"8px"}}>
                <input required name="group1" type="radio"  onChange={handleChange} value="5"  />
                <span>5</span>
              </label>
              
              </div>
           
          </div>
          return(
              Markup
          )
}}