function renderText(text, targetId) {
  document.getElementById(targetId).innerHTML = text;
}

function buildCalculateImc() {
  var weightElement = document.getElementById("weight");
  var heightElement = document.getElementById("height");
  var imcController = new ImcController();

  return async function (evt) {
    console.log(evt);
    var weight = parseFloat(weightElement.value);
    var height = parseFloat(heightElement.value);
    var p = new Person(height, weight);
    var personResult = await imcController.calculate(p);
    renderText(`${personResult.imc} ${personResult.imcDescription}`, "imc");
  };
}

window.onload = function () {
  console.log("loading...");
  var btn = document.querySelector(
    ".data .form .actions button.primary-action"
  );
  btn.addEventListener("click", buildCalculateImc());
};
