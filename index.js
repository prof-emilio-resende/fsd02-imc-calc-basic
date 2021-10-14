function calculateImc() {
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);

    var imc = doCalcImc(weight, height);
    document.getElementById("imc").innerHTML = imc;
}

function doCalcImc(weight, height) {
    var imcValue = weight / height ** 2;
    var imcText = doTranslateImc(imcValue);
    return imcValue + " " + imcText;
}

function doTranslateImc(imc) {
    if (imc < 18.5) return "magreza";
    else if (imc < 24.9) return "normal";
    else if (imc < 30) return "sobrepeso";
    else return "obesidade";
}