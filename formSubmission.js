// Edit personnel form submission handler
$("#editPersonnelForm").on("submit", function (e) {
  e.preventDefault();

  // Gather form data
  const formData = {
    id: $("#editPersonnelEmployeeID").val(),
    firstName: $("#editPersonnelFirstName").val(),
    lastName: $("#editPersonnelLastName").val(),
    jobTitle: $("#editPersonnelJobTitle").val(),
    email: $("#editPersonnelEmailAddress").val(),
    departmentID: $("#editPersonnelDepartment").val()
  };

  // AJAX call to update personnel
  $.ajax({
    url: "libs/php/employees/updateEmployee.php",
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
    }
  });
});

// Delete personnel form submission handler
$("#deletePersonnelForm").on("submit", function (e) {
  e.preventDefault();

  const employeeId = $("#deletePersonnelEmployeeID").val();

  $.ajax({
    url: "libs/php/employees/deleteEmployee.php",
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
    }
  });
});

