class ImcView extends ViewComponent {
  constructor() {
    super();
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
    return '<div class="result">'
      + '<label>Seu IMC &eacute;:</label>'
      + `${this.state.person.imc}&nbsp;<span id="imc">`
      + `${this.state.person.imcDescription}</span>`
      + '</div>';
  }
}