// Populate editPersonnelModal when shown
$("#editPersonnelModal").on("show.bs.modal", function (e) {
  $.ajax({
    url: "libs/php/employees/getEmployee.php",
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
          url: "libs/php/departments/getAllDepartments.php",
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
    url: "libs/php/departments/getDepartment.php",
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
          url: "libs/php/locations/getAllLocations.php",
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
    url: "libs/php/locations/getLocation.php",
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
    url: "libs/php/departments/getAllDepartments.php",
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
    url: "libs/php/locations/getAllLocations.php",
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
    url: "libs/php/employees/getEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      id: employeeId,
    },
    success: function (result) {
      console.log(result);

      if (result.status.code == 200) {
        const emp = result.data.personnel[0];
        $("#deletePersonnelName").text(`${emp.firstName} ${emp.lastName}`);
        $("#deletePersonnelJobTitle").text(emp.jobTitle);
        $("#deletePersonnelEmail").text(emp.email);
        $("#deletePersonnelDepartment").text(emp.department);
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

  // Remove dependency/check alerts and enable the button if present
  $("#deleteDepartmentModal .modal-body #departmentDependencies").remove();
  $("#deleteDepartmentModal .modal-body #departmentCheck").remove();
  $("#confirmDeleteDepartmentBtn").prop("disabled", false);

  // First check if the department has any employees
  $.ajax({
    url: "libs/php/employees/getEmployeesByDepartment.php",
    type: "POST",
    dataType: "json",
    data: { departmentID: departmentId },
    success: function (result) {
      console.log(result);
      if (
        result.status.code == 200 &&
        result.data &&
        result.data.personnel.length > 0
      ) {
        if (
          $("#deleteDepartmentModal .modal-body #departmentDependencies")
            .length === 0
        ) {
          // Build a list of employee names
          let employeeList = "<ul class='my-2'>";
          result.data.personnel.forEach(function (emp) {
            employeeList += `<li><span class="fw-bold">${emp.firstName} ${emp.lastName}</span></li>`;
          });
          employeeList += "</ul>";

          $("#deleteDepartmentModal .modal-body").append(
            `<div id="departmentDependencies" class="alert alert-danger mt-3 mb-0" role="alert">
              This department cannot be deleted because it has employees assigned:
              ${employeeList}
            </div>`
          );
          $("#confirmDeleteDepartmentBtn").prop("disabled", true);
        }

        return;
      } else {
        if (
          $("#deleteDepartmentModal .modal-body #departmentCheck").length === 0
        ) {
          $("#deleteDepartmentModal .modal-body").append(
            '<div id="departmentCheck" class="alert alert-danger mt-3 mb-0" role="alert">Are you sure you want to delete this department?</div>'
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
    url: "libs/php/departments/getDepartment.php",
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













  // Remove dependency/check alerts and enable the button if present
  $("#deleteLocationModal .modal-body #locationDependencies").remove();
  $("#deleteLocationModal .modal-body #locationCheck").remove();
  $("#confirmDeleteLocationBtn").prop("disabled", false);

  // First check if the location has any departments
  $.ajax({
    url: "libs/php/departments/getDepartmentsByLocation.php",
    type: "POST",
    dataType: "json",
    data: { locationID: locationId },
    success: function (result) {
      console.log(result);
      if (
        result.status.code == 200 &&
        result.data &&
        result.data.departments.length > 0
      ) {
        if (
          $("#deleteLocationModal .modal-body #locationDependencies")
            .length === 0
        ) {
          // Build a list of department names
          let departmentList = "<ul class='my-2'>";
          result.data.departments.forEach(function (dept) {
            departmentList += `<li><span class="fw-bold">${dept.name}</span></li>`;
          });
          departmentList += "</ul>";




          $("#deleteLocationModal .modal-body").append(
            `<div id="locationDependencies" class="alert alert-danger mt-3 mb-0" role="alert">
              This location cannot be deleted because it has departments assigned:
              ${departmentList}
            </div>`
          );



          $("#confirmDeleteLocationBtn").prop("disabled", true);
        }

        return;
      } else {
        if (
          $("#deleteLocationModal .modal-body #locationCheck").length === 0
        ) {
          $("#deleteLocationModal .modal-body").append(
            '<div id="locationCheck" class="alert alert-danger mt-3 mb-0" role="alert">Are you sure you want to delete this location?</div>'
          );
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("AJAX error: " + textStatus);
    },
  });












  // Set the location ID in the modal
  $("#deleteLocationID").val(locationId);

  // Fetch and display location details
  $.ajax({
    url: "libs/php/locations/getLocation.php",
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
