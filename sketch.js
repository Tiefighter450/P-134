alarmSound = "";
videoLoaded = false;
objects = [];
i = 0;
babyDetected = false;
percent = 0;
function preload() {
  alarmSound = loadSound('looney_toons.mp3');
  alarmSound.setVolume(1);
  alarmSound.rate(1);
}

function setup() {
  canvas = createCanvas(497, 398);
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  videoLoaded = true;
  canvas.center();
}

function modelLoaded() {
  console.log("Model Loaded!");
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  objects = results;
}

function draw() {
  image(video, 0, 0, 497, 398);
  
  if (videoLoaded == true) {
    console.log(objects);
    objectDetector.detect(video, gotResult);
    for(i = 0; i < objects.length; i++) {
      stroke('red');
      fill('red');
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

      if(objects[i].length < 0) {
        alarmSound.play();
        document.getElementById("status").innerHTML = "Baby out of frame";
      }
      if(objects[i].label != "person") {
        alarmSound.play();
        document.getElementById("status").innerHTML = "Baby out of frame";
      }
      if(objects[i].label == "person") {
        alarmSound.stop();
        document.getElementById("status").innerHTML = "Baby in frame";
      }
    }
  }
}
