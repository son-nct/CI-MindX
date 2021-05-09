import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      information: {
        name: "Sơn",
        age: 21,
      },
      undone: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      done: [],
    };
  }

  renderUndoneList = () => {
    return this.state.undone.map((element, index) => {
      return (
        <li onClick={() => {this.changeItemToAnotherList(element, index)}} className="todo-item">
        {element}
      </li>
      );
    });
  };

  renderDoneList = () => {
    return this.state.done.map((element, index) => {
      return (
        <li onClick={() => {this.changeItemToAnotherList(element, index)}} className="todo-item">
          {element}
        </li>
      );
    });
  };

  changeItemToAnotherList = (element, index) => {
    const newUndone = this.state.undone;
    const newDone = this.state.done;

    //check which array contains items
    if (this.state.undone.includes(element)) {
      
      var clickedItem = this.state.undone.splice(index, 1);
      this.state.done.push(clickedItem);

    } else if (this.state.done.includes(element)) {

      var clickedItem = this.state.done.splice(index, 1);
      this.state.undone.push(clickedItem);
    }

    this.setState({
      undone: newUndone,
      done: newDone,
    });
  };

  render() {
    return (
      <div className="app">
        <h1 className="title-app">Todo App</h1>

        <div className="todo-container">
          <div className="todo-container-header">TODO</div>
          <ul className="todo-list">{this.renderUndoneList()}</ul>
        </div>

        <div className="complete-container">
          <div className="complete-container-header">COMPLETED</div>
          <ul className="todo-list">{this.renderDoneList()}</ul>
        </div>
      </div>
    );
  }
}

export default App;
