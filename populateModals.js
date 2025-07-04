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
          url: "libs/php/departments/getAllDepartments2.php",
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
              $("#editDepartmentLocation").val(
                result.data[0].locationID
              );
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
        $.each(result.data, function () {
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
