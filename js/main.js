
function updateNumber(value) {
    document.getElementById('numberInput').value = value;
}

function decreaseNumber() {
    var currentValue = parseFloat(document.getElementById('numberInput').value);
    updateNumber(currentValue - 1);
}

function increaseNumber() {
    var currentValue = parseFloat(document.getElementById('numberInput').value);
    updateNumber(currentValue + 1);
}
