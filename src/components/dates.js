import React from "react";
import Materialize from 'materialize-css';


export class Dates extends React.Component {


    render() {

        var toDateString = (inputObj) => {
            return (inputObj.getDay() + "/" + (inputObj.getMonth() + 1) + "/" + inputObj.getFullYear())
        }
        var onSelectStart = (dateObj) => {
            var date = toDateString(dateObj)
            this.props.SendToParent(this.props.FieldName[0], date)
        }
        var onSelectEnd = (dateObj) => {
            var date = toDateString(dateObj)
            this.props.SendToParent(this.props.FieldName[1], date)

        }
        var Markup =
            (<div className="row">
                <div className="input-field col s6">
                    <input required id="StartDate" type="text" className="datepicker"></input>
                    <label className="blue-text" htmlFor="StartDate">{this.props.title[0]}</label> </div>
                <div className="input-field col s6">
                    <input required ref={this.fieldRef2} id="EndDate" type="text" className="datepicker"></input>
                    <label className="blue-text" htmlFor="EndDate">{this.props.title[1]}</label> </div>

            </div>)
        document.addEventListener('DOMContentLoaded', function () {
            var elem1 = document.querySelectorAll('.datepicker#StartDate');
            var elem2 = document.querySelectorAll('.datepicker#EndDate');

            Materialize.Datepicker.init(elem1, {
                onSelect: onSelectStart
            });


            Materialize.Datepicker.init(elem2, {
                onSelect: onSelectEnd
            });
        });
        return (
            Markup

        )
    }

}