statz = "";
objects = []
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}
function draw(){
    image(video, 0, 0, 480, 380)
    if(statz != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Achei o animal"

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name)
            {
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("object_status").innerHTML = object_name + " Found";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(object_name + "Found");
              synth.speak(utterThis);
            }
            else
            {
              document.getElementById("object_status").innerHTML = object_name + " Not Found";
            }          

        }
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('tatus').innerHTML = "Status: Detectando Objetos"
    object_name = document.getElementById("od").value
}
function modelLoaded() {
    console.log("Model Loaded!");
    statz = true;
}
function gotResult(error, results) {
    if(error){
        console.error(error);
    }else{
    console.log(results);
    objects = results;
    }
}