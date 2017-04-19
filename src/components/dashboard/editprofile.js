import React, {Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable'; 
const { DOM: { input, select, textarea } } = React
import {getUser} from '../../actions/UserSearch';
import UserSearch from './UserSearch';
import { updateUser } from '../../actions';
import Modal from'react-modal';
import Dropzone from 'react-dropzone';
import request from 'superagent';
//import EditUser from './editUser';

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
  form: 'editprofile'
});
const renderField = field => (  
    <div>
      <Field className="form-control" component="input" {...field.Field} />    

    </div>
);

class editprofile extends Component {
  constructor(props){
    super(props);
    this.state={
        modalIsOpen : false,
        profile:this.props.profile
      }
    this.handleChange = this.handleChange.bind(this)
  }
componentWillReceiveProps(nextProps){

  if(this.state.profile != nextProps.profile){
    this.state.profile = nextProps.profile
  }
}
getInitialState() {
        return {
          files: []
        };
    }

    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      this.setState({
        files: acceptedFiles
      });
      var photo = new FormData();
        photo.append('photo',acceptedFiles[0]);

        request.post(`${API_URL}/auth/upload/${this.props.params.id}`).send(photo)
        .end(function(err,res){
          if (err){console.log(err);}
          return res;
        });
    }


handleFormSubmit(fp) {
  console.log(this.state.profile)
    //this.props.updateUser(this.state.profile,this.props.params.id);
    //this.setState({modalIsOpen: true});
  }

    closeModal() {
    this.setState({modalIsOpen: false});
}
  handleChange(e)
    { 
      console.log(this.state.profile)
      var newState={}; 

      newState[e.target.name] = e.target.value;
      this.setState({
        profile:{
          ...this.state.profile,
          [e.target.name] : e.target.value
        }
      })
     }
  
   render() {
     const { handleSubmit } = this.props;
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
     console.log('checkbox',this.props.profile.suspended);
     if(this.props.profile.suspended){
      suspend = "checked";
     }
 
   return(
   <div>
     <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
    <div className="row">
        <div className="col-md-6">
          <label>Full Name</label>
          <input name="firstName" ref="firstName" value={this.state.profile.firstName} onChange={this.handleChange} className="form-control" component="input" type="text" />
        </div> 
        <div className="col-md-6">
          <label>Email</label>
          <input name="email" ref="email" className="form-control" component="input" type="text" onChange={this.handleChange} value={this.state.profile.email} />
        </div> 
    </div>
    <div className="row">
        <div className="col-md-6">
          <label>Permanent Address</label>
          <input name="perAddress" className="form-control" component="input" onChange={this.handleChange} type="text" value={this.state.profile.perAddress}/>
        </div> 
        <div className="col-md-6">
          <label>Temporary Address</label>
          <input name="tempAddress" className="form-control" component="input" onChange={this.handleChange} type="text" value={this.state.profile.tempAddress}/>
        </div> 
    </div>
     <div className="row">
          <div className="col-md-6">
            <label>Branch</label>
            <select name="branch" className="form-control" component="select"  onChange={this.handleChange} value={this.state.profile.branch}>
              <option value="">Select One</option>        
              <option value="KATHMANDU">Kathmandu</option>
              <option value="POKHARA">Pokhara</option>
              <option value="CHITWAN">Chitwan</option>
              <option value="DHARAN">Dharan</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>Account Type</label>
            <select name="accountType" className="form-control" component="select" onChange={this.handleChange} value={this.state.profile.accountType}>
              <option value="">Select One</option>     
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>       
            </select>
          </div>
        </div>
    <div className="row">
        <div className="col-md-6">
          <label>Bank Name</label>
          <input name="bankName" className="form-control" component="input" onChange={this.handleChange} type="text" value={this.state.profile.bankName}/>
        </div> 
        <div className="col-md-6">
          <label>Branch of Bank</label>
          <input name="bankBranch" className="form-control" component="input" onChange={this.handleChange} type="text" value={this.state.profile.bankBranch}/>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-6">
          <label>Account Number</label>
          <input name="accountNumber" className="form-control" component="input" onChange={this.handleChange} type="text" value={this.state.profile.accountNumber}/>
        </div> 
        <div className="col-md-6">
          <label>Contact Number</label>
          <input name="contact" className="form-control" component="input" type="text" onChange={this.handleChange} value={this.state.profile.contact}/>
        </div> 
    </div>
    <div className="row">
        <div className="col-md-6">
          <label>Role</label>
          <select name="role" className="form-control" component="select" type="select" onChange={this.handleChange} value={this.state.profile.role}>
              <option value="">Select One</option>     
              <option value="Admin">Admin</option>
              <option value="branchAdmin">Branch Admin</option>              
              <option value="Moderator">Moderator</option>
              <option value="Member">Member</option>  
          </select>
        </div> 
        <div className="col-md-6">
          <label>IFSC Code</label>
          <input name="ifscCode" className="form-control" component="input" type="text" onChange={this.handleChange} value={this.state.profile.ifscCode}/>
        </div> 
    </div>
    
    <button type="submit" className="btn btn-primary">Update</button>
    {popUp}
    </form>

<div className="row">
    <Dropzone onDrop={this.onDrop.bind(this)}
                     className='dropzone'
                    activeClassName='active-dropzone'
                    multiple={false} >
              <div>Click to update image files.</div>
            </Dropzone>
                
    </div>
    </div>
   )
  }
}


function mapStateToProps(state) {

  return {
    profile: state.profile.profile
  };
}

export default connect(mapStateToProps,{getUser,updateUser}) (form(editprofile));