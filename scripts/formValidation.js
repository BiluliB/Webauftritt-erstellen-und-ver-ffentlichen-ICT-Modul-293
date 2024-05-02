document.addEventListener("DOMContentLoaded", function () {
  // Funktion, um Fehlerzustand für Eingabefelder zu entfernen
  function clearInputErrorOnEdit() {
    this.classList.remove("error-input");
    const errorSpanId = this.id + "-error";
    const errorSpan = document.getElementById(errorSpanId);
    if (errorSpan) {
      errorSpan.textContent = "";
    }
  }

  document
    .getElementById("kontaktformular")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Verhindert das Standardverhalten des Formulars

      const messagesContainer = document.getElementById("form-errors");
      messagesContainer.className = ""; // Bereinigt alle vorherigen Klassen
      messagesContainer.classList.add("form-messages"); // Fügt die Basis-Klasse für Nachrichten hinzu
      let errors = []; // Sammelt Fehlermeldungen

      // Funktion, um Fehlerzustand für Eingabefelder zu setzen
      const setInputError = (inputId) => {
        document.getElementById(inputId).classList.add("error-input");
      };

      // Fehlerzustand für alle Eingabefelder zurücksetzen und Event Listener hinzufügen
      document
        .querySelectorAll("#kontaktformular input, #kontaktformular textarea")
        .forEach((input) => {
          input.classList.remove("error-input");
          // Entferne den Event Listener, um Doppelbindungen zu vermeiden
          input.removeEventListener("input", clearInputErrorOnEdit);
          // Füge den Event Listener hinzu
          input.addEventListener("input", clearInputErrorOnEdit);
        });

      // Validierungen durchführen

      const vorname = document.getElementById("vorname").value.trim();
      if (!vorname.match(/^[A-Za-zäöüßÄÖÜ\s]+$/)) {
        errors.push("Vorname darf nur Buchstaben und Leerzeichen enthalten.");
        setInputError("vorname");
      }

      const nachname = document.getElementById("nachname").value.trim();
      if (!nachname.match(/^[A-Za-zäöüßÄÖÜ\s]+$/)) {
        errors.push("Nachname darf nur Buchstaben und Leerzeichen enthalten.");
        setInputError("nachname");
      }

      const telefon = document.getElementById("telefon").value.trim();
      // Überprüfe, ob das Feld nicht leer ist, bevor die Validierung angewendet wird
      if (telefon && !telefon.match(/^\+?[0-9\s]+$/)) {
        errors.push(
          "Telefonnummer darf nur Zahlen, Leerzeichen und das Pluszeichen enthalten."
        );
        setInputError("telefon");
      }

      const email = document.getElementById("email").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        setInputError("email");
      }

      const nachricht = document.getElementById("nachricht").value.trim();
      if (nachricht.length < 10) {
        errors.push("Nachricht muss mindestens 10 Zeichen lang sein.");
        setInputError("nachricht");
      }

      // Fehler anzeigen oder Formular verarbeiten
      if (errors.length > 0) {
        messagesContainer.classList.add("form-errors"); // Klassen für Fehlerzustand hinzufügen
        messagesContainer.innerHTML = errors.join("<br>");
      } else {
        // Erfolgsmeldung anzeigen
        messagesContainer.classList.add("form-success"); // Klasse für Erfolgszustand hinzufügen
        messagesContainer.innerHTML = "Formular wurde erfolgreich übermittelt.";

        // Formulardaten in der Konsole ausgeben
        console.log(`Formulardaten:
          Thema: ${document.getElementById("thema").value}
          Firma: ${document.getElementById("firma").value}
          Vorname: ${vorname}
          Nachname: ${nachname}
          Telefon: ${telefon}
          E-Mailadresse: ${email}
          Nachricht: ${nachricht}
          Zeitstempel der Anfrage: ${new Date().toLocaleString()}`);

        // Formular leeren
        document.getElementById("kontaktformular").reset();
      }
    });
});
