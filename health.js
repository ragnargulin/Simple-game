/**
 * Updates the health icons for the specified target.
 * Displays full, half, and empty hearts based on the health value.
 * 
 * @param {number} health - The current health value of the target.
 * @param {string} target - The target class name to update the health icons (e.g., "player" or "enemy").
 */
function updateHealthIcons(health, target) {
  const healthContainer = document.querySelector(`.${target}-health-icons`);
  healthContainer.innerHTML = "";  // Clear existing icons
  
  // Calculate the number of hearts and half hearts
  const fullHearts = Math.floor(health / 20);
  const hasHalfHeart = health % 20 >= 10;
  const emptyHearts = 5 - fullHearts - (hasHalfHeart ? 1 : 0);
  
  // Create an array of heart elements
  const hearts = [];

  // Add full hearts
  for (let i = 0; i < fullHearts; i++) {
    const heart = document.createElement('i');
    heart.classList.add('nes-icon', 'is-medium', 'heart');
    hearts.push(heart);
  }

  // Add half heart if needed
  if (hasHalfHeart) {
    const halfHeart = document.createElement('i');
    halfHeart.classList.add('nes-icon', 'is-medium', 'is-half', 'heart');
    hearts.push(halfHeart);
  }

  // Add empty hearts to make up to 5
  for (let i = 0; i < emptyHearts; i++) {
    const emptyHeart = document.createElement('i');
    emptyHeart.classList.add('nes-icon', 'is-medium', 'is-transparent', 'heart');
    hearts.push(emptyHeart);
  }

  // Append all the heart elements at once
  healthContainer.append(...hearts);
}
