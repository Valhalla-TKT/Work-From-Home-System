const url = "ws://10.1.9.73:8081/wfhs";
//const topicApproveNotificationCount = "/topic/approveNotificationCount";
const appApproveRejectNotification = "/app/approveRejectNotification";

//const appNotificationCount = "/app/notificationCount";

const topicPendingNotificationCount = "/topic/pendingNotificationCount";
const apppendingNotificationCount = "/app/pendingNotificationCount";

const topicApproveNotificationCount = "/topic/approveNotificationCount";
const approveNotificationCount = "/app/approveNotificationCount";

const topicRejectNotificationCount = "/topic/rejectNotificationCount";
const rejectNotificationCount = "/app/rejectNotificationCount";

const topicApproveReject = "/topic/approveRejectNotification";

const client = new StompJs.Client({
    brokerURL: url
});

var buttonApply, applicantFormCount, approverFormCount, approverPendingCount, formRejectNotificationText, formRejectNotificationName, formStatusApproveRejectNotificationContainer;

client.onConnect = (frame) => {
    client.subscribe(topicPendingNotificationCount, (count) => {
        updateNotificationCount(parseInt(count.body));
    });
    client.subscribe(topicApproveReject, (approveRejectNotification) => {
        var notification = JSON.parse(approveRejectNotification.body);
    	getApproveRejectNotification(notification.description, notification.name, notification.user, notification.formId);
    });
    client.subscribe('/topic/callback', (message) => {
        if (message.body === 'approveRejectNotificationSent') {
            getIfApproveReject();
        } else {
			console.log("je")
		}
    });
    getIfApproveReject()
};

client.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

client.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
    
};

function connect() {
	client.activate();
	console.log('Connected');	
}

function disconnect() {
    client.deactivate();
}

function sendNotification() {
	console.log("Sending notification to update pending notification count...");
	console.log("hello")
    if (client.connected) {
        client.publish({
            destination: topicPendingNotificationCount,
        });
    } else {
        console.error('STOMP client is not connected.');
    }    
}

function getIfApproveReject() {
    if (client.connected) {
        client.publish({
            destination: appApproveRejectNotification,
        });
    } else {
        console.error('STOMP client is not connected.');
    }
}

function updateNotificationCount(count) {
   	approverFormCount.innerText = count;
    approverPendingCount.innerText = count;
}

var currentUser = JSON.parse(localStorage.getItem('currentUser'));
var userRole;
var approveRoles = currentUser.approveRoles;
approveRoles.forEach(function(approveRole) {
    	userRole = approveRole.name;
});

function getApproveRejectNotification(description, name, user, formId) {
		var notificationTypeDescription = description
	    var notificationTypeName = name
	    var notificationUser = user;
	    var notificationFormId = formId;
	    /*formRejectNotificationText.innerText = notificationTypeDescription;
	    formRejectNotificationName.innerText = notificationTypeName;*/
	    if(userRole)
	    if(userRole === "APPLICANT") {
			createRejectNotificationContainer(notificationTypeDescription, notificationTypeName, notificationUser, notificationFormId);	
		}
	    
	    //getAllApproveRejectNotification();
	    var approveRejectCount = 0;
	    $.ajax({
	      url: `api/notification/notificationList`,
	      type: 'POST',
	      contentType: 'application/json',
	      success: function (response) {
			  approveRejectCount = response.length;
	    	
	    	},	        
	      error: function (error) {
	        console.error('Error:', error);
	      }
	    });
	    applicantFormCount.innerText = approveRejectCount;
	    console.log("HEREEE")
	}

function createRejectNotificationContainer(notificationTypeDescription, notificationTypeName, notificationUser, notificationFormId) {
    const newContainer = document.createElement("li");
    newContainer.classList.add("notification-container-list-items", "form-status-approve-reject-notification-container");
    const img = document.createElement("img");
    img.setAttribute("alt", "form");
    img.setAttribute("width", "45");
    img.setAttribute("height", "45");
    img.setAttribute("src", "assets/icons/form-approve-reject.png");
    const textBox = document.createElement("div");
    textBox.classList.add("notification-container-list-text-box");
    const title = document.createElement("span");
    title.classList.add("notification-container-list-text-box-title");
    var formattedNotificationTypeName = notificationTypeName.charAt(0).toUpperCase() + notificationTypeName.slice(1).toLowerCase();
    title.textContent = "Form " + formattedNotificationTypeName + " Notifications";
    const text = document.createElement("span");
    text.classList.add("notification-container-list-text-box-text", "form-status-approve-reject-notification-description");
    text.textContent = notificationTypeDescription;
    textBox.appendChild(title);
    textBox.appendChild(text);
    newContainer.appendChild(img);
    newContainer.appendChild(textBox);
    const parentElement = document.querySelector(".notification-container-list");
    parentElement.appendChild(newContainer);
}
function getAllApproveRejectNotification() {
	approveRejectCount = 0;
	console.log("inner")
    $.ajax({
      url: `api/notification/notificationList`,
      type: 'POST',
      contentType: 'application/json',
      success: function (response) {
		  console.log(response)
		  var totalCount = response.length;
		  var lastFiveResponses = response.slice(-5);

            lastFiveResponses.forEach(function (notification) {
                approveRejectCount++;
                var notificationType = notification.notificationType;
                var user = notification.sender;
                var form = notification.registerForm;
                if(form) {
					createRejectNotificationContainer(notificationType.description, notificationType.name, user.id, form.id);	
				} 
                
            });

		  applicantFormCount.innerText = totalCount;
//approverPendingCount.innerText = totalCount;
		  
    	  console.log("success")
    	  console.log(response)							      
      },	        
      error: function (error) {
        console.error('Error:', error);
      }
    });
}
function getApproverNotificationCount() {
	approveRejectCount = 0;
	console.log("inner")
    $.ajax({
      url: `api/notification/notificationList`,
      type: 'POST',
      contentType: 'application/json',
      success: function (response) {
		  console.log(response)
		  var totalCount = response.length;
		  var lastFiveResponses = response.slice(-5);

            lastFiveResponses.forEach(function (notification) {
                approveRejectCount++;
                var notificationType = notification.notificationType;
                var user = notification.user;
                var form = notification.registerForm;
                if(form) {
					createRejectNotificationContainer(notificationType.description, notificationType.name, user.id, form.id);	
				} 
                
            });

		  applicantFormCount.innerText = totalCount;
//approverPendingCount.innerText = totalCount;
		  
    	  console.log("success")
    	  console.log(response)							      
      },	        
      error: function (error) {
        console.error('Error:', error);
      }
    });
}
document.addEventListener("DOMContentLoaded", function() {	
	buttonApply = document.getElementById("apply-form-btn");
	applicantFormCount = document.getElementById("applicant-form-count");
	approverFormCount = document.getElementById("approver-form-count");
	
	approverPendingCount = document.getElementById("approver-pending-count");
	formRejectNotificationText = document.querySelector(".form-status-approve-reject-notification-description");
	formRejectNotificationName = document.querySelector(".form-status-approve-reject-name");
	console.log(formRejectNotificationName)
	formStatusApproveRejectNotificationContainer = document.querySelector(".form-status-approve-reject-notification-container")	
	connect();		
	if(buttonApply) {
		buttonApply.addEventListener("click", (e) => {
			sendNotification();
			e.preventDefault();
		});	
	}
	
var ulElements = document.querySelectorAll('.notification-container-list');

var totalCount = 0;

ulElements.forEach(function(ulElement) {
    var liCount = ulElement.getElementsByTagName('li').length;
    
    totalCount += liCount;
});

console.log('Total count of <li> elements:', totalCount);

	var approveRejectCount;
	getAllApproveRejectNotification();

/*	var isDeleted = false;
	if(!isDeleted) {
		setInterval(function() {
	    	console.clear();
	    	isDeleted = true;
		}, 5000);	
	}*/



	
});
