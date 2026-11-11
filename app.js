
let expression = "";
let justCalculated = false;

const display = document.getElementById("display");
const statusText = document.getElementById("status");

function update() {
    display.value = expression || "0";
}

function add(value) {
    if (justCalculated && /[0-9.]/.test(value)) {
        expression = "";
    }

    justCalculated = false;

    if (expression.length >= 18) return;

    if (/[+\-*/.]$/.test(expression) && /[+\-*/.]/.test(value)) {
        expression = expression.slice(0, -1);
    }

    expression += value;
    update();

    statusText.textContent = "CALCULATING...";
}

function clearDisplay() {
    expression = "";
    justCalculated = false;
    update();
    statusText.textContent = "MEMORY CLEARED";
}

function deleteLast() {
    expression = expression.slice(0, -1);
    update();
}

function calculate() {
    if (!expression) return;

    try {
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Math error");
        }

        expression = String(Number(result.toFixed(10)));
        update();

        justCalculated = true;
        statusText.textContent = "SUCCESS! RESULT FOUND";

    } catch (error) {
        showError();
        statusText.textContent = "SYSTEM ERROR";
    }
}

function showError() {
    const messages = [
        "ТЫ ЧТО НАТВОРИЛ?!",
        "Windows 98 не понимает твою математику.",
        "Ошибка! Позови системного администратора.",
        "Калькулятору нужен отпуск.",
        "Пожалуйста, не ломайте компьютер."
    ];

    document.getElementById("popupText").textContent =
        messages[Math.floor(Math.random() * messages.length)];

    const popup = document.getElementById("popup");

    popup.style.display = "block";
    popup.style.left = "50%";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%)";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.addEventListener("keydown", function(e) {
    if (/^[0-9.]$/.test(e.key)) add(e.key);
    else if (["+", "-", "*", "/"].includes(e.key)) add(e.key);
    else if (e.key === "Enter") calculate();
    else if (e.key === "Backspace") deleteLast();
    else if (e.key === "Escape") clearDisplay();
});

function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit"
        });
}

updateClock();
setInterval(updateClock, 1000);
