export default class ViewComponent {
  constructor(bindName) {
    console.log(
      `initializing the ViewComponent... ${bindName}`
    );
    this.state = {};
    this.element = document.querySelector(bindName);
  }

  onLoad() {
    this.paint();
  }

  paint() {
    this.element.innerHTML = this.render();
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
