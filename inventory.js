const items = [
  { id: 1, name: "🍌", damage: 1, message: "I was going to eat that, but I guess you can have it." },
  { id: 2, name: "🔫", damage: 5, message: "Squirt, squirt" },
  { id: 3, name: "🦄", damage: 80, message: "Is that thing even real?" },
  { id: 4, name: "🛹", damage: 10, message: "Wanna see me do a trick?" },
  { id: 5, name: "💣", damage: 20, message: "That could come in handy" },
  { id: 6, name: "🍕", damage: 3, message: "Hot and cheesy, just like your battle strategy." },
  { id: 7, name: "🥇", damage: 15, message: "You're a winner with this one!" },
  { id: 8, name: "🪓", damage: 25, message: "For when you need to chop through obstacles." },
  { id: 9, name: "🌮", damage: 2, message: "It’s not just food; it’s fuel!" },
  { id: 10, name: "⚡", damage: 50, message: "Electrifying power ready to zap your foes!" },
  { id: 11, name: "🧸", damage: 0, message: "Cuddle up, but beware the enemies who underestimate it." },
  { id: 12, name: "🧪", damage: 30, message: "Potion of mysterious power, use wisely." },
  { id: 13, name: "🦸‍♂️", damage: 40, message: "Heroic strength in a bottle!" },
  { id: 14, name: "🍒", damage: 4, message: "Sweet and sour, just like your choices." },
  { id: 15, name: "🏹", damage: 35, message: "Take aim, and let the arrows fly!" },
  { id: 16, name: "🐉", damage: 100, message: "It’s a dragon, need I say more?" },
  { id: 17, name: "🦴", damage: 8, message: "For when you want to play fetch with danger." },
  { id: 18, name: "🛡️", damage: 0, message: "A shield! Protect yourself from danger." },
  { id: 19, name: "⚔️", damage: 60, message: "Sharp, deadly, and ready to slash!" },
  { id: 20, name: "💀", damage: 12, message: "Beware the skull, it whispers secrets of the undead." }
];

function updateInventoryAfterAddingItem(item) {
  // Use `splice` to remove the item from `items`
  const itemIndex = items.findIndex((i) => i.id === item.id);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);  // Removes the item from the array
  }

  updateInventoryDisplay();
  populateItemOptions();
  
  // Check if inventory is full
  if (inventory.length >= 5) {
    showDoorModal();
  } else {
    showOptions(dialogues[3].options);
  }
}

function updateInventoryDisplay() {
  const inventoryContainer = document.getElementById("inventoryContainer");
  inventoryContainer.innerHTML = "<p class='title'>Inventory</p>";

  inventory.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = item.name;
    itemDiv.className = "item-icon nes-icon is-large";
    inventoryContainer.appendChild(itemDiv);
  });
}