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

        $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
        $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
        $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
        $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
        $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

        $("#editPersonnelDepartment").html("");

        // Populate the department select element with options
        $.each(result.data.department, function () {
          $("#editPersonnelDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name,
            })
          );
        });

        $("#editPersonnelDepartment").val(
          result.data.personnel[0].departmentID
        );
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
        // Update the hidden input with the employee id so that
        // it can be referenced when the form is submitted

        $("#editDepartmentName").val(result.data[0].name);
        $("#editDepartmentLocation").val(result.data[0].location);

        // $("#editPersonnelDepartment").html("");

        // $("#editPersonnelDepartment").val(
        //   result.data.personnel[0].departmentID
        // );
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
console.log(result);
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
      $("#addPersonnelModal .modal-title").replaceWith(
        "Error retrieving data"
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



