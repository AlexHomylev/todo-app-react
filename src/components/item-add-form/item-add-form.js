import React from 'react';

import './item-add-form.css';

export default class AddForm extends React.Component {

state = {
  label:''
}

onLableChange = (e) => {
  this.setState({
    label: e.target.value
  });
};

onSubmit = (e) => {
  e.preventDefault();
  this.props.onAddItem(this.state.label);
  this.setState({
    label:''
  });
}

  render () {
    return (
      <form className="item-add-form d-flex" onSubmit={ this.onSubmit }>
        <input type="text" className="form-control" placeholder="Wat to dо?" onChange={this.onLableChange} value={this.state.label}/>
        <button className="btn btn-outline-secondary">Add</button>
      </form>
    );
  };
}
