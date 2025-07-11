// HELPER FUNCTIONS

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

// POPULATE MODALS

// Populate editPersonnelModal when shown
$("#editPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/database/getEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted

        $("#editPersonnelID").val(result.data.personnel[0].id);
        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        $("#editPersonnelDepartment").html("");

        $.ajax({
          url: "libs/php/database/getAllDepartments.php",
          type: "POST",
          dataType: "json",
          success: function (deptResult) {
            if (deptResult.status.code == 200) {
              // Populate the department select element with options
              $.each(deptResult.data.departments, function () {
                $("#editPersonnelDepartment").append(
                  $("<option>", {
                    value: this.id,
                    text: this.name,
                  })
                );
              });

              // Set the selected value to the employee's departmentID
              $("#editPersonnelDepartment").val(
                result.data.personnel[0].departmentID
              );
            } else {
              $("#editPersonnelModal .modal-title").replaceWith(
                "Error retrieving departments"
              );
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").replaceWith(
              "Error retrieving departments"
            );
          },
        });
      } else {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

// Populate editDepartmentModal when shown
$("#editDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/database/getDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#editDepartmentID").val(result.data[0].id);
        $("#editDepartmentName").val(result.data[0].name);

        $.ajax({
          url: "libs/php/database/getAllLocations.php",
          type: "POST",
          dataType: "json",
          success: function (locResult) {
            if (locResult.status.code == 200) {
              // Populate the location select element with options
              $.each(locResult.data.locations, function () {
                $("#editDepartmentLocation").append(
                  $("<option>", {
                    value: this.id,
                    text: this.name,
                  })
                );
              });

              // Set the selected value to the employee's departmentID
              $("#editDepartmentLocation").val(result.data[0].locationID);
            } else {
              $("#editDepartmentModal .modal-title").replaceWith(
                "Error retrieving locations"
              );
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#editDepartmentModal .modal-title").replaceWith(
              "Error retrieving locations"
            );
          },
        });
      } else {
        $("#editDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

// Populate editLocationModal when shown
$("#editLocationModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/database/getLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#editLocationID").val(result.data[0].id);
        $("#editLocationName").val(result.data[0].name);
      } else {
        $("#editDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#editDepartmentModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

// ==============================================================

// Populate addPersonnelModal when shown
$("#addPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/database/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $.each(result.data.departments, function () {
          $("#addPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#addPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addPersonnelModal .modal-title").replaceWith("Error retrieving data");
    },
  });
});

// Populate addDepartmentModal when shown
$("#addDepartmentModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/database/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (locResult) {
      if (locResult.status.code == 200) {
        // Populate the location select element with options
        $.each(locResult.data.locations, function () {
          $("#addDepartmentLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });
      } else {
        $("#addDepartmentModal .modal-title").replaceWith(
          "Error retrieving locations"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#addDepartmentModal .modal-title").replaceWith(
        "Error retrieving locations"
      );
    },
  });
});

// ===============================================================

