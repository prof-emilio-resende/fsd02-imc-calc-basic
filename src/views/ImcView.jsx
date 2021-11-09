import React from "react";

import ViewComponent from "../framework/ViewComponent.js";
import Person from "../domain/Person.js";

export default class ImcView extends ViewComponent {
  constructor() {
    super("ImcView"); // the name must be explicit to circumvent minify issues
    this.state = { person: new Person(0.1, 0.1) };
  }

  updateState(state) {
    const newState = {
      ...this.state,
      ...state
    }
    super.updateState(newState);
  }

  render() {
    return (<div className="result">
      <label>Seu IMC &eacute;:</label>
      {this.state.person.imc}&nbsp;
      <span id="imc">{this.state.person.imcDescription}</span>
    </div>)
  }
}