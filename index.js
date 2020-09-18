function handleChiffrer() {
  let msg = document.getElementById("message").value.trim().toLowerCase(),
    key = document.getElementById("key").value.trim().toLowerCase(),
    errors = document.getElementById("errors"),
    resultEl = document.getElementById("result");
  const chiffrer = document.getElementById("chiffrer");
  const keepSpaces = document.getElementById("spaces").checked;

  errors.innerHTML = "";
  document.getElementById("res").style.display = "none";

  if (!key || !msg) {
    checkForErrors(msg, key, errors);
    return;
  }

  const msgArr = msg.split(""); //with spaces
  const msgLength = msg.split(" ").join("").length; //length without spaces
  const keyArr = key.split(" ").join("").split(""); //without spaces
  const keyLength = key.split(" ").join("").length; //length without spaces
  let result = [];
  let turner = 0;

  msgArr.forEach((char) => {
    if (char == " ") {
      if (keepSpaces) result.push(" ");
    } else {
      const keyLetterNum = keyArr[turner].charCodeAt(0) - 97; // a charcode is 97
      let msgLetterNum = char.charCodeAt(0) - 96;
      let letNum = (msgLetterNum + keyLetterNum) % 26;
      if (letNum == 0) letNum = 26;
      msgLetterNum = letNum + 96;
      result.push(String.fromCharCode(msgLetterNum));
      turner++;
      if (turner == keyLength) turner = 0;
    }
  });
  document.getElementById("res").style.display = "block";
  resultEl.innerText = result.join("");
}

function createError(message) {
  let err = document.createElement("li");
  err.innerText = message;

  return err;
}

function checkForErrors(msg, key, errors) {
  if (!msg) {
    let error = createError("Message input must not be empty");
    errors.appendChild(error);
  }
  if (!key) {
    let error = createError("Key input must not be empty");
    errors.appendChild(error);
  }
}
