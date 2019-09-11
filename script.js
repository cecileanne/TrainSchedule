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

    // TO DO: Check this - will trains that don't run on a frequency divisible by 24 run into a problem?
    //  i.e. if a train leaves at 1pm today and has a frequency of 7 hours, then it will leave at 2am the next day?
    // Check if we ever get a negative number
    //  adding a moment for the train tomorrow from the current time will guarantee that it will be a positive number of minutes until the next train
    const currentMoment = moment();
    const momentNow = currentMoment.toObject();
    let tomorrowsTrainTime = firstTrainTime;
    tomorrowsTrainTime.add(1, "days");
    console.log(
      `First scheduled train departure for ` +
        train.trainName +
        ` is ` +
        tomorrowsTrainTime.format(`hh:mm`)
    );

    // calculate the difference use modulo to use the remainder
    const diff = tomorrowsTrainTime.diff(currentMoment, "minutes");
    const moduloTime = diff % parseInt(frequency);
    console.log(
      `modulo time for the train ` + train.trainName + ` is ` + moduloTime
    );

    let minutesAway = moduloTime;
    console.log(
      `minutes away for train ` + train.trainName + ` is ` + minutesAway
    );

    // TO DO: Calculate next arrival
  } // termination of calculateArrivals

  // //  create an array called arrivalTimes in which each index is an arrival time (the schedule)
  // const arrivalTimes = [];
  // //  for loop firstTrainTime + frequency
  //  let current time = moment.js
  //  remove an index from the array if it is less than (earlier) that currentTime (shift)
  //  arrivalTimes[0] is the next Arrival
  // // Calculate Minutes Away
  // const minutesAway = nextArrival - currentTime;

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
