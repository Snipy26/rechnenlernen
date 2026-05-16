const aufgabeElement = document.getElementById("aufgabe");
const antwortInput = document.getElementById("antwort");
const feedbackElement = document.getElementById("feedback");
const punkteElement = document.getElementById("punkte");
const lebenElement = document.getElementById("leben");
const prüfenBtn = document.getElementById("prüfenBtn");
const neuStartBtn = document.getElementById("neuStartBtn");

let lösung;
let punkte = 0;
let leben = 3;
let phase = "prüfen"; // 🔥 WICHTIG: nur 2 Zustände


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Operator Auswahl (gewichtet)
function zufälligerOperator() {
    const liste = ["+", "+", "+", "-", "-", "*", "*", "/", "/"];
    return liste[random(0, liste.length - 1)];
}


// Anzeigezeichen
function operatorAnzeige(op) {
    switch (op) {
        case "*": return "×";
        case "/": return "÷";
        case "-": return "−";
        default: return op;
    }
}


// Neue Aufgabe
function neueAufgabe() {

    const operator = zufälligerOperator();

    let zahl1;
    let zahl2;

    if (operator === "+") {
        zahl1 = random(1, 50);
        zahl2 = random(1, 50);
        lösung = zahl1 + zahl2;
    }

    if (operator === "-") {
        zahl1 = random(20, 100);
        zahl2 = random(1, 20);
        lösung = zahl1 - zahl2;
    }

    if (operator === "*") {
        zahl1 = random(1, 10);
        zahl2 = random(1, 10);
        lösung = zahl1 * zahl2;
    }

    if (operator === "/") {
        lösung = random(1, 10);
        zahl2 = random(1, 10);
        zahl1 = lösung * zahl2;
    }

    aufgabeElement.textContent =
        `${zahl1} ${operatorAnzeige(operator)} ${zahl2} = ?`;

    antwortInput.value = "";
    antwortInput.focus();

    feedbackElement.textContent = "";
    feedbackElement.className = "";

    phase = "prüfen";
    prüfenBtn.textContent = "Prüfen";
}


// Prüfen / Weiter Logik
function prüfen() {

    const antwort = Number(antwortInput.value);

    if (phase === "prüfen") {

        if (antwort === lösung) {
            punkte++;
            feedbackElement.textContent = "Richtig! 🎉";
            feedbackElement.className = "richtig";
        } else {
            leben--;
            feedbackElement.textContent = `Falsch! Lösung: ${lösung}`;
            feedbackElement.className = "falsch";
        }

        punkteElement.textContent = punkte;
        lebenElement.textContent = leben;

        if (leben <= 0) {
            spielVerloren();
            return;
        }

        phase = "weiter";
        prüfenBtn.textContent = "Nächste Aufgabe";
    }

    else if (phase === "weiter") {
        neueAufgabe();
    }
}


// Spiel vorbei
function spielVerloren() {

    aufgabeElement.textContent = "Spiel vorbei 😢";

    feedbackElement.textContent =
        `Du hast ${punkte} Punkte erreicht!`;

    prüfenBtn.disabled = true;
    neuStartBtn.classList.remove("hidden");
}


// Neustart
function neuStart() {

    punkte = 0;
    leben = 3;
    phase = "prüfen";

    punkteElement.textContent = punkte;
    lebenElement.textContent = leben;

    prüfenBtn.disabled = false;
    prüfenBtn.textContent = "Prüfen";

    neuStartBtn.classList.add("hidden");

    neueAufgabe();
}


// Events
prüfenBtn.addEventListener("click", prüfen);
neuStartBtn.addEventListener("click", neuStart);

antwortInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") prüfen();
});


// Start
neueAufgabe();

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("./service-worker.js")
        .then(() => {
            console.log("Service Worker aktiv");
        });

}