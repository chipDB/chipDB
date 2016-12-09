import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActiveAccount } from '../actions/activeAccount';
import { bindActionCreators } from 'redux';
import { getMainAccount } from '../actions/getMainAccount';

class LoginForm extends Component {

  handleSubmit (event) {
    event.preventDefault();
    var forms = document.forms.accountEntry;
    this.props.setActiveAccount(forms.accountInput.value);
    console.log('this.props.activeAccount', this.props.activeAccount);
  }

  componentDidMount () {
    const self = this;

    const accountPromise = new Promise(
      function(resolve, reject) {
        self.props.web3.eth.getAccounts((err, accs) => {
          if(err) return reject(err);
          resolve(accs);
        }) 
      })
    this.props.getMainAccount(accountPromise);
  }

  render () {
    console.log('render',this.props.mainAccount.mainAccount); //TODO: UNNEST THIS
    return (
      <div>
        <form name="accountEntry" onSubmit={this.handleSubmit.bind(this)}>
          <input name="accountInput" value={this.props.mainAccount.mainAccount[0]}/>
          <button className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount,
    mainAccount: state.mainAccount
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setActiveAccount, getMainAccount}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);