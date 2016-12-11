import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActiveAccount } from '../actions/activeAccount';
import { bindActionCreators } from 'redux';
import { getAccounts } from '../actions/getAccounts';
import { Link } from 'react-router';
import { web3 } from '../web3Controller';

class LoginForm extends Component {
  handleSubmit (event) {
    event.preventDefault();
    const forms = document.forms.accountEntry;
    const value = forms.accountInput.value;
    const account = this.props.Accounts.Accounts
    
    
    // if (account.indexOf(value) === -1) {
    //   console.log('Error!');
    // }
    
   this.props.setActiveAccount(value);
  }

  componentDidMount () {
    if (!this.props.Accounts) {
      const accountPromise = new Promise(
        (resolve, reject) => {
          web3.eth.getAccounts((err, accs) => {
            if(err) return reject(err);
            resolve(accs);
          }) 
        });
      
      this.props.getAccounts(accountPromise);
    }
  }

  render () {
    console.log('Props on Login:', this.props);
    return (
      <div>
        <form name="accountEntry" onSubmit={this.handleSubmit.bind(this)}>
          <input name="accountInput"/>
          <button className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({activeAccount, Accounts}) {
  return { activeAccount, Accounts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setActiveAccount, getAccounts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);