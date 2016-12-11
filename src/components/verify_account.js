import React, { Component } from 'React';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class VerifyAccount extends Component {
    
    static contextTypes = {
      router: React.PropTypes.object
    }
    
    componentWillMount() {
      if (!this.props.activeAccount) {
        this.context.router.push('/login');
      }
    }
  
    componentWillUpdate(nextProps) {
      if (!this.props.activeAccount) {
        this.context.router.push('/login');
      }
    }
  
    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  
  function mapStateToProps({activeAccount}) {
    return {activeAccount};
  }
    
  return connect(mapStateToProps)(VerifyAccount);
}