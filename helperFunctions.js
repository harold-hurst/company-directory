// Helper functions to refresh tables
function refreshPersonnelTable() {
  $.ajax({
    url: "libs/php/database/getAllEmployees.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      if (
        result.status.code === "200" &&
        result.data &&
        Array.isArray(result.data)
      ) {
        var frag = document.createDocumentFragment();

        result.data.forEach(function (item, index) {
          var row = document.createElement("tr");

          var name = document.createElement("td");
          var nameText = document.createTextNode(
            item.lastName + ", " + item.firstName
          );
          name.append(nameText);

          row.append(name);

          var dept = document.createElement("td");
          var deptText = document.createTextNode(item.department);
          dept.append(deptText);

          row.append(dept);

          var loc = document.createElement("td");
          var locText = document.createTextNode(item.location);
          loc.append(locText);

          row.append(loc);

          var email = document.createElement("td");
          var emailText = document.createTextNode(item.email);
          email.append(emailText);

          row.append(email);

          var actionTd = document.createElement("td");
          actionTd.className = "text-end";

          // --- Edit Button ---
          var editButton = document.createElement("button");
          editButton.type = "button";
          editButton.className = "btn btn-primary btn-sm me-1";
          editButton.setAttribute("data-bs-toggle", "modal");
          editButton.setAttribute("data-bs-target", "#editPersonnelModal");
          editButton.setAttribute("data-id", item.id);

          var editIcon = document.createElement("i");
          editIcon.className = "fa-solid fa-pencil fa-fw";
          editButton.appendChild(editIcon);

          // --- Delete Button ---
          var deleteButton = document.createElement("button");
          deleteButton.type = "button";
          deleteButton.className = "btn btn-primary btn-sm";
          deleteButton.setAttribute("data-bs-toggle", "modal");
          deleteButton.setAttribute("data-bs-target", "#deletePersonnelModal");
          deleteButton.setAttribute("data-id", item.id);

          var deleteIcon = document.createElement("i");
          deleteIcon.className = "fa-solid fa-trash fa-fw";
          deleteButton.appendChild(deleteIcon);

          // Append buttons to the <td>
          actionTd.appendChild(editButton);
          actionTd.appendChild(deleteButton);

          // Append the <td> to the row
          row.appendChild(actionTd);

          frag.append(row);
        });

        document.getElementById("personnelTableBody").append(frag);
      } else {
        $("#personnelTableBody").html(
          `<tr><td colspan="6" class="text-center text-danger">No personnel found.</td></tr>`
        );
      }
    },
    error: function () {
      $("#personnelTableBody").html(
        `<tr><td colspan="6" class="text-center text-danger">Error fetching employee data</td></tr>`
      );
    },
  });
}

function refreshDepartmentsTable() {
  $.ajax({
    url: "libs/php/database/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      if (
        result.status.code === "200" &&
        result.data &&
        Array.isArray(result.data.departments)
      ) {
        var frag = document.createDocumentFragment();

        result.data.departments.forEach(function (dept) {
          var row = document.createElement("tr");

          var name = document.createElement("td");
          name.className = "align-middle text-nowrap";
          name.textContent = dept.name;
          row.append(name);

          var loc = document.createElement("td");
          loc.className = "align-middle text-nowrap d-none d-md-table-cell";
          loc.textContent = dept.location;
          row.append(loc);

          var actionTd = document.createElement("td");
          actionTd.className = "text-end";

          // Edit button
          var editButton = document.createElement("button");
          editButton.type = "button";
          editButton.className = "btn btn-primary btn-sm me-1";
          editButton.setAttribute("data-bs-toggle", "modal");
          editButton.setAttribute("data-bs-target", "#editDepartmentModal");
          editButton.setAttribute("data-id", dept.id);

          var editIcon = document.createElement("i");
          editIcon.className = "fa-solid fa-pencil fa-fw";
          editButton.appendChild(editIcon);

          // Delete button
          var deleteButton = document.createElement("button");
          deleteButton.type = "button";
          deleteButton.className = "btn btn-primary btn-sm";
          deleteButton.setAttribute("data-id", dept.id);
          deleteButton.setAttribute("data-bs-toggle", "modal");
          deleteButton.setAttribute("data-bs-target", "#deleteDepartmentModal");

          var deleteIcon = document.createElement("i");
          deleteIcon.className = "fa-solid fa-trash fa-fw";
          deleteButton.appendChild(deleteIcon);

          actionTd.appendChild(editButton);
          actionTd.appendChild(deleteButton);

          row.appendChild(actionTd);

          frag.appendChild(row);
        });

        var tableBody = document.getElementById("departmentTableBody");
        tableBody.innerHTML = "";
        tableBody.appendChild(frag);
      } else {
        $("#departmentTableBody").html(
          `<tr><td colspan="3" class="text-center text-danger">No departments found.</td></tr>`
        );
      }
    },
    error: function () {
      $("#departmentTableBody").html(
        `<tr><td colspan="3" class="text-center text-danger">Error fetching department data</td></tr>`
      );
    },
  });
}

function refreshLocationsTable() {
  $.ajax({
    url: "libs/php/database/getAllLocations.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      if (
        result.status.code === "200" &&
        result.data &&
        Array.isArray(result.data.locations)
      ) {
        var frag = document.createDocumentFragment();

        result.data.locations.forEach(function (loc) {
          var row = document.createElement("tr");

          var name = document.createElement("td");
          name.className = "align-middle text-nowrap";
          name.textContent = loc.name;
          row.append(name);

          var actionTd = document.createElement("td");
          actionTd.className = "text-end";

          // Edit button
          var editButton = document.createElement("button");
          editButton.type = "button";
          editButton.className = "btn btn-primary btn-sm me-1";
          editButton.setAttribute("data-bs-toggle", "modal");
          editButton.setAttribute("data-bs-target", "#editLocationModal");
          editButton.setAttribute("data-id", loc.id);

          var editIcon = document.createElement("i");
          editIcon.className = "fa-solid fa-pencil fa-fw";
          editButton.appendChild(editIcon);

          // Delete button
          var deleteButton = document.createElement("button");
          deleteButton.type = "button";
          deleteButton.className = "btn btn-primary btn-sm";
          deleteButton.setAttribute("data-id", loc.id);
          deleteButton.setAttribute("data-bs-toggle", "modal");
          deleteButton.setAttribute("data-bs-target", "#deleteLocationModal");

          var deleteIcon = document.createElement("i");
          deleteIcon.className = "fa-solid fa-trash fa-fw";
          deleteButton.appendChild(deleteIcon);

          actionTd.appendChild(editButton);
          actionTd.appendChild(deleteButton);

          row.appendChild(actionTd);

          frag.appendChild(row);
        });

        var tableBody = document.getElementById("locationTableBody");
        tableBody.innerHTML = "";
        tableBody.appendChild(frag);
      } else {
        $("#locationTableBody").html(
          `<tr><td colspan="2" class="text-center text-danger">No locations found.</td></tr>`
        );
      }
    },
    error: function () {
      $("#locationTableBody").html(
        `<tr><td colspan="2" class="text-center text-danger">Error fetching location data</td></tr>`
      );
    },
  });
}

function activatePersonnelTab() {
  const personnelTabBtn = document.getElementById("personnelBtn");
  const tab = new bootstrap.Tab(personnelTabBtn);
  tab.show();

  // enable filter button if not already enabled
  if ($("#filterBtn").prop("disabled")) {
    $("#filterBtn").prop("disabled", false);
  }
}
