<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script src="https://momentjs.com/downloads/moment.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.6.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.6.0/firebase-database.js"></script>

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

// Ready the page
$(document).ready(),
  function() {
    // Event Listener for the form
    $("#submit").on("click", function(event) {
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
      console.log(trainName, destination, firstTrainTime, frequency);

      // Send the form info to the database
      database.ref().push({
        trainName,
        destination,
        firstTrainTime,
        frequency
      });
    });

    // Creating a snapshot of each entry as an object
    database.ref().on("child_added", function(childSnapshot) {
      const {
        trainName,
        destination,
        firstTrainTime,
        frequency
      } = childSnapshot.val();
    });

    // Termination of the document ready function
  };
