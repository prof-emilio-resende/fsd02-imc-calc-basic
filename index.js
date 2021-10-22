function createRequest(method, body = "") {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json; charset=UTF-8;",
    },
    body: JSON.stringify(body),
  };
}

function handleCalculateImcResponse(rawResponse) {
  if (rawResponse.status == 200) {
    rawResponse
      .json()
      .then((res) => {
        this.renderFc(res.imc + " " + res.imcDescription);
      })
      .catch((err) => {
        console.log("Return is not on the right format (JSON)");
        console.error(err);
      });
  } else {
    throw new Error("well, this is bad... sth wrong at backend...");
  }
}

async function calculateImcApi(renderFunction) {
  const obj = { renderFc: renderFunction };
  try {
    request = createRequest("POST", this);
    let response = await fetch("http://localhost:8080/imc/calculate", request);
    handleCalculateImcResponse.call(obj, response);
  } catch(e) {
    console.error("boom!");
    console.error(JSON.stringify(e));
  }
}

function Person(height, weight) {
  if (typeof height !== "number" || isNaN(height))
    throw Error("height is not a number");

  if (typeof weight !== "number" || isNaN(weight))
    throw Error("height is not a number");

  if (height <= 0 || weight <= 0)
    throw Error("height and weight must be bigger than zero");

  this.height = height;
  this.weight = weight;
}

function Dietician(height, weight) {
  Person.call(this, height, weight);
  this.imc = function (renderFunction) {
    calculateImcApi.call(this, renderFunction);
  };
}

Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

function renderText(text, targetId) {
  document.getElementById(targetId).innerHTML = text;
}

function buildCalculateImc() {
  var weightElement = document.getElementById("weight");
  var heightElement = document.getElementById("height");

  return function (evt) {
    console.log(evt);
    var weight = parseFloat(weightElement.value);
    var height = parseFloat(heightElement.value);
    new Dietician(height, weight).imc(function (txt) {
      renderText(txt, "imc");
    });
  };
}

console.log("not loaded");

window.onload = function () {
  console.log("loading...");
  var btn = document.querySelector(
    ".data .form .actions button.primary-action"
  );
  btn.addEventListener("click", buildCalculateImc());
};
