$(document).ready(function() {
	
	var selectedValues = [];
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	const formListTitle = $("#form-list-title")
	var approveRoles = currentUser.approveRoles;
   	var userRole;
   	approveRoles.forEach(function(approveRole) {
    	userRole = approveRole.name;
   	});
   	var userId = currentUser.id;
    const formStatusSelect = $('#form-status-select');
	const formListSelectedCount = $('#formListSelectedCount')
	$('#bulk-approve-btn').hide()
	$('#select-all-btn').hide()

    var status = 'ALL';

    formStatusSelect.val(status);
	function updateFormListSelectCount() {
		formListSelectedCount.text(`Selected (${selectedValues.length})`);
	}
	// role
	if(userRole === 'PROJECT_MANAGER') {
		formListTitle.text(`${currentUser.managedTeamName} Form List`);
		//getTeamMembersPendingForm();
	}


	// role
	    
    formStatusSelect.change(function() {
        status = $(this).val();
        getTeamsWithStatusAll()
    });	

	const pagination = document.querySelector('.pagination');
    const pageNumbers = pagination.querySelector('.page-numbers');
	var currentPage = 1;
	var formsPerPage = 10;
	let filteredFormData = [];
	var totalForms = 0;

	getTeamsWithStatusAll()
	function getTeamsWithStatusAll() {
		$.ajax({			
            url: `${getContextPath()}/api/registerform/getFormsByUserId`,
            type: 'POST',
            data: {
                status: status,
                /*departmentId: departmentId,*/
                userId: userId
            },
			success: function(response) {
				console.log(response)
				$('#form-list').empty();
				 if (!response || !response.forms || response.forms.length === 0) {
	                $('#form-list').append('<tr><td colspan="6" style="text-align: center;">No records avavilable.</td></tr>');
	                pageNumbers.innerHTML = '';
	                $('#bulk-approve-btn').hide()
	                $('#select-all-btn').hide()
	            } else {
					var forms = response.forms;
					filteredFormData = response.forms;
					totalForms = forms.length;
					currentPage = 1;
					var applicantList = response.applicants;
					console.log('Success:', applicantList);
					console.log('Success:', forms);
					renderForms()
					$('#bulk-approve-btn').show()
					$('#select-all-btn').show()
				}
				
			},
			error: function(xhr, status, error) {
				console.error('Error:', error);
				console.log('Response:', xhr.responseText);				
			}
        });
	}

	function renderForms() {
		const start = (currentPage - 1) * formsPerPage;
		const end = start + formsPerPage;
		const pageData = filteredFormData.slice(start, end);

		$('#form-list').empty();
		if (pageData.length === 0) {
	        $('#form-list').append('<tr><td colspan="6" style="text-align: center;">No records found</td></tr>');
	        pageNumbers.innerHTML = '';
	        return;
	    }
		var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				
		pageData.forEach(function(form, index) {
			var signedDate = new Date(form.signedDate);
			var day = ('0' + signedDate.getDate()).slice(-2);
			var month = shortMonths[signedDate.getMonth()];
			var year = signedDate.getFullYear();
			
			var formattedSignedDate = `${month} ${day}, ${year}`;
			var row = `
				<tr>
					<td style="width: 5%;"><input type="checkbox" class="form-check-input" name="selectedForm" value="${form.id}"></td>
					<td>${form.applicant.name}</td>
					<td>${form.applicant.staffId}</td>							
					<td>${form.currentStatus}</td>
					<td>${formattedSignedDate}</td>
					<td style="width: 5%; text-align: center;">
						<i class="fa-solid fa-eye" onclick="window.location.href = '${getContextPath()}/admin/form/${form.id}/user/${currentUser.id}'"></i>
					</td>
				</tr>
			`;
			$('#form-list').append(row);
		});
		updatePagination();
	}

	$(document).on('change', 'input[type="checkbox"]', function() {
		console.log("Checkbox changed");
		if ($(this).is(':checked')) {
			selectedValues.push($(this).val());
		} else {
			selectedValues = selectedValues.filter(value => value !== $(this).val());
		}
		console.log(selectedValues);
	});

	function updatePagination() {
		
        pageNumbers.innerHTML = '';
        const totalPages = Math.ceil(totalForms / formsPerPage);

        if (totalPages <= 1) return;

        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (currentPage > 1) {
            addPageLink('prev', 'Previous');
        }

        if (startPage > 1) {
            addPageLink(1, '1');
            if (startPage > 2) {
                addEllipsis();
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            addPageLink(i, i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                addEllipsis();
            }
            addPageLink(totalPages, totalPages);
        }

        if (currentPage < totalPages) {
            addPageLink('next', 'Next');
        }
    }

    function addPageLink(page, text) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = text;
        pageLink.classList.add('page-link');
        if (page === 'prev') {
            pageLink.dataset.page = currentPage - 1;
        } else if (page === 'next') {
            pageLink.dataset.page = currentPage + 1;
        } else {
            pageLink.dataset.page = page;
            if (page === currentPage) {
                pageLink.classList.add('active');
            }
        }
        pageNumbers.appendChild(pageLink);
    }

    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.classList.add('ellipsis');
        pageNumbers.appendChild(ellipsis);
    }

    pagination.addEventListener('click', function (event) {
        if (event.target.classList.contains('page-link')) {
            event.preventDefault();
            const page = parseInt(event.target.dataset.page);
            if (!isNaN(page)) {
                currentPage = page;
                renderForms();
            }
        }
    });	
    
    function selectAll() {
		selectedValues = [];
        $("input[type='checkbox']").each(function() {
			
            selectedValues.push($(this).val());
			$(this).closest('.resume-card').addClass('shadow');
			updateFormListSelectCount();
        });
        console.log("All checkboxes selected:", selectedValues);
        $("input[type='checkbox']").prop('checked', true);
    }

    $('#select-all-btn').click(function() {
        selectAll();
    });
    
    // for service desk
    var serviceDeskDownloadBtn = $("#service-desk-download-btn")
	serviceDeskDownloadBtn.click(function() {
        selectAll();
        var formData = new FormData();
		for (var i = 0; i < selectedValues.length; i++) {
			console.log(selectedValues[i] + "hello there")
		    formData.append('formIds[]', selectedValues[i]);
		}
		
		console.log(formData + "hello")
        downloadForms(formData)
    });
    
    $("#bulk-approve-btn").click(function() {
		if (selectedValues.length === 0) {
			Swal.fire({
				title: 'No Selection',
				text: 'Please select at least one form to approve.',
				icon: 'warning',
				confirmButtonText: 'OK'
			});
			return;
		}
        var formData = new FormData();
		for (var i = 0; i < selectedValues.length; i++) {
		    formData.append('formIds', selectedValues[i]);
			console.log(selectedValues[i], userId)
		}
		formData.append('userId', userId);
        bulkApprove(formData)
    });
    
    let approverId
    async function bulkApprove(formData) {
		event.preventDefault();

		await Swal.fire({
			title: 'Approval Details',
			html: `
				<textarea id="reason" placeholder="Enter the reason for approval here..." style="width: 100%; height: 100px; margin-bottom: 10px; border: 1px solid black;"></textarea>
				<select id="approve-role" class="select" style="width: 100%; color: #0d0c22; border: 1px solid black; text-transform: capitalize;">
					<option selected value="" disabled>Choose Approver Role</option>
				</select>
				<br/><br/>
				<select id="approver-name" class="select" style="width: 100%; color: #0d0c22; border: 1px solid black;">
                   <option selected value="" disabled>Choose Approver Name</option>
               </select>`,
			didOpen: async () => {
				const approveRoleResponse = await fetchApproveRoleWithoutApplicant();
				const approveRoleSelect = Swal.getPopup().querySelector('#approve-role');
				const formatRoleName = (roleName) => {
					return roleName
						.replace(/_/g, ' ')
						.toLowerCase()
						.replace(/\b\w/g, char => char.toUpperCase());
				};
				approveRoleResponse.forEach(role => {
					const option = document.createElement('option');
					option.value = role.id;
					option.text = formatRoleName(role.name);
					approveRoleSelect.add(option);
				});

				approveRoleSelect.addEventListener('change', async () => {
					const selectedRoleId = approveRoleSelect.value;
					await getAllApprover(selectedRoleId, currentUser.name);
				});
			},
			preConfirm: () => {
				const reason = Swal.getPopup().querySelector('#reason').value;
				const approverRole = Swal.getPopup().querySelector('#approve-role').value;
				const approverName = Swal.getPopup().querySelector('#approver-name').value;
				if (!reason) {
                	Swal.showValidationMessage(`Please enter a reason`);
                	return false;
            	}
				if (!approverRole || !approverName) {
					Swal.showValidationMessage(`Please choose both an approver role and an approver name.`);
					return false;
				}
				return { reason, approverId };
			},
			showCancelButton: true,
			confirmButtonText: 'Select',
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.isConfirmed) {
				const approverName = $('#approver-name').find('option:selected').text();
				const { reason, approverId } = result.value
				console.log(reason)
				Swal.fire({
					title: 'Are you sure?',
					text: `You selected ${approverName}. Do you want to proceed?`,
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, proceed',
					cancelButtonText: 'No, change selection'
				}).then((confirmResult) => {
					if (confirmResult.isConfirmed) {
						$.ajax({
							url: `${getContextPath()}/api/registerform/bulkApprove?approverId=${approverId}&reason=${reason}`,
							type: 'POST',
							data: formData,
							processData: false,
							contentType: false,
							success: function (response) {
								Swal.fire({
									title: 'Success!',
									text: 'Bulk Approve Successfully.',
									icon: 'success',
									confirmButtonText: 'OK'
								}).then(() => {
									$('#message').text(response);
									//getAllForm()
									Swal.fire({
										title: 'Operation Completed',
										text: 'The bulk approval has been successfully completed.',
										icon: 'info',
										confirmButtonText: 'Refresh Page'
									}).then(() => {
										location.reload();
									});
								});
							}, error: function (xhr, error) {
								console.error('Error:', error);
								console.log('Response:', xhr.responseText);
							}
						});
					} else {
						console.log('Approver selection was canceled');
						bulkApprove()
					}
				});
			} else {
				console.log('Approver selection was canceled');
			}
		});

	}

	async function getAllApprover(approveRoleId, name) {
		const response = await fetchApproversByApproveRoleId(approveRoleId);
		console.log(response)
		var selectBox = $('#approver-name');
		selectBox.empty();
		selectBox.append('<option value="" selected>Choose Approver Name</option>');
		for (var i = 0; i < response.length; i++) {
			if (response[i].name !== name) {
				var option = $('<option>', {
					value: response[i].id,
					text: response[i].name,
					'data-staff-id': response[i].staffId,
				});
				selectBox.append(option);
			}
		}
		selectBox.on('change', function() {
			approverId = $(this).val()
		});
	}
    
    function downloadForms(formData) {
		console.log(formData)
		$.ajax({
            url: `${getContextPath()}/api/registerform/downloadAllForms`,
            type: 'POST',
            data: formData,
            processData: false,
		    contentType: false,
		    xhrFields: {
            	responseType: 'blob'
        	},
        success: function(response, status, xhr) {
            var blob = new Blob([response], { type: xhr.getResponseHeader('Content-Type') });

            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'forms.xlsx';
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        },
         
            error: function(xhr, error) {
                console.error('Error:', error);
                console.log('Response:', xhr.responseText);
            }
        });
	}
	$("#go-upload-page").click(function() {
    	$(".hide-when-click-upload").hide()
    	$(".hide-when-load-download-page").show();
    });
    $(".hide-when-load-download-page").hide();
    $("#go-download-page").click(function() {
    	$(".go-upload-page").hide();
		$(".hide-when-load-download-page").hide();
		$(".hide-when-click-upload").show()
    	$("#go-download-page").hide();
    });
    $("#upload-otp-excel").change(function() {
		handleFileSelect();
	});
    function handleFileSelect() {
		const fileInput = $('#upload-otp-excel');
    	const files = fileInput.prop('files');
    	const file = files[0];
		var formData = new FormData();
	    formData.append('file', file);
	
	    $.ajax({
	        url: `${getContextPath()}/api/registerform/uploadExcelServiceDesk`,
	        type: 'POST',
	        data: formData,
	        contentType: false,
	        processData: false,
	        success: function(response) {
				Swal.fire({
	                title: "Success!",
	                text: "OTP has been sent to all applicants.",
	                icon: "success",
	                timer: 3000,
	                timerProgressBar: true,
	                showConfirmButton: false
	            }).then(() => {
	                window.location.href = `${getContextPath()}/dashboard`;
	            });
	            console.log('File uploaded successfully:', response);
	        },
	        error: function(xhr, status, error) {
	            console.error('Error uploading file:', error);
	        }
	    });
	}
    
});
