import React , { Component} from 'react';
import {Link} from "react-router";
import { connect } from 'react-redux';

class forgot_password extends Component {
	render(){
		return(
		<div>    	
    	 <form onSubmit = {handleSubmit(this.viewUserList.bind(this))} className="form-inline">
          <div className="form-group">
           <Field name="searchBy" className="form-control" component="select" type="text" >
            <option value="withdrawByBranch">Withdraw By Branch</option>
            <option value="withdrawByAccountType">Withdraw By Account Type</option>
            <option value="Bymanual">By Manual</option>
          </Field>
          </div>
          
          <div className="form-group">
            
            <Field name="amount" className="form-control" component="input" type="text" placeholder="amount"/>
                </div>
                
          <button className="btn btn-success" type="submit">Submit</button>
          </form>
      </div>
      )
	}
}
export default forgot_password;