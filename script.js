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
    database.ref("trainInfo").push({
      trainName,
      destination,
      firstTrainTime,
      frequency
    });
  });

  // Calculate Next Arrival
  function calculateArrivals(train) {
    let firstTrainTime = train.firstTrainTime;
    const frequency = train.frequency;
    const currentTime = moment().format("hh:mm");
    // subtracting a day will allow for more time so everything is theoretically happening the previous day and time won't stop at the current time
    firstTrainTime = moment(firstTrainTime, "hh:mm").subtract(1, "days");
    // console.log(firstTrainTime);

    // calculate the difference use modulo to use the remainder
    const diff = moment().diff(firstTrainTime, "minutes");
    const moduloTime = diff % moment(frequency, "minutes");
    // console.log(moduloTime);

    let minutesAway = frequency - moduloTime;
    // console.log(minutesAway);
  } // termination of calculateArrivals

  // //  create an array called arrivalTimes in which each index is an arrival time (the schedule)
  // const arrivalTimes = [];
  // //  for loop firstTrainTime + frequency
  //  let current time = moment.js
  //  remove an index from the array if it is less than (earlier) that currentTime (shift)
  //  arrivalTimes[0] is the next Arrival

  // Calculate Minutes Away
  //const minutesAway = nextArrival - currentTime;

  // Creating a snapshot of each entry as an object
  database.ref("trainInfo").on("child_added", function(childSnapshot) {
    //  console.log(childSnapshot.val());
    const {
      trainName,
      destination,
      firstTrainTime,
      frequency
    } = childSnapshot.val();
    // put the snapshot into it's own object to call back to
    const train = {
      trainName,
      destination,
      firstTrainTime,
      frequency
    };
    // console.log(train);
    rowRefresh(train);
  });

  // Send information to the table from fireBase - Train Name, Destination, Frequency, Next Arrival, Minutes Away
  function rowRefresh(train) {
    calculateArrivals(train);
    const tableRow = `<tr><th scope="row">${train.trainName}</th><td>${train.destination}</td><td>${train.frequency}</td><td>${train.nextArrival}</td><td>${train.minutesAway}</td></tr>`;
    $("#trainTable").prepend(tableRow);

    // Refresh the page every minute
    $("#clock").text(moment().format("hh:mm"));
    setInterval(() => {
      $("#clock").text(moment().format("hh:mm"));
    }, 60000);
  } // Termination of row refresh
}); // Termination of the document ready function
