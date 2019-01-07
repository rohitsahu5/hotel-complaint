import React from "react";
import Materialize from 'materialize-css';


export class Dates extends React.Component {
    constructor() {
        super()
        this.state = {
            minDateStart: ""
            , startDate: "",
            minDateEnd: "",
            today: new Date(),
            dayaftertoday: new Date().setDate(new Date().getDate() + 1)
        }

    }
    setDateConstraints = () => {
        this.setState({
            minDateStart: this.dateConverter(this.state.today),
            minDateEnd: this.dateConverter(this.state.dayaftertoday)
        })
    }
    dateConverter = (indate) => {
        var dtToday = new Date(indate);

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();

        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        return maxDate
    }
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
                onSelect: onSelectStart,
                minDate: new Date()
            });


            Materialize.Datepicker.init(elem2, {
                onSelect: onSelectEnd,
                minDate: new Date()
            });
        });
        return (
            Markup

        )
    }
    componentDidMount() {
        this.setDateConstraints(new Date())
    }
}