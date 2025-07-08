// Helper functions to refresh tables
function refreshPersonnelTable() {
  $.ajax({
    url: "libs/php/employees/getAllEmployees.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {
      if (
        result.status.code === "200" &&
        result.data &&
        Array.isArray(result.data)
      ) {
        let rowsHtml = result.data
          .map((person) => {
            return `
                <tr>
                  <td class="align-middle text-nowrap">${person.lastName}, ${person.firstName}</td>
                  <td class="align-middle text-nowrap d-none d-md-table-cell">
                    ${person.jobTitle}
                  </td>
                  <td class="align-middle text-nowrap d-none d-md-table-cell">
                    ${person.department}
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
    url: "libs/php/departments/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {

      if (
        result.status.code === "200" &&
        result.data &&
        Array.isArray(result.data.departments)
      ) {
        let rowsHtml = result.data.departments
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
                      class="btn btn-primary btn-sm"
                      data-id="${dept.id}"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteDepartmentModal"
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
}

function refreshLocationsTable() {
  $.ajax({
    url: "libs/php/locations/getAllLocations.php",
    type: "POST",
    dataType: "json",
    data: {},
    success: function (result) {

      if (
        result.status.code === "200" &&
        result.data &&
        Array.isArray(result.data.locations)
      ) {
        let rowsHtml = result.data.locations.map((loc) => {
            return `
                <tr>
                  <td class="align-middle text-nowrap">${loc.name}</td>
                  <td class="align-middle text-end text-nowrap">
                    <button type="button" class="btn btn-primary btn-sm"
                                        data-bs-toggle="modal"
                      data-bs-target="#editLocationModal"
                      data-id="${loc.id}">
                      <i class="fa-solid fa-pencil fa-fw"></i>
                    </button>
                    <button
                        type="button"
                        data-id="${loc.id}"
                        class="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteLocationModal">
                      <i class="fa-solid fa-trash fa-fw"></i>
                    </button>
                  </td>
                </tr>
              `;
          })
          .join("");
        $("#locationTableBody").html(rowsHtml);
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
  const personnelTabBtn = document.getElementById('personnelBtn');
  const tab = new bootstrap.Tab(personnelTabBtn);
  tab.show();
}
