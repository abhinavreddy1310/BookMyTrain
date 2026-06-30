const stations = [
    "Hyderabad",
    "Secunderabad",
    "Bangalore",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Vijayawada",
    "Tirupati",
    "Visakhapatnam",
    "Warangal",
    "Karimnagar",
    "Kakinada",
    "Guntur",
    "Gujarat",
    "Nellore",
    "Pune",
    "Kolkata"
];

let selectedTrain = "";
let selectedFare = 0;
let selectedSeat = null;

/* =========================
   AUTO SUGGESTIONS
========================= */

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");

function createSuggestions(inputElement, suggestionBoxId) {

    const suggestionBox =
    document.getElementById(suggestionBoxId);

    inputElement.addEventListener("input", () => {

        const value =
        inputElement.value.toLowerCase();

        suggestionBox.innerHTML = "";

        if (value.length === 0) {
            return;
        }

        const matches =
        stations.filter(station =>
            station.toLowerCase().includes(value)
        );

        matches.forEach(station => {

            const item =
            document.createElement("div");

            item.textContent = station;

            item.onclick = () => {
                inputElement.value = station;
                suggestionBox.innerHTML = "";
            };

            suggestionBox.appendChild(item);
        });

    });
}

createSuggestions(fromInput, "fromSuggestions");
createSuggestions(toInput, "toSuggestions");

/* =========================
   SWAP STATIONS
========================= */

document.getElementById("swapBtn")
.addEventListener("click", () => {

    let temp = fromInput.value;

    fromInput.value = toInput.value;

    toInput.value = temp;
});

/* =========================
   SEARCH TRAINS
========================= */

function searchTrains() {

    const from =
    document.getElementById("from").value;

    const to =
    document.getElementById("to").value;

    const date =
    document.getElementById("travelDate").value;

    if (!from || !to || !date) {

        alert(
        "Please fill source, destination and date."
        );

        return;
    }

    const trainResults =
    document.getElementById("trainResults");

    trainResults.innerHTML = `

    <div class="train-card">
        <h2>🚆 Vande Bharath</h2>
        <p>Train No: 12951</p>
        <p>Departure: 06:00 AM</p>
        <p>Arrival: 02:00 PM</p>
        <p>Fare: ₹1750</p>

        <button class="book-btn"
        onclick="bookTrain('Vande Bharath',1750)">
        Book Now
        </button>
    </div>

    <div class="train-card">
        <h2>🚆 Devagiri Express</h2>
        <p>Train No: 12002</p>
        <p>Departure: 08:00 AM</p>
        <p>Arrival: 01:30 PM</p>
        <p>Fare: ₹1250</p>

        <button class="book-btn"
        onclick="bookTrain('Devagiri Express',1250)">
        Book Now
        </button>
    </div>

    <div class="train-card">
        <h2>🚆 Duronto Express</h2>
        <p>Train No: 12245</p>
        <p>Departure: 01:00 PM</p>
        <p>Arrival: 08:00 PM</p>
        <p>Fare: ₹1100</p>

        <button class="book-btn"
        onclick="bookTrain('Duronto Express',1100)">
        Book Now
        </button>
    </div>

    <div class="train-card">
        <h2>🚆 Venkatadri Express</h2>
        <p>Train No: 12765</p>
        <p>Departure: 02:00 AM</p>
        <p>Arrival: 09:00 AM</p>
        <p>Fare: ₹1350</p>

        <button class="book-btn"
        onclick="bookTrain('Venkatadri Express',1350)">
        Book Now
        </button>
    </div>

    <div class="train-card">
        <h2>🚆 Shatabdi Express</h2>
        <p>Train No: 13476</p>
        <p>Departure: 01:00 PM</p>
        <p>Arrival: 09:00 PM</p>
        <p>Fare: ₹1045</p>

        <button class="book-btn"
        onclick="bookTrain('Shatabdi Express',1045)">
        Book Now
        </button>
    </div>

    <div class="train-card">
        <h2>🚆 Sheshadri Express</h2>
        <p>Train No: 15432</p>
        <p>Departure: 03:00 PM</p>
        <p>Arrival: 10:45 PM</p>
        <p>Fare: ₹1565</p>

        <button class="book-btn"
        onclick="bookTrain('Sheshadri Express',1565)">
        Book Now
        </button>
    </div>

    `;
}

/* =========================
   BOOK TRAIN
========================= */

function bookTrain(trainName, fare) {

    selectedTrain = trainName;
    selectedFare = fare;

    document.getElementById(
        "passengerModal"
    ).style.display = "flex";
}

/* =========================
   SHOW SEATS
========================= */

