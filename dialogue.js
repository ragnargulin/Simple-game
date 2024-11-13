function addDialogueBubble(text, isLeft) {
  const dialogContainer = document.getElementById("dialogContainer");
  const message = document.createElement("section");
  message.classList.add("message", isLeft ? "-left" : "-right");
  const balloon = document.createElement("div");
  balloon.classList.add("nes-balloon", isLeft ? "from-left" : "from-right");
  const p = document.createElement("p");
  balloon.appendChild(p);
  message.appendChild(balloon);
  dialogContainer.prepend(message);
  
  return new Promise((resolve) => typeWriterEffect(text, p, resolve));
}

const dialogues = [
  {
    text: "Greetings, traveller!",
    options: [
      { text: "Who are you?", next: 1 },
      { text: "Where am I?", next: 2 },
    ],
  },
  {
    text: "I can't remember. I've been here for a very long time.",
    options: [
      { text: "Where am I?", next: 2 },
      { text: "How do I get out of here?", next: 3 },
    ],
  },
  {
    text: "You are locked in this strange room.",
    options: [
      { text: "Who are you?", next: 1 },
      { text: "How do I get out of here?", next: 3 },
    ],
  },
  {
    text: "Behind these doors are enemies. Pick five items to help you in your battle:",
    options: [],
  },
  {
    text: "Grrrrrr!",
    options: [
      { text: "I will kill you!", next: 6 },
      { text: "Spare me, please!", next: 5 },
    ],
  },
  {
    text: "I haven't spared an adventurer in 29488 years. Your are no exception!",
    options: [{ text: "Then I shall kill you!", next: 6 }],
  },
  { text: "Not if I kill you first!", options: [] },
];