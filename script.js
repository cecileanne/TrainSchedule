// Firebase Information
var firebaseConfig = {
  apiKey: "AIzaSyCUCeMQtdbbUyPQjmoUv1mpRAYezR4-mis",
  authDomain: "bootcamphomework7.firebaseapp.com",
  databaseURL: "https://bootcamphomework7.firebaseio.com",
  projectId: "bootcamphomework7",
  storageBucket: "",
  messagingSenderId: "636144486354",
  appId: "1:636144486354:web:e371a7d156f8f54d31aa0b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Thing you should always do Please Remember in the future.
const database = firebase.database();

// Ready the page
$(document).ready(function() {
  // Event Listener for the form
  $(document).on("click", "#submitButton", function(event) {
    event.preventDefault();

    const trainName = $("#trainName")
      .val()
      .trim();
    const destination = $("#destination")
      .val()
      .trim();
    const firstTrainTime = $("#firstTrainTime")
      .val()
      .trim();
    const frequency = $("#frequency")
      .val()
      .trim();

    // Make sure it's working
    // console.log(trainName);

    // Send the form info to the database
    database.ref().push({
      trainName,
      destination,
      firstTrainTime,
      frequency
    });
  });

  // Calculate Next Arrival
  function calculateArrivals() {
    //  create an array called arrivalTimes in which each index is an arrival time (the schedule)
    const arrivalTimes = [];
    //  for loop firstTrainTime + frequency
    for (
      let arrivalIndex = 0;
      arrivalIndex < arrivalTimes.length;
      arrivalIndex + frequency
    ) {
      const element = arrivalTimes[arrivalIndex];
    }
    //  let current time = moment.js
    const currentTime = moment().format();
    //  remove an index from the array if it is less than (earlier) that currentTime
    //  arrivalTimes[0] is the next Arrival
  } // termination of calculateArrivals

  // Calculate Minutes Away
  const minutesAway = nextArrival - currentTime;

  // Creating a snapshot of each entry as an object
  database.ref().on("child_added", function(childSnapshot) {
    const {
      trainName,
      destination,
      firstTrainTime,
      frequency
    } = childSnapshot.val();
  });

  // Send information to the table from fireBase - Train Name, Destination, Frequency, Next Arrival, Minutes Away
  const tableRow = `<tr><th scope="row">${trainName}</th><td>${destination}</td><td>${frequency}</td><td>${nextArrival}</td><td>${minutesAway}</td></tr>`;
  $("#trainTable").prepend(tableRow);

  // Refresh the page every minute
  $("#clock").text(moment().format("MM/DD/YYYY hh:mm:ss"));
  setInterval(() => {
    $("#clock").text(moment().format("MM/DD/YYYY hh:mm:ss"));
  }, 60000);
}); // Termination of the document ready function