function showSeats() {

    const name =
    document.getElementById("name").value;

    const age =
    document.getElementById("age").value;

    const phone =
    document.getElementById("phone").value;

    if (!name || !age || !phone) {

        alert(
        "Please fill passenger details."
        );

        return;
    }

    document.getElementById(
        "passengerModal"
    ).style.display = "none";

    document.getElementById(
        "seatModal"
    ).style.display = "flex";

    const seatContainer =
    document.getElementById(
        "seatContainer"
    );

    seatContainer.innerHTML = "";

    for(let i=1;i<=24;i++){

        const seat =
        document.createElement("div");

        seat.classList.add("seat");

        seat.textContent = i;

        if(
            i===3 ||
            i===7 ||
            i===12 ||
            i===18
        ){

            seat.classList.add("booked");

        }else{

            seat.classList.add("available");

            seat.onclick = () => {

                document
                .querySelectorAll(".seat")
                .forEach(s =>
                    s.classList.remove(
                        "selected"
                    )
                );

                seat.classList.add(
                    "selected"
                );

                selectedSeat = i;
            };
        }

        seatContainer.appendChild(
            seat
        );
    }
}

/* =========================
   PAYMENT PAGE
========================= */

function confirmBooking() {

    if(!selectedSeat){

        alert(
        "Please select a seat."
        );

        return;
    }

    document.getElementById(
        "seatModal"
    ).style.display = "none";

    const gst =
    Math.round(selectedFare * 0.05);

    const total =
    selectedFare + gst;

    document.getElementById(
        "fareSummary"
    ).innerHTML = `

        <p>
        Train :
        ${selectedTrain}
        </p>

        <p>
        Fare :
        ₹${selectedFare}
        </p>

        <p>
        GST :
        ₹${gst}
        </p>

        <hr>

        <h3>
        Total :
        ₹${total}
        </h3>

    `;

    document.getElementById(
        "paymentModal"
    ).style.display = "flex";
}
function togglePaymentFields(){

    const method =
    document.getElementById("paymentMethod").value;

    const upiSection =
    document.getElementById("upiSection");

    const cardSection =
    document.getElementById("cardSection");

    if(method === "UPI"){

        upiSection.style.display = "block";
        cardSection.style.display = "none";

    }else{

        upiSection.style.display = "none";
        cardSection.style.display = "block";
    }
}

/* =========================
   PROCESS PAYMENT
========================= */

function processPayment() {

    const button =
    document.querySelector(
        "#paymentModal button"
    );

    button.innerText =
    "Processing Payment...";

    button.disabled = true;

    setTimeout(() => {

        button.innerText =
        "Pay Now";

        button.disabled = false;

        document.getElementById(
            "paymentModal"
        ).style.display = "none";

        generateTicket();

    },2000);
}

/* =========================
   GENERATE TICKET
========================= */

function generateTicket() {

    const pnr =
    Math.floor(
        1000000000 +
        Math.random()*9000000000
    );

    const name =
    document.getElementById(
        "name"
    ).value;

    const age =
    document.getElementById(
        "age"
    ).value;

    const gender =
    document.getElementById(
        "gender"
    ).value;

    const phone =
    document.getElementById(
        "phone"
    ).value;

    const from =
    document.getElementById(
        "from"
    ).value;

    const to =
    document.getElementById(
        "to"
    ).value;

    const date =
    document.getElementById(
        "travelDate"
    ).value;

    const trainClass =
    document.getElementById(
        "trainClass"
    ).value;

    const gst =
    Math.round(
        selectedFare * 0.05
    );

    const total =
    selectedFare + gst;

    document.getElementById(
        "ticketModal"
    ).style.display = "flex";

    document.getElementById(
        "ticket"
    ).innerHTML = `

    <h3>RailReserve E-Ticket</h3>

    <hr><br>

    <p><strong>PNR:</strong>
    ${pnr}</p>

    <p><strong>Passenger:</strong>
    ${name}</p>

    <p><strong>Age:</strong>
    ${age}</p>

    <p><strong>Gender:</strong>
    ${gender}</p>

    <p><strong>Phone:</strong>
    ${phone}</p>

    <br>

    <p><strong>Train:</strong>
    ${selectedTrain}</p>

    <p><strong>Class:</strong>
    ${trainClass}</p>

    <p><strong>Seat No:</strong>
    ${selectedSeat}</p>

    <p><strong>From:</strong>
    ${from}</p>

    <p><strong>To:</strong>
    ${to}</p>

    <p><strong>Date:</strong>
    ${date}</p>

    <br>

    <p><strong>Total Paid:</strong>
    ₹${total}</p>

    <p>
    <strong>Status:</strong>
    CONFIRMED ✅
    </p>

    `;
}

/* =========================
   CLOSE TICKET
========================= */

function closeTicket(){

    document.getElementById(
        "ticketModal"
    ).style.display = "none";

    selectedSeat = null;
}

/* =========================
   CLOSE MODAL
========================= */

window.onclick = function(event){

    const passengerModal =
    document.getElementById(
        "passengerModal"
    );

    const seatModal =
    document.getElementById(
        "seatModal"
    );

    const paymentModal =
    document.getElementById(
        "paymentModal"
    );

    const ticketModal =
    document.getElementById(
        "ticketModal"
    );

    if(event.target === passengerModal){
        passengerModal.style.display =
        "none";
    }

    if(event.target === seatModal){
        seatModal.style.display =
        "none";
    }

    if(event.target === paymentModal){
        paymentModal.style.display =
        "none";
    }

    if(event.target === ticketModal){
        ticketModal.style.display =
        "none";
    }
};