const staff = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@egmail.com",
    image: "./images/staff1.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@egmail.com",
    image: "./images/staff2.png",
  },
];

const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "./images/service1.png",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "./images/service2.png",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
  {
    id: 3,
    name: "Check up",
    image: "./images/service3.png",
    duration: "1 hour 12 minutes",
    price: 140.0,
  },
];

const dateData = ["2024-03-04", "2024-03-05", "2024-03-06"];

const timeSlots = [
  {
    start_time: "09:00",
    end_time: "09:30",
  },
  {
    start_time: "09:30",
    end_time: "10:00",
  },
  {
    start_time: "10:00",
    end_time: "10:30",
  },
];

let generalObj = {};

var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");
var form_4 = document.querySelector(".form_4");

let form_container_1 = document.querySelector(".form_container-1");
let form_container_2 = document.querySelector(".form_container-2");
let form_container_3 = document.querySelector(".form_container-3");
let form_container_4 = document.querySelector(".form_container-4");

let mappedStaff = staff.map((item) => {
  return `<div
              class="form_container-1-item"
              onclick="getStaffId('${item.id}','${item.name}')"
            >
              <img src="${item.image}"/>
              <div class="item-content">
                <p>${item.name}</p>
                <p>${item.email}</p>
              </div>
          </div>`;
});

function getStaffId(id, name) {
  generalObj.staff_id = id;
  generalObj.staff_name = name;
}

form_container_1.innerHTML = mappedStaff.join(" ");

let mappedServices = services.map((item) => {
  return `
            <div class="form_container-2-item" onclick="getServiceId('${item.id}','${item.name}','${item.price}')">
              <div><img src="${item.image}"/></div>  
              <div class="item-content">
                <p>${item.name}</p>
                <p>${item.duration}</p>
              </div>
              <div class="price">${item.price} $</div>
            </div>
          `;
});

function getServiceId(id, name, price) {
  generalObj.service_id = id;
  generalObj.service_name = name;
  generalObj.service_price = price;
}

form_container_2.innerHTML = mappedServices.join(" ");

var form_1_btns = document.querySelector(".form_1_btns");
var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");
var form_4_btns = document.querySelector(".form_4_btns");

var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");

var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");

var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");
var form_3_next_btn = document.querySelector(".form_3_btns .btn_next");

var form_4_back_btn = document.querySelector(".form_4_btns .btn_back");

var form_2_progessbar = document.querySelector(".form_2_progessbar");
var form_3_progessbar = document.querySelector(".form_3_progessbar");
var form_4_progessbar = document.querySelector(".form_4_progessbar");

var btn_done = document.querySelector(".btn_done");
var modal_wrapper = document.querySelector(".modal_wrapper");
var modal_wrapper_error = document.querySelector(".modal_wrapper_error");
var shadow = document.querySelector(".shadow");
var shadow_error = document.querySelector(".shadow-error");

let staffBtn = document.querySelector(".staffBtn");
let serviceBtn = document.querySelector(".serviceBtn");
let timeBtn = document.querySelector(".timeBtn");
let notes = document.querySelector(".notes");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");

let form_container_1_item = document.querySelectorAll(".form_container-1-item");
let form_container_2_item = document.querySelectorAll(".form_container-2-item");

// calendar

const calendarDiv = document.getElementById("calendar");
const timeSlotsDiv = document.getElementById("timeSlots");
const dateDisplayDiv = document.getElementById("dateDisplay");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const monthNameDiv = document.getElementById("monthName");

let selectedDate = null;
let selectedTime = null;
let selectedDayElement = null;

let displayedYear = new Date().getFullYear();
let displayedMonth = new Date().getMonth();

function updateCalendar(year, month) {
  calendarDiv.innerHTML = "";
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const emptyDaysBefore = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  for (let i = 0; i < emptyDaysBefore; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "day empty-day";
    calendarDiv.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.textContent = day;

    const dateString = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    if (dateData.includes(dateString)) {
      dayElement.classList.add("clickable", "highlighted");
      dayElement.addEventListener("click", () => {
        selectDay(dayElement, dateString);
      });

      if (selectedDate === dateString) {
        selectedDayElement = dayElement;
      }
    }

    calendarDiv.appendChild(dayElement);
  }
}

function selectDay(dayElement, dateString) {
  if (selectedDayElement) {
    selectedDayElement.classList.remove("selected");
  }

  dayElement.classList.add("selected");
  selectedDayElement = dayElement;
  selectedDate = dateString;
  showTimeSlots(dateString);
  dateDisplayDiv.textContent = dateString;
}

function showTimeSlots(selectedDate) {
  timeSlotsDiv.innerHTML = "";

  for (const timeSlot of timeSlots) {
    const timeSlotElement = document.createElement("div");
    timeSlotElement.classList.add("time-slot");
    timeSlotElement.textContent = `${timeSlot.start_time} - ${timeSlot.end_time}`;

    timeSlotElement.addEventListener("click", () => {
      if (selectedTime) {
        const prevSelectedTimeElement =
          document.querySelector(".selected-time");
        if (prevSelectedTimeElement) {
          prevSelectedTimeElement.classList.remove("selected-time");
        }
      }

      timeSlotElement.classList.add("selected-time");
      selectedTime = `${timeSlot.start_time} - ${timeSlot.end_time}`;
      addToGeneralObj();
    });

    timeSlotsDiv.appendChild(timeSlotElement);

    if (selectedTime === timeSlot.start_time) {
      timeSlotElement.classList.add("selected-time");
    }
  }
}
function addToGeneralObj() {
  if (selectedDate && selectedTime) {
    generalObj.date = selectedDate;
    generalObj.time = selectedTime;
  }
}

function updateMonth(monthDiff) {
  displayedMonth += monthDiff;

  if (displayedMonth < 0) {
    displayedMonth = 11;
    displayedYear--;
  } else if (displayedMonth > 11) {
    displayedMonth = 0;
    displayedYear++;
  }

  selectedDate = null;
  selectedTime = null;
  selectedDayElement = null;
  updateCalendar(displayedYear, displayedMonth);
  displayMonthName();
}

function displayMonthName() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthNameDiv.textContent = `${months[displayedMonth]} ${displayedYear}`;
}

prevMonthButton.addEventListener("click", () => {
  updateMonth(-1);
});

nextMonthButton.addEventListener("click", () => {
  updateMonth(1);
});

updateCalendar(displayedYear, displayedMonth);
displayMonthName();

if (selectedDayElement) {
  selectedDayElement.classList.add("selected");
}

form_container_1_item.forEach((item) => {
  item.addEventListener("click", () => {
    form_container_1_item.forEach((f) => f.classList.remove("active"));
    item.classList.add("active");
  });
});

form_container_2_item.forEach((item) => {
  item.addEventListener("click", () => {
    form_container_2_item.forEach((f) => f.classList.remove("active"));
    item.classList.add("active");
  });
});

form_1_next_btn.addEventListener("click", function () {
  if (generalObj.staff_id) {
    staffBtn.style.visibility = "hidden";

    form_1.style.display = "none";
    form_2.style.display = "block";

    form_1_btns.style.display = "none";
    form_2_btns.style.display = "flex";

    form_2_progessbar.classList.add("active");
  } else {
    staffBtn.classList.add("hide");
    staffBtn.style.visibility = "visible";
  }
});

form_2_back_btn.addEventListener("click", function () {
  form_1.style.display = "block";
  form_2.style.display = "none";

  form_1_btns.style.display = "flex";
  form_2_btns.style.display = "none";

  form_2_progessbar.classList.remove("active");
});

form_2_next_btn.addEventListener("click", function () {
  if (generalObj.service_id) {
    serviceBtn.style.visibility = "hidden";

    form_2.style.display = "none";
    form_3.style.display = "block";

    form_3_btns.style.display = "flex";
    form_2_btns.style.display = "none";

    form_3_progessbar.classList.add("active");
  } else {
    serviceBtn.classList.add("hide");
    serviceBtn.style.visibility = "visible";
  }
});

form_3_back_btn.addEventListener("click", function () {
  form_2.style.display = "block";
  form_3.style.display = "none";

  form_3_btns.style.display = "none";
  form_2_btns.style.display = "flex";

  form_3_progessbar.classList.remove("active");
});

form_3_next_btn.addEventListener("click", function () {
  if (generalObj.date && generalObj.time) {
    timeBtn.style.visibility = "hidden";

    form_3.style.display = "none";
    form_4.style.display = "block";

    form_4_btns.style.display = "flex";
    form_3_btns.style.display = "none";

    form_4_progessbar.classList.add("active");

    notes.innerHTML = `
                          <h2>Note</h2>
                          <div>
                            <p>
                              <span class="property">Staff : </span>
                              <span class="value">${generalObj.staff_name}</span>
                            </p>
                            <p>
                              <span class="property"> Service : </span>
                              <span class="value">${generalObj.service_name}</span>
                            </p>
                            <p>
                              <span class="property">Date : </span>
                              <span class="value">${generalObj.date} / ${generalObj.time}</span>
                            </p>
                            <p>
                              <span class="property">Total : </span>
                              <span class="value">${generalObj.service_price} $</span>
                            </p>
                          </div>
                      `;
  } else {
    timeBtn.classList.add("hide");
    timeBtn.style.visibility = "visible";
  }
});

form_4_back_btn.addEventListener("click", function () {
  form_3.style.display = "block";
  form_4.style.display = "none";

  form_4_btns.style.display = "none";
  form_3_btns.style.display = "flex";

  form_4_progessbar.classList.remove("active");
});

btn_done.addEventListener("click", function () {
  generalObj.customer = {
    name: firstName.value,
    surname: lastName.value,
    email: email.value,
    phone: phone.value,
  };

  if (
    generalObj.customer.name &&
    generalObj.customer.surname &&
    generalObj.customer.email
  ) {
    modal_wrapper.classList.add("active");
    console.log(generalObj);
  } else {
    modal_wrapper_error.classList.add("active");
  }
});

shadow.addEventListener("click", function () {
  modal_wrapper.classList.remove("active");
});

shadow_error.addEventListener("click", function () {
  modal_wrapper_error.classList.remove("active");
});
