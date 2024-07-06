/**
 * 
 */
$(document).ready(async function () {
	await getAllDivision();
	$('#create-division').click(function (event) {
		event.preventDefault();
		createDivision();
	});

});
$('#saveChangesBtn').click(function () {
	saveChanges();
});

async function createDivision() {
	var name = $('#division-name').val();
	var requestData = {
		name: name
	};
	console.log(requestData)
	// AJAX call
	await createNewDivision(requestData)
		.then(() => {
			$('#add-data-overlay').hide();
			Swal.fire({
				title: "Success!",
				text: "You've completely added a new division.",
				icon: "success"
			});
			getAllDivision();
			$('#division-name').val('');
		})
		.catch(error => {
			console.error('Error:', error);
			Swal.fire({
				title: "Error!",
				text: "Failed to add a new division.",
				icon: "error"
			});
		});
}

async function getAllDivision() {
	$('#division-list').empty();
	var rowCount = 0;
	const response = await fetchDivisions();
	console.log(response)
	if (response === null || response === undefined || response === "No Division found.") {
		console.log("Division is null.");
	} else if (Array.isArray(response)) {
		if (response.length === 0) {
			console.log("Response List length is 0.");
		} else {

			response.forEach(function (division) {
				rowCount++;
				$('#division-list').append(`
					  <li class="job-list-item">
						  <a class="job-link" rel="nofollow"
							  href="#"></a>
						  <div class="job-details-container">
							  <div class="lazy-avatar company-avatar">
								  <img src="/wfhs/assets/icons/DAT Logo.png" />
							  </div>
							  <div class="job-title-company-container">
								  <div class="job-role">
									  <span class="job-board-job-company">${division.createdAtDate}</span>
								  </div>
								  <h4 class="job-title job-board-job-title">
									  ${division.name}
								  </h4>
								  <div class="job-details job-details--mobile">
									  <div class="color-deep-blue-sea-light-40">
									  
									  </div>
								  </div>
							  </div>
						  </div>
						  <div class="job-additional-details-container">
							  <div class="buttons-container" style="display: flex; flex-direction: row; align-items: center;">
								  <button class="form-btn outlined edit-data edit-button" data-division-id="${division.id}">Edit </button>
								  <button class="form-btn outlined delete-button margin-l-12" data-division-id="${division.id}" onclick="confirmDelete(${division.id}, '${division.name}')">Delete</button>
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
			console.log("row count =", rowCount)
		}
	} else if (typeof response === 'object' && Object.keys(response).length === 0) {
		console.log("This is not list")
	}

	document.getElementById('total-count').innerText = rowCount
}

async function openEditModal(divisionId) {
	searchDivision(divisionId)
		.then(response => {
			$('#edit-division-name').val(response.name);
			$('#divisionId').val(divisionId);
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
}

function closeEditModal() {
	$('#edit-data-modal').hide();
	$('#edit-data-overlay').hide();
}

async function saveChanges() {
	var editedName = $("#edit-division-name").val();
	var divisionId = $('#divisionId').val();
	var requestData = {
		id: divisionId,
		name: editedName,
	};

	await updateDivision(requestData)
		.then(async () => {
			$('#edit-data-overlay').hide();
			Swal.fire({
				title: "Success!",
				text: "You've completely updated division.",
				icon: "success"
			});
			await getAllDivision();
		})
		.catch(error => {
			console.error('Error:', error);
			Swal.fire({
				title: "Error!",
				text: "Failed to update division.",
				icon: "error"
			});
		});
}

async function confirmDelete(divisionId, divisionName) {
	Swal.fire({
		title: `Are you sure you want to delete ${divisionName}?`,
		text: "This action cannot be undone!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then(async (result) => {
		if (result.isConfirmed) {
			await deleteDivision(divisionId)
				.then(async () => {
					Swal.fire(
						'Deleted!',
						`You've completely deleted '${divisionName}' division.`,
						'success'
					);
					$(`#division-list li[data-divisionId="${divisionId}"]`).remove();
					await getAllDivision();
				})
				.catch(error => {
					console.error('Error deleting division:', error);
					Swal.fire(
						'Error!',
						'Failed to delete the division.',
						'error'
					);
				});
		}
	});
}

$(document).on('click', '.delete-button', function () {
	var divisionId = $(this).data('divisionId');
	var divisionName = $(this).closest('.job-list-item').find('.job-board-job-title').text().trim();
	confirmDelete(divisionId, divisionName);
});
$(document).on('click', '.edit-button', function () {
	var divisionId = $(this).data('division-id');
	openEditModal(divisionId);
});

$(document).on('click', '#edit-data-overlay .close', function () {
	closeEditModal();
});