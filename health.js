/**
 * Updates the health icons for the specified target.
 * Displays full, half, and empty hearts based on the health value.
 * 
 * @param {number} health - The current health value of the target.
 * @param {string} target - The target class name to update the health icons (e.g., "player" or "enemy").
 */
function updateHealthIcons(health, target) {
  const healthContainer = document.querySelector(`.${target}-health-icons`);
  healthContainer.innerHTML = ""; 
  
  // Calculate the number of hearts based on the health
  let fullHearts = Math.floor(health / 20);
  let hasHalfHeart = health % 20 >= 10;

  // Add full hearts
  for (let i = 0; i < fullHearts; i++) {
    healthContainer.innerHTML += '<i class="nes-icon is-medium heart"></i>';
  }

  // Add half heart if needed
  if (hasHalfHeart) {
    healthContainer.innerHTML +=
      '<i class="nes-icon is-medium is-half heart"></i>';
  }

  // Add empty hearts to make up a total of 5 hearts
  const emptyHearts = 5 - fullHearts - (hasHalfHeart ? 1 : 0);
  for (let i = 0; i < emptyHearts; i++) {
    healthContainer.innerHTML +=
      '<i class="nes-icon is-medium is-transparent heart"></i>';
  }
}