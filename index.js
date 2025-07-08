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
  // Programmatically trigger a change (keyup) event on the input
  $("#searchInp").trigger("keyup");
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
    url: "libs/php/departments/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Before populating #filterDepartment, add a default option
        $("#filterDepartment")
          .empty()
          .append(
            $("<option>", {
              value: "",
              text: "Select Department",
            })
          );

        // Populate the select with locations
        $.each(result.data.departments, function () {
          $("#filterDepartment").append(
            $("<option>", {
              value: this.name,
              text: this.name,
            })
          );
        });
      } else {
        $("#filterDepartmentModalLabel .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterDepartmentModalLabel .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });

  $.ajax({
    url: "libs/php/locations/getAllLocations.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Before populating #filterLocation, add a default option
        $("#filterLocation")
          .empty()
          .append(
            $("<option>", {
              value: "",
              text: "Select Location",
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
      } else {
        $("#filterPersonnelModalLabel .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#filterPersonnelModalLabel .modal-title").replaceWith(
        "Error retrieving data"
      );
    },
  });
});

// Apply filter logic
$("#applyFilterBtn")
  .off("click")
  .on("click", function () {
    const dept = $("#filterDepartment").val().toLowerCase();
    const loc = $("#filterLocation").val().toLowerCase();

    $("#personnelTableBody tr").each(function () {
      const row = $(this);
      const departmentCell = row.find("td").eq(2).text().toLowerCase();

      const locationCell = row.find("td").eq(3).text().toLowerCase();

      // dept and/or loc can be "" and still match all rows
      const deptMatch = dept === "" || departmentCell.indexOf(dept) > -1;
      const locMatch = loc === "" || locationCell.indexOf(loc) > -1;

      row.toggle(deptMatch && locMatch);
    });

    $("#filterPersonnelModal").modal("hide");
    // $("#personnelTableBody").find("tr").show();
  });

// Show all rows in the personnel table when the personnel button is clicked
$("#personnelBtn").click(function () {
  $("#personnelTableBody").find("tr").show();
});

// Show all rows in the departments and locations tables when their respective buttons are clicked
$("#departmentsBtn").click(function () {
  $("#departmentTableBody").find("tr").show();
});

// Show all rows in the locations table when the locations button is clicked
$("#locationsBtn").click(function () {
  $("#locationTableBody").find("tr").show();
});
