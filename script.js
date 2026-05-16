const aufgabeElement =
    document.getElementById("aufgabe");

const antwortInput =
    document.getElementById("antwort");

const feedbackElement =
    document.getElementById("feedback");

const punkteElement =
    document.getElementById("punkte");

const lebenElement =
    document.getElementById("leben");

const prüfenBtn =
    document.getElementById("prüfenBtn");

const neuStartBtn =
    document.getElementById("neuStartBtn");

    function operatorAnzeige(op) {

    switch (op) {

        case "*":
            return "×";

        case "/":
            return "÷";

        case "+":
            return "+";

        case "-":
            return "−";

        default:
            return op;
    }
}

let lösung;
let punkte = 0;
let leben = 3;

// 🔥 neuer Zustand
let wartetAufNächste = false;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function neueAufgabe() {

    const operatoren = ["+", "-", "*", "/"];

    const operator =
        operatoren[Math.floor(Math.random() * operatoren.length)];

    let zahl1;
    let zahl2;

    switch (operator) {

        case "+":
            zahl1 = random(1, 50);
            zahl2 = random(1, 50);
            lösung = zahl1 + zahl2;
            break;

        case "-":
            zahl1 = random(20, 100);
            zahl2 = random(1, 20);
            lösung = zahl1 - zahl2;
            break;

        case "*":
            zahl1 = random(1, 12);
            zahl2 = random(1, 12);
            lösung = zahl1 * zahl2;
            break;

        case "/":
            lösung = random(1, 12);
            zahl2 = random(1, 12);
            zahl1 = lösung * zahl2;
            break;
    }

    aufgabeElement.textContent =
    `${zahl1} ${operatorAnzeige(operator)} ${zahl2} = ?`;

    antwortInput.value = "";
    antwortInput.focus();

    feedbackElement.textContent = "";

    // Button zurücksetzen
    prüfenBtn.textContent = "Prüfen";
    wartetAufNächste = false;
}

function prüfen() {

    const antwort =
        Number(antwortInput.value);

    if (!wartetAufNächste) {

        // 👉 ERSTER KLICK: prüfen

if (antwort === lösung) {

    punkte++;
    feedbackElement.textContent = "Richtig! 🎉";

    feedbackElement.classList.remove("falsch");
    feedbackElement.classList.add("richtig");

} else {

    leben--;
    feedbackElement.textContent = `Falsch! Lösung war ${lösung}`;

    feedbackElement.classList.remove("richtig");
    feedbackElement.classList.add("falsch");
}

        punkteElement.textContent = punkte;
        lebenElement.textContent = leben;

        if (leben <= 0) {
            spielVerloren();
            return;
        }

        // 🔥 WICHTIG: neue Aufgabe NICHT sofort laden
        wartetAufNächste = true;
        prüfenBtn.textContent = "Nächste Aufgabe";

    } else {

        // 👉 ZWEITER KLICK: neue Aufgabe
        neueAufgabe();
    }
}

function spielVerloren() {

    aufgabeElement.textContent = "Spiel vorbei 😢";

    feedbackElement.textContent =
        `Du hast ${punkte} Punkte erreicht!`;

    prüfenBtn.disabled = true;

    neuStartBtn.classList.remove("hidden");
}

function neuStart() {

    punkte = 0;
    leben = 3;
    wartetAufNächste = false;

    punkteElement.textContent = punkte;
    lebenElement.textContent = leben;

    prüfenBtn.disabled = false;
    prüfenBtn.textContent = "Prüfen";

    neuStartBtn.classList.add("hidden");

    neueAufgabe();
}

prüfenBtn.addEventListener("click", prüfen);
neuStartBtn.addEventListener("click", neuStart);

neueAufgabe();

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("./service-worker.js")
        .then(() => {
            console.log("Service Worker aktiv");
        });

}