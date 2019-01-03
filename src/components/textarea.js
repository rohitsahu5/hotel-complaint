import React from "react";

export class TextArea extends React.Component{

    render(){
        var onChangeText= function(event){
               this.props.SendToParent(this.props.FieldName,event.target.value)
        }
        onChangeText=onChangeText.bind(this)


        var Markup=  <div className="input-field">
        <textarea  className="materialize-textarea" required onChange={onChangeText}  id={this.props.title} type="text" />
        <label  className="blue-text" htmlFor={this.props.title}>{this.props.title}</label>
        </div>
        return(
            Markup
        )
    
    }

    }