function Person(height, weight) {
    if (typeof(height) !== "number" || isNaN(height))
        throw Error("height is not a number");

    if (typeof(weight) !== "number" || isNaN(weight))
        throw Error("height is not a number");

    if (height <= 0 || weight <= 0) 
        throw Error("height and weight must be bigger than zero");

    this.height = height;
    this.weight = weight;
}

function Dietician(height, weight) {
    Person.call(this, height, weight);
    this.imc = function() {
        var imcValue = this.weight / this.height ** 2;
        var imcText = doTranslateImc(imcValue);
        return imcValue + " " + imcText;
    }
}

Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

function doTranslateImc(imc) {
    if (imc < 18.5) return "magreza";
    else if (imc < 24.9) return "normal";
    else if (imc < 30) return "sobrepeso";
    else return "obesidade";
}

function renderText(text, targetId) {
    document.getElementById(targetId).innerHTML = text;
}

function calculateImc() {
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    
    renderText(new Dietician(height, weight).imc(), "imc");
}

window.onload = function() {
    var btn = document.querySelector(".data .form .actions button.primary-action");
    btn.addEventListener("click", calculateImc);
}
