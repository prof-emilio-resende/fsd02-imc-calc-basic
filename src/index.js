import ImcView from "./views/ImcView.js";
import ImcController from "./controller/ImcController.js";
import Person from "./domain/Person.js";

function buildCalculateImc() {
  var weightElement = document.getElementById("weight");
  var heightElement = document.getElementById("height");
  var imcView = new ImcView();
  imcView.onLoad();
  const imcController = new ImcController();
  const state = imcView.observe({person: new Person(0.1,0.1)});

  return async function (evt) {
    console.log(evt);
    var weight = parseFloat(weightElement.value);
    var height = parseFloat(heightElement.value);
    var p = new Person(height, weight);
    var personResult = await imcController.calculate(p);
    p.imc = personResult.imc;
    p.imcDescription = personResult.imcDescription;
    state.person = p;
  };
}

window.onload = function () {
  console.log("loading...");
  var btn = document.querySelector(
    ".data .form .actions button.primary-action"
  );
  btn.addEventListener("click", buildCalculateImc());
};
