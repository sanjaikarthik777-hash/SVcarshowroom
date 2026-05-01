// LOAD BOOKINGS
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

const tableBody = document.getElementById("bookingTable");
const totalSpan = document.getElementById("totalBookings");

// UPDATE STATS
totalSpan.innerText = bookings.length;

// RENDER TABLE
function renderTable(){
  tableBody.innerHTML = "";

  bookings.forEach((b, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${b.car}</td>
        <td>${b.name}</td>
        <td>${b.email}</td>
        <td>${b.phone}</td>
        <td>${b.datetime}</td>
        <td class="${b.status === 'Approved' ? 'status-approved' : 'status-pending'}">
          ${b.status}
        </td>
        <td>
          <button class="btn btn-approve" onclick="approveBooking(${index})">Approve</button>
          <button class="btn btn-delete" onclick="deleteBooking(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// APPROVE BOOKING
function approveBooking(index){
  bookings[index].status = "Approved";
  localStorage.setItem("bookings", JSON.stringify(bookings));
  renderTable();
}

// DELETE BOOKING
function deleteBooking(index){
  if(confirm("Are you sure you want to delete this booking?")){
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    totalSpan.innerText = bookings.length;
    renderTable();
  }
}

// LOGOUT
function logout(){
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "login.html";
}

// INITIAL LOAD
renderTable();
