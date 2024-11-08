function typeWriterEffect(text, element, callback) {
    element.innerHTML = "";
    let index = 0;
    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 50);
      } else if (callback) {
        callback();
      }
    }
    type();
  }