import { writable } from "svelte/store";

// Lade vorhandene Nachrichten aus dem Local Storage oder initialisiere mit einem leeren Array
const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
console.log("Loaded messages from localStorage:", savedMessages); // Debugging: Anzeigen der geladenen Nachrichten

// Erstelle einen writable Store
export const chatMessages = writable(savedMessages);

// Speichere Änderungen im Local Storage
chatMessages.subscribe((messages) => {
    console.log("Aktuelle Nachrichten:", messages); // Debugging: Anzeigen der aktuellen Nachrichten
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    console.log("Nachrichten in localStorage gespeichert:", localStorage.getItem("chatMessages")); // Debugging: Überprüfen der gespeicherten Nachrichten
});
