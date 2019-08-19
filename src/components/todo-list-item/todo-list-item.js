import React from 'react';
import './todo-list-item.css';

export default class TodoListItem extends React.Component {

  render() {
    const { label, onDeleted, done, important, onToggleDone, onToggleImportant } = this.props;

    let spanClassName = "todo-list-item";
    if(done){
      spanClassName += " done";
    }
    if(important){
      spanClassName += " important";
    }

    return (
      <span className={spanClassName}>
        <span
          className="todo-list-item-label"
          onClick={ onToggleDone }
          >
          {label}
        </span>
        <button type="button" className="btn btn-outline-success btn-sm float-right" onClick={ onToggleImportant }>
          <i className="fa fa-exclamation" />
        </button>
        <button type="button" className="btn btn-outline-danger btn-sm float-right" onClick={ onDeleted }>
          <i className="fa fa-trash-o" />
        </button>
      </span>

    );
  };
}
