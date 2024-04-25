$(document).ready(function() {
	function handleSearch(searchInput, listContainer) {
		searchInput.on('input', function() {
			var searchText = $(this).val().toLowerCase();

			listContainer.find('.job-list-item').each(function() {
				var itemName = $(this).find('.job-title').text().toLowerCase();

				if (itemName.includes(searchText)) {
					$(this).show();
				} else {
					$(this).hide();					
				}
			});
		});
	}
	
	function handleSearch2(searchInput, listContainer) {
        searchInput.on('input', function() {
            var searchText = $(this).val().toLowerCase();

            listContainer.find('.js-resume-card').each(function() {
                var userName = $(this).find('.resume-card-designer-name').text().toLowerCase();

                if (userName.includes(searchText)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    }

	const searchByDivisionName = $('#search-by-division-name');
	const searchByDepartmentName = $('#search-by-department-name');
	const searchByTeamName = $('#search-by-team-name');
	const searchByStaffName = $('#search-by-staff-name');
			

	if (searchByDivisionName.length) {
		handleSearch(searchByDivisionName, $('#division-list'));
	}

	if (searchByDepartmentName.length) {
		handleSearch(searchByDepartmentName, $('#department-list'));
	}
	
	if (searchByTeamName.length) {
		handleSearch(searchByTeamName, $('#team-list'));
	}
	
	if (searchByStaffName.length) {
		handleSearch2(searchByStaffName, $('#staff-list'));
	}
});
