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

  // set an event listener for the adding of a train to the db
  // Creating a snapshot of each entry as an object
  database.ref("trainInfo").on("child_added", function(childSnapshot) {
    //  console.log(childSnapshot.val());
    console.log("Train added...");
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

    console.log("t.trainName: " + train.trainName);
    console.log("t.destination: " + train.destination);
    console.log("t.firstTrainTime: " + train.firstTrainTime);
    console.log("t.frequency: " + train.frequency);

    // console.log(train);
    rowRefresh(train);
  });

  // Calculate Next Arrival
  function calculateArrivals(train) {
    let firstTrainTime = train.firstTrainTime;
    const frequency = train.frequency;
    const currentTime = moment().format("hh:mm");
    // subtracting a day will allow for more time so everything is theoretically happening the previous day and time won't stop at the current time
    firstTrainTime = moment(firstTrainTime, "hh:mm").subtract(1, "days");

    // setting a moment for the train _tomorrow_ at the hour and minute stored in the database will let us know for sure that
    // we will have a positive number of minutes until the next train
    const currentMoment = moment();
    const momentNow = currentMoment.toObject();
    let tomorrowsTrainTime = firstTrainTime;
    tomorrowsTrainTime.years(momentNow.years);
    tomorrowsTrainTime.months(momentNow.months);
    tomorrowsTrainTime.date(momentNow.date);
    tomorrowsTrainTime.add(1, "days");
    console.log(
      "first scheduled train departure for " +
        train.trainName +
        " is " +
        tomorrowsTrainTime.format()
    );

    // calculate the difference use modulo to use the remainder
    const diff = tomorrowsTrainTime.diff(currentMoment, "minutes");
    console.log(
      "time diff for tomorrow's train " +
        train.trainName +
        " is " +
        diff +
        " minutes"
    );
    const moduloTime = diff % parseInt(frequency);
    console.log(
      "modulo time for train " + train.trainName + " is " + moduloTime
    );
    // console.log(moduloTime);

    let minutesAway = moduloTime;
    // console.log(minutesAway);
    console.log(
      "minutes away for train " + train.trainName + " is " + minutesAway
    );

    let nextArrival = currentMoment.add(minutesAway, "minutes");
    if (nextArrival.minutes() > 0) {
      nextArrival = nextArrival.startOf("minutes");
      nextArrival = nextArrival.add(1, "minutes");
    }

    const nextArrivalData = {
      nextArrival,
      minutesAway
    };

    return nextArrivalData;
  } // termination of calculateArrivals

  // //  create an array called arrivalTimes in which each index is an arrival time (the schedule)
  // const arrivalTimes = [];
  // //  for loop firstTrainTime + frequency
  //  let current time = moment.js
  //  remove an index from the array if it is less than (earlier) that currentTime (shift)
  //  arrivalTimes[0] is the next Arrival

  // Calculate Minutes Away
  //const minutesAway = nextArrival - currentTime;

  // Send information to the table from fireBase - Train Name, Destination, Frequency, Next Arrival, Minutes Away
  function rowRefresh(train) {
    nextArrivalData = calculateArrivals(train);
    const tableRow = `<tr><th scope="row">${train.trainName}</th><td>${
      train.destination
    }</td><td>${train.frequency}</td><td>${nextArrivalData.nextArrival.format(
      "hh:mm a"
    )}</td><td>${nextArrivalData.minutesAway}</td></tr>`;
    $("#trainTable").prepend(tableRow);

    // Refresh the page every minute
    $("#clock").text(moment().format("hh:mm"));
    setInterval(() => {
      $("#clock").text(moment().format("hh:mm"));
    }, 60000);
  } // Termination of row refresh
}); // Termination of the document ready function
