let passwordInput = document.querySelector(".control-panel__inner").children[0].children[0];
let okButton = document.querySelector(".control-panel__inner").children[0].children[1];

let checkButtons = document.querySelector(".check-buttons").children;
let leversButtons = document.querySelector(".levers").children;
let launchButton = document.querySelector(".control-panel__inner").children[3];

let rocketElement = document.querySelector(".rocket");

function passwordStatusChange(status) {
  passwordInput.disabled = status;
  okButton.disabled = status;
}

function launchButtonActivate(status) {
  launchButton.disabled = status;
}

passwordStatusChange(false);

function inputStatusChange(status) {
  for (let i = 0; i < checkButtons.length; i++) {
    checkButtons[i].disabled = status;
  }
  for (let i = 0; i < leversButtons.length; i++) {
    leversButtons[i].disabled = status;
  }
}

inputStatusChange(true);
launchButtonActivate(true);

function checkPassword() {
  if (passwordInput.value === "TrustNo1") {
    passwordStatusChange(true);
    inputStatusChange(false);
  }
  passwordInput.value = "";
}
let checkBoxStatus = new Array(6).fill(false);

let isAllChecked = false;
let leversStatus = new Array(5).fill(false);

let isAllMax = false;

for (let i = 0; i < checkButtons.length; i++) {
  checkButtons[i].addEventListener("click", function() {
    checkBoxStatus[i] = this.checked;
    isAllChecked = true;
    checkBoxStatus.forEach(function(checkStatus) {
      isAllChecked &= checkStatus;
    });
    if (isAllChecked && isAllMax) {
      launchButtonActivate(false);
    }
    else {
      launchButtonActivate(true);
    }
  })
}

for (let i = 0; i < leversButtons.length; i++) {
  leversButtons[i].addEventListener("click", function() {
    leversStatus[i] = Number(this.value) === 100;
    isAllMax = true;
    leversStatus.forEach(function(valueStatus) {
      isAllMax &= valueStatus;
    });
    if (isAllChecked && isAllMax) {
      launchButtonActivate(false);
    }
    else {
      launchButtonActivate(true);
    }
  })
}

launchButton.addEventListener("click", movement);

const initBottom = 288;
const initLeft = -210;
let pos = 0;
let interval = null;
let degree = 65;

function movement() {
    clearInterval(interval);
    interval = setInterval(move, 5);
}

function move() {
  pos++;
  if (pos >= 600) {
    clearInterval(interval);
  }
  else {
    rocketElement.style.bottom = initBottom + pos * Math.sin(Math.PI * degree / 180) + "px";
    rocketElement.style.left = initLeft + pos * Math.cos(Math.PI * degree / 180) + "px";
  }
}

