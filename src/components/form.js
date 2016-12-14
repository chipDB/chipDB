import React, { Component } from 'react';

class Form extends Component {
  _handleClick(event) {
    event.preventDefault();
    const array = this.props.schema.map((val)=> {
      const temp = this[val].value;
      this[val].value = '';
      return temp;
    })
    
    this.props.handleSubmit(array);
}
  
  render() {
    console.log('schema', this.props.schema);
    if (!this.props.schema) { return null };
    return (
      <form className='SendCoin'>
        {this.props.schema.map((value, ind)=> {
          return (<div>
            <label htmlFor={value}>{value}</label>
            <input id={value} type='text' ref={(i) => { if(i) { this[value] = i}}} />
          </div>)
        })}
        <br/>
        <button className='SendBtn' onClick={this._handleClick.bind(this)}>Send</button>
      </form>
    )
  }
}

export default Form; 