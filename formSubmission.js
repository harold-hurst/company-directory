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

// Add personnel form submission handler
$("#addPersonnelForm").on("submit", function (e) {
  e.preventDefault();

  // Gather form data
  const formData = {
    firstName: $("#addPersonnelFirstName").val(),
    lastName: $("#addPersonnelLastName").val(),
    jobTitle: $("#addPersonnelJobTitle").val(),
    email: $("#addPersonnelEmailAddress").val(),
    departmentID: $("#addPersonnelDepartment").val()
  };

  // AJAX call to add personnel
  $.ajax({
    url: "libs/php/employees/addEmployee.php",
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
    }
  });
});

// ===============================================================

// Edit department form submission handler
$("#editDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  const formData = {
    id: $("#editDepartmentID").val(),
    name: $("#editDepartmentName").val(),
    locationID: $("#editDepartmentLocation").val()
  };

  $.ajax({
    url: "libs/php/departments/updateDepartment.php",
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
    }
  });
});

// Delete department form submission handler
$("#deleteDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  const departmentId = $("#deleteDepartmentID").val();

  $.ajax({
    url: "libs/php/departments/deleteDepartment.php",
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
    }
  });
});

// Add department form submission handler
$("#addDepartmentForm").on("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: $("#addDepartmentName").val(),
    locationID: $("#addDepartmentLocation").val()
  };

  console.log("Form Data:", formData);

  $.ajax({
    url: "libs/php/departments/addDepartment.php",
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
    }
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
    url: "libs/php/locations/updateLocation.php",
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
    }
  });
});

// Delete department form submission handler
$("#deleteLocationForm").on("submit", function (e) {
  e.preventDefault();

  const locationId = $("#deleteLocationID").val();

  $.ajax({
    url: "libs/php/locations/deleteLocation.php",
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
    }
  });
});

// Add location form submission handler
$("#addLocationForm").on("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: $("#addLocationName").val(),
  };

  $.ajax({
    url: "libs/php/locations/addLocation.php",
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
    }
  });
});

// ===============================================================



