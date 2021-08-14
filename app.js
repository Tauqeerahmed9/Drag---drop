const dragArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");
let button = document.querySelector(".button");
let input = document.querySelector("#input");

// This Is a global variable
let file;

dragArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragArea.classList.add("active");
  dragText.textContent = "Release to upload";
});

dragArea.addEventListener("dragleave", () => {
  dragArea.classList.remove("active");
  dragText.textContent = "Drag & drop";
});

dragArea.addEventListener("drop", (event) => {
  event.preventDefault();

  file = event.dataTransfer.files[0];
  displayFile();
});

function displayFile() {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/svg"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src= ${fileURL} alt=''>`;
      dragArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This file is not an image.");
    dragArea.classList.remove("active");
  }
}

button.onclick = () => {
  input.click();
};

input.addEventListener("change", () => {
  file = this.files[0];
  dragArea.classList.add("active");
  displayFile();
});
