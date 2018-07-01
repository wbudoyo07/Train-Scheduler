// Initialize Firebase
var config = {
    apiKey: "AIzaSyDGl9jvHhxnLNg2jEfZr3-5yzXNf8_xmI8",
    authDomain: "trainschedule-faec3.firebaseapp.com",
    databaseURL: "https://trainschedule-faec3.firebaseio.com",
    projectId: "trainschedule-faec3",
    storageBucket: "trainschedule-faec3.appspot.com",
    messagingSenderId: "196396973807"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//   event listener  click   button for adding train schedule
$("#add-trainSchedule-btn").on("click",function(event){
    event.preventDefault();
   
    // grab user Input
    var trainName= $("#train-name-input").val().trim();
    var trainDestination= $("#destination-input").val().trim();
    var traintime= $("#train-time-input").val().trim();
    var trainFreq= $("#Frequency-input").val().trim();

    // Creates local "temporary" object for holding train  data
    var newTrain= {
        trainName: trainName,
        Destination: trainDestination,
        arrival: traintime,
        frequency: trainFreq

    };

    // Uploads train schedule data to the database
  database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.trainDestination);
    console.log(newTrain.trainTime);
    console.log(newTrain.trainFreq);

    alert("Employee successfully added");

    //clear all of the text boxes
    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#train-time-input").val("")
    $("#Frequency-input").val("")
})// end event listener click button

   // Create Firebase event for adding train schedule to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        // Store everything into a variable.
  var trainName= childSnapshot.val().trainName;
  var  trainDestination= childSnapshot.val().Destination;
  var  trainTime= childSnapshot.val().arrival;
  var trainFreq = childSnapshot.val().frequency;
   //  train info
   console.log(trainName);
   console.log(trainDestination);
   console.log(trainTime);
   console.log(trainFreq);

  // check the traintime and format 
  var trainTimeConverted = moment(trainTime, "HH:mm")
    console.log(trainTimeConverted);

   // checking the current time 
  var currentTime = moment();
    console.log("current time is :  " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime +"minutes");   

// time reminder
    var tRemainder = diffTime %trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");

     // Create the new row
     var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrainFormatted),
        $("<td>").text(tMinutesTillTrain),
        
      );

       // Append the new row to the table
    $("#train-table > tbody").append(newRow);

      
  

    });//end firebase add child

   


