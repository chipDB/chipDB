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
    // this.firstName.value = '';
    // this.lastName.value = '';
    // this.address.value = '';
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


//  <form className='SendCoin'>
//         <label htmlFor='first_name'>First Name</label>
//         <input id='first_name' className='RecipientAddress' type='text' ref={(i)=>{ if(i) { this.firstName = i}}} />
//         <label htmlFor='last_name'>Last Name</label>
//         <input id='last_name' className='SendAmount' type='text' ref={(i) => { if(i) { this.lastName = i}}} />
//         <label htmlFor='address'>Address</label>
//         <input id='address' className='SendAmount' type='text' ref={(i) => { if(i) { this.address = i}}} />
//         <br/>
//         <button className='SendBtn' onClick={this._handleClick.bind(this)}>Send</button>
//       </form>