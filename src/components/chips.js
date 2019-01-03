import React from "react";
import "@material/react-chips/dist/chips.css";
import {ChipSet, Chip} from '@material/react-chips';


export class Chips extends React.Component{
render(){
    var sendSelectedChips=function(chips){
        this.props.SendToParent(this.props.FieldName,chips)
    }
    sendSelectedChips=sendSelectedChips.bind(this)
   var Markup= <div style={{margin:"15px 0"}} >  <label className="blue-text" style={{margin:"15px 0",fontSize:"14px"}}>{this.props.title}</label> 
    <div style={{height:"15px"}}></div>
   <ChipSet
   required
  filter
  handleSelect={sendSelectedChips}
>


  <Chip id={'FriendlyStaff'} label='Friendly Staff' />
  <Chip id={'Clienliness'} label='Clienliness' />
  <Chip id={'Location'} label='Location' />
  <Chip id={'Food'} label='Food' />

</ChipSet></div>
    return (Markup)
}}