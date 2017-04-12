
import React , { Component} from 'react';
import {Link} from "react-router";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  
import { sendWRequest ,getTotalAmt} from '../../actions/calculate';
import cookie from 'react-cookie'
import Modal from'react-modal';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
const form = reduxForm({  
  form: 'sendRequest'
});

class sendRequest extends Component {
	constructor(props){
		super(props);
		this.state={
			textMes:'',
			modalIsOpen : false,
			whichModal: false
		}
	}
	componentWillMount(){
		//this.props.getTotalAmt(cookie.load('user').user._id)
	}
	//submitRequest(e){
	//	console.log(e.target.name);
	//	console.log(e.target.value);
		//this.setState = {
		//	textMes: 
		//}
	//}
	openModal() {  
      this.setState({modalIsOpen: true})
}
closeModal() {
    this.setState({modalIsOpen: false});
  }
	handleFormSubmit(formProps){		
		if(parseInt(formProps.amount) > parseInt(this.props.amount)){
			this.setState({
				whichModal:true
			})
			this.openModal();
			return;
		}
		//formProps.amount = this.props.amount;
		formProps.name = cookie.load('user').user.firstName;
		formProps.user_id = cookie.load('user').user._id;
		console.log( cookie.load('user').user._id);
		//formProps.user_id = cookie.load('user').user.id;
		this.props.sendWRequest(formProps);
		this.openModal();
	}
	render(){

		 let popUp = null;
		 if(!this.state.whichModal)
      {popUp = <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}  
              style={customStyles}            
              contentLabel="Success Modal">
              Congratulations! Your request has been succesfull send.              
            <button className="btn btn-info" onClick={this.closeModal.bind(this)}>Ok</button>
           </Modal>;
      }
      else if(this.state.whichModal){
      	popUp = <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}  
              style={customStyles}            
              contentLabel="Unsuccess Modal">
              The amount must be less than or equal to {this.props.amount}              
            <button className="btn btn-info" onClick={this.closeModal.bind(this)}>Ok</button>
           </Modal>;
      }
      else {
      	popUp = null;
      }
		const { handleSubmit } = this.props;
		return(
				<div className="container">
					  <div className="col-md-4"></div>
					  <div className="col-md-4">
					  <div><h3> Your total Amount Limit is Rs.{this.props.amount}/- </h3></div>
					  <form className="form-group" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} > 
					  	<div className="form-group">
						Your total amount requested is : <Field component="input" initialValues = {this.props.amount} name="amount" />
						</div>
						Your Message
						<div className="form-group">
							<Field rows="4" cols="50" name="textMes" component="textarea"  />
						</div>
					<button className="btn btn-success" type="submit">Submit Request</button>
					</form>
					 </div>
					  <div className="col-md-4"></div>
					  {popUp}
					  </div>
			)
	}
}

function mapStateToProps(state) {	
	
  return {
    
    amount:state.amount.amount
  };
}

export default connect(mapStateToProps, {sendWRequest, getTotalAmt })(form(sendRequest));