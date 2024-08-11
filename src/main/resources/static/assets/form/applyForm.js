$(document).ready(function() {
	const applyForm = $('#apply-form');
    const selfRequestRadio = $('#self-request-radio');
    var selfRequestRadioChecked = true;
    const otherRequestRadio = $('#other-request-radio');
    var otherRequestRadioChecked = false;
    const nameInputBox = $('#name-input-box');
    const teamMemberListSelectBox = $('#team-member-list');
    const positionInputBox = $('#position-input-box');
    const teamInputBox = $('#team-input-box');
    const departmentInputBox = $('#department-input-box');
    const workingPlaceInputBox = $('#working-input-box');
    const reasonInputBox = $('#form-request-reason');
    
    const divisionInputContainer = $('#division-input-container');
  	const windowOperationSystemInputBox = $('#file1');
  	const windowSecurityPatchInputBox = $('#file2');
    const windowAntivirusSoftwareInputBox = $('#file3');
    const windowAntivirusPatternInputBox = $('#file4');
    const windowAntivirusFullScanInputBox = $('#file5');
    const macOperationSystemInputBox = $('#file6');
    const macSecurityPatchInputBox = $('#file7');
    const macAntivirusSoftwareInputBox = $('#file8');
    const linuxOperationSystemInputBox = $('#file9');
    const linuxSecurityPatchInputBox = $('#file10');
    const linuxAntivirusSoftwareInputBox = $('#file11');
	const signatureInputBox = $('#file12');
    const osTypeInputBox = $('#os-type-value');			
	
    var workFromHomePercent = 0.0;
    const fromDateInputBox = $('#from-date');
    const toDateInputBox = $('#to-date');
    const signedDateInputBox = $('#signed-date');
    
    const checkBoxModalDialog = $("#checkbox-dialog");
	const applyFormPageUpdateProfile = $("#apply-form-page-update-profile")
    
    // Generate from date to date
	var currentDate = new Date();
	var fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
	var toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
	
	// Data to send Backend
	var applicantId, requesterId, positionName, working_place, request_reason, from_date, to_date, os_type, operatingSystem, securityPatch, antivirusSoftware, antivirusPattern, antivirusFullScan, signed_date, signature, approverId;
	var request_percent = 0.0;
	var applied_date = new Date();
	
	// Working place myanmar
	$('#work-in-others-button').hide();
    $('#region-state-select').hide();
    $('#city-township-select').hide();

	applyFormPageUpdateProfile.show()

    function toggleButtonAndSelect() {
        $('#working-input-box').val('');        
        $('#region-state-select').val('');
        $('#city-township-select').val('');
        workingPlaceInputBox.toggle()
        $('#region-state-select').toggle();
        $('#city-township-select').toggle();
        $('#work-in-myanmar-button').toggle();
        $('#work-in-others-button').toggle();
    }

    $('#work-in-myanmar-button').click(function(){
        toggleButtonAndSelect();
    });

    $('#work-in-others-button').click(function(){
        toggleButtonAndSelect();
    });



	var regionSelect = $('#region-state-select');
	regionSelect.append('<option value="" disabled selected>Region/State</option>');

	regions.sort(function(a, b) {
		return a.regionState.localeCompare(b.regionState);
	});

	var uniqueRegions = new Set();

	$.each(regions, function(index, region) {
		if (!uniqueRegions.has(region.regionState)) {
			uniqueRegions.add(region.regionState);
			regionSelect.append('<option value="' + region.regionState + '">' + region.regionState + '</option>');
		}
	});

	$('#region-state-select').change(function() {
		var selectedRegion = $(this).val();
		var cities = [];

		$.each(regions, function(index, region) {
			if (region.regionState === selectedRegion) {
				cities = region.cities;
				return false;
			}
		});

		cities.sort(function(a, b) {
			return a.city.localeCompare(b.city);
		});

		$('#city-township-select').empty();
		$('#city-township-select').append('<option value="" disabled selected>City/Township</option>');

		var uniqueCities = new Set();

		$.each(cities, function(index, city) {
			if (!uniqueCities.has(city.city)) {
				uniqueCities.add(city.city);
				$('#city-township-select').append('<option value="' + city.city + '">' + city.city + '</option>');
			}
		});
	});

	var selectedRegion, selectedCity, workInMyanmar, workInMyanmarBoolean = false;
    $('#city-township-select').change(function(){
        selectedRegion = $('#region-state-select').val().trim();
        selectedCity = $(this).val();
		workInMyanmar = selectedRegion + ', ' + selectedCity;
		console.log(workInMyanmar)
		workInMyanmarBoolean = true;
		console.log(workInMyanmarBoolean)
    });    

	
	if(fromDateInputBox.length) {
		fromDateInputBox.dateDropper({
			format: 'd-m-Y',
		});
		fromDateInputBox.on('change', function() {
			var chosenDate = $(this).val();
			console.log(chosenDate);
		});
		
		fromDateInputBox.on('blur', function() {
			$(this).removeAttr('readonly');
		});
	}
	
	
	
	
	if(toDateInputBox.length) {
		toDateInputBox.dateDropper({
			format: 'd-m-Y'
		});
		toDateInputBox.on('change', function() {
			var chosenDate = $(this).val();
			console.log(chosenDate);
		});toDateInputBox.on('blur', function() {
		  $(this).removeAttr('readonly');
		});
	}
	
	
	
	
		
	
	if(signedDateInputBox.length) {
		signedDateInputBox.dateDropper({
			format: 'd-m-Y'
		});
		signedDateInputBox.on('change', function() {
			var chosenDate = $(this).val();
			console.log(chosenDate);
		});
		
		signedDateInputBox.on('blur', function() {
		  $(this).removeAttr('readonly');
		});	
	}
	
	
    
    const otherRequestData = {
        name: '',
        staffId: '00-00000',
        position: 'Eg. Software Engineer',
        team: 'Eg. HIME',
        department: 'Eg. Offshore Department-II'
    };
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    $('#name-select-box-container').hide();
    
    // user ID
    var currentUserId = currentUser.id;
	nameInputBox.val(currentUser.name);
	updateStaffIdFields(currentUser.staffId);
	if(currentUser.positionName == null) {
		positionInputBox.prop('disabled', false);
		positionInputBox.val('');
	} else {
		positionInputBox.prop('disabled', true);
		positionInputBox.val(currentUser.positionName);
	}

	teamInputBox.val(currentUser.teamName);
	departmentInputBox.val(currentUser.departmentName);
	fromDateInputBox.val(formatDate(fromDate));
	toDateInputBox.val(formatDate(toDate));
	signedDateInputBox.val(formatDate(currentDate));
	
	var approveRoles = currentUser.approveRoles;
	var isDivisionHead = false;
	var isDepartmentHead = false;
	var isProjectManager = false;
	var isApplicant = false;
	
	approveRoles.forEach(function(approveRole) {
	    if (approveRole.name === 'DIVISION_HEAD') {
	        isDivisionHead = true;
	        return;
	    }
		 if (approveRole.name === 'DEPARTMENT_HEAD') {
			isDepartmentHead = true;
			return;
		 }
		 if(approveRole.name === "PROJECT_MANAGER") {
			 isProjectManager = true;
			 return;
		 }
	     else if(approveRole.name === "APPLICANT"){
			isApplicant = true;
			return;
		 }
	});

	if (isDivisionHead) {
		divisionInputContainer.hide();
		$('#department-input-container').hide();
		$('#team-input-container').hide();
	}else if (isDepartmentHead) {
		divisionInputContainer.hide();
		$('#department-input-container').hide();
		$('#team-input-container').hide();
	} else if(isApplicant || isProjectManager) {
		divisionInputContainer.hide();
		$('#department-input-container').hide();
		$('#team-input-container').hide();
	} else {
		divisionInputContainer.hide();
		$('#department-input-container').hide();
		$('#team-input-container').hide();
	}

    selfRequestRadio.on('change', function() {
		selfRequestRadioChecked = true;
		otherRequestRadioChecked = false;
		applyFormPageUpdateProfile.show()
	    if ($(this).prop('checked')) {
	    	$('#name-select-box-container').hide();
	        $('#name-input-container').show();
			divisionInputContainer.hide();
			$('#department-input-container').hide();
			$('#team-input-container').hide();
	        applyForm[0].reset();
	        nameInputBox.val(currentUser.name);
			updateStaffIdFields(currentUser.staffId);
			if(currentUser.positionName == null) {
				positionInputBox.prop('disabled', false);
				positionInputBox.val('');
			} else {
				positionInputBox.prop('disabled', true);
				positionInputBox.val(currentUser.positionName);
			}
			teamInputBox.val(currentUser.teamName);
			departmentInputBox.val(currentUser.departmentName);
			fromDateInputBox.val(formatDate(fromDate));
			toDateInputBox.val(formatDate(toDate));
	    }
	});

	otherRequestRadio.on('change', function() {
		selfRequestRadioChecked = false;
		otherRequestRadioChecked = true;
		applyFormPageUpdateProfile.hide()
		if ($(this).prop('checked')) {
	    	$('#name-select-box-container').show();
	        $('#name-input-container').hide();
			if(!isApplicant && !isProjectManager && !isDepartmentHead && !isDivisionHead) {
				divisionInputContainer.show();
				$('#department-input-container').show();
			}
			if (isDivisionHead) {
				divisionInputContainer.hide();
				$('#department-input-container').show();
				$('#team-input-container').show();
			}else if (isDepartmentHead) {
				divisionInputContainer.hide();
				$('#department-input-container').hide();
				$('#team-input-container').show();
			} else if(isApplicant || isProjectManager) {
				divisionInputContainer.hide();
				$('#department-input-container').hide();
				$('#team-input-container').hide();
				getTeamMemberById(currentUser.team.id, currentUser.id).then(r => "");
			} else {
				divisionInputContainer.show();
				$('#department-input-container').show();
				$('#team-input-container').show();
			}
	        applyForm[0].reset();	        
            updateStaffIdFields(otherRequestData.staffId);
            positionInputBox.val(otherRequestData.positionName);
            teamInputBox.val(otherRequestData.team);
            departmentInputBox.val(otherRequestData.department);
            fromDateInputBox.val(formatDate(fromDate));
			toDateInputBox.val(formatDate(toDate));
	        otherRequestRadio.prop('checked', true);	        
		}
	});
	
	var selectedTeamMemberId;
	teamMemberListSelectBox.on('change', function() {
		selectedTeamMemberId = $(this).val();
    	var selectedOption = $(this).find('option:selected');
        var selectedStaffId = selectedOption.attr('data-staff-id');
        updateStaffIdFields(selectedStaffId);
        var selectedPositionName = selectedOption.attr('data-position-name');
		if(selectedPositionName == null) {
			positionInputBox.prop('disabled', false);
			positionInputBox.val('');
		} else {
			positionInputBox.prop('disabled', true);
			positionInputBox.val(selectedPositionName);
		}
        var selectedTeamName = selectedOption.attr('data-team-name');
        teamInputBox.val(selectedTeamName)
        var selectedDepartmentName = selectedOption.attr('data-department-name');
        departmentInputBox.val(selectedDepartmentName)
	});	
	
	function updateStaffIdFields(staffId) {

		const charArray = staffId.split('');

		const staffIdInputs = $('.staff-id-input-container input');

	    staffIdInputs.each(function(index) {
	        $(this).val(charArray[index]);
	    });
	}
	
	function formatDate(date) {
	    const day = date.getDate().toString().padStart(2, '0');
	    const month = (date.getMonth() + 1).toString().padStart(2, '0');
	    const year = date.getFullYear();
	    return `${day}-${month}-${year}`;
	}		

	workingPlaceInputBox.on('input', function() {

    });
    
    $('input[name="radio-group"]').on('change', function() {
        workFromHomePercent = $('input[name="radio-group"]:checked').val();
    });

    $('#continue-button').click(function(event) {
        event.preventDefault();
        
        showNextDiv();
    });
    
    $('#continue-button-1').click(function(event) {
        event.preventDefault();        
        showNextDiv1();
    });
    
	$('#go-back').click(function(event) {
        showPreviousDiv();
    });

	$('#go-back-1').click(function(event) {
        showPreviousDiv1();
    });
	function showNextDiv() {
		window.scrollTo(0, 0);
		$("#data-section").hide();
		$("#capture-section").show();
		$("#signature-section").hide();
		$("#go-back").show();
		$("#go-back-1").hide();

		$("#current-step-1").hide();
		$("#current-step-2").show();
		$("#current-step-3").hide();
		if(checkBoxModalDialog.length) {
			if ($("input[type='checkbox']:not(:checked)").length === 0) {
				hideCheckBoxDialogModal();
			} else {
				showCheckBoxDialogModal();
			}
		}
	}
	
	function showNextDiv1() {
		window.scrollTo(0, 0);
		$("#data-section").hide();
		$("#capture-section").hide();
		$("#signature-section").show();
		$("#go-back").hide();
		$("#go-back-1").show();

		$("#current-step-1").hide();
		$("#current-step-2").hide();
		$("#current-step-3").show();
	}

	function showPreviousDiv() {
		window.scrollTo(0, 0);
		$("#data-section").show();
		$("#capture-section").hide();
		$("#signature-section").hide();
		$("#go-back").hide();
		$("#go-back-1").hide();

		$("#current-step-1").show();
		$("#current-step-2").hide();
		$("#current-step-3").hide();
	}

	function showPreviousDiv1() {
		window.scrollTo(0, 0);
		$("#data-section").hide();
		$("#capture-section").show();
		$("#signature-section").hide();
		$("#go-back").show();
		$("#go-back-1").hide();

		$("#current-step-1").hide();
		$("#current-step-2").show();
		$("#current-step-3").hide();
	}
	
	$("#checkbox-dialog-form").submit(function(event) {
            event.preventDefault();
            if ($("input[type='checkbox']:not(:checked)").length === 0) {
                hideCheckBoxDialogModal();
            } else {
                alert("Please check all checkboxes before submitting.");
            }
      });

	$('#hide-checkbox-dialog-form').click(function (event) {
		event.preventDefault();
		showPreviousDiv()
		$("#checkbox-dialog-form")[0].reset();
		hideCheckBoxDialogModal();
	})

	  function showCheckBoxDialogModal() {
		  checkBoxModalDialog.get(0).showModal();
	  }

      function hideCheckBoxDialogModal() {
          checkBoxModalDialog.get(0).close();
      }
      $('#ceo-apply-form-btn').click(async function(event) {
			event.preventDefault();
			var formData = new FormData();
	        formData.append('userId', currentUser.id);
	        formData.append('from_date', formatDate(fromDate));
	        formData.append('to_date', formatDate(toDate));
	        $.ajax({
		    url: `${getContextPath()}/api/registerform/createCeoForm`,
		    type: 'POST',
		    data: formData,
		    processData: false,
		    contentType: false,
		  	//await createCeoForm(currentUserId, formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)), formatDate(toDate));
		    success: function(response) {
		        console.log("Successful : ", response);
		        $('#message').text(response);
		        Swal.fire({
	                title: "Success!",
	                text: "WFH Form Application Complete!",
	                icon: "success",
	                timer: 3000,
	                timerProgressBar: true,
	                showConfirmButton: false
	            }).then(() => {
	                window.location.href = `${getContextPath()}/dashboard`;
	            });
		    },
		    error: function(error) {
		        console.error('Error:', error);
		    }
		});

	  });
	$('#apply-form-btn').click( function(event) {
		event.preventDefault();
		submitForm();
	});
	function parseAndFormatDate(inputBox, fromDate) {
		var dateValue = inputBox.val();
		var dateComponents = dateValue.split('-');
		var dateDay = parseInt(dateComponents[0], 10);
		var dateMonth = parseInt(dateComponents[1], 10) - 1;
		var dateYear = parseInt(dateComponents[2], 10);

		var dateObj = new Date(dateYear, dateMonth, dateDay);
		if (!isNaN(dateObj.getTime())) {
			return dateObj.toISOString().split('T')[0];
		} else {
			console.error('Invalid date string:', dateValue);
			return null;
		}
	}

	function formatToISODate(dateString) {
		let parts = dateString.split('-');
		return `${parts[2]}-${parts[1]}-${parts[0]}`;
	}

	async function submitForm() {
		if (!selfRequestRadioChecked && !otherRequestRadioChecked) {
			Swal.fire({
				title: "Error!",
				text: "Please select self request or other request.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}
		if(selfRequestRadioChecked) {
			applicantId = parseInt(currentUser.id, 10);
			requesterId = currentUser.id;
			requesterId = parseInt(currentUser.id, 10);
		} else if(otherRequestRadioChecked) {
			if (!selectedTeamMemberId) {
				Swal.fire({
					title: "Error!",
					text: "Please select a team member.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			applicantId = parseInt(selectedTeamMemberId, 10);
			requesterId = parseInt(currentUser.id, 10);
		}
		if (!positionInputBox.val()) {
			Swal.fire({
				title: "Error!",
				text: "Please enter a position name.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}
		positionName = positionInputBox.val();
		console.log(applicantId, requesterId)

		if (!workingPlaceInputBox.val() && !workInMyanmarBoolean) {
			Swal.fire({
				title: "Error!",
				text: "Please enter a working place.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}

		working_place = workInMyanmarBoolean ? workInMyanmar : workingPlaceInputBox.val();

		if (workFromHomePercent <= 0.0 || workFromHomePercent > 100) {
			Swal.fire({
				title: "Error!",
				text: "Please choose a valid work from home percentage: 25%, 50%, 75%, or 100%.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}
		request_percent = workFromHomePercent;

		if (!reasonInputBox.val()) {
			Swal.fire({
				title: "Error!",
				text: "Please enter a request reason.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}
		request_reason = reasonInputBox.val();

		if (!fromDateInputBox.val()) {
			Swal.fire({
				title: "Error!",
				text: "Please select a from date.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}
		from_date = formatToISODate(fromDateInputBox.val());

		if (!toDateInputBox.val()) {
			Swal.fire({
				title: "Error!",
				text: "Please select a to date.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}

		to_date = formatToISODate(toDateInputBox.val());

		os_type = osTypeInputBox.val();

		// Window
		if(os_type === 'Window') {
			if (!windowOperationSystemInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Windows Operation System.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			operatingSystem = windowOperationSystemInputBox.prop('files')[0];

			if (!windowSecurityPatchInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Windows Security Patch.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			securityPatch = windowSecurityPatchInputBox.prop('files')[0];

			if (!windowAntivirusSoftwareInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Antivirus Software.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			antivirusSoftware = windowAntivirusSoftwareInputBox.prop('files')[0];


			if (!windowAntivirusPatternInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Antivirus Pattern.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			antivirusPattern = windowAntivirusPatternInputBox.prop('files')[0];

			if (!windowAntivirusFullScanInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Antivirus Full Scan.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			antivirusFullScan = windowAntivirusFullScanInputBox.prop('files')[0];
		}


		// Mac
		if(os_type === 'Mac') {
			if (!macOperationSystemInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Operation System.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			operatingSystem = macOperationSystemInputBox.prop('files')[0];


			if (!macSecurityPatchInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Security Patch.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			securityPatch = macSecurityPatchInputBox.prop('files')[0];


			if (!macAntivirusSoftwareInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Antivirus Software.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			antivirusSoftware = macAntivirusSoftwareInputBox.prop('files')[0];
		}

		// Linux
		if(os_type === 'Linux') {
			if (!linuxOperationSystemInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Operating System.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			operatingSystem = linuxOperationSystemInputBox.prop('files')[0];

			if (!linuxSecurityPatchInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Security Patch.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			securityPatch = linuxSecurityPatchInputBox.prop('files')[0];

			if (!linuxAntivirusSoftwareInputBox[0].files.length) {
				Swal.fire({
					title: "Error!",
					text: "Please upload the photo of Antivirus Software.",
					icon: "error",
					confirmButtonText: "OK"
				});
				return;
			}
			antivirusSoftware = linuxAntivirusSoftwareInputBox.prop('files')[0];

		}

		if (!signedDateInputBox.val()) {
			Swal.fire({
				title: "Error!",
				text: "Please select a signed date.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}

		signed_date = formatToISODate(signedDateInputBox.val());

		if (!signatureInputBox[0].files.length) {
			Swal.fire({
				title: "Error!",
				text: "Please upload the photo of Signature.",
				icon: "error",
				confirmButtonText: "OK"
			});
			return;
		}
		signature = signatureInputBox.prop('files')[0];

		event.preventDefault();

		await Swal.fire({
			title: 'Choose Approve Role and Name',
			html: `
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
				const approverRole = Swal.getPopup().querySelector('#approve-role').value;
				const approverName = Swal.getPopup().querySelector('#approver-name').value;
				if (!approverRole || !approverName) {
					Swal.showValidationMessage(`Please choose both an approver role and an approver name.`);
				}
				return approverName;
			},
			showCancelButton: true,
			confirmButtonText: 'Select',
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.isConfirmed) {
				const approverName = $('#approver-name').find('option:selected').text();
				Swal.fire({
					title: 'Are you sure?',
					text: `You selected ${approverName}. Do you want to proceed?`,
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes, proceed',
					cancelButtonText: 'No, change selection'
				}).then((confirmResult) => {
					if (confirmResult.isConfirmed) {
						const formData = new FormData();
						const data = {
							applicantId: applicantId,
							requesterId: requesterId,
							positionName: positionName,
							workingPlace: working_place,
							requestReason: request_reason,
							requestPercent: request_percent,
							fromDate: from_date,
							toDate: to_date,
							signedDate: signed_date,
							osType: os_type,
							approverId: approverId
						};

						formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
						formData.append("operatingSystem", operatingSystem);
						formData.append("securityPatch", securityPatch);
						formData.append("antivirusSoftware", antivirusSoftware);
						formData.append("antivirusPattern", antivirusPattern);
						formData.append("antivirusFullScan", antivirusFullScan);
						formData.append("signature", signature);


						$.ajax({
							url: `${getContextPath()}/api/registerform/create`,
							type: 'POST',
							data: formData,
							processData: false,
							contentType: false,
							success: function(response) {
								Swal.fire({
									title: "Success!",
									text: "Form submitted successfully.",
									icon: "success",
									confirmButtonText: "OK"
								}).then((result) => {
									if (result.isConfirmed) {
										window.location.href = `${getContextPath()}/dashboard`;
									}
								});
							},
							error: function(xhr, status, error) {
								Swal.fire({
									title: "Error!",
									text: "There was an error submitting the form.",
									icon: "error",
									confirmButtonText: "OK"
								});
							}
						});
					} else {
						console.log('Approver selection was canceled');
						$('#apply-form-btn').click();
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

	async function getTeamMemberById(teamId, userId) {
		try {
			const response = await fetchTeamMemberByUserId(teamId, userId);

			if (response) {
				const selectBox = $('#team-member-list');
				selectBox.empty();
					selectBox.append('<option value="" disabled selected>Choose Name</option>');

				const addedMemberIds = new Set();

				response.sort((a, b) => a.name.localeCompare(b.name));

				response.forEach(member => {
					if (!addedMemberIds.has(member.id) && member.name !== currentUser.name) {
						const option = $('<option>', {
							value: member.id,
							text: member.name,
							'data-staff-id': member.staffId,
							'data-position-name': member.positionName,
							'data-team-name': member.team.name,
							'data-department-name': member.department.name
						});
						selectBox.append(option);
						addedMemberIds.add(member.id);
					}
				});
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	async function getAllDivision() {
		await fetchDivisions()
			.then(response => {
				var selectBox = $('#division-name');
				selectBox.empty();
				selectBox.append('<option value="all" selected>Choose Division Name</option>');
				for (var i = 0; i < response.length; i++) {
					var option = $('<option>', {
						value: response[i].id,
						text: response[i].name,
					});
					selectBox.append(option);
				}
			})
			.catch(error => {
				console.error('Error:', error);
			})
	}

	$('#division-name').on('change', async function() {
		await updateDepartmentsByDivision();
		await updateTeamsByDivision();
		await getAllTeamMember();
	});

	async function getAllDepartment() {
		await fetchDepartments()
			.then(response => {
				var selectBox = $('#department-name');
				selectBox.empty();
				selectBox.append('<option value="all" selected>Choose Department Name</option>');
				for (var i = 0; i < response.length; i++) {
					var option = $('<option>', {
						value: response[i].id,
						text: response[i].name,
					});
					selectBox.append(option);
				}
			})
			.catch(error => {
				console.error('Error:', error);
			})
	}

	$('#department-name').on('change', async function() {
		await updateTeamsByDepartment();
		await getAllTeamMember();
	});

	async function getAllTeam() {
		// if not division_head, I want with await fetchTeamsByDivisionId(currentUser.division.id)
		// otherwise, I want with await fetchTeams()

		// if department_head
		// let response;

		await fetchTeams()
			.then(response => {
				var selectBox = $('#team-name');
				selectBox.empty();
				selectBox.append('<option value="all" selected>Choose Team Name</option>');
				for (var i = 0; i < response.length; i++) {
					var option = $('<option>', {
						value: response[i].id,
						text: response[i].name,
					});
					selectBox.append(option);
				}

			})
			.catch(error => {
				console.error('Error:', error);
			})
	}


	// async function getAllTeam() {
	// 	let response;
	//
	// 	try {
	// 		if (isDivisionHead) {
	// 			// Fetch teams based on the division ID if the user is a division head
	// 			response = await fetchTeamsByDivisionId(currentUser.division.id);
	// 		} else if (isDepartmentHead) {
	// 			// Fetch teams based on the department ID if the user is a department head
	// 			response = await fetchTeamsByDepartmentId(currentUser.department.id);
	// 		} else {
	// 			response = await fetchTeams();
	// 		}
	//
	// 		// Populate the select box with the retrieved data
	// 		var selectBox = $('#team-name');
	// 		selectBox.empty();
	// 		selectBox.append('<option value="all" selected>Choose Name</option>');
	// 		response.forEach(team => {
	// 			var option = $('<option>', {
	// 				value: team.id,
	// 				text: team.name,
	// 			});
	// 			selectBox.append(option);
	// 		});
	//
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 	}
	// }


	$('#team-name').on('change', async function() {
		await getAllTeamMember();
	});

	async function getAllTeamMember() {
		var selectedTeamId = $('#team-name').val();
		var selectedDepartmentId = $('#department-name').val();
		var selectedDivisionId = $('#division-name').val();
		let response;
		if (selectedTeamId && selectedTeamId !== "all") {
			response = await getUsersByTeamId(selectedTeamId);
		} else if (selectedDepartmentId && selectedDepartmentId !== "all") {
			response = await getUsersByDepartmentId(selectedDepartmentId);
		} else if (selectedDivisionId && selectedDivisionId !== "all") {
			response = await getUsersByDivisionId(selectedDivisionId);
		} else {
			console.log('hi')
			response = await fetchUsers();
		}
		if (response) {
			const selectBox = $('#team-member-list');
			selectBox.empty();
			selectBox.append('<option value="" disabled selected>Choose Name</option>');

			const addedMemberIds = new Set();

			response.sort((a, b) => a.name.localeCompare(b.name));

			response.forEach(member => {
				if (!addedMemberIds.has(member.id) && member.name !== currentUser.name) {
					const option = $('<option>', {
						value: member.id,
						text: member.name,
						'data-staff-id': member.staffId,
						'data-position-name': member.positionName,
						'data-team-name': member.team.name,
						'data-department-name': member.department.name
					});
					selectBox.append(option);
					addedMemberIds.add(member.id);
				}
			});
		}
	}

	async function updateDepartmentsByDivision() {
		try {
			var divisionId = $('#division-name').val();
			var departments = [];

			if (divisionId !== 'all') {
				departments = await getDepartmentsByDivisionId(divisionId);
			} else {
				departments = await fetchDepartments();
			}

			var selectBox = $('#department-name');
			selectBox.empty();
			selectBox.append('<option value="all" selected>Choose Department Name</option>');

			departments.forEach(department => {
				var option = $('<option>', {
					value: department.id,
					text: department.name,
				});
				selectBox.append(option);
			});
		} catch (error) {
			console.error('Error:', error);
		}
	}

	async function updateTeamsByDivision() {
		try {
			var divisionId = $('#division-name').val();
			var teams = [];

			if (divisionId !== 'all') {
				teams = await getTeamsByDivisionId(divisionId);
			} else {
				teams = await fetchTeams();
			}

			var selectBox = $('#team-name');
			selectBox.empty();
			selectBox.append('<option value="all" selected>Choose Team Name</option>');

			teams.forEach(team => {
				var option = $('<option>', {
					value: team.id,
					text: team.name,
				});
				selectBox.append(option);
			});
		} catch (error) {
			console.error('Error:', error);
		}
	}

	async function updateTeamsByDepartment() {
		try {
			var departmentId = $('#department-name').val();
			var divisionId = $('#division-name').val();
			var teams = [];

			if (departmentId !== 'all') {
				teams = await getTeamsByDepartmentId(departmentId);
			} else if (divisionId !== 'all') {
				teams = await getTeamsByDivisionId(divisionId);
			}
			else {
				teams = await fetchTeams();
			}

			var selectBox = $('#team-name');
			selectBox.empty();
			selectBox.append('<option value="all" selected>Choose Team Name</option>');

			teams.forEach(team => {
				var option = $('<option>', {
					value: team.id,
					text: team.name,
				});
				selectBox.append(option);
			});
		} catch (error) {
			console.error('Error:', error);
		}
	}

	// getAllApprover(),
	getAllDivision(), getAllDepartment(), getAllTeam();
	async function getDepartmentsByDivisionId(divisionId) {
		return await fetchDepartmentsByDivisionId(divisionId)
	}
	async function getTeamsByDivisionId(divisionId) {
		return await fetchTeamsByDivisionId(divisionId)
	}
	async function getTeamsByDepartmentId(departmentId) {
		return await fetchTeamsByDepartmentId(departmentId)
	}
	async function getUsersByTeamId(teamId) {
		return await fetchUsersByTeamId(teamId)
	}
	async function getUsersByDepartmentId(departmentId) {
		return await fetchUsersByDepartmentId(departmentId)
	}
	async function getUsersByDivisionId(divisionId) {
		return await fetchUsersByDivisionId(divisionId)
	}
});

