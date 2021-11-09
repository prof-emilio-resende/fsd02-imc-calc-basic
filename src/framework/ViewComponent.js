import React from "react"
import ReactDOM from "react-dom"

export default class ViewComponent {
  constructor(bindName) {
    console.log(
      `initializing the ViewComponent... ${bindName}`
    );
    this.state = {
      bindName
    };
    this.element = document.querySelector(bindName);
  }

  onLoad() {
    this.paint();
  }

  paint() {
    console.log("framework running react create element...")
    const el = React.createElement("div",
      { id: this.state.bindName, className: "react-div" },
      this.render())

    console.log("painting to the DOM...")
    ReactDOM.render(el, this.element)
  }

  render() {
    throw new Error("Componentes precisam sobrescrever render()");
  }

  updateState(state) {
    this.state = state;
    this.paint();
  }

  observe(obj) {
    const self = this;
    if (obj) {
      return new Proxy(obj, {
        set (target, prop, value, receiver) {
          const updated = Reflect.set(target, prop, value);
          self.updateState(target);
          return updated;
        }
      })
    }

    return obj;
  }
}
