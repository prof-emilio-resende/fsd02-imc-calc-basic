function createRequest() {
    var r = null;

    try {
        r = new XMLHttpRequest();
    } catch(tryMS) {
        try {
            r = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                r = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                console.warn("no way to create request obj");
            }
        }
    }

    return r;
}

function handleCalculateImcResponse() {
    console.log(this);
    if (this.readyState == 4) {
        if (this.status == 200) {
            var p = JSON.parse(this.responseText);
            if (p) {
                this.renderFc(p.imc + " " + p.imcDescription);
            }
        } else {
            throw Error("well, this is bad... sth wrong at backend...");
        }
    }
}

function calculateImcApi(renderFunction) {
    request = createRequest();
    if (!request) return null;

    request.renderFc = renderFunction;
    request.onreadystatechange = handleCalculateImcResponse.bind(request);
    request.open("POST", "http://localhost:8080/imc/calculate", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(this));
}

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
    this.imc = function(renderFunction) {
        calculateImcApi.call(this, renderFunction);
    }
}

Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

function renderText(text, targetId) {
    document.getElementById(targetId).innerHTML = text;
}

function buildCalculateImc() {
    var weightElement = document.getElementById("weight");
    var heightElement = document.getElementById("height");

    return function(evt) {
        console.log(evt);
        var weight = parseFloat(weightElement.value);
        var height = parseFloat(heightElement.value);
        new Dietician(height, weight)
            .imc(function(txt){ renderText(txt, "imc"); })
    }
}

console.log('not loaded');

window.onload = function() {
    console.log('loading...');
    var btn = document.querySelector(".data .form .actions button.primary-action");
    btn.addEventListener("click", buildCalculateImc());
}
