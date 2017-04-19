import React, {Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 
import {getUser} from '../../actions/UserSearch';
import UserSearch from './UserSearch';
import { updateUser } from '../../actions';
import Modal from'react-modal';
import Dropzone from 'react-dropzone';

const API_URL = 'http://localhost:3000/api';
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
  form: 'edituser'
});
const renderField = field => (  
    <div>
      <Field className="form-control" component="input" {...field.Field} />    

    </div>
);

class edituser extends Component {
  constructor(props){
    super(props);
    this.state={
        modalIsOpen : false
      }
    
  }

componentWillMount(){
 // this.state.getUser(this.state.params.id)
  
}
componentWillUpdate(){
 // this.state.getUser(this.state.params.id)
}
componentWillReceivestate(nextstate){
 // this.state.getUser(this.state.params.id)

}


    closeModal() {
    this.setState({modalIsOpen: false});
}
  handleChange(e)
    { var newState = {}; newState[e.target.name] = e.target.value;
      var nameN = e.target.name;
     this.setState({
      profile :{
        nameN : e.target.value
      }
    }); }
  
   render() {
     const { handleSubmit } = this.state;
     let popUp = null;
      {popUp = <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}  
              style={customStyles}            
              contentLabel="Example Modal">
             You have successfully edited the existing user profile.
  
            <button className="btn btn-info" onClick={this.closeModal.bind(this)}>Ok</button>
           </Modal>;
      }

     var suspend;
     console.log('checkbox',this.state.profile.suspended);
     if(this.state.profile.suspended){
      suspend = "checked";
     }
 
   return(
   <div>
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
    <div className="row">
        <div className="col-md-6">
          <label>Full Name</label>
          <Field name="firstName" defaultValue={this.state.profile.firstName} className="form-control" component="input" type="text" />
        </div> 
        <div className="col-md-6">
          <label>Email</label>
          <input name="email" ref="email" className="form-control" component="input" type="text" onChange={this.handleChange} value={this.props.profile.email} />
        </div> 
    </div>
    <div className="row">
        <div className="col-md-6">
          <label>Permanent Address</label>
          <Field name="perAddress" className="form-control" component="input" type="text" value={this.state.profile.perAddress}/>
        </div> 
        <div className="col-md-6">
          <label>Temporary Address</label>
          <Field name="tempAddress" className="form-control" component="input" type="text" value={this.state.profile.tempAddress}/>
        </div> 
    </div>
     <div className="row">
          <div className="col-md-6">
            <label>Branch</label>
            <Field name="branch" className="form-control" component="select" value={this.state.profile.branch}>
              <option value="">Select One</option>        
              <option value="KATHMANDU">Kathmandu</option>
              <option value="POKHARA">Pokhara</option>
              <option value="CHITWAN">Chitwan</option>
              <option value="DHARAN">Dharan</option>
            </Field>
          </div>
          <div className="col-md-6">
            <label>Account Type</label>
            <Field name="accountType" className="form-control" component="select" value={this.state.profile.accountType}>
              <option value="">Select One</option>     
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>       
            </Field>
          </div>
        </div>
    <div className="row">
        <div className="col-md-6">
          <label>Bank Name</label>
          <Field name="bankName" className="form-control" component="input" type="text" defaultValue={this.state.profile.bankName}/>
        </div> 
        <div className="col-md-6">
          <label>Branch of Bank</label>
          <Field name="bankBranch" className="form-control" component="input" type="text" defaultValue={this.state.profile.bankBranch}/>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-6">
          <label>Account Number</label>
          <Field name="accountNumber" className="form-control" component="input" type="text" defaultValue={this.state.profile.accountNumber}/>
        </div> 
        <div className="col-md-6">
          <label>Contact Number</label>
          <Field name="contact" className="form-control" component="input" type="text" defaultValue={this.state.profile.contact}/>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-6">
          <label>Role</label>
          <Field name="role" className="form-control" component="select" type="select" defaultValue={this.state.profile.role}>
              <option value="">Select One</option>     
              <option value="Admin">Admin</option>
              <option value="branchAdmin">Branch Admin</option>              
              <option value="Moderator">Moderator</option>
              <option value="Member">Member</option>  
          </Field>
        </div> 
        <div className="col-md-6">
          <label>IFSC Code</label>
          <Field name="ifscCode" className="form-control" component="input" type="text" value={this.state.profile.ifscCode}/>
        </div> 
    </div>
    
    <button type="submit" className="btn btn-primary">Update</button>
    {popUp}
    </form>

    </div>
   )
  }
}


export default connect(form(edituser));