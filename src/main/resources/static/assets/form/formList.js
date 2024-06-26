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
   	if(currentUser.team) {
    	var teamId = currentUser.team.id;
    }
    if(currentUser.department) {
		var departmentId = currentUser.department.id;	
	}
        
    var divisionId = currentUser.division.id;
    const formStatusSelect = $('#form-status-select');
	const formListSelectedCount = $('#formListSelectedCount')

    var status = 'ALL';

    formStatusSelect.val(status);
	console.log(userRole)
	function updateFormListSelectCount() {
		formListSelectedCount.text(`Selected (${selectedValues.length})`);
	}
	// role
	if(userRole === 'PROJECT_MANAGER') {
		formListTitle.text(`${currentUser.teamName} Team Form List`);
		getTeamMembersPendingForm();
	}
	if(userRole === 'DEPARTMENT_HEAD') {
		getTeamsPendingForm();
	}
	if(userRole === 'DIVISION_HEAD') {
		
		getDepartmentsPendingForm();
	}
	if(userRole === 'CISO' || userRole === 'CEO' || userRole === 'SERVICE_DESK') {
		console.log(userRole)
		getAllForm();			
	}		
	// role
	    
    formStatusSelect.change(function() {
        status = $(this).val();
        if(userRole === 'PROJECT_MANAGER') {
			getTeamMembersPendingForm();
		}
		if(userRole === 'DEPARTMENT_HEAD') {
			getTeamsPendingForm();
		}
		if(userRole === 'DIVISION_HEAD') {
			getDepartmentsPendingForm();
		}
		if(userRole === 'CISO'  || userRole === 'CEO' || userRole === 'SERVICE_DESK') {
			getAllForm();			
		}	
    });
		

    function getTeamMembersPendingForm() {        
        $.ajax({
            url: 'http://localhost:8080/api/registerform/getTeamWithStatus',
            type: 'POST',
            data: {
                status: status,
                teamId: teamId,
                userId: userId
            },
            success: function(response) {
				console.log(response)
				var forms = response.forms;
				var applicantList = response.applicants;
                console.log('Success:', applicantList);
                $(".form-card-container").empty();
                forms.forEach(function(form, index) {
			    var applicant = applicantList[index];
			    var $aTag = $("<div>", {

			        class: "js-resume-card resume-card designer-search-card resume-card-sections-hidden js-user-row-" + form.id
			    });
			    var $header = $("<div>", {
			        class: "resume-card-header resume-section-padding"
			    });
			    var $designer = $("<div>", {
			        class: "resume-card-header-designer"
			    });
				var $avatar = $("<img>", {
					class: "resume-card-avatar",
					alt: `${applicant.name} photo`,
					src: `/assets/profile/${applicant.profile}`,
					width: "80",
					height: "80",
				});
				var $details = $("<div>", {
					class: "resume-card-header-details"
				});
				var $title = $("<div>", {
					class: "resume-card-title"
				}).append(
					$("<h3>", {
						class: "resume-card-designer-name user-select-none",
						text: applicant.name
					}),
					$("<span>", {
						class: "badge badge-pro",
						text: form.currentStatus
					})
				);
				var $text = $("<span>", {
					class: "resume-card-header-text"
				}).append(
					$("<p>").append(
						$("<span>", {
							class: "resume-card-location",
							text: applicant.positionName
						}),
						$("<span>", {
							class: "resume-card-middot",
							text: "•"
						}),
						$("<span>", {
							text: applicant.teamName
						}),
						$("<br />", {
							class: "resume-card-middot",
							text: "•"
						}),
						$("<span>", {
							text: applicant.departmentName
						}),
					),
					$("<input>", {
						type: "checkbox",
						class: "resume-card-checkbox",
						value: form.id,
						css: {
							display: 'none'
						}
					})
				);
				var $goDetail = $("<span>", {
					class: "view-form-detail",
					text: "Double Click to View Detail"
				});
			    $details.append($title, $text, $goDetail);
			    $designer.append($avatar, $details );
			    $header.append($designer);
			    $aTag.append($header);
				$aTag.on('click', function() {
					var $checkbox = $(this).find(".resume-card-checkbox");
					if ($checkbox.prop('checked')) {
						$checkbox.prop('checked', false);
						$(this).removeClass('shadow');
					} else {
						$checkbox.prop('checked', true);
						$(this).addClass('shadow');
					}
					var checkboxValue = $checkbox.val();
					if ($checkbox.prop('checked')) {
						selectedValues.push(checkboxValue);
						console.log(selectedValues)
					} else {
						var index = selectedValues.indexOf(checkboxValue);
						if (index !== -1) {
							selectedValues.splice(index, 1);
							console.log(selectedValues)
						}
					}
					updateFormListSelectCount();
					console.log("Selected values:", selectedValues);
				});
				$aTag.on('dblclick', function() {
					window.location.href = "form/" + form.id + "/user/" + currentUser.id;
				});
			    $(".form-card-container").append($aTag);
			});
			// $(".form-checkbox").change(function() {
            //         var checkboxValue = $(this).val();
            //         if ($(this).prop('checked')) {
            //             selectedValues.push(checkboxValue);
			// 			$('.resume-card').addClass('shadow');
            //             console.log("Checkbox value checked:", checkboxValue);
            //         } else {
            //             var index = selectedValues.indexOf(checkboxValue);
            //             if (index !== -1) {
            //                 selectedValues.splice(index, 1);
            //             }
			// 			$('.resume-card').removeClass('shadow');
            //         }
            //         console.log("Selected values:", selectedValues);
            //     });
			//
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                console.log('Response:', xhr.responseText);
            }
        });
    }
    
    function getTeamsPendingForm() {        
        $.ajax({
            url: 'http://localhost:8080/api/registerform/getDepartmentWithStatus',
            type: 'POST',
            data: {
                status: status,
                departmentId: departmentId,
                userId: userId
            },
			success: function(response) {
				console.log(response)
				var forms = response.forms;
				var applicantList = response.applicants;
				console.log('Success:', applicantList);
				$(".form-card-container").empty();
				forms.forEach(function(form, index) {
				var applicant = applicantList[index];
				var $aTag = $("<div>", {

					class: "js-resume-card resume-card designer-search-card resume-card-sections-hidden js-user-row-" + form.id
				});
				var $header = $("<div>", {
					class: "resume-card-header resume-section-padding"
				});
				var $designer = $("<div>", {
					class: "resume-card-header-designer"
				});
				var $avatar = $("<img>", {
					class: "resume-card-avatar",
					alt: `${applicant.name} photo`,
					src: `/assets/profile/${applicant.profile}`,
					width: "80",
					height: "80",
				});
				var $details = $("<div>", {
					class: "resume-card-header-details"
				});
				var $title = $("<div>", {
					class: "resume-card-title"
				}).append(
					$("<h3>", {
						class: "resume-card-designer-name user-select-none",
						text: applicant.name
					}),
					$("<span>", {
						class: "badge badge-pro",
						text: form.currentStatus
					})
				);
				var $text = $("<span>", {
					class: "resume-card-header-text"
				}).append(
					$("<p>").append(
						$("<span>", {
							class: "resume-card-location",
							text: applicant.positionName
						}),
						$("<span>", {
							class: "resume-card-middot",
							text: "•"
						}),
						$("<span>", {
							text: applicant.teamName
						}),
						$("<br />", {
							class: "resume-card-middot",
							text: "•"
						}),
						$("<span>", {
							text: applicant.departmentName
						}),
					),
					$("<input>", {
						type: "checkbox",
						class: "resume-card-checkbox",
						value: form.id,
						css: {
							display: 'none'
						}
					})
				);
				var $goDetail = $("<span>", {
					class: "view-form-detail",
					text: "Double Click to View Detail"
				});
				$details.append($title, $text, $goDetail);
				$designer.append($avatar, $details );
				$header.append($designer);
				$aTag.append($header);
				$aTag.on('click', function() {
					var $checkbox = $(this).find(".resume-card-checkbox");
					if ($checkbox.prop('checked')) {
						$checkbox.prop('checked', false);
						$(this).removeClass('shadow');
					} else {
						$checkbox.prop('checked', true);
						$(this).addClass('shadow');
					}
					updateFormListSelectCount();
					var checkboxValue = $checkbox.val();
					if ($checkbox.prop('checked')) {
						selectedValues.push(checkboxValue);
						console.log(selectedValues)
					} else {
						var index = selectedValues.indexOf(checkboxValue);
						if (index !== -1) {
							selectedValues.splice(index, 1);
							console.log(selectedValues)
						}
					}
					console.log("Selected values:", selectedValues);
				});
				$aTag.on('dblclick', function() {
					window.location.href = "form/" + form.id + "/user/" + currentUser.id;
				});
				$(".form-card-container").append($aTag);
			});

            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                console.log('Response:', xhr.responseText);
            }
        });
    }
    
    function getDepartmentsPendingForm() {        
        $.ajax({
            url: 'http://localhost:8080/api/registerform/getDivisionWithStatus',
            type: 'POST',
            data: {
                status: status,
                divisionId: divisionId,
                userId: userId
            },
			success: function(response) {
				console.log(response)
				var forms = response.forms;
				var applicantList = response.applicants;
				console.log('Success:', applicantList);
				$(".form-card-container").empty();
				forms.forEach(function(form, index) {
					var applicant = applicantList[index];
					var $aTag = $("<div>", {

						class: "js-resume-card resume-card designer-search-card resume-card-sections-hidden js-user-row-" + form.id
					});
					var $header = $("<div>", {
						class: "resume-card-header resume-section-padding"
					});
					var $designer = $("<div>", {
						class: "resume-card-header-designer"
					});
					var $avatar = $("<img>", {
						class: "resume-card-avatar",
						alt: `${applicant.name} photo`,
						src: `/assets/profile/${applicant.profile}`,
						width: "80",
						height: "80",
					});
					var $details = $("<div>", {
						class: "resume-card-header-details"
					});
					var $title = $("<div>", {
						class: "resume-card-title"
					}).append(
						$("<h3>", {
							class: "resume-card-designer-name user-select-none",
							text: applicant.name
						}),
						$("<span>", {
							class: "badge badge-pro",
							text: form.currentStatus
						})
					);
					var $text = $("<span>", {
						class: "resume-card-header-text"
					}).append(
						$("<p>").append(
							$("<span>", {
								class: "resume-card-location",
								text: applicant.positionName
							}),
							$("<span>", {
								class: "resume-card-middot",
								text: "•"
							}),
							$("<span>", {
								text: applicant.teamName
							}),
							$("<br />", {
								class: "resume-card-middot",
								text: "•"
							}),
							$("<span>", {
								text: applicant.departmentName
							}),
						),
						$("<input>", {
							type: "checkbox",
							class: "resume-card-checkbox",
							value: form.id,
							css: {
								display: 'none'
							}
						})
					);
					var $goDetail = $("<span>", {
						class: "view-form-detail",
						text: "Double Click to View Detail"
					});
					$details.append($title, $text, $goDetail);
					$designer.append($avatar, $details );
					$header.append($designer);
					$aTag.append($header);
					$aTag.on('click', function() {
						var $checkbox = $(this).find(".resume-card-checkbox");
						if ($checkbox.prop('checked')) {
							$checkbox.prop('checked', false);
							$(this).removeClass('shadow');
						} else {
							$checkbox.prop('checked', true);
							$(this).addClass('shadow');
						}
						var checkboxValue = $checkbox.val();
						if ($checkbox.prop('checked')) {
							selectedValues.push(checkboxValue);
							console.log(selectedValues)
						} else {
							var index = selectedValues.indexOf(checkboxValue);
							if (index !== -1) {
								selectedValues.splice(index, 1);
								console.log(selectedValues)
							}
						}
						console.log("Selected values:", selectedValues);
					});
					$aTag.on('dblclick', function() {
						window.location.href = "form/" + form.id + "/user/" + currentUser.id;
					});
					$(".form-card-container").append($aTag);
				});

			},
            error: function(xhr, status, error) {
                console.error('Error:', error);
                console.log('Response:', xhr.responseText);
            }
        });
    }
    
    function getAllForm() {        
		console.log("hello")		
        $.ajax({
            url: 'http://localhost:8080/api/registerform/getAllForms',
            type: 'POST',
            data: {
                status: status,
                userId: userId
            },
            success: function(response) {
				console.log(response)
				console.log(response)
				var forms = response.forms;
				var applicantList = response.applicants;
                console.log('Success:', response);
                $(".form-card-container").empty();
                forms.forEach(function(form, index) {
			    var applicant = applicantList[index];
			    var statusLength = form.workFlowStatuses.length;
			    
			    // Ensure there are at least two statuses in the list
			    if (statusLength >= 2) {
			        var secondToLastStatus = form.workFlowStatuses[statusLength - 2];
			        var statusText = secondToLastStatus.status;
			    } else {
			        var statusText = "No previous status";
			    }
			    
			    var $aTag = $("<a>", {
					href: "form/" + form.id + "/user/" + currentUser.id,
			        class: "js-resume-card resume-card designer-search-card resume-card-sections-hidden js-user-row-" + form.id
			    });
			    var $header = $("<div>", {
			        class: "resume-card-header resume-section-padding"
			    });
			    var $designer = $("<div>", {
			        class: "resume-card-header-designer"
			    });
				var $avatar = $("<img>", {
					class: "resume-card-avatar",
					alt: `${applicant.name} photo`,
					src: `/assets/profile/${applicant.profile}`,
					width: "80",
					height: "80",
				});
				var $details = $("<div>", {
					class: "resume-card-header-details"
				});
				var $title = $("<div>", {
					class: "resume-card-title"
				}).append(
					$("<h3>", {
						class: "resume-card-designer-name user-select-none",
						text: applicant.name
					}),
					$("<span>", {
						class: "badge badge-pro",
						text: form.currentStatus
					})
				);
				var $text = $("<span>", {
					class: "resume-card-header-text"
				}).append(
					$("<p>").append(
						$("<span>", {
							class: "resume-card-location",
							text: applicant.positionName
						}),
						$("<span>", {
							class: "resume-card-middot",
							text: "•"
						}),
						$("<span>", {
							text: applicant.teamName
						}),
						$("<br />", {
							class: "resume-card-middot",
							text: "•"
						}),
						$("<span>", {
							text: applicant.departmentName
						}),
					),
					$("<input>", {
						type: "checkbox",
						class: "form-checkbox",
						value: form.id
					})
				);
			    $details.append($title, $text);
			    $designer.append($avatar, $details);
			    $header.append($designer);
			    $aTag.append($header);
			    $(".form-card-container").append($aTag);
			});
			$(".form-checkbox").change(function() {
                    var checkboxValue = $(this).val();
                    if ($(this).prop('checked')) {
                        selectedValues.push(checkboxValue);
                        console.log("Checkbox value checked:", checkboxValue);
                    } else {
                        var index = selectedValues.indexOf(checkboxValue);
                        if (index !== -1) {
                            selectedValues.splice(index, 1);
                        }
                    }
                    console.log("Selected values:", selectedValues);
                });

            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                console.log('Response:', xhr.responseText);
            }
        });
    }
    
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
    console.log(serviceDeskDownloadBtn)
    
	
    $("#service-desk-download-btn").click(function() {
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
        selectAll();
        var formData = new FormData();
		for (var i = 0; i < selectedValues.length; i++) {
			console.log(selectedValues[i] + "hello there")
		    formData.append('formIds[]', selectedValues[i]);
		}
		
		console.log(formData + "hello")
        bulkApprove(formData)
    });
    
    
    function bulkApprove(formData) {
		$.ajax({
            url: 'http://localhost:8080/api/registerform/bulkApprove',
            type: 'POST',
            data: formData,
            processData: false,
		    contentType: false,
		    success: function(response) {
				
	        },error: function(xhr, error) {
                console.error('Error:', error);
                console.log('Response:', xhr.responseText);
            }
        });
	}
    
    function downloadForms(formData) {
		console.log(formData)
		$.ajax({
            url: 'http://localhost:8080/api/registerform/downloadAllForms',
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
    	$(".hide-when-click-upload").show();
    	$(".go-upload-page").hide();
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
	        url: 'http://localhost:8080/api/registerform/uploadExcelServiceDesk',
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
	                window.location.href = '/dashboard';
	            });
	            console.log('File uploaded successfully:', response);
	        },
	        error: function(xhr, status, error) {
	            console.error('Error uploading file:', error);
	        }
	    });
	}
    
});
