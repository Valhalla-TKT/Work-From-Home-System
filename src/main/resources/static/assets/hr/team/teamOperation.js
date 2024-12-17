$(document).ready(function () {
    getAllTeam();
    $("#create-team").click(function (event) {
        event.preventDefault();
        createTeam();
    });
    getAllDepartment();
    $("#department-name").change(function () {

    });
});

$("#saveChangesBtn").click(function () {
    var teamId = $(this).data("teamId");
    saveChanges();
});

async function getAllDepartment() {
    try {
        let departmentResponse = await fetchDepartments();

        if (!Array.isArray(departmentResponse)) {
            throw new Error('Invalid response format');
        }

        populateSelectBox('#department-name', departmentResponse, 'Department');
        populateSelectBox('#department-filter', departmentResponse, 'Department');

    } catch (error) {
        console.error('Error fetching departments:', error.message);
    }
}

async function createTeam() {
    var name = $("#team-name").val();
    var department = $("#department-name").val();
    var requestData = {
        name: name,
        departmentId: department,
    };
    console.log(requestData)
    // AJAX call
    await createNewTeam(requestData)
        .then(() => {
            $('#add-data-overlay').hide();
            Swal.fire({
                title: "Success!",
                text: "You've completely added a new team.",
                icon: "success"
            });
            getAllTeam();
            $("#team-name").val("");
            $("#department-name").val("");
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to add a new team.",
                icon: "error"
            });
        });
}

function getAllTeam() {
    $("#team-list").empty();
    var rowCount = 0;
    fetchTeams()
        .then(response => {
            if (response === null || response === undefined) {
				console.log("Team is null.");
			} else if (Array.isArray(response)) {
				if (response.length === 0) {
					console.log("Response List length is 0.");
				} else {
                    response.forEach(function(team) {
                        rowCount++;
                        $("#team-list").append(`
                            <li class="job-list-item">
                                <a class="job-link" rel="nofollow"
                                    href="#"></a>
                                <div class="job-details-container">
                                    <div class="lazy-avatar company-avatar">
                                        <img src="${getContextPath()}/assets/icons/DAT Logo.png" alt="DAT Logo" />
                                    </div>
                                    <div class="job-title-company-container">
                                        <h4 class="job-title job-board-job-title">
                                            ${team.name}
                                        </h4>
                                        <div class="job-details job-details--mobile">
                                            <div class="color-deep-blue-sea-light-40">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="job-additional-details-container">
                                    <div class="buttons-container" style="display: flex; flex-direction: row; align-items: center;">
                                        <button class="form-btn outlined edit-data" data-team-id="${team.id}">Edit </button>
                                        <button class="form-btn outlined margin-l-12 delete-button" data-team-id="${team.id}">Delete</button>
                                    </div>
                                    <div class="job-details">
                                        <div class="hide-on-desktop data-detail">
                                            <a class="manage-data" href="#" data-target="data-modal-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        `);
                    });
                }
                document.getElementById("total-count").innerText = rowCount;
            }
        })
}

function openEditModal(teamId) {
    searchTeam(teamId)
        .then(teamResponse => {
            $("#edit-team-name").val(teamResponse.name);
            $("#teamId").val(teamId);
            fetchDepartments()
                .then(departmentResponse => {
                    var selectBox = $("#edit-department-name");
                    selectBox.empty();
                    departmentResponse.forEach(function (department) {
                        var option = $("<option>", {
                            value: department.id,
                            text: department.name,
                            selected: department.id === teamResponse.departmentId,
                        });
                        selectBox.append(option);                        
                    });
                    $('#edit-data-modal').show();
					$('#edit-data-overlay').show();
                })
                .catch(error => {
					console.error('Error fetching department:', error);
					Swal.fire({
						title: "Error!",
						text: "Failed to fetch department details.",
						icon: "error"
					});		
				});	
        })
        .catch(error => {
            console.error('Error fetching department:', error);
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch department details.",
                icon: "error"
            });		
       });
}

function closeEditModal() {
	$('#edit-data-modal').hide();
    $('#edit-data-overlay').hide();
}

async function saveChanges() {
    var editedName = $("#edit-team-name").val();    
    var editedDepartmentId = $("#edit-department-name").val();
    var teamId = $("#teamId").val();
    var requestData = {
        name: editedName,
        departmentId: editedDepartmentId,
        id: teamId
    };
    console.log(requestData);
    await updateTeam(requestData)
		.then(() => {
	       $('#edit-data-overlay').hide();
	        Swal.fire({
	            title: "Success!",
	            text: "You've completely updated team.",
	            icon: "success"
	        });
	        getAllTeam();
	    })
	    .catch(error => {
	        console.error('Error:', error);
	        Swal.fire({
	            title: "Error!",
	            text: "Failed to update team.",
	            icon: "error"
	        });
	    });
}

function confirmDeleteTeam(teamId, teamName) {
    Swal.fire({
        title: `Are you sure you want to delete ${teamName}?`,
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                $(`#team-list li[data-team-id="${teamId}"]`).remove();
                
                await deleteTeam(teamId);
                
                Swal.fire(
                    'Deleted!',
                    `You've completely deleted '${teamName}' team.`,
                    'success'
                );

                getAllTeam();
            } catch (error) {
                console.error('Error deleting team:', error);
                
                $(`#team-list`).append(`<li data-team-id="${teamId}">${teamName}</li>`);
                
                Swal.fire(
                    'Error!',
                    'Failed to delete the team.',
                    'error'
                );
            }
        }
    });
}

$(document).on("click", ".delete-button", function () {
    var teamId = $(this).data("teamId");
    var teamName = $(this).closest(".job-list-item").find(".job-board-job-title").text().trim();
    confirmDeleteTeam(teamId, teamName);
});

$(document).on("click", ".edit-data", function () {
    var teamId = $(this).data("team-id");
    openEditModal(teamId);
});

$(document).on('click', '#edit-data-overlay .close', function() {
    closeEditModal();
});