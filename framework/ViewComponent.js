class ViewComponent {
  constructor() {
    console.log(
      `initializing the ViewComponent... ${this.__proto__.constructor.name}`
    );
    this.state = {};
    this.element = document.querySelector(this.__proto__.constructor.name);
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
