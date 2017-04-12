import React , { Component} from 'react';
import {Link} from "react-router";
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import jsPDF from 'jspdf'

class check_balance extends Component {
	constructor(props){
    super(props);
    this.pdfToHTML=this.pdfToHTML.bind(this);
  }
  pdfToHTML(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = document.getElementById('HTMLtoPDF');
    var specialElementHandlers = {
      '#bypassme': function(element, renderer) {
        return true
      }
    };

    var margins = {
      top: 50,
      left: 60,
      width: 545
    };
      pdf.fromHTML (
      source // HTML string or DOM elem ref.
      , margins.left // x coord
      , margins.top // y coord
      , {
          'width': margins.width // max width of content on PDF
          , 'elementHandlers': specialElementHandlers
        },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        // this allow the insertion of new lines after html
        pdf.save('balance.pdf');
      }
    )
  }
	render(){
		return(
			<div>
			<div id="HTMLtoPDF">
				<div><h3>Welcome to Gurkha Welfare Scheme <strong>{cookie.load('user').user.firstName}</strong></h3></div>
				<div>Amount Reamining Rs. {this.props.amount}</div>
				</div>
				<button onClick={this.pdfToHTML}>Download PDF</button>
			</div>
			)
	}
	
	}
function mapStateToProps(state) {	
	
  return {
    
    amount:state.amount.amount
  };
}
export default connect(mapStateToProps, {})(check_balance);