var textfield;
var fruits; // Declare fruits globally
var correctWord; // Declare correctWord globally

function setup() {
  input = createInput();
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);

  // This variable stores whatever the user types
  textfield = ""

  loadFruits().then(() => {
    correctWord = getFruit();
  console.log(correctWord);
  console.log(fruits);
});
}

// Function to fetch and load the JSON file
function loadFruits() {
  return fetch('fruits.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      fruits = data.fruits;})
    .catch(error => {
      console.error('Error loading fruits.json:', error);
      throw error; // Re-throw the error for further handling
    });
}

// Call the function to load fruits when needed

function getFruit() {
  let index = floor(random(fruits.length));
  return fruits[index];
}


function draw() {
  text(textfield, 100, 100);  // For debugging
  
  textSize(16)
  text(correctWord, 50,50);
  
  if (checkWord(correctWord)) {
    text("Correct!", 100, 150)
  } //else {
    //text("Not quite", 100, 150)
  //}
}


// When the user type anything, it will be added to textfield
function keyTyped() {
  textfield += key;
}

// This function should check if the user is in the process of typing the correctWord
function checkWord(correctWord) { 
  if(textfield.length === 0){
    return false;
  }
  for (let i = 0; i < textfield.length; i++) {
    if (textfield[i] != correctWord[i]) {
      return false
    }
  }

  return true
}