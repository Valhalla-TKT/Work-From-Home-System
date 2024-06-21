$(document).ready(function() {
	getSessionUser();

	function getSessionUser() {
	        $.ajax({
	            url: 'http://localhost:8080/api/session/user',
	            type: 'POST',
	            contentType: 'application/json',
	            success: function(response) {
	                console.log(response);
	                localStorage.setItem('currentUser', JSON.stringify(response));  
	                getData();              
	            },
	            error: function (error) {
	              console.error('Error:', error);
	          }
	        });
	}
	function getData() {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		console.log(currentUser)
	    if (currentUser) {
	        var userName = currentUser.name;
	        var currentUserPosition = currentUser.positionName;
	        if(currentUserPosition)
	       		var positionName = currentUserPosition.name;
	       	var email = currentUser.email;
	       	var staffId = currentUser.staffId;
	       	if(currentUser.team) {
				var departmentName = currentUser.team.name;
		}
	      	
	      	
	       	var approveRoles = currentUser.approveRoles;
	       	var userRole;
	       	approveRoles.forEach(function(approveRole) {
            	userRole = approveRole.name;
            	if(userRole !== 'SERVICE_DESK') {
					$('#service-desk-notification').hide();
					$('.visible-service-desk-only').hide();
				}
				if(userRole === 'APPLICANT') {
					$('.form-pending-notification-container').hide();
					$('.hide-applicant-only').hide();				
				}
				if(userRole !== 'APPLICANT') {
					$('.form-status-approve-reject-notification-container').hide();
					$('.visible-applicant-only').hide();					
				}
				if(userRole !== 'HR') {
					$('.visible-hr-only').hide();
				}
				if(userRole === 'HR') {
					$('.hide-hr-only').hide();
				}
				if(userRole === 'CEO') {
					$('.hide-ceo-only').hide();
									
				}
				if(userRole !== 'CEO' && userRole !== 'CISO' && userRole !== 'HR') {
				    $('.visible-cis-ceo-hr').hide();	
				}

				if(userRole !== 'CEO') {
					$('.visible-ceo-only').hide();
				}
				if(userRole === 'CISO') {
					$('.visible-ciso-hr').show();
				}
				if(userRole === 'SERVICE_DESK') {
					$('.hide-service-desk-only').hide();
					
				}
				if(userRole !== 'PROJECT_MANAGER') {
					$('.visible-pm-only').hide();					
				}
				
				if(userRole !== 'DEPARTMENT_HEAD') {
					$('.visible-dept-head-only').hide();					
				}
				
				if(userRole !== 'DIVISION_HEAD') {
					$('.visible-division-head-only').hide();					
				}
				
				
				
				
				if(userRole === 'PROJECT_MANAGER') {
					$('.hide-project-manager-only').hide();
					$('#project-manager-approval-output-section').hide();
					$('#department-head-approval-output-section').hide();
					$('#division-head-approval-output-section').hide();
					$('#ciso-approval-output-section').hide();
					$('#final-approval-output-section').hide();
					$('#project-manager-approval-input-section').show();
					$('#department-head-approval-input-section').hide();
					$('#division-head-approval-input-section').hide();
					$('#ciso-approval-input-section').hide();
					$('#final-approval-input-section').hide();
					$('#service-desk-input-section').hide();
				}
				if(userRole === 'DEPARTMENT_HEAD') {
					$('#project-manager-approval-output-section').show();
					$('#department-head-approval-output-section').hide();
					$('#division-head-approval-output-section').hide();
					$('#ciso-approval-output-section').hide();
					$('#final-approval-output-section').hide();
					$('#project-manager-approval-input-section').hide();
					$('#department-head-approval-input-section').show();
					$('#division-head-approval-input-section').hide();
					$('#ciso-approval-input-section').hide();
					$('#final-approval-input-section').hide();
					$('#service-desk-input-section').hide();
				}
				if(userRole === 'DIVISION_HEAD') {
					$('#project-manager-approval-output-section').show();
					$('#department-head-approval-output-section').show();
					$('#division-head-approval-output-section').hide();
					$('#ciso-approval-output-section').hide();	
					$('#final-approval-output-section').hide();
					$('#project-manager-approval-input-section').hide();
					$('#department-head-approval-input-section').hide();
					$('#division-head-approval-input-section').show();
					$('#ciso-approval-input-section').hide();
					$('#final-approval-input-section').hide();
					$('#service-desk-input-section').hide();	
				}
				if(userRole === 'CISO') {
					$('#project-manager-approval-output-section').show();
					$('#department-head-approval-output-section').show();
					$('#division-head-approval-output-section').show();
					$('#ciso-approval-output-section').hide();
					$('#final-approval-output-section').hide();
					$('#project-manager-approval-input-section').hide();
					$('#department-head-approval-input-section').hide();
					$('#division-head-approval-input-section').hide();
					$('#ciso-approval-input-section').show();
					$('#final-approval-input-section').hide();			
				}
				if(userRole === 'CEO') {
					$('#project-manager-approval-output-section').show();
					$('#department-head-approval-output-section').show();
					$('#division-head-approval-output-section').show();
					$('#ciso-approval-output-section').show();
					$('#final-approval-output-section').hide();
					$('#project-manager-approval-input-section').hide();
					$('#department-head-approval-input-section').hide();
					$('#division-head-approval-input-section').hide();
					$('#ciso-approval-input-section').hide();
					$('#final-approval-input-section').show();	
				}
				if(userRole === 'SERVICE_DESK') {
					console.log("hihihihi")
					$('#select-all-btn').hide();					
					$('#project-manager-approval-output-section').show();
					$('#department-head-approval-output-section').show();
					$('#division-head-approval-output-section').show();
					$('#ciso-approval-output-section').hide();
					$('#final-approval-output-section').hide();
					$('#project-manager-approval-input-section').hide();
					$('#department-head-approval-input-section').hide();
					$('#division-head-approval-input-section').hide();
					$('#ciso-approval-input-section').hide();
					$('#final-approval-input-section').hide();
					$('#service-desk-input-section').show();		
					$('#reject-form-btn').text('Send to Applicant').css({'color': 'blue', 'border-color': 'blue'});
					$('#approve-form-btn').hide();
				}
	        });
	        console.log('dfskfdksldk',userRole)
	        console.log(userName)
	        $('.nav-v2-user__name').text(userName);
	        $('.nav-v2-position').text(positionName);
	        $('#profile_page_name').text(userName);
	        $('#profile_page_position_name').text(positionName);
	        $('#position_page_email').text(email);
	        $('#position_page_staff_id').text("Staff ID : " + staffId);
	        $('#position_page_department_name').text(departmentName);
	        $('#profile_page_role_name').text(userRole);
	        if (currentUser.profile && currentUser.profile.length) {
				console.log("Hii")
		        $('.show-profile-is-not-null').hide();
		        if (currentUser.gender === "male") {
		            $('.show-profile-is-null.male').show();
					$('.show-profile-is-null.female').hide();
		        } else if (currentUser.gender === "female") {
					$('.show-profile-is-null.male').hide();
					$('.show-profile-is-null.female').show();
		        }
		    } else {
		        $('.show-profile-is-null').show();
		        $('.show-profile-is-not-null').show();
		    }
	        
	        //$('#profile-page-image').attr('src', currentUser.profile).attr('alt', currentUser.name);
	        console.log($('#profile-page-image'))	      
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

