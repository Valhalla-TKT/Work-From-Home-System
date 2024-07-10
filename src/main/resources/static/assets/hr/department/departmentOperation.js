/**
 * 
 */
$(document).ready(function() {
	getAllDepartment();
	$('#create-department').click(function(event) {
		event.preventDefault();
		createDepartment();
	});
	$('#department-code').prop('disabled', true);
	getAllDivision();
	$('#division-name').change(function() {
		var selectedOption = $('#division-name option:selected');
		var selectedDivisionCode = selectedOption.data('code') + "-";
		$('#department-code').prop('disabled', false);
		$('#department-code').val(selectedDivisionCode);

		$('#department-code').on('input', function(e) {
			var inputValue = this.value;

			if (inputValue.length > 11) {
				this.value = inputValue.slice(0, 11);
			}

			if (inputValue.length <= 8) {
				this.value = selectedDivisionCode; // Reset to the original value
			}
		});

		// Disable backspace key
		$('#department-code').on('keydown', function(e) {
			if (e.which === 8 && this.value.length <= 8) {
				e.preventDefault();
			}
		});
	});

	$('#edit-division-name').change(async function() {
		var selectedOption = $('#edit-division-name option:selected');
		var divisionId = selectedOption.val();
		let divisionResponse = await searchDivision(divisionId);
		var selectedDivisionCode = divisionResponse.code + "-";
		$('#edit-department-code').prop('disabled', false);
		$('#edit-department-code').val(selectedDivisionCode);

		// Disable backspace key
		$('#edit-department-code').off('keydown').on('keydown', function(e) {
			if (e.which === 8 && this.value.length <= 8) {
				e.preventDefault();
			}
		});

		$('#edit-department-code').off('input').on('input', function(e) {
			var inputValue = this.value;

			if (inputValue.length > 11) {
				this.value = inputValue.slice(0, 11);
			}

			if (inputValue.length <= 8) {
				this.value = selectedDivisionCode;
			}
		});		
	});

	$('#saveChangesBtn').click(function() {
		saveChanges();
	});


});
async function getAllDivision() {
	try {
        let divisionResponse = await fetchDivisions();

        if (!Array.isArray(divisionResponse)) {
            throw new Error('Invalid response format');
        }

        populateSelectBox('#division-name', divisionResponse, 'Division');
        populateSelectBox('#division-filter', divisionResponse, 'Division');

    } catch (error) {
        console.error('Error fetching divisions:', error.message);
    }	
}

async function createDepartment() {
	var code = $('#department-code').val();
	var name = $('#department-name').val();
	var division = $('#division-name').val();
	var requestData = {
		code: code,
		name: name,
		divisionId: division
	};
	
	// AJAX call
  	await createNewDepartment(requestData)
		.then(() => {
			$('#add-data-overlay').hide();
			Swal.fire({
				title: "Success!",
				text: "You've completely added a new department.",
				icon: "success"
			});
			getAllDepartment();
			$('#division-name').val('');
			$('#department-code').val('');
			$('#department-name').val('');
		})
		.catch(error => {
			console.error('Error:', error);
			Swal.fire({
				title: "Error!",
				text: "Failed to add a new department.",
				icon: "error"
			});
		});
}

function getAllDepartment() {
	$('#department-list').empty();
	var rowCount =0;
	fetchDepartments()
		.then(response => {
			if (response === null || response === undefined) {
				console.log("Department is null.");
			} else if (Array.isArray(response)) {
				if (response.length === 0) {
					console.log("Response List length is 0.");
				} else {
					response.forEach(function(department) {
						rowCount++;
						$('#department-list').append(`
		                      <li class="job-list-item">
			                      <a class="job-link" rel="nofollow"
			                          href="#"></a>
			                      <div class="job-details-container">
			                          <div class="lazy-avatar company-avatar">
			                              <img src="${getContextPath()}/assets/icons/DAT Logo.png"  alt="DAT Logo"/>
			                          </div>
			                          <div class="job-title-company-container">
			                              <div class="job-role">
			                                  <span class="job-board-job-company">${department.code}</span>
			                              </div>
			                              <h4 class="job-title job-board-job-title">
			                              	${department.name}
			                              </h4>
			                              <div class="job-details job-details--mobile">
			                                  <div class="color-deep-blue-sea-light-40">
			                                  
			                                  </div>
			                              </div>
			                          </div>
			                      </div>
			                      <div class="job-additional-details-container">
			                          <div class="buttons-container" style="display: flex; flex-direction: row; align-items: center;">
			                              <button class="form-btn outlined edit-data" data-department-id="${department.id}">Edit </button>
			                              <button class="form-btn outlined margin-l-12 delete-button" data-department-id="${department.id}">Delete</button>
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
				document.getElementById('total-count').innerText = rowCount
			}
		})	
}


async function openEditModal(departmentId) {
	searchDepartment(departmentId)
		.then(departmentResponse => {
			$('#edit-department-name').val(departmentResponse.name);
			$('#edit-department-code').val(departmentResponse.code);
			$('#departmentId').val(departmentId);
			console.table(departmentId, departmentResponse.division)
			fetchDivisions()
				.then(divisionResponse => {
					var selectBox = $('#edit-division-name');
					selectBox.empty();
					divisionResponse.forEach(function(division) {
						console.table(division.id)
						var option = $('<option>', {
							value: division.id,
							text: division.name,
							selected: division.id === departmentResponse.divisionId
						});
						selectBox.append(option);		
					});
					$('#edit-data-modal').show();
					$('#edit-data-overlay').show();
				})	
				.catch(error => {
					console.error('Error fetching division:', error);
					Swal.fire({
						title: "Error!",
						text: "Failed to fetch division details.",
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
	var editedCode = $('#edit-department-code').val();
	var editedName = $("#edit-department-name").val();
	var editedDivisionId = $('#edit-division-name').val();
	var departmentId = $('#departmentId').val();	
	var requestData = {
		code: editedCode,
		name: editedName,
		divisionId: editedDivisionId,
		id: departmentId
	};
	await updateDepartment(requestData)
		.then(() => {
	       $('#edit-data-overlay').hide();
	        Swal.fire({
	            title: "Success!",
	            text: "You've completely updated department.",
	            icon: "success"
	        });
	        getAllDepartment();
	    })
	    .catch(error => {
	        console.error('Error:', error);
	        Swal.fire({
	            title: "Error!",
	            text: "Failed to update department.",
	            icon: "error"
	        });
	    });	
}

function confirmDeleteDepartment(departmentId, departmentName) {
	Swal.fire({
        title: `Are you sure you want to delete ${departmentName}?`,
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
        	await deleteDepartment(departmentId)
			    .then(() => {
			        Swal.fire(
			            'Deleted!',
			            `You've completely deleted '${departmentName}' department.`,
			            'success'
			        );
			        $(`#division-list li[data-department-id="${departmentId}"]`).remove();
			        getAllDepartment();
			    })
			    .catch(error => {
			        console.error('Error deleting department:', error);
			        Swal.fire(
			            'Error!',
			            'Failed to delete the department.',
			            'error'
			        );
			    });
        }
    });
}
$(document).on('click', '.delete-button', function() {
	var departmentId = $(this).data('departmentId');
	var departmentName = $(this).closest('.job-list-item').find('.job-board-job-title').text().trim();
	confirmDeleteDepartment(departmentId, departmentName);
});

$(document).on('click', '.edit-data', function() {
	var departmentId = $(this).data('department-id');
	openEditModal(departmentId);
});

$(document).on('click', '#edit-data-overlay .close', function() {
    closeEditModal();
});