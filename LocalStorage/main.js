let allSpans = document.querySelectorAll(".buttons span");
let resullts = document.querySelector(".results > span");
let theInput = document.getElementById("the-input");

allSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-item")) {
      checkItem();
    }
    if (e.target.classList.contains("add-item")) {
      addItem();
    }
    if (e.target.classList.contains("delete-item")) {
      deleteItem();
    }
    if (e.target.classList.contains("show-items")) {
      showItem();
    }
  });
});

function showMessage() {
  if (theInput.value == "") {
    resullts.innerHTML = "Input Can't be Empty";
  }
}
function checkItem() {
  let value = theInput.value;
  if (value !== "") {
    if (localStorage.getItem(value)) {
      resullts.innerHTML = `Found Storage Local Item Called <span>${value}</span>`;
    } else {
      resullts.innerHTML = ` <span>${value}</span> Not Founded in Local Storage`;
    }
  } else {
    showMessage();
  }
}
function addItem() {
  let value = theInput.value;
  if (value !== "") {
    localStorage.setItem(value, "Test");
    resullts.innerHTML = `Local Storage Item <span>${value}</span> Added`;
    value = "";
  } else {
    showMessage();
  }
}
function deleteItem() {
  let value = theInput.value;
  if (localStorage.getItem(value)) {
    localStorage.removeItem(value);
    resullts.innerHTML = `Local Storage Item Called <span>${value}</span> Deleted`;
    value = "";
  } else {
    resullts.innerHTML = ` <span>${value}</span> Not Founded in Local Storage`;
  }
}
function showItem() {
  resullts.innerHTML = "";
  if (localStorage.length) {
    for (let [key, value] of Object.entries(localStorage)) {
      resullts.innerHTML += `<span class='keys'>${key}</span>\n`;
    }
  } else {
    resullts.innerHTML = `Local Storage Is Empty`;
  }
}
