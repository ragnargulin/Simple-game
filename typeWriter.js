/**
 * Audio element for the talk sound effect.
 * @type {HTMLAudioElement}
 */
const talkSound = new Audio('assets/monsterTalk.mp3'); 

/**
 * Creates a typewriter effect for the given text in the specified element.
 * Plays a sound while typing and calls a callback function when typing is complete.
 * 
 * @param {string} text - The text to display with the typewriter effect.
 * @param {HTMLElement} element - The HTML element to display the text in.
 * @param {Function} [callback] - The callback function to call when typing is complete.
 */
function typeWriterEffect(text, element, callback) {
    element.innerHTML = "";
    let index = 0;
    talkSound.play();
    
    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 50);
      } else {
        talkSound.pause();
        if (callback) {
          callback();
        }
      }
    }
    type();
}