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
    const osTypeInputBox = $('#os-type-value');			
	
    var workFromHomePercent = 0.0;
    const fromDateInputBox = $('#from-date');
    const toDateInputBox = $('#to-date');
    const signedDateInputBox = $('#signed-date');
    
    const checkBoxModalDialog = $("#checkbox-dialog");
    
    // Generate from date to date
	var currentDate = new Date();
	var fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
	var toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
	
	// Data to send Backend
	var applicantId, requesterId, working_place, request_reason, from_date, to_date, os_type, securityPatch, antivirusSoftware, antivirusPattern, antivirusFullScan, signed_date, signature;	
	var request_percent = 0.0;
	var applied_date = new Date();
	
	// Working place myanmar
	$('#work-in-others-button').hide();
    $('#region-state-select').hide();
    $('#city-township-select').hide();

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
    $.each(regions, function(index, region){
        regionSelect.append('<option value="' + region.regionState + '">' + region.regionState + '</option>');
    });

    $('#region-state-select').change(function(){
        var selectedRegion = $(this).val();
        var cities = [];

        $.each(regions, function(index, region){
            if(region.regionState === selectedRegion) {
                cities = region.cities;
                return false;
            }
        });
        
        $('#city-township-select').empty();
		$('#city-township-select').append('<option value="" disabled selected>City/Township</option>');
        $.each(cities, function(index, city){
			
            $('#city-township-select').append('<option value="' + city.city + '">' + city.city + '</option>');
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
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    $('#name-select-box-container').hide();
    
    // user ID
    var currentUserId = currentUser.id;
    console.log(currentUserId)
	nameInputBox.val(currentUser.name);
	updateStaffIdFields(currentUser.staffId);
	positionInputBox.val(currentUser.positionName);	
	teamInputBox.val(currentUser.teamName);
	departmentInputBox.val(currentUser.departmentName);
	fromDateInputBox.val(formatDate(fromDate));
	toDateInputBox.val(formatDate(toDate));
	signedDateInputBox.val(formatDate(currentDate));
	
	var approveRoles = currentUser.approveRoles;
	var isDivisionHead = false;
	var isDepartmentHead = false;
	
	approveRoles.forEach(function(approveRole) {
	    if (approveRole.name === 'DIVISION_HEAD') {
	        isDivisionHead = true;
	        return;
	    }
	    if (approveRole.name === 'DEPARTMENT_HEAD') {
	        isDepartmentHead = true;
	        return;
	    }
	});
	
	if (isDivisionHead) {
	    divisionInputContainer.show();
	    $('#department-input-container').show();	    
	}else if (isDepartmentHead) {
	    divisionInputContainer.hide();
	}	
	 else {
	    divisionInputContainer.hide();
	    $('#department-input-container').hide();	
	}	
    selfRequestRadio.on('change', function() {
		selfRequestRadioChecked = true;
		otherRequestRadioChecked = false;
	    if ($(this).prop('checked')) {
	    	$('#name-select-box-container').hide();
	        $('#name-input-container').show();
	        applyForm[0].reset();
	        nameInputBox.val(currentUser.name);
			updateStaffIdFields(currentUser.staffId);
			positionInputBox.val(currentUser.positionName);	
			teamInputBox.val(currentUser.teamName);
			departmentInputBox.val(currentUser.departmentName);
			fromDateInputBox.val(formatDate(fromDate));
			toDateInputBox.val(formatDate(toDate));
	    }
	});

	otherRequestRadio.on('change', function() {
		selfRequestRadioChecked = false;
		otherRequestRadioChecked = true;
		if ($(this).prop('checked')) {
	    	$('#name-select-box-container').show();
	        $('#name-input-container').hide();
	        applyForm[0].reset();	        
            updateStaffIdFields(otherRequestData.staffId);
            positionInputBox.val(otherRequestData.position);
            teamInputBox.val(otherRequestData.team);
            departmentInputBox.val(otherRequestData.department);
            fromDateInputBox.val(formatDate(fromDate));
			toDateInputBox.val(formatDate(toDate));
	        otherRequestRadio.prop('checked', true);	        
		}
	});
	
	var selectedTeamMemberId;
	teamMemberListSelectBox.on('change', function() {
    	const selectedUserId = $(this).val();
    	selectedTeamMemberId = selectedUserId;
    	var selectedOption = $(this).find('option:selected');
        var selectedStaffId = selectedOption.attr('data-staff-id');
        updateStaffIdFields(selectedStaffId);
        var selectedPositionName = selectedOption.attr('data-position-name');        
        positionInputBox.val(selectedPositionName);
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
        const inputValue = $(this).val();
        console.log('Input Value:', inputValue);
    });
    
    $('input[name="radio-group"]').on('change', function() {
        workFromHomePercent = $('input[name="radio-group"]:checked').val();
        
        if ($(this).prop('checked')) {
            console.log(workFromHomePercent);
        }
    });
/*const proseMirrorEditor = $('.ProseMirror')[0];
const placeholderElement = $('.ProseMirror p[data-placeholder]')[0];

function hidePlaceholder() {
    if (placeholderElement) {
        placeholderElement.style.display = 'none';
    }
}

function showPlaceholder() {
    if (placeholderElement) { 
        placeholderElement.style.display = 'block';
    }
}

// Hide placeholder when the editor is clicked
proseMirrorEditor.addEventListener('click', function() {
    hidePlaceholder();
});

// Mutation observer to handle changes in the editor content
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            const editorContent = proseMirrorEditor.innerText;
            if (editorContent.trim() === '') {
                showPlaceholder();
            } else {
                hidePlaceholder();
            }
        }
    });
});

const config = { characterData: true, subtree: true, childList: true };

observer.observe(proseMirrorEditor, config);       

document.body.addEventListener('click', function(event) {
    if (!proseMirrorEditor.contains(event.target)) {
        showPlaceholder();
    }
});

proseMirrorEditor.addEventListener('input', function() {
    const editorContent = proseMirrorEditor.innerText;
    console.log(editorContent)
    if (editorContent.trim() === '') {
        showPlaceholder();
    } else {
        hidePlaceholder();         
    }
});*/

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
		$("#data-section").hide();
		$("#capture-section").show();
		$("#signature-section").hide();
		$("#go-back").show();
		$("#go-back-1").hide();

		$("#current-step-1").hide();
		$("#current-step-2").show();
		$("#current-step-3").hide();
		if(checkBoxModalDialog.length) {
			showCheckBoxDialogModal();	
		}
		
	}
	
	function showNextDiv1() {						
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

      function showCheckBoxDialogModal() {
          checkBoxModalDialog.get(0).showModal();
      }

      function hideCheckBoxDialogModal() {
          checkBoxModalDialog.get(0).close();
      }
      $('#ceo-apply-form-btn').click(function(event) {
			event.preventDefault();
			var formData = new FormData();
			formData.append('applicantId', currentUser.id);
	        formData.append('requesterId', currentUser.id);
	        formData.append('from_date', formatDate(fromDate));
	        formData.append('to_date', formatDate(toDate));
	        formData.append('signed_date', signed_date);
	        formData.append('applied_date', applied_date);
	        $.ajax({
		    url: 'api/registerform/createCeoForm',
		    type: 'POST',
		    data: formData,
		    processData: false,
		    contentType: false,
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
	                window.location.href = '/dashboard';
	            });
		    },
		    error: function(error) {
		        console.error('Error:', error);
		    }
		});

	  });
	$('#apply-form-btn').click(function(event) {
		
		if(selfRequestRadioChecked) {
			applicantId = currentUser.id;
			requesterId = currentUser.id;
		} else if(otherRequestRadioChecked) {
			applicantId = selectedTeamMemberId;
			requesterId = currentUser.id;
		}
		if(!workInMyanmarBoolean) {
			working_place =  workingPlaceInputBox.val();	
		} if(workInMyanmarBoolean) {
			working_place = workInMyanmar
		}
		console.log(workInMyanmar)
								
		request_reason = reasonInputBox.val();
		console.log(request_reason)		
		request_percent = workFromHomePercent;
		
		var formattedFromDate = new Date(fromDateInputBox.val()).toISOString().split('T')[0];
		from_date = formattedFromDate;
		
		
		var toDateValue = toDateInputBox.val();
		var dateComponents = toDateValue.split('-');
var day = parseInt(dateComponents[0], 10);
var month = parseInt(dateComponents[1], 10) - 1; // Months are zero-based (0-11)
var year = parseInt(dateComponents[2], 10);

// Create a new Date object using the components
var toDateObj = new Date(year, month, day);

// Check if the Date object is valid
if (!isNaN(toDateObj.getTime())) {
    // If the Date object is valid, you can proceed to format it or use it as needed
    formattedToDate = toDateObj.toISOString().split('T')[0];
} else {
    console.error('Invalid date string:', toDateValue);
}
		/*var formattedToDate = new Date(toDateInputBox.val()).toISOString().split('T')[0];*/
		to_date = formattedToDate;
		
		os_type = osTypeInputBox.val();
		
		// Window
		if(os_type === 'Window') {
			if (windowOperationSystemInputBox.length > 0) {
			    const windowOperationSystemInputBoxFile = windowOperationSystemInputBox.val();
			
			    if (windowOperationSystemInputBoxFile) {
			        operationSystem = windowOperationSystemInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
			
			if (windowSecurityPatchInputBox.length > 0) {
			    const windowSecurityPatchInputBoxFile = windowSecurityPatchInputBox.prop('files')[0];
			
			    if (windowSecurityPatchInputBoxFile) {
					securityPatch = windowSecurityPatchInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
			
			if (windowAntivirusSoftwareInputBox.length > 0) {
			    const windowAntivirusSoftwareInputBoxFile = windowAntivirusSoftwareInputBox.prop('files')[0];
			
			    if (windowAntivirusSoftwareInputBoxFile) {
			        antivirusSoftware = windowAntivirusSoftwareInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
			
			if (windowAntivirusPatternInputBox.length > 0) {
			    const windowAntivirusPatternInputBoxFile = windowAntivirusPatternInputBox.prop('files')[0];
			
			    if (windowAntivirusPatternInputBoxFile) {
			        antivirusPattern = windowAntivirusPatternInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
			
			if (windowAntivirusFullScanInputBox.length > 0) {
			    const windowAntivirusFullScanInputBoxFile = windowAntivirusFullScanInputBox.prop('files')[0];
			
			    if (windowAntivirusFullScanInputBoxFile) {
			        antivirusFullScan = windowAntivirusFullScanInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
		}
		
		
		// Mac
		if(os_type === 'Mac') {
			if (macOperationSystemInputBox.length > 0) {
			    const macOperationSystemInputBoxFile = macOperationSystemInputBox.prop('files')[0];
			
			    if (macOperationSystemInputBoxFile) {
			        operationSystem = macOperationSystemInputBoxFile;			        
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
			
			if (macSecurityPatchInputBox.length > 0) {
			    const macSecurityPatchInputBoxFile = macSecurityPatchInputBox.prop('files')[0];
			
			    if (macSecurityPatchInputBoxFile) {
			        securityPatch = macSecurityPatchInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
			
			if (macAntivirusSoftwareInputBox.length > 0) {
			    const macAntivirusSoftwareInputBoxFile = macAntivirusSoftwareInputBox.prop('files')[0];
			
			    if (macAntivirusSoftwareInputBoxFile) {
			        antivirusSoftware = macAntivirusSoftwareInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
		}
				
		// Linux
		if(os_type === 'Linux') {
			if (linuxOperationSystemInputBox.length > 0) {
			    const linuxOperationSystemInputBoxFile = linuxOperationSystemInputBox.prop('files')[0];
			
			    if (linuxOperationSystemInputBoxFile) {
			        operationSystem = linuxOperationSystemInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
			
			if (linuxSecurityPatchInputBox.length > 0) {
			    const linuxSecurityPatchInputBoxFile = linuxSecurityPatchInputBox.prop('files')[0];
			
			    if (linuxSecurityPatchInputBoxFile) {
			        securityPatch = linuxSecurityPatchInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
			
			if (linuxAntivirusSoftwareInputBox.length > 0) {
			    const linuxAntivirusSoftwareInputBoxFile = linuxAntivirusSoftwareInputBox.prop('files')[0];
			
			    if (linuxAntivirusSoftwareInputBoxFile) {
			        antivirusSoftware = linuxAntivirusSoftwareInputBoxFile;
			    } else {
			        console.log("No file selected.");
			    }
			} else {
			    console.log("File input element not found.");
			}
		}
	event.preventDefault();
	    var requestData = {
		   	applicantId: applicantId,
		    requesterId: requesterId,
		    working_place: working_place,
		    request_reason: request_reason,
		    from_date: from_date,
		    to_date: to_date,		    
		    signature: signature,
		    os_type: os_type,
		    request_percent: request_percent,
		    applied_date: applied_date
		};
	    //createForm(requestData)
	    
	    var formData = new FormData();
		formData.append('applicantId', applicantId);
        formData.append('requesterId', requesterId);
        formData.append('working_place', working_place);
        formData.append('request_reason', request_reason);
        formData.append('request_percent', request_percent);
        formData.append('from_date', from_date);
        formData.append('to_date', to_date);
        formData.append('signed_date', signed_date);
        formData.append('os_type', os_type);
        formData.append('applied_date', applied_date);

		// Append file inputs to FormData
		if(os_type === 'Window') {
			formData.append('operationSystem', $('#file1')[0].files[0]);
			formData.append('securityPatch', $('#file2')[0].files[0]);
			formData.append('antivirusSoftware', $('#file3')[0].files[0]);
			formData.append('antivirusPattern', $('#file4')[0].files[0]);
			formData.append('antivirusFullScan', $('#file5')[0].files[0]);
		}
		if(os_type === 'Mac') {
			formData.append('operationSystem', $('#file6')[0].files[0]);
			formData.append('securityPatch', $('#file7')[0].files[0]);
			formData.append('antivirusSoftware', $('#file8')[0].files[0]);
		}
		if(os_type === 'Linux') {
			formData.append('operationSystem', $('#file9')[0].files[0]);
			formData.append('securityPatch', $('#file10')[0].files[0]);
			formData.append('antivirusSoftware', $('#file11')[0].files[0]);
		}
		formData.append('signature', $('#file12')[0].files[0]);
		formData.append('registerFormDto', JSON.stringify(requestData));
		
		$.ajax({
		    url: 'api/registerform/create',
		    type: 'POST',
		    data: formData,
		    processData: false,
		    contentType: false,
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
	                window.location.href = '/dashboard';
	            });
		    },
		    error: function(error) {
		        console.error('Error:', error);
		    }
		});

		$(this).submit();

    });
    
		if(currentUser.team) {
        var formData = new FormData();
        formData.append("teamId", currentUser.team.id)
        formData.append("userId", currentUser.id)
        console.log(currentUser.team.id, currentUser.id)
        getTeamMemberById(formData);
    }

    function getTeamMemberById(formData) {
        console.log(formData + "hello")
        $.ajax({
            url: 'api/user/getAllTeamMember',
          type: 'POST',
            data: formData,
          contentType: false,
            processData: false,
          success: function (response) {
              console.log(response)
              console.log("success")
              var selectBox = $('#team-member-list');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Name</option>');
                for (var i = 0; i < response.length; i++) {
                    if (response[i].name !== currentUser.name) {
                        var option = $('<option>', {
                            value: response[i].id,
                            text: response[i].name,
                            'data-staff-id': response[i].staffId,
                            'data-position-name': response[i].position.name,
                            'data-team-name': response[i].team.name,
                            'data-department-name': response[i].department.name
                        });
                        selectBox.append(option);
                    }
                }

          },
          error: function (error) {
              console.error('Error:', error);
          }
      });
    }
});

