$(document).ready(function() {
    var urlParams = window.location;
	console.log(urlParams)
	const url = new URL(urlParams);
	const path = url.pathname.split('/')
	var formId = path[path.length - 3]
	var userId = path[path.length - 1]
	console.log("formId = ", formId, "userId = ", userId)
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	var approveRoles = currentUser.approveRoles;
   	var userRole;
   	approveRoles.forEach(function(approveRole) {
    	userRole = approveRole.name;
   	});
   	console.log(userRole)
    // data send to backend
    var workFlowStatusId, approverId, registerFormId, state, reason, approveDate;
	const pmReasonInputBox = $('#pm-reason');
    const deptHeadReasonInputBox = $('#dept-head-reason');
    const divisionHeadReasonInputBox = $('#division-head-reason');
    const cisoReasonInputBox = $('#ciso-reason');
    const finalApprovalReasonInputBox = $('#final-approval-reason');
    const serviceDeskReasonInputBox = $('#service-desk-reason');			
    console.log(serviceDeskReasonInputBox)
    const pmApproveDateInputBox = $('#pm-approve-date');
    const deptHeadApproveDateInputBox = $('#dept-head-approve-date');
    const divisionHeadApproveDateInputBox = $('#division-head-approve-date');
    const cisoApproveDateInputBox = $('#ciso-approve-date');
    const finalApprovalApproveDateInputBox = $('#final-approval-approve-date');
    
    pmApproveDateInputBox.dateDropper({
		format: 'd-m-Y',
	});
	/*var approve_date;*/
	pmApproveDateInputBox.on('change', function() {
		var chosenDate = $(this).val();
/*		approve_date = chosenDate*/
		console.log(chosenDate);
		if (chosenDate) {
        
        var parts = chosenDate.split('-');
        if (parts.length === 3) {
            var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
            var formattedApproveDate = new Date(formattedDate);
            
            
            if (!isNaN(formattedApproveDate.getTime())) {
                approveDate = formattedApproveDate.toISOString().split('T')[0];
                console.log("Formatted approve date:", formattedApproveDate);
            } else {
                console.error("Invalid date value:", formattedDate);
            }
        } else {
            console.error("Invalid date format:", chosenDate);
        }
    } else {
        console.error("Date value is empty");
    }
	});
	
	pmApproveDateInputBox.on('blur', function() {
		$(this).removeAttr('readonly');
	});
	
	//deptHead
	deptHeadApproveDateInputBox.dateDropper({
		format: 'd-m-Y',
	});
	/*var approve_date;*/
	deptHeadApproveDateInputBox.on('change', function() {
		var chosenDate = $(this).val();
/*		approve_date = chosenDate*/
		console.log(chosenDate);
		if (chosenDate) {
        
        var parts = chosenDate.split('-');
        if (parts.length === 3) {
            var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
            var formattedApproveDate = new Date(formattedDate);
            
            
            if (!isNaN(formattedApproveDate.getTime())) {
                approveDate = formattedApproveDate.toISOString().split('T')[0];
                console.log("Formatted approve date:", formattedApproveDate);
            } else {
                console.error("Invalid date value:", formattedDate);
            }
        } else {
            console.error("Invalid date format:", chosenDate);
        }
    } else {
        console.error("Date value is empty");
    }
	});
	
	deptHeadApproveDateInputBox.on('blur', function() {
		$(this).removeAttr('readonly');
	});
    //divisionHead
    divisionHeadApproveDateInputBox.dateDropper({
		format: 'd-m-Y',
	});
	/*var approve_date;*/
	divisionHeadApproveDateInputBox.on('change', function() {
		var chosenDate = $(this).val();
/*		approve_date = chosenDate*/
		console.log(chosenDate);
		if (chosenDate) {
        
        var parts = chosenDate.split('-');
        if (parts.length === 3) {
            var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
            var formattedApproveDate = new Date(formattedDate);
            
            
            if (!isNaN(formattedApproveDate.getTime())) {
                approveDate = formattedApproveDate.toISOString().split('T')[0];
                console.log("Formatted approve date:", formattedApproveDate);
            } else {
                console.error("Invalid date value:", formattedDate);
            }
        } else {
            console.error("Invalid date format:", chosenDate);
        }
    } else {
        console.error("Date value is empty");
    }
	});
	
	divisionHeadApproveDateInputBox.on('blur', function() {
		$(this).removeAttr('readonly');
	});
	// ciso
	cisoApproveDateInputBox.dateDropper({
		format: 'd-m-Y',
	});
	/*var approve_date;*/
	cisoApproveDateInputBox.on('change', function() {
		var chosenDate = $(this).val();
/*		approve_date = chosenDate*/
		console.log(chosenDate);
		if (chosenDate) {
        
        var parts = chosenDate.split('-');
        if (parts.length === 3) {
            var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
            var formattedApproveDate = new Date(formattedDate);
            
            
            if (!isNaN(formattedApproveDate.getTime())) {
                approveDate = formattedApproveDate.toISOString().split('T')[0];
                console.log("Formatted approve date:", formattedApproveDate);
            } else {
                console.error("Invalid date value:", formattedDate);
            }
        } else {
            console.error("Invalid date format:", chosenDate);
        }
    } else {
        console.error("Date value is empty");
    }
	});
	
	cisoApproveDateInputBox.on('blur', function() {
		$(this).removeAttr('readonly');
	});
	// final
	finalApprovalApproveDateInputBox.dateDropper({
		format: 'd-m-Y',
	});
	/*var approve_date;*/
	finalApprovalApproveDateInputBox.on('change', function() {
		var chosenDate = $(this).val();
/*		approve_date = chosenDate*/
		console.log(chosenDate);
		if (chosenDate) {
        
        var parts = chosenDate.split('-');
        if (parts.length === 3) {
            var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
            var formattedApproveDate = new Date(formattedDate);
            
            
            if (!isNaN(formattedApproveDate.getTime())) {
                approveDate = formattedApproveDate.toISOString().split('T')[0];
                console.log("Formatted approve date:", formattedApproveDate);
            } else {
                console.error("Invalid date value:", formattedDate);
            }
        } else {
            console.error("Invalid date format:", chosenDate);
        }
    } else {
        console.error("Date value is empty");
    }
	});
	
	finalApprovalApproveDateInputBox.on('blur', function() {
		$(this).removeAttr('readonly');
	});
	// 
    var flowStatusId;
    console.log(formId);

    getFormDetailsById(formId, userId);
    
    function getFormDetailsById(formId, userId) {
        $.ajax({
            url: `/api/registerform/getFormById?formId=${formId}&userId=${userId}`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
                
                var formStatus = response.formStatus;
                var registerForm = response.registerForm;
                var capture = response.capture;
                var applicant = response.applicant;
                var requester = response.requester;
                // var workFlowStatuses = registerForm.workFlowStatuses;
                var workFlowStatuses = registerForm.workFlowStatuses;
            	console.log("Work Flow Statuses:", workFlowStatuses);                	
                console.log("Form Status:", formStatus);
                console.log("Register Form:", registerForm);
                console.log("Capture:", capture);
                console.log("Applicant:", applicant);
                console.log("Requester:", requester);
                if (requester.id !== applicant.id) {
					console.log("not same")
			        $('#self-request-radio-output').prop('checked', false);
			        $('#other-request-radio-output').prop('checked', true);
			    } else {
			        $('#self-request-radio-output').prop('checked', true);
			        $('#other-request-radio-output').prop('checked', false);
			    }
                flowStatusId = formStatus.id;
                console.log("Applicant Name:", applicant.name);                
                $('#name-display-by-form-id').val(applicant.name)	;
                $('#position-display-by-form-id').val(applicant.positionName);
                $('#team-display-by-form-id').val(applicant.team.name);
                $('#department-display-by-form-id').val(applicant.department.name);
                $('#working-place-display-by-form-id').val(registerForm.working_place);                
                var requestPercent = registerForm.request_percent;
                updateStaffIdFieldsForDetailPage(applicant.staffId);
                $('input[type="radio"][value="' + requestPercent + '"]').prop('checked', true);
                $('input[type="radio"][value="' + capture.os_type + '"]').prop('checked', true);
                $('#from-date-display-by-form-id').val(formatDate(registerForm.from_date))
                $('#to-date-display-by-form-id').val(formatDate(registerForm.to_date));
                const requestReasonDisplayByFormId = $('.ProseMirror.request-reason-display-by-form-id')[0];
                requestReasonDisplayByFormId.innerText = registerForm.request_reason;
                if(capture.os_type === 'Window') {
					$('#window').show();
					$('#mac').hide();
					$('#linux').hide();
					var captureImageDataUrl = 'data:image/jpeg;base64,' + capture.operationSystem;
					$('#window-operating-system-display-by-form-id').attr("src",+ captureImageDataUrl);
					var captureSPImageDataUrl = 'data:image/jpeg;base64,' + capture.securityPatch;
	                $('#window-securityPatch-display-by-form-id').attr("src", captureSPImageDataUrl);
	                var captureASImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusSoftware;
	                $('#window-antivirusSoftware-display-by-form-id').attr("src",captureASImageDataUrl);
	                var captureAPImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusSoftware;
	                $('#window-antivirusPattern-display-by-form-id').attr("src",+ captureAPImageDataUrl);
	                var captureFSImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusSoftware;
	                $('#window-antivirusFullScan-display-by-form-id').attr("src",+ captureFSImageDataUrl);	
				} else if(capture.os_type === 'Mac') {			
					$('#window').hide();
					$('#mac').show();
					$('#linux').hide();	
					var captureOSImageDataUrl = 'data:image/jpeg;base64,' + capture.operationSystem;
					$('#mac-operating-system-display-by-form-id').attr("src", captureOSImageDataUrl);		
					var captureSPImageDataUrl = 'data:image/jpeg;base64,' + capture.securityPatch;
	                $('#mac-securityPatch-display-by-form-id').attr("src", captureSPImageDataUrl);
	                var captureASImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusSoftware;
	                $('#mac-antivirusSoftware-display-by-form-id').attr("src", captureASImageDataUrl);	
				} else if(capture.os_type === 'Linux') {	
					$('#window').hide();
					$('#mac').hide();
					$('#linux').show();				
					var captureOSImageDataUrl = 'data:image/jpeg;base64,' + capture.operationSystem;
					$('#linux-operating-system-display-by-form-id').attr("src", captureOSImageDataUrl);
					var captureSPImageDataUrl = 'data:image/jpeg;base64,' + capture.securityPatch;
	                $('#linux-securityPatch-display-by-form-id').attr("src",captureSPImageDataUrl);
	                var captureASImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusSoftware;
	                $('#linux-antivirusSoftware-display-by-form-id').attr("src",captureASImageDataUrl);	                
				}
                $('#signed-date-display-by-form-id').val(formatDate(registerForm.signedDate));
                var signatureImageDataUrl = 'data:image/jpeg;base64,' + registerForm.signature;
                $('#signature-display-by-form-id').attr("src", signatureImageDataUrl);
                var projectManagerApprovalSection = $('#project-manager-approval-output-section')
                var departmentHeadApprovalSection = $('#department-head-approval-output-section')
                var divisionHeadApprovalSection = $('#division-head-approval-output-section')
                var cisoHeadApprovalSection = $('#ciso-approval-output-section')
                var ceoHeadApprovalSection = $('#ceo-approval-output-section')
                
                if(projectManagerApprovalSection.length) {
					if(workFlowStatuses[0].status === 'APPROVE') {						
	    				$('#pm-approval-status input[value="yes"]').prop('checked', true);
	    				$('#pm-approval-status input[value="no"]').prop('checked', false);
					}
					if(workFlowStatuses[0].status === 'REJECT') {
						$('#pm-approval-status input[value="yes"]').prop('checked', false);
	    				$('#pm-approval-status input[value="no"]').prop('checked', true);
					}
					var pmApproveDate = formatDate(workFlowStatuses[0].approve_date);												
					$('#project-manager-approval-approve-date-output').val(pmApproveDate)
					$('#project-manager-approval-approve-reason-output').val(workFlowStatuses[0].reason)
				}
				// for department head
                if(departmentHeadApprovalSection.length) {
					if(workFlowStatuses[1].status === 'APPROVE') {						
	    				$('#dept-head-approval-status input[value="yes"]').prop('checked', true);
	    				$('#dept-head-approval-status input[value="no"]').prop('checked', false);
					}
					if(workFlowStatuses[1].status === 'REJECT') {
						$('#dept-head-approval-status input[value="yes"]').prop('checked', false);
	    				$('#dept-head-approval-status input[value="no"]').prop('checked', true);
					}
					var deptHeadApproveDate = formatDate(workFlowStatuses[1].approve_date);												
					$('#department-head-approval-approve-date-output').val(deptHeadApproveDate)
					$('#department-head-approval-approve-reason-output').val(workFlowStatuses[1].reason)
				}
				// for division head
                if(divisionHeadApprovalSection.length) {
					if(workFlowStatuses[2].status === 'APPROVE') {						
	    				$('#division-head-approval-status input[value="yes"]').prop('checked', true);
	    				$('#division-head-approval-status input[value="no"]').prop('checked', false);
					}
					if(workFlowStatuses[2].status === 'REJECT') {
						$('#division-head-approval-status input[value="yes"]').prop('checked', false);
	    				$('#division-head-approval-status input[value="no"]').prop('checked', true);
					}
					var divisionHeadApproveDate = formatDate(workFlowStatuses[2].approve_date);												
					$('#division-head-approval-approve-date-output').val(divisionHeadApproveDate)
					$('#division-head-approval-approve-reason-output').val(workFlowStatuses[2].reason)
				}
				// for ciso
                if(cisoHeadApprovalSection.length) {
					if(workFlowStatuses[3].status === 'APPROVE') {						
	    				$('#ciso-approval-status input[value="yes"]').prop('checked', true);
	    				$('#ciso-approval-status input[value="no"]').prop('checked', false);
					}
					if(workFlowStatuses[3].status === 'REJECT') {
						
						$('#ciso-approval-status input[value="yes"]').prop('checked', false);
	    				$('#ciso-approval-status input[value="no"]').prop('checked', true);
					}
					var cisoApproveDate = formatDate(workFlowStatuses[3].approve_date);												
					$('#ciso-approval-approve-date-output').val(cisoApproveDate)
					$('#ciso-approval-approve-reason-output').val(workFlowStatuses[3].reason)
				}
				// for ceo
                if(ceoHeadApprovalSection.length) {
					if(workFlowStatuses[4].status === 'APPROVE') {						
	    				$('#ceo-approval-status input[value="yes"]').prop('checked', true);
	    				$('#ceo-approval-status input[value="no"]').prop('checked', false);
					}
					if(workFlowStatuses[4].status === 'REJECT') {
						
						$('#ceo-approval-status input[value="yes"]').prop('checked', false);
	    				$('#ceo-approval-status input[value="no"]').prop('checked', true);
					}
					var divisionHeadApproveDate = formatDate(workFlowStatuses[4].approve_date);												
					$('#ceo-approval-approve-date-output').val(divisionHeadApproveDate)
					$('#ceo-approval-approve-reason-output').val(workFlowStatuses[4].reason)
				}
            },
            error: function (error) {
                console.error('Error fetching division data:', error);
            }
        });
    }
    
    function formatDate(dateString) {
	    var approveDate = new Date(dateString);
	    var day = approveDate.getDate();
	    var month = approveDate.getMonth() + 1;
	    var year = approveDate.getFullYear();
	    
	    // Pad day and month with leading zeros if necessary
	    day = (day < 10) ? '0' + day : day;
	    month = (month < 10) ? '0' + month : month;
	    
	    // Construct the formatted date string
	    var formattedDate = day + '-' + month + '-' + year;
	    
	    return formattedDate;
	}
    
    function updateStaffIdFieldsForDetailPage(staffId) {

		const charArray = staffId.split('');

		const staffIdInputs = $('#staff-id-output-container input');

	    staffIdInputs.each(function(index) {
	        $(this).val(charArray[index]);
	    });
	}
    
            
    if(userRole === 'SERVICE_DESK') {
		console.log("servoice")
	}
    
    $('#approve-form-btn').click(function(event) {
		workFlowStatusId = flowStatusId
		approverId = currentUser.id
		registerFormId = formId	
		state = true;		
		console.log(approveDate)
		if(userRole === 'PROJECT_MANAGER') {
			reason = pmReasonInputBox.val();
		}
		if(userRole === 'DEPARTMENT_HEAD') {
			reason = deptHeadReasonInputBox.val();
		}
		if(userRole === 'DIVISION_HEAD') {
			reason = divisionHeadReasonInputBox.val();
		}
		if(userRole === 'CISO') {
			reason = cisoReasonInputBox.val();			
		}
		if(userRole === 'CEO') {
			reason = finalApprovalReasonInputBox.val();	
		}		
		if(userRole === 'SERVICE_DESK') {
			reason = serviceDeskReasonInputBox.val();	
			console.log(reason)
		}	
		
		event.preventDefault();
		var requestData = {
			workFlowStatusId: workFlowStatusId,
			approverId: approverId,
			registerFormId: registerFormId,
			state: state,
			reason: reason,
			approveDate: approveDate,		
		};
					
		var formData = new FormData();
		
		formData.append('workFlowStatusId', parseInt(workFlowStatusId));
		formData.append('approverId', parseInt(approverId));
		formData.append('registerFormId', parseInt(registerFormId));
		formData.append('state', state);
		formData.append('reason', reason);
		formData.append('approveDate', approveDate);		
		formData.append('workFlowStatusDto', JSON.stringify(requestData));	    
		approveForm(formData);				
		
	});
	
	$('#reject-form-btn').click(function(event) {
		console.log("Hello")
		workFlowStatusId = flowStatusId
		approverId = currentUser.id
		registerFormId = formId
		state = false;
		if(userRole === 'PROJECT_MANAGER') {
			reason = pmReasonInputBox.val();
		}
		if(userRole === 'DEPARTMENT_HEAD') {
			reason = deptHeadReasonInputBox.val();
		}
		if(userRole === 'DIVISION_HEAD') {
			reason = divisionHeadReasonInputBox.val();
		}
		if(userRole === 'CISO') {
			reason = cisoReasonInputBox.val();			
		}
		if(userRole === 'CEO') {
			reason = finalApprovalReasonInputBox.val();	
		}	
		if(userRole === 'SERVICE_DESK') {
			reason = serviceDeskReasonInputBox.val();	
			approveDate = new Date()
		}	
		console.log(reason)
		approveDate = new Date();

		var formattedDate = approveDate.getFullYear() + '-' + (approveDate.getMonth() + 1).toString().padStart(2, '0') + '-' + approveDate.getDate().toString().padStart(2, '0');
		approveDate = formattedDate
		console.log(workFlowStatusId, approverId, registerFormId, state, reason, formattedDate)
		 
		event.preventDefault();
		var requestData = {
			workFlowStatusId: workFlowStatusId,
			approverId: approverId,
			registerFormId: registerFormId,
			state: state,
			reason: reason,
			approveDate: approveDate,
		};
					
		var formData = new FormData();
		
		formData.append('workFlowStatusId', parseInt(workFlowStatusId));
		formData.append('approverId', parseInt(approverId));
		formData.append('registerFormId', parseInt(registerFormId));
		formData.append('state', state);
		formData.append('reason', reason);
		formData.append('approveDate', approveDate);
		formData.append('workFlowStatusDto', JSON.stringify(requestData));
		rejectForm(formData);
		
	});
	
	function approveForm(formData) {
		$.ajax({
		    url: 'http://localhost:8080/api/registerform/update',
		    type: 'POST',
		    data: formData,
		    processData: false,
		    contentType: false,
		    success: function(response) {
		        console.log("Successful : ", response);
		        $('#message').text(response);
		        Swal.fire({
	                title: "Success!",
	                text: "WFH Form Approve Completed!",
	                icon: "success",
	                timer: 3000,
	                timerProgressBar: true,
	                showConfirmButton: false
	            }).then(() => {
	                window.location.href = '/admin/viewFormList';
	            });
		    },
		    error: function(error) {
		        console.error('Error:', error);
		    }
		});
	}
	function rejectForm(formData) {
		$.ajax({
		    url: 'api/registerform/update',
		    type: 'POST',
		    data: formData,
		    processData: false,
		    contentType: false,
		    success: function(response) {
		        console.log("Successful : ", response);
		        $('#message').text(response);
		        Swal.fire({
	                title: "Success!",
	                text: "WFH Form Reject Completed!",
	                icon: "success",
	                timer: 3000,
	                timerProgressBar: true,
	                showConfirmButton: false
	            }).then(() => {
	                window.location.href = '/viewFormList';
	            });
		    },
		    error: function(error) {
		        console.error('Error:', error);
		    }
		});
	}
});
