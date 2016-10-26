 'use strict'

 function RaceArea() {
     var container = document.getElementById("container1");
     var text = "It was hard to toss things I had once thought were valuable enough to spend money on and just as hard to separate myself from worn and ragged clothing I had for sentimental reasons. Once I'd passed through the first few tough decisions, though, the momentum had been built and it was a breeze.";
     // var text = "Artificial intelligence";
     var that = this;
     this.textArr = text.split(" ");

     var timer = document.getElementById("timer");
     this.wpm = document.getElementById("wpm");
     this.car = document.getElementById("car");
     this.textArea = document.createElement("div");
     this.textArea.className = "textarea";
     this.overlay = document.getElementById("overlay");
     this.start = document.getElementById("start");
     this.startWrapper = document.getElementById("start-wrapper");

     for (var i in this.textArr) {
         var word = document.createElement("span");
         word.innerHTML = this.textArr[i] + " ";
         this.textArea.appendChild(word);
     }

     this.typeArea = document.createElement("input");
     this.typeArea.type = "text";
     this.typeArea.placeholder = "Type Here";


     container.appendChild(this.textArea);
     container.appendChild(this.typeArea);

     var seconds = 0;
     var minutes = 0;
     this.totalTime = 1;
     timer.children[1].innerHTML = minutes++;
     timer.children[3].innerHTML = seconds++;

     var intervalId;

     this.timerStart = function() {
         intervalId = setInterval(function() {
             that.totalTime++;
             timer.children[3].innerHTML = seconds++;
             if (seconds % 60 == 0) {
                 seconds = 0;
                 timer.children[1].innerHTML = minutes++;
             }

         }, 1000);
     }

     this.timerStop = function() {
         clearInterval(intervalId);
     }
 }


 function Race(raceArea) {
     var startMarginTop = 0

     raceArea.start.focus();


     var id = setInterval(function() {
         startMarginTop += 2;
         raceArea.startWrapper.style.marginTop = startMarginTop + "px";
         // console.log(raceArea.start.style.marginTop);
         if (startMarginTop >= 330) {
             clearInterval(id);
         }
     }, 0.5);


     raceArea.start.addEventListener("click",startRace);

     function startRace() {
         raceArea.overlay.style.display = "none";
         raceArea.timerStart();
         raceArea.typeArea.focus();


         var position = 0;
         var wpm;
         raceArea.textArea.children[position].style.color = "green";
         raceArea.textArea.children[position].style.textDecoration = "underline";

         function calculateWPM() {
             wpm = Math.round((position / raceArea.totalTime) * 60);
             raceArea.wpm.children[0].innerHTML = wpm;
         }

         setInterval(calculateWPM, 2000);


         function moveCar() {
             var percentCompleted = (position / raceArea.textArr.length) * 92;
             raceArea.car.style.left = percentCompleted + "%";
         }

         raceArea.typeArea.addEventListener("keypress", function(event) {
             if (event.keyCode == 32) {
                 event.preventDefault();
                 if (raceArea.typeArea.value != raceArea.textArr[position]) {
                     raceArea.typeArea.style.color = "red";
                     raceArea.textArea.children[position].style.color = "red";
                 } else {
                     position++;
                     raceArea.typeArea.value = "";
                     raceArea.typeArea.style.color = "black";
                     try {
                         raceArea.textArea.children[position].style.color = "green";
                         raceArea.textArea.children[position].style.textDecoration = "underline";
                     } catch (err) {
                         console.log(err);
                     }

                     raceArea.textArea.children[position - 1].style.textDecoration = "none";
                     raceArea.textArea.children[position - 1].style.color = "black";
                     moveCar();
                     console.log(position);
                     if (position == raceArea.textArr.length) {
                         raceArea.timerStop();
                         setTimeout(function() {
                             window.alert("Typing Complete\n Your Speed:" + wpm + " wpm");
                         }, 1000);
                     }
                 }
             }
         });
     }
 }
