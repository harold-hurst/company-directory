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

$("#filterBtn").click(function () {
  // Show the modal
  $("#filterPersonnelModal").modal("show");

  $.ajax({
    url: "libs/php/locations/getAllLocations.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Populate the select with locations
        $.each(result.data, function () {
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

  $.ajax({
    url: "libs/php/departments/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        // Populate the select with locations
        $.each(result.data, function () {
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

        const deptMatch = dept === "" || departmentCell.indexOf(dept) > -1;
        const locMatch = loc === "" || locationCell.indexOf(loc) > -1;

        row.toggle(deptMatch && locMatch);
      });

      $("#filterPersonnelModal").modal("hide");
    });
});

$("#personnelBtn").click(function () {
  $("#personnelTableBody").find("tr").show();
});

$("#departmentsBtn").click(function () {
  $("#departmentTableBody").find("tr").show();
});

$("#locationsBtn").click(function () {
  $("#locationTableBody").find("tr").show();
});
