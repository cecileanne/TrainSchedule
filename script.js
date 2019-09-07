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
    console.log(trainName);

    // Send the form info to the database
    database.ref().push({
      trainName,
      destination,
      firstTrainTime,
      frequency
    });
  });

  // Creating a snapshot of each entry as an object
  //   database.ref().on("child_added", function(childSnapshot) {
  //     const {
  //       trainName,
  //       destination,
  //       firstTrainTime,
  //       frequency
  //     } = childSnapshot.val();
  //   });

  // Calculate Minutes Away
  //  let trainNumbersPassed = (current time minus first train time) divided by frequency with math floor so it's an integer
  //  let minutesAway = current time (from moment.js) minus (trainsNumbersPassed * Frequency)

  // Calculate Next Arrival

  // Send information to the table from fireBase - Train Name, Destination, Frequency, Next Arrival, Minutes Away

  // Termination of the document ready function
});
