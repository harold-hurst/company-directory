$("#searchInp").on("keyup", function () {
  console.log("Search input changed");
});

$("#refreshBtn").click(function () {
  if ($("#personnelBtn").hasClass("active")) {
    // Refresh personnel table
  } else {
    if ($("#departmentsBtn").hasClass("active")) {
      // Refresh department table
    } else {
      // Refresh location table
    }
  }
});

$("#filterBtn").click(function () {
  // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location
});

$("#addBtn").click(function () {
  // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
});

$("#personnelBtn").click(function () {
  // Call function to refresh personnel table
});

$("#departmentsBtn").click(function () {
  // Call function to refresh department table
});

$("#locationsBtn").click(function () {
  // Call function to refresh location table
});

$("#editPersonnelModal").on("show.bs.modal", function (e) {
console.log(e.relatedTarget);
  $.ajax({
    url: "libs/php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      // Retrieve the data-id attribute from the calling button
      // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
      // for the non-jQuery JavaScript alternative
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (result) {
      console.log(result);
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

// Executes when the form button with type="submit" is clicked

$("#editPersonnelForm").on("submit", function (e) {
  // Executes when the form button with type="submit" is clicked
  // stop the default browser behviour

  e.preventDefault();

  // AJAX call to save form data
});

// TESTING +++++++++++++++++++++++++

// populate the Personnel table with data from the database
$(document).ready(function () {
  // Populate Personnel table
  $.ajax({
    url: "libs/php/getAllEmployees.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      if (result.status.code === '200' && result.data && Array.isArray(result.data)) {
        let rowsHtml = result.data
          .map((person) => {
            return `
              <tr>
                <td class="align-middle text-nowrap">${person.lastName}, ${person.firstName}</td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${person.jobTitle}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${person.location}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${person.email}
                </td>
                <td class="text-end text-nowrap">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#editPersonnelModal"
                    data-id="${person.id}"
                  >
                    <i class="fa-solid fa-pencil fa-fw"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#deletePersonnelModal"
                    data-id="${person.id}"
                  >
                    <i class="fa-solid fa-trash fa-fw"></i>
                  </button>
                </td>
              </tr>
            `;
          })
          .join("");
        $("#personnelTableBody").html(rowsHtml);
      } else {
        $("#personnelTableBody").html(
          `<tr><td colspan="5" class="text-center text-danger">No personnel found.</td></tr>`
        );
      }
    },
    error: function () {
      $("#personnelTableBody").html(
        `<tr><td colspan="5" class="text-center text-danger">Error fetching personnel data</td></tr>`
      );
    },
  });

  // Populate Departments table
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      if (result.status.code === '200' && result.data && Array.isArray(result.data)) {
        let rowsHtml = result.data
          .map((dept) => {
            return `
              <tr>
                <td class="align-middle text-nowrap">${dept.name}</td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${dept.location}
                </td>
                <td class="align-middle text-end text-nowrap">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#editDepartmentModal"
                    data-id="${dept.id}"
                  >
                    <i class="fa-solid fa-pencil fa-fw"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm deleteDepartmentBtn"
                    data-id="${dept.id}"
                  >
                    <i class="fa-solid fa-trash fa-fw"></i>
                  </button>
                </td>
              </tr>
            `;
          })
          .join("");
        $("#departmentTableBody").html(rowsHtml);
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
});