const talkSound = new Audio('assets/monsterTalk.mp3'); 

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