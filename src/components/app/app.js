import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {

maxId = 100;

  state = {
     todoData : [
       this.createTodoItem('Drink coffee'),
       this.createTodoItem('Make awesom App'),
       this.createTodoItem('Call Dmitriy'),
       this.createTodoItem('Take a gun'),
    ],
    term : '',
    filter: 'all'
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      const newArray = [...before, ...after];

      return {
        todoData: newArray
      }
    });
  };

createTodoItem(label) {
  return {
      label,
      important: false,
      done: false,
      id: this.maxId++
  }
}

addItem = (text, id) => {
  console.log("Item add", text);
  const newItem = {
    label: text,
    important: false,
    id: this.maxId++
  }
  this.setState(({todoData}) => {
    const newArr = [...todoData, newItem];
    return {
      todoData: newArr
    }
  });
};

toggleProperty(arr, id, propName) {
  const idx = arr.findIndex((el) => el.id === id);

  const oldItem = arr[idx];
  const newItem = {...oldItem, [propName]: !oldItem[propName]};

  return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];

}

onToggleImportant = (id) => {
  this.setState(({todoData}) => {
    return {
    todoData: this.toggleProperty(todoData, id, 'important')
    };
  });
};

onToggleDone = (id) => {
  this.setState(({todoData}) => {
    return {
      todoData: this.toggleProperty(todoData, id, 'done')
    };
  });
};

onSearchChange = (term) => {
    this.setState({term});
};

onFilterChange = (filter) => {
    this.setState({filter});
};

search = (items, term) => {
  if(term.lenght === 0){
    return items;
  }
  return items.filter((item) => {
    return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
  });
}

filter(items, filter){
  switch(filter){
    case 'all':
      return items;
    case 'active':
      return items.filter((item) => !item.done);
    case 'done':
      return items.filter((item) => item.done);
    default:
      return items;
  }

}

render() {
  const {todoData, term, filter} = this.state;

  const visibleItems = this.filter(this.search(todoData, term), filter);
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.filter((el) => !el.done).length;

  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={this.onSearchChange}/>
        <ItemStatusFilter
          filter={ filter }
          onFilterChange={this.onFilterChange}/>
      </div>

      <TodoList
        todos={visibleItems}
        onDeleted={ this.deleteItem }
        onToggleImportant={ this.onToggleImportant }
        onToggleDone={ this.onToggleDone }
        />

      <AddForm onAddItem={this.addItem}/>
    </div>
  );
}
}