// Populate deletePersonnelModal when shown
$("#deletePersonnelModal").on("show.bs.modal", function (e) {
  const employeeId = $(e.relatedTarget).attr("data-id");

  // Set the employee ID in the modal
  $("#deletePersonnelEmployeeID").val(employeeId);

  // Fetch and display employee details
  $.ajax({
    url: "libs/php/database/getEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      id: employeeId,
    },
    success: function (result) {
      if (result.status.code == 200) {
        const emp = result.data.personnel[0];
        $("#deletePersonnelName").text(`${emp.firstName} ${emp.lastName}`);
        // $("#deletePersonnelJobTitle").text(emp.jobTitle);
        // $("#deletePersonnelEmail").text(emp.email);
        // $("#deletePersonnelDepartment").text(emp.department);
      } else {
        $("#deletePersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deletePersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

// Populate deleteDepartmentModal when shown
$("#deleteDepartmentModal").on("show.bs.modal", function (e) {
  const departmentId = $(e.relatedTarget).attr("data-id");

  // Set the department ID in the modal
  $("#deleteDepartmentID").val(departmentId);

  // Remove dependency/check alerts and enable the button if present
  $("#deleteDepartmentModal .modal-body #cannotDeleteMessage").remove();
  $("#deleteDepartmentModal .modal-body #confirmDeleteMessage").remove();
  $("#confirmDeleteDepartmentBtn").show();
  $("#dontDeleteDepartmentBtn").text("NO");

  // First check if the department has any employees
  $.ajax({
    url: "libs/php/database/getEmployeesByDepartment.php",
    type: "POST",
    dataType: "json",
    data: { departmentID: departmentId },
    success: function (result) {
      if (
        result.status.code == 200 &&
        result.data &&
        result.data.personnel[0]["personnelCount"] > 0
      ) {
        let employeeCount = result.data.personnel[0]["personnelCount"];

        let departmentName = result.data.personnel[0]["departmentName"];

        if (
          $("#deleteDepartmentModal .modal-body #cannotDeleteMessage")
            .length === 0
        ) {
          $("#deleteDepartmentModal .modal-body").append(
            `<span id="cannotDeleteMessage" class="mt-3">You cannot remove the entry for <span class="fw-bold">${departmentName}</span> because it has <span class="fw-bold">${employeeCount}</span> employees assigned to it.</span>`
          );
        }

        $("#confirmDeleteDepartmentBtn").hide();
        $("#dontDeleteDepartmentBtn").text("CLOSE");

        return;
      } else {
        let departmentName = result.data.personnel[0]["departmentName"];
        if (
          $("#deleteDepartmentModal .modal-body #confirmDeleteMessage")
            .length === 0
        ) {
          $("#deleteDepartmentModal .modal-body").append(
            `<span id="confirmDeleteMessage" class="mt-3">Are you sure you want to remove the entry for <span class="fw-bold">${departmentName}</span> ?</span>`
          );
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });

  // Set the department ID in the modal
  $("#deleteDepartmentID").val(departmentId);

  // Fetch and display department details
  $.ajax({
    url: "libs/php/database/getDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      id: departmentId,
    },
    success: function (result) {
      if (result.status.code == 200) {
        const dept = result.data[0];
        $("#deleteDepartmentName").text(dept.name);
        $("#deleteDepartmentLocation").text(dept.location);
      } else {
        $("#deleteDepartmentModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteDepartmentModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

// Populate deleteLocationModal when shown
$("#deleteLocationModal").on("show.bs.modal", function (e) {
  const locationId = $(e.relatedTarget).attr("data-id");

  // Set the location ID in the modal
  $("#deleteLocationID").val(locationId);

  // Remove dependency/check alerts and enable the button if present
  $("#deleteLocationModal .modal-body #cannotDeleteLocationMessage").remove();
  $("#deleteLocationModal .modal-body #confirmDeleteLocationMessage").remove();
  $("#confirmDeleteLocationBtn").show();
  $("#dontDeleteLocationBtn").text("NO");

  // First check if the location has any departments
  $.ajax({
    url: "libs/php/database/getDepartmentsByLocation.php",
    type: "POST",
    dataType: "json",
    data: { locationID: locationId },
    success: function (result) {
      if (
        result.status.code == 200 &&
        result.data &&
        result.data.departments[0]["departmentCount"] > 0
      ) {
        let departmentCount = result.data.departments[0]["departmentCount"];
        let locationName = result.data.departments[0]["locationName"];

        if (
          $("#deleteDepartmentModal .modal-body #cannotDeleteLocationMessage")
            .length === 0
        ) {
          $("#deleteLocationModal .modal-body").append(
            `<span id="cannotDeleteLocationMessage" class="mt-3">You cannot remove the entry for <span class="fw-bold">${locationName}</span> because it has <span class="fw-bold">${departmentCount}</span> departments assigned to it.</span>`
          );
        }

        $("#confirmDeleteLocationBtn").hide();
        $("#dontDeleteLocationBtn").text("CLOSE");

        return;
      } else {
        let locationName = result.data.departments[0]["locationName"];
        if (
          $("#deleteLocationModal .modal-body #confirmDeleteLocationMessage")
            .length === 0
        ) {
          $("#deleteLocationModal .modal-body").append(
            `<span id="confirmDeleteLocationMessage" class="mt-3">Are you sure you want to remove the entry for <span class="fw-bold">${locationName}</span> ?</span>`
          );
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });

  // Fetch and display location details
  $.ajax({
    url: "libs/php/database/getLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: locationId,
    },
    success: function (result) {
      if (result.status.code == 200) {
        const loc = result.data[0];
        $("#deleteLocationName").text(loc.name);
      } else {
        $("#deleteLocationModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#deleteLocationModal .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

// FORM SUBMISSION HANDLING

// Edit personnel form submission handler
$("#editPersonnelForm").on("submit", function (e) {
  e.preventDefault();

  // Gather form data
  const formData = {
    id: $("#editPersonnelID").val(),
    firstName: $("#editPersonnelFirstName").val(),
    lastName: $("#editPersonnelLastName").val(),
    jobTitle: $("#editPersonnelJobTitle").val(),
    email: $("#editPersonnelEmailAddress").val(),
    departmentID: $("#editPersonnelDepartment").val(),
  };

  // AJAX call to update personnel
  $.ajax({
    url: "libs/php/database/updateEmployee.php",
    type: "POST",
    dataType: "json",
    data: formData,
    success: function (result) {
      if (result.status.code == 200) {
        $("#editPersonnelModal").modal("hide");
        refreshPersonnelTable();
      } else {
        alert("Error updating employee: " + result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// Delete personnel form submission handler
$("#deletePersonnelForm").on("submit", function (e) {
  e.preventDefault();

  const employeeId = $("#deletePersonnelEmployeeID").val();

  $.ajax({
    url: "libs/php/database/deleteEmployee.php",
    type: "POST",
    dataType: "json",
    data: { id: employeeId },
    success: function (result) {
      if (result.status.code == 200) {
        $("#deletePersonnelModal").modal("hide");
        refreshPersonnelTable();
      } else {
        alert("Error deleting employee: " + result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// Add personnel form submission handler
$("#addPersonnelForm").on("submit", function (e) {
  e.preventDefault();

  // Gather form data
  const formData = {
    firstName: $("#addPersonnelFirstName").val(),
    lastName: $("#addPersonnelLastName").val(),
    jobTitle: $("#addPersonnelJobTitle").val(),
    email: $("#addPersonnelEmailAddress").val(),
    departmentID: $("#addPersonnelDepartment").val(),
  };

  // AJAX call to add personnel
  $.ajax({
    url: "libs/php/database/addEmployee.php",
    type: "POST",
    dataType: "json",
    data: formData,
    success: function (result) {
      if (result.status.code == 200) {
        $("#addPersonnelModal").modal("hide");
        refreshPersonnelTable();
      } else {
        alert("Error adding employee: " + result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// ===============================================================

// Edit department form submission handler
$("#editDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  const formData = {
    id: $("#editDepartmentID").val(),
    name: $("#editDepartmentName").val(),
    locationID: $("#editDepartmentLocation").val(),
  };

  $.ajax({
    url: "libs/php/database/updateDepartment.php",
    type: "POST",
    dataType: "json",
    data: formData,
    success: function (result) {
      if (result.status.code == 200) {
        $("#editDepartmentModal").modal("hide");
        refreshDepartmentsTable();
      } else {
        alert("Error updating department: " + result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// Delete department form submission handler
$("#deleteDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  const departmentId = $("#deleteDepartmentID").val();

  // First check if the department has any employees
  $.ajax({
    url: "libs/php/database/getEmployeesByDepartment.php",
    type: "POST",
    dataType: "json",
    data: { departmentID: departmentId },
    success: function (result) {
      if (
        result.status.code == 200 &&
        result.data &&
        result.data.personnel[0]["personnelCount"] > 0
      ) {
        alert(
          "Cannot delete department: There are employees assigned to this department."
        );

        return;
      } else {
        // Proceed with delete if no employees found
        $.ajax({
          url: "libs/php/database/deleteDepartment.php",
          type: "POST",
          dataType: "json",
          data: { id: departmentId },
          success: function (result) {
            if (result.status.code == 200) {
              $("#deleteDepartmentModal").modal("hide");
              refreshDepartmentsTable();
            } else {
              alert("Error deleting department: " + result.status.description);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            alert("AJAX error: " + textStatus);
          },
        });
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// Add department form submission handler
$("#addDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: $("#addDepartmentName").val(),
    locationID: $("#addDepartmentLocation").val(),
  };

  $.ajax({
    url: "libs/php/database/addDepartment.php",
    type: "POST",
    dataType: "json",
    data: formData,
    success: function (result) {
      if (result.status.code == 200) {
        $("#addDepartmentModal").modal("hide");
        refreshDepartmentsTable();
      } else {
        alert("Error adding department: " + result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// ===============================================================

// Edit location form submission handler
$("#editLocationForm").on("submit", function (e) {
  e.preventDefault();

  const formData = {
    id: $("#editLocationID").val(),
    name: $("#editLocationName").val(),
  };

  $.ajax({
    url: "libs/php/database/updateLocation.php",
    type: "POST",
    dataType: "json",
    data: formData,
    success: function (result) {
      if (result.status.code == 200) {
        $("#editLocationModal").modal("hide");
        refreshLocationsTable();
      } else {
        alert("Error updating location: " + result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// Delete location form submission handler
$("#deleteLocationForm").on("submit", function (e) {
  e.preventDefault();

  const locationId = $("#deleteLocationID").val();
  // First check if the location has any departments
  $.ajax({
    url: "libs/php/database/getDepartmentsByLocation.php",
    type: "POST",
    dataType: "json",
    data: { locationID: locationId },
    success: function (result) {
      if (
        result.status.code == 200 &&
        result.data &&
        result.data.departments[0]["departmentCount"] > 0
      ) {
        alert(
          "Cannot delete location: There are departments assigned to this location."
        );
        return;
      } else {
        // Proceed with delete if no departments found
        $.ajax({
          url: "libs/php/database/deleteLocation.php",
          type: "POST",
          dataType: "json",
          data: { id: locationId },
          success: function (result) {
            if (result.status.code == 200) {
              $("#deleteLocationModal").modal("hide");
              refreshLocationsTable();
            } else {
              alert("Error deleting location: " + result.status.description);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            alert("AJAX error: " + textStatus);
          },
        });
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// Add location form submission handler
$("#addLocationForm").on("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: $("#addLocationName").val(),
  };

  $.ajax({
    url: "libs/php/database/addLocation.php",
    type: "POST",
    dataType: "json",
    data: formData,
    success: function (result) {
      if (result.status.code == 200) {
        $("#addLocationModal").modal("hide");
        refreshLocationsTable();
      } else {
        alert("Error adding location: " + result.status.description);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });
});

// INDEX.JS

// Populate three tables on page load
$(document).ready(function () {
  // Populate Personnel table
  refreshPersonnelTable();

  // Populate Departments table
  refreshDepartmentsTable();

  // Populate Locations table
  refreshLocationsTable();
});

// Handle search input change - toggle rows in appropriate table body
$("#searchInp").on("keyup", function () {
  const searchTerm = $(this).val().toLowerCase();

  // Find the active table body
  let tableBody;
  if ($("#personnelBtn").hasClass("active")) {
    tableBody = $("#personnelTableBody");
  } else if ($("#departmentsBtn").hasClass("active")) {
    tableBody = $("#departmentTableBody");
  } else {
    tableBody = $("#locationTableBody");
  }

  // For each tr in the tale body, check if the text includes the search term
  tableBody.find("tr").each(function () {
    const rowText = $(this).text().toLowerCase();
    $(this).toggle(rowText.indexOf(searchTerm) > -1);
  });
});

$("#refreshBtn").click(function () {
  // Clear the search input
  $("#searchInp").val("");

  if ($("#personnelBtn").hasClass("active")) {
    refreshPersonnelTable();
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      refreshDepartmentsTable();
    } else if ($("#locationsBtn").hasClass("active")) {
      refreshLocationsTable();
    }
  }

  // activatePersonnelTab();

  // enable filter button if not already enabled
  // if ($("#filterBtn").prop("disabled")) {
  //   $("#filterBtn").prop("disabled", false);
  // }

  // remove the btn-danger class from filterBtn if present
  // $("#filterBtn").removeClass("btn-danger");

  // $("#filterLocation").val("All");
  // $("#filterDepartment").val("All");
});

// Open appropriate modal when the add button is clicked
$("#addBtn").click(function () {
  if ($("#departmentsBtn").hasClass("active")) {
    // Open the add location modal
    $("#addDepartmentModal").modal("show");
  } else if ($("#locationsBtn").hasClass("active")) {
    // Open the add location modal
    $("#addLocationModal").modal("show");
  } else {
    // Open the add personnel modal
    $("#addPersonnelModal").modal("show");
  }
});

// Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location.
$("#filterBtn").click(function () {
  // Show the modal
  $("#filterPersonnelModal").modal("show");

  $.ajax({
    url: "libs/php/database/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Before populating #filterDepartment, add a default option
        if ($("#filterDepartment").children().length === 0) {
          $("#filterDepartment")
            .empty()
            .append(
              $("<option>", {
                value: "All",
                text: "All",
              })
            );

          // Populate the select with departments
          $.each(result.data.departments, function () {
            $("#filterDepartment").append(
              $("<option>", {
                value: this.name,
                text: this.name,
              })
            );
          });
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterDepartmentModalLabel .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });

  $.ajax({
    url: "libs/php/database/getAllLocations.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Before populating #filterLocation, add a default option
        if ($("#filterLocation").children().length === 0) {
          $("#filterLocation")
            .empty()
            .append(
              $("<option>", {
                value: "All",
                text: "All",
              })
            );

          // Populate the select with locations
          $.each(result.data.locations, function () {
            $("#filterLocation").append(
              $("<option>", {
                value: this.name,
                text: this.name,
              })
            );
          });
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterPersonnelModalLabel .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

$("#filterDepartment").change(function () {
  $("#filterLocation").val("All");

  const dept = $("#filterDepartment").val().toLowerCase();

  if (dept === "all") {
    // If "All" is selected, show all rows
    $("#personnelTableBody tr").show();
    // add a colour to filter button when a filter is applied
    $("#filterBtn").removeClass("btn-danger");
  } else {
    // Otherwise, filter rows based on the selected department

    $("#personnelTableBody tr").each(function () {
      const row = $(this);
      const departmentCell = row.find("td").eq(1).text().toLowerCase();

      const deptMatch = departmentCell.indexOf(dept) > -1;

      row.toggle(deptMatch);
    });

    // add a colour to filter button when a filter is applied
    $("#filterBtn").addClass("btn-danger");
  }
});

$("#filterLocation").change(function () {
  $("#filterDepartment").val("All");

  const loc = $("#filterLocation").val().toLowerCase();

  if (loc === "all") {
    // If "All" is selected, show all rows
    $("#personnelTableBody tr").show();
    // add a colour to filter button when a filter is applied
    $("#filterBtn").removeClass("btn-danger");
  } else {
    $("#personnelTableBody tr").each(function () {
      const row = $(this);
      const locationCell = row.find("td").eq(2).text().toLowerCase();

      const locMatch = locationCell.indexOf(loc) > -1;

      row.toggle(locMatch);
    });
    // add a colour to filter button when a filter is applied
    $("#filterBtn").addClass("btn-danger");
  }
});

// Show all rows in the personnel table when the personnel button is clicked
$("#personnelBtn").click(function () {
  // $("#personnelTableBody").find("tr").show();
  refreshPersonnelTable();

  // enable filter button if not already enabled
  if ($("#filterBtn").prop("disabled")) {
    $("#filterBtn").prop("disabled", false);
  }
});

// Show all rows in the departments and locations tables when their respective buttons are clicked
$("#departmentsBtn").click(function () {
  // $("#departmentTableBody").find("tr").show();
  refreshDepartmentsTable();

  // disable filter button if not already disabled
  if (!$("#filterBtn").prop("disabled")) {
    $("#filterBtn").prop("disabled", true);
  }
});

// Show all rows in the locations table when the locations button is clicked
$("#locationsBtn").click(function () {
  // $("#locationTableBody").find("tr").show();
  refreshLocationsTable();

  // disable filter button if not already disabled
  if (!$("#filterBtn").prop("disabled")) {
    $("#filterBtn").prop("disabled", true);
  }
});
