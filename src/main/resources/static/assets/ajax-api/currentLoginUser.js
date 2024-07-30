$(document).ready(async function() {
	let user = JSON.parse(localStorage.getItem('currentUser'));
	if(!user) {
		try {
			user = await getSessionUser();
			if (!user) {
				handleSessionExpired();
			} else {
				getData();
			}
		} catch (error) {
			console.error('Error retrieving user:', error);
			handleSessionExpired();
		}
	} else {
		getData()
	}

	function handleSessionExpired() {
		Swal.fire({
			title: 'Session Expired',
			text: 'Your session has expired. Please log in again to continue.',
			icon: 'warning',
			confirmButtonText: 'OK'
		}).then(() => {
			localStorage.removeItem('currentUser');
			window.location.href = `${getContextPath()}/signOut`;
		});
	}

	function getData() {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	    if (currentUser) {
	        var userName = currentUser.name;

			var positionName = currentUser.positionName;
	       	var email = currentUser.email;
	       	var staffId = currentUser.staffId;
			var teamName, departmentName, divisionName;
	       	if(currentUser.team) {
				teamName = currentUser.team.name;
			}
		   	if(currentUser.department) {
				   departmentName = currentUser.department.name;
			}
			if(currentUser.division) {
				divisionName = currentUser.division.name;
			}
	      	
	       	var approveRoles = currentUser.approveRoles;
			var hasRole = {
				SERVICE_DESK: false,
				HR: false,
				CEO: false,
				CISO: false,
				DIVISION_HEAD: false,
				DEPARTMENT_HEAD: false,
				PROJECT_MANAGER: false,
				APPLICANT: false,
			}
	       	//var userRole;
			approveRoles.forEach(function (approveRole) {
				var userRole = approveRole.name;
				hasRole[userRole] = true;
			})
	       	// approveRoles.forEach(function(approveRole) {
            // 	userRole = approveRole.name;
            // 	if(userRole !== 'SERVICE_DESK') {
			// 		$('#service-desk-notification').hide();
			// 		$('.visible-service-desk-only').hide();
			// 	}
			// 	if(userRole === 'APPLICANT') {
			// 		$('.form-pending-notification-container').hide();
			// 		$('.hide-applicant-only').hide();
			// 	}
			// 	if(userRole !== 'APPLICANT') {
			// 		$('.form-status-approve-reject-notification-container').hide();
			// 		$('.visible-applicant-only').hide();
			// 	}
			// 	if(userRole !== 'HR') {
			// 		$('.visible-hr-only').hide();
			// 	}
			// 	if(userRole === 'HR') {
			// 		$('.hide-hr-only').hide();
			// 	}
			// 	if(userRole === 'CEO') {
			// 		$('.hide-ceo-only').hide();
			//
			// 	}
			// 	if(userRole !== 'CEO' && userRole !== 'CISO' && userRole !== 'HR') {
			// 	    $('.visible-cis-ceo-hr').hide();
			// 	}
			//
			// 	if(userRole !== 'CEO') {
			// 		$('.visible-ceo-only').hide();
			// 	}
			// 	if(userRole === 'CISO') {
			// 		$('.visible-ciso-hr').show();
			// 	}
			// 	if(userRole === 'SERVICE_DESK') {
			// 		$('.hide-service-desk-only').hide();
			//
			// 	}
			// 	if(userRole !== 'PROJECT_MANAGER') {
			// 		$('.visible-pm-only').hide();
			// 	}
			//
			// 	if(userRole !== 'DEPARTMENT_HEAD') {
			// 		$('.visible-dept-head-only').hide();
			// 	}
			//
			// 	if(userRole !== 'DIVISION_HEAD') {
			// 		$('.visible-division-head-only').hide();
			// 	}
			//
			//
			//
			//
			// 	if(userRole === 'PROJECT_MANAGER') {
			// 		$('.hide-project-manager-only').hide();
			// 		$('#project-manager-approval-output-section').hide();
			// 		$('#department-head-approval-output-section').hide();
			// 		$('#division-head-approval-output-section').hide();
			// 		$('#ciso-approval-output-section').hide();
			// 		$('#final-approval-output-section').hide();
			// 		$('#project_manager-approval-input-section').show();
			// 		$('#department_head-approval-input-section').hide();
			// 		$('#division_head-approval-input-section').hide();
			// 		$('#ciso-approval-input-section').hide();
			// 		$('#ceo-approval-input-section').hide();
			// 		$('#service-desk-input-section').hide();
			// 	}
			// 	if(userRole === 'DEPARTMENT_HEAD') {
			// 		$('#project-manager-approval-output-section').show();
			// 		$('#department-head-approval-output-section').hide();
			// 		$('#division-head-approval-output-section').hide();
			// 		$('#ciso-approval-output-section').hide();
			// 		$('#final-approval-output-section').hide();
			// 		$('#project_manager-approval-input-section').hide();
			// 		$('#department_head-approval-input-section').show();
			// 		$('#division_head-approval-input-section').hide();
			// 		$('#ciso-approval-input-section').hide();
			// 		$('#ceo-approval-input-section').hide();
			// 		$('#service-desk-input-section').hide();
			// 	}
			// 	if(userRole === 'DIVISION_HEAD') {
			// 		$('#project-manager-approval-output-section').show();
			// 		$('#department-head-approval-output-section').show();
			// 		$('#division-head-approval-output-section').hide();
			// 		$('#ciso-approval-output-section').hide();
			// 		$('#final-approval-output-section').hide();
			// 		$('#project_manager-approval-input-section').hide();
			// 		$('#department_head-approval-input-section').hide();
			// 		$('#division_head-approval-input-section').show();
			// 		$('#ciso-approval-input-section').hide();
			// 		$('#ceo-approval-input-section').hide();
			// 		$('#service-desk-input-section').hide();
			// 	}
			// 	if(userRole === 'CISO') {
			// 		$('#project-manager-approval-output-section').show();
			// 		$('#department-head-approval-output-section').show();
			// 		$('#division-head-approval-output-section').show();
			// 		$('#ciso-approval-output-section').hide();
			// 		$('#final-approval-output-section').hide();
			// 		$('#project_manager-approval-input-section').hide();
			// 		$('#department_head-approval-input-section').hide();
			// 		$('#division_head-approval-input-section').hide();
			// 		$('#ciso-approval-input-section').show();
			// 		$('#ceo-approval-input-section').hide();
			// 	}
			// 	if(userRole === 'CEO') {
			// 		$('#project-manager-approval-output-section').show();
			// 		$('#department-head-approval-output-section').show();
			// 		$('#division-head-approval-output-section').show();
			// 		$('#ciso-approval-output-section').show();
			// 		$('#final-approval-output-section').hide();
			// 		$('#project_manager-approval-input-section').hide();
			// 		$('#department_head-approval-input-section').hide();
			// 		$('#division_head-approval-input-section').hide();
			// 		$('#ciso-approval-input-section').hide();
			// 		$('#ceo-approval-input-section').show();
			// 	}
			// 	if(userRole === 'SERVICE_DESK') {
			// 		console.log("hihihihi")
			// 		$('#select-all-btn').hide();
			// 		$('#project-manager-approval-output-section').show();
			// 		$('#department-head-approval-output-section').show();
			// 		$('#division-head-approval-output-section').show();
			// 		$('#ciso-approval-output-section').hide();
			// 		$('#final-approval-output-section').hide();
			// 		$('#project_manager-approval-input-section').hide();
			// 		$('#department_head-approval-input-section').hide();
			// 		$('#division_head-approval-input-section').hide();
			// 		$('#ciso-approval-input-section').hide();
			// 		$('#ceo-approval-input-section').hide();
			// 		$('#service-desk-input-section').show();
			// 		$('#reject-form-btn').text('Send to Applicant').css({'color': 'blue', 'border-color': 'blue'});
			// 		$('#approve-form-btn').hide();
			// 	}
	        // });
			//
			if(!hasRole.SERVICE_DESK) {
				$('#service-desk-notification').hide();
				$('.visible-service-desk-only').hide();
			}
			if(hasRole.APPLICANT) {
				$('.form-pending-notification-container').hide();
				$('.hide-applicant-only').hide();
			}
			if(!hasRole.APPLICANT) {
				$('.form-status-approve-reject-notification-container').hide();
				$('.visible-applicant-only').hide();
			}
			if(!hasRole.HR) {
				$('.visible-hr-only').hide();
			}
			if(hasRole.HR) {
				$('.hide-hr-only').hide();
			}
			if(hasRole.CEO) {
				$('.hide-ceo-only').hide();

			}
			if(!hasRole.CEO && !hasRole.CISO && !hasRole.HR) {
				$('.visible-cis-ceo-hr').hide();
			}

			if(!hasRole.CEO) {
				$('.visible-ceo-only').hide();
			}
			if(hasRole.CISO) {
				$('.visible-ciso-hr').show();
			}
			if(hasRole.SERVICE_DESK) {
				$('.hide-service-desk-only').hide();

			}
			if(!hasRole.PROJECT_MANAGER) {
				$('.visible-pm-only').hide();
			}

			if(!hasRole.DEPARTMENT_HEAD) {
				$('.visible-dept-head-only').hide();
			}

			if(!hasRole.DIVISION_HEAD) {
				$('.visible-division-head-only').hide();
			}

			if(hasRole.PROJECT_MANAGER) {
				$('.hide-project-manager-only').hide();
				$('#project-manager-approval-output-section').hide();
				$('#department-head-approval-output-section').hide();
				$('#division-head-approval-output-section').hide();
				$('#ciso-approval-output-section').hide();
				$('#final-approval-output-section').hide();
				$('#project_manager-approval-input-section').show();
				$('#department_head-approval-input-section').hide();
				$('#division_head-approval-input-section').hide();
				$('#ciso-approval-input-section').hide();
				$('#ceo-approval-input-section').hide();
				$('#service-desk-input-section').hide();
			}
			if(hasRole.DEPARTMENT_HEAD) {
				$('.hide-dept-head-only').hide();
				$('#project-manager-approval-output-section').show();
				$('#department-head-approval-output-section').hide();
				$('#division-head-approval-output-section').hide();
				$('#ciso-approval-output-section').hide();
				$('#final-approval-output-section').hide();
				$('#project_manager-approval-input-section').hide();
				$('#department_head-approval-input-section').show();
				$('#division_head-approval-input-section').hide();
				$('#ciso-approval-input-section').hide();
				$('#ceo-approval-input-section').hide();
				$('#service-desk-input-section').hide();
			}
			if(hasRole.DIVISION_HEAD) {
				$('#project-manager-approval-output-section').show();
				$('#department-head-approval-output-section').show();
				$('#division-head-approval-output-section').hide();
				$('#ciso-approval-output-section').hide();
				$('#final-approval-output-section').hide();
				$('#project_manager-approval-input-section').hide();
				$('#department_head-approval-input-section').hide();
				$('#division_head-approval-input-section').show();
				$('#ciso-approval-input-section').hide();
				$('#ceo-approval-input-section').hide();
				$('#service-desk-input-section').hide();
			}
			if(hasRole.CISO) {
				$('#project-manager-approval-output-section').show();
				$('#department-head-approval-output-section').show();
				$('#division-head-approval-output-section').show();
				$('#ciso-approval-output-section').hide();
				$('#final-approval-output-section').hide();
				$('#project_manager-approval-input-section').hide();
				$('#department_head-approval-input-section').hide();
				$('#division_head-approval-input-section').hide();
				$('#ciso-approval-input-section').show();
				$('#ceo-approval-input-section').hide();
			}
			if(hasRole.CEO) {
				$('#project-manager-approval-output-section').show();
				$('#department-head-approval-output-section').show();
				$('#division-head-approval-output-section').show();
				$('#ciso-approval-output-section').show();
				$('#final-approval-output-section').hide();
				$('#project_manager-approval-input-section').hide();
				$('#department_head-approval-input-section').hide();
				$('#division_head-approval-input-section').hide();
				$('#ciso-approval-input-section').hide();
				$('#ceo-approval-input-section').show();
			}
			if(hasRole.SERVICE_DESK) {
				$('#select-all-btn').hide();
				$('#project-manager-approval-output-section').show();
				$('#department-head-approval-output-section').show();
				$('#division-head-approval-output-section').show();
				$('#ciso-approval-output-section').hide();
				$('#final-approval-output-section').hide();
				$('#project_manager-approval-input-section').hide();
				$('#department_head-approval-input-section').hide();
				$('#division_head-approval-input-section').hide();
				$('#ciso-approval-input-section').hide();
				$('#ceo-approval-input-section').hide();
				$('#service-desk-input-section').show();
				$('#reject-form-btn').text('Send to Applicant').css({'color': 'blue', 'border-color': 'blue'});
				$('#approve-form-btn').hide();
			}
			//
	        //console.log('dfskfdksldk',userRole)
	        $('.nav-v2-user__name').text(userName);
	        $('.nav-v2-position').text(positionName);
	        $('#profile_page_name').text(userName);
			$('#profile_page_position').text(positionName);
	        // $('#profile_page_position_name').text(positionName);
	        $('#position_page_email').text(email);
	        $('#position_page_staff_id').text("Staff ID : " + staffId);
			$('#position_page_team_name').text(teamName);
	        $('#position_page_department_name').text(departmentName);
			$('#position_page_division_name').text(divisionName);
	        // $('#profile_page_role_name').text(userRole);
	        if (currentUser.profile) {
				// 	console.log("Hii")
				//     $('.show-profile-is-not-null').hide();
				//     if (currentUser.gender === "male") {
				//         $('.show-profile-is-null.male').show();
				// 		$('.show-profile-is-null.female').hide();
				//     } else if (currentUser.gender === "female") {
				// 		$('.show-profile-is-null.male').hide();
				// 		$('.show-profile-is-null.female').show();
				//     }
				// } else {
				//     $('.show-profile-is-null').show();
				//     $('.show-profile-is-not-null').show();
				// }
				const navModalProfileImg = document.getElementById("nav-modal-profile-img");
				const navProfileImg = document.getElementById("nav-profile-img");
				navModalProfileImg.src = `${getContextPath()}/assets/profile/${currentUser.profile}`;
				navModalProfileImg.alt = currentUser.name;
				navProfileImg.src = `${getContextPath()}/assets/profile/${currentUser.profile}`;
				navProfileImg.alt = currentUser.name;
				const profileImage = $('#profile-page-image')
				profileImage.attr('src', `${getContextPath()}/assets/profile/${currentUser.profile}`).attr('alt', currentUser.name);

				// to hide edit position button
				const firstTimeLogin = currentUser.firstTimeLogin;
				if(firstTimeLogin) {
					$(".edit-position").hide();
				}
			}
	    }
	}
	
    
    $('#signOutForm').on('submit', function(event) {
        signOut();
    });
    
    
    function signOut() {
        localStorage.removeItem('currentUser');
    }
    
    getData();
});

