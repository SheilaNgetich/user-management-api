// After the HTML document is fully loaded, this calls loadHTMLTable().
// If no data is available, the table displays a "No data" message across 5 columns.
document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayUsers();
});

// Looping through each user in the data and creating a table row
function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");
  if (data.length === 0) {
    table.innerHTML = "<tr><td class ='nodata' colspan = '5'>No data</td></tr>";
    return;
  }

  let tableHtml = "";

  // Looping through each user in the data and creating a table row
  data.forEach(({ id, name, date_added }) => {
    tableHtml += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${date_added}</td>
                <td><button class = "delete_rowbtn" data-id="${id}">Delete</button></td>
                <td><button class = "edit_rowbtn" data-id="${id}">Edit</button></td>
            </tr>
        `;
  });

  table.innerHTML = tableHtml;
}

//function to display all users
function fetchAndDisplayUsers() {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      loadHTMLTable(data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      const table = document.querySelector("table tbody");
      table.innerHTML =
        "<tr><td class='nodata' colspan='5'>Error loading data</td></tr>";
    });
}

//function to delete a user
function deleteUser(id) {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      fetchAndDisplayUsers();
    })
    .catch((error) => {
      console.error("Error deleting the user:", error); // Handle any errors
    });
}

// Handle adding a new user
const addBtn = document.querySelector("#name_btn"); // gets the input element
addBtn.onclick = function () {
  const nameInput = document.querySelector("#name");
  const name = nameInput.value; // gets the value inside the input
  nameInput.value = ""; //resets the input to an empty string

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }), // Send the name to the backend
  })
    .then((response) => response.json())
    .then((data) => {
      fetchAndDisplayUsers();
    })
    .catch((error) => {
      console.error("Error adding new user:", error); // Handle any errors
    });
};

// Handle for deleting a user and editing a user's name
let selectedUserId = null;
document.addEventListener("click", function (e) {
  // Check if the clicked element is a delete button
  if (e.target && e.target.classList.contains("delete_rowbtn")) {
    // Get the user ID from the button's data attribute
    const id = e.target.getAttribute("data-id");
    deleteUser(id);
  }
  // Check if the clicked element is an edit button
  if (e.target && e.target.classList.contains("edit_rowbtn")) {
    selectedUserId = e.target.getAttribute("data-id"); // Get user ID
    // Get the row that contains the edit button
    const row = e.target.closest("tr");

    // Get the name cell (second column, index 1)
    const currentName = row.cells[1].textContent;

    // Fill the update input with the current name
    document.querySelector("#update-name-input").value = currentName;
    // Show update section
    document.querySelector("#update-row").style.display = "block";
  }
});

//Handle updating a user's details
const updateBtn = document.querySelector("#update-row-btn");
updateBtn.addEventListener("click", function (event) {
const updatedName = document.querySelector("#update-name-input").value.trim();

  // Basic validation
  if (!updatedName) {
    alert("Name cannot be empty");
    return;
  }

  // Make sure we have a selected user ID
  if (!selectedUserId) {
    console.error("No user selected for update");
    return;
  }

  fetch(`http://localhost:3000/users/${selectedUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: updatedName }),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchAndDisplayUsers();
      // Hide the update section
      document.querySelector("#update-row").style.display = "none";
      // Clear the selected user ID
      selectedUserId = null;
    })
    .catch((error) => {
      console.error("Error adding new user:", error);
    });
});

//search button funcionality
const searchBtn = document.querySelector("#search_btn");
searchBtn.addEventListener("click", function (event) {
  const searchInput = document.querySelector("#search-input");
  const searchedName = searchInput.value.trim();

  // Basic validation
  if (!searchedName) {
    // If search is empty, show all users
    fetchAndDisplayUsers();
    return;
  }

  fetch(`http://localhost:3000/users/search/${searchedName}`)
    .then((response) => response.json())
    .then((data) => {
      loadHTMLTable(data);
    })
    .catch((error) => {
      console.error("Error searching for user:", error);
    });
});
