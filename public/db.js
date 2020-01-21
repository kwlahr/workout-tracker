let db;
const request = indexedDB.open("workouts", 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore("workoutStore", { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["workoutStore"], "readwrite");
  const store = transaction.objectStore("workoutStore");

  store.add(record);
}

function checkDatabase() {
  const transaction = db.transaction(["workoutStore"], "readwrite");
  const store = transaction.objectStore("workoutStore");
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/workouts/range", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
        .then(() => {
          // delete records if successful
          const workouts = db.workouts(["workoutStore"], "readwrite");
          const store = workouts.objectStore("workoutStore");
          store.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
