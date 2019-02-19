let net;
let image = document.getElementById("img");
let predictButton = document.getElementById("predict");

predictButton.addEventListener("click", function() {
  printResults();
});

async function app() {
  predictButton.innerHTML = "Loading mobilenet...";
  predictButton.style.backgroundColor = "grey";
  predictButton.disabled = true;

  net = await mobilenet.load();
  predictButton.style.color = "blue";
  predictButton.innerHTML = "Sucessfully loaded model";

  const imgEl = document.getElementById("img");
  const result = await net.classify(imgEl);
  localStorage.setItem("result", JSON.stringify(result));
  predictButton.innerHTML = "Click to Identify";
  predictButton.style.backgroundColor = "teal";
  predictButton.style.color = "white";
  predictButton.disabled = false;
}

function printResults(result) {
  const data = JSON.parse(localStorage.getItem("result"));
  console.log(data);
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  var newLi = document.createElement("li");
  newLi.textContent = `${data[0].className}`;
  ul.appendChild(newLi);
  localStorage.removeItem("result");
  predictButton.disabled = true;
}

function doUpload(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      image.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
    app();
  }
}
