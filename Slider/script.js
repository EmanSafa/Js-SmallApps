var sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);
var slidesCount = sliderImages.length;
var currentSlide = 1;
var slideNumberElement = document.getElementById("slide-number");
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");

//indicators ul

var paginationElement = document.createElement("ul");
paginationElement.setAttribute("id", "pagination-ul");

for (var i = 1; i <= slidesCount; i++) {
  var paginationItem = document.createElement("li");
  paginationItem.setAttribute("data-index", i);
  paginationItem.appendChild(document.createTextNode(i));
  paginationElement.appendChild(paginationItem);
}
var indicators = document.getElementById("indicators");
indicators.appendChild(paginationElement);
//

//function checker
var paginationCreatedUl = document.getElementById("pagination-ul");

// remove active classes function
var paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

for (var i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    checker();
  };
}
for (var i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    checker();
  };
}

function removeAllActive() {
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });

  paginationBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}
//
function checker() {
  slideNumberElement.textContent =
    "Slide #" + currentSlide + " of " + slidesCount;
  removeAllActive();
  sliderImages[currentSlide - 1].classList.add("active");
  paginationCreatedUl.children[currentSlide - 1].classList.add("active");

  //check the buttons
  if (currentSlide == 1) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }
  if (currentSlide == slidesCount) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}
checker();
//

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

function nextSlide() {
  if (nextButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    checker();
  }
}
function prevSlide() {
  if (prevButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    checker();
  }
}
