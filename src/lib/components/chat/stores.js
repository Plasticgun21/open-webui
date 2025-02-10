import { writable } from "svelte/store";

// Lade gespeicherte Nachrichten oder setze einen leeren Array
const storedMessages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
export const chatMessages = writable(storedMessages);

// Speichere Änderungen in localStorage
chatMessages.subscribe((messages) => {
    console.log("Speichere in localStorage:", messages);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
});