document.addEventListener('DOMContentLoaded', function () {

  // function getSessionUser() {
  //   $.ajax({
  //       url: `${getContextPath()}/api/session/user`,
  //       type: 'POST',
  //       contentType: 'application/json',
  //       success: function(response) {
  //           localStorage.setItem('currentUser', JSON.stringify(response));
  //           // Call getData function to update chart data
  //           getTeamData();
  //           getDepartmentData();
  //           getDivisionData();
  //       },
  //       error: function(error) {
  //           console.error('Error:', error);
  //       }
  //   });
//}

//----------------------------------TEAM START-----------------------------------------
    const wfhsTeamPercentChartJs = document.getElementById('wfh-team-percent-chartjs')
    const teamDonut = document.getElementById('team-gender-distribution-chartjs')
    let teambarctx, teamdonutCtx, myTeamBarChart, myTeamDonutChart;
    if (wfhsTeamPercentChartJs) {
        teambarctx = wfhsTeamPercentChartJs.getContext('2d');
        teamdonutCtx = teamDonut.getContext('2d');
        myTeamBarChart = new Chart(teambarctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Form Request Percent(%) This Month',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        max: 100,
                        beginAtZero: true,
                        reverse: false,
                        ticks: {
                            stepSize: 10,
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });

        myTeamDonutChart = new Chart(teamdonutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Requester','Non-Requester'],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const labelIndex = context.dataIndex;
                                const label = context.chart.data.labels[labelIndex];
                                const value = context.raw;
                                return `${label}: ${value}`;
                            }
                        }
                    }
                }
            }

        });
    }

  function getTeamData() {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
          var managedTeamName = currentUser.managedTeamName;
          var teamId = currentUser.team.id
          console.log("managedTeamName:", managedTeamName);

          $.ajax({
              url: `${getContextPath()}/api/user/userRequest`,
              type: 'GET',
              data: {
                  managedTeamName: managedTeamName
              },
              success: function(data) {
                  console.log(data);

                  const userNames = data.map(entry => entry[0]);
                  const formCounts = data.map(entry => entry[2]);

                  myTeamBarChart.data.labels = userNames;
                  myTeamBarChart.data.datasets[0].data = formCounts;

                  myTeamBarChart.update();
              },
              error: function(xhr, status, error) {
                  console.error(status, error);
              }
          });

          $.ajax({
            url: `${getContextPath()}/api/user/teamRegistrationInfo`,
            type: 'GET',
            data: {
                managedTeamName: managedTeamName
            },
            success: function(data) {
                console.log("Team Registration Percentage:", data);

                const teamName = data[0];
                console.log(teamName)

                updateTeamInfo(teamName);
            },
            error: function(xhr, status, error) {
                console.error(status, error);
            }
        });

        $.ajax({
        url: `${getContextPath()}/api/user/requestStaff`,
        type: 'GET',
        data: {
            managedTeamName: managedTeamName
        },
        success: function(data) {
            console.log(data);
            let totalRequesterCount = 0;
            let totalNonRequesterCount = 0;
            data.forEach(teamData => {
                totalRequesterCount += teamData[1];  // usersWithRequest
                totalNonRequesterCount += teamData[2];  // usersWithoutRequest
            });
            myTeamDonutChart.data.datasets[0].data = [totalRequesterCount, totalNonRequesterCount];
            myTeamDonutChart.update();
        },
        error: function(xhr, status, error) {
            console.error(status, error);
        }
        });
      } else {
          console.error("Unable to fetch team ID.");
      }
  }

  function updateTeamInfo(teamName) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const teamContainer = document.querySelector('.pm');

    const tName = currentUser.managedTeamName.replace(/\|/g, ',');
    const tpercent = teamName[1];
    console.log(tName)
    console.log(tpercent)

    teamContainer.innerHTML = '';

    const teamNameDiv = document.createElement('div');
    teamNameDiv.classList.add('display-7', 'me-3');
      teamNameDiv.innerHTML = `<i class="bi bi-people-fill me-2 text-success"></i> Team: ${tName}`;

      teamContainer.appendChild(teamNameDiv);

      const teamNameHomePage = document.getElementById("teamName");
      teamNameHomePage.innerHTML = ` Team: ${tName}`;
      teamNameHomePage.style.color = "#0d0c22";
    const registrationSpan = document.createElement('span');
    registrationSpan.classList.add('text-success');
    // registrationSpan.innerHTML = `<i class="bi bi-arrow-up me-1 small"></i>${tpercent.toFixed(2)}%`;
    teamContainer.appendChild(registrationSpan);
}

  // Get the context of the canvas element

//----------------------------------DEPARTMENT-----------------------------------------

    // Function to fetch data for the chart
    function getDepartmentData() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        if (currentUser) {
            var departmentId = currentUser.department.id;
            console.log("Department ID:", departmentId); // For debugging
  
            // Ajax call to fetch data from backend and update the chart
            $.ajax({
                url: `${getContextPath()}/api/user/teamRequest`,
                type: 'GET',
                data: {
                    departmentId: departmentId
                },
                success: function(data) {
                    console.log(data); // For debugging
  
                    // Extracting data from the response
                    const Names = data.map(entry => entry[0]);
                    const formCounts = data.map(entry => entry[1]);
  
                    // Update chart data
                    myDepartmentBarChart.data.labels = Names;
                    myDepartmentBarChart.data.datasets[0].data = formCounts;
                    // myDepartmentBarChart.data.datasets[0].backgroundColor = formCounts.map(() => getRandomColor());
  
                    // Update the chart
                    myDepartmentBarChart.update();
                },
                error: function(xhr, status, error) {
                    console.error(status, error);
                }
            });
  
            $.ajax({
              url: `${getContextPath()}/api/user/departmentRegistrationInfo`,
              type: 'GET',
              data: {
                  departmentId: departmentId
              },
              success: function(data) {
                  console.log("Department Registration Percentage:", data);

                  const departmentName = data[0];

                  updateDepartmentInfo(departmentName);
              },
              error: function(xhr, status, error) {
                  console.error(status, error);
              }
          });
  
            $.ajax({
              url: `${getContextPath()}/api/user/requestTeam`,
              type: 'GET',
              data: {
                  departmentId: departmentId
              },
              success: function(data) {
                  console.log(data); // For debugging
  
                  
                  // Extract the values from the response data
                  const requesterCount = data[0][0]; // Value for usersWithRequest
                  const nonRequesterCount = data[0][1]; // Value for usersWithoutRequest
  
                  // Update the data array of the chart
                  myDepartmentDonutChart.data.datasets[0].data = [requesterCount, nonRequesterCount];
  
                  // Update chart 2
                  myDepartmentDonutChart.update();
              },
              error: function(xhr, status, error) {
                  console.error(status, error);
              }
            });
        } else {
            console.error("Unable to fetch department ID.");
        }
      }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function updateDepartmentInfo(departmentName) {
      // Get the container element
      const departmentContainer = document.querySelector('.dept');
      const departmentNamePieChart = document.querySelector('#department_name_pie_chart');

      console.log(departmentName)
      const dName = departmentName[0];
      const dpercent = departmentName[1];
      console.log(dName)
      console.log(dpercent)

      departmentContainer.innerHTML = '';

      const departmentNameDiv = document.createElement('div');
      departmentNameDiv.classList.add('display-7', 'me-3');
      departmentNameDiv.innerHTML = `<i class="bi bi-building me-2 text-success"></i> Department: ${dName}`;
      departmentNamePieChart.innerHTML = `Department: ${dName}`;
      departmentContainer.appendChild(departmentNameDiv);

      const registrationSpan = document.createElement('span');
      registrationSpan.classList.add('text-success');
      // registrationSpan.innerHTML = `<i class="bi bi-arrow-up me-1 small"></i>${dpercent.toFixed(2)}%`;
      departmentContainer.appendChild(registrationSpan);

  }
  
    // Get the context of the canvas element
    const wfhsDepartmentPercentChartjs = document.getElementById('wfh-department-percent-chartjs')
    const departmentDonut = document.getElementById('department-gender-distribution-chartjs')
    let myDepartmentBarChart, myDepartmentDonutChart
    if (wfhsDepartmentPercentChartjs) {
        const departmentbarctx = wfhsDepartmentPercentChartjs.getContext('2d');
        const departmentdonutCtx = departmentDonut.getContext('2d');
        // Initialize the chart with empty data
        myDepartmentBarChart = new Chart(departmentbarctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Form Request Percent(%) This Month',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        max: 100,
                        beginAtZero: true,
                        reverse: false,
                        ticks: {
                            stepSize: 10,
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }

        });

        myDepartmentDonutChart = new Chart(departmentdonutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Requester','Non-Requester'],
                datasets: [{
                    label: 'Applicant',
                    data: [],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 4
                }]
            },
        });
    }

  

      // Function to fetch data for the chart
      function getDivisionData() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        if (currentUser) {
            var divisionId = currentUser.division.id;
            console.log("Division ID:", divisionId); // For debugging
  
            // Ajax call to fetch data from backend and update the chart
            $.ajax({
                url: `${getContextPath()}/api/user/departmentRequest`,
                type: 'GET',
                data: {
                    divisionId: divisionId
                },
                success: function(data) {
                    console.log(data); // For debugging
  
                    // Extracting data from the response
                    const Names = data.map(entry => entry[0]);
                    const formCounts = data.map(entry => entry[1]);
  
                    // Update chart data
                    myDivisionBarChart.data.labels = Names;
                    myDivisionBarChart.data.datasets[0].data = formCounts;
  
                    // Update the chart
                    myDivisionBarChart.update();
                },
                error: function(xhr, status, error) {
                    console.error(status, error);
                }
            });
  
            $.ajax({
              url: `${getContextPath()}/api/user/divisionRegistrationInfo`,
              type: 'GET',
              data: {
                  divisionId: divisionId
              },
              success: function(data) {
                  console.log("Division Registration Percentage:", data); // For debugging
  
                  // Extracting data from the response
                  const divisionName = data[0];
  
                  // Update HTML content with registration percentage
                  updateDivisionInfo(divisionName);
              },
              error: function(xhr, status, error) {
                  console.error(status, error);
              }
          });
  
            $.ajax({
              url: `${getContextPath()}/api/user/requestDepartment`,
              type: 'GET',
              data: {
                  divisionId: divisionId
              },
              success: function(data) {
                  console.log(data); // For debugging
  
                  
                  // Extract the values from the response data
                  const requesterCount = data[0][0]; // Value for usersWithRequest
                  const nonRequesterCount = data[0][1]; // Value for usersWithoutRequest
  
                  // Update the data array of the chart
                  myDivisionDonutChart.data.datasets[0].data = [requesterCount, nonRequesterCount];
  
                  // Update chart 2
                  myDivisionDonutChart.update();
              },
              error: function(xhr, status, error) {
                  console.error(status, error);
              }
            });
        } else {
            console.error("Unable to fetch division ID.");
        }
      }
  
  function updateDivisionInfo(divisionName) {
      // Get the container element
      const divisionContainer = document.querySelector('.divi');
      console.log(divisionName)
      const dName = divisionName[0];
      const dpercent = divisionName[1];
      console.log(dName)
      console.log(dpercent)
      // Clear previous content
      divisionContainer.innerHTML = '';
  
      // Create a div for division name
      const divisionNameDiv = document.createElement('div');
      divisionNameDiv.classList.add('display-7', 'me-3');
      divisionNameDiv.innerHTML = `<i class="bi bi-bag-check me-2 text-success"></i> Division: ${dName}`;
      divisionContainer.appendChild(divisionNameDiv);
  
      // Create a span for registration percentage
      const registrationSpan = document.createElement('span');
      registrationSpan.classList.add('text-success');
      registrationSpan.innerHTML = `<i class="bi bi-arrow-up me-1 small"></i>${dpercent.toFixed(2)}%`;
      divisionContainer.appendChild(registrationSpan);
  }
  
    // Get the context of the canvas element
    const wfhsDivisionPercentChartJs = document.getElementById('wfh-division-percent-chartjs')
    console.log(wfhsDivisionPercentChartJs)
    const divisionDonut = document.getElementById('division-gender-distribution-chartjs')
    let myDivisionBarChart, myDivisionDonutChart
    if(wfhsDivisionPercentChartJs) {
        console.log("hi")
        const divisionbarctx = wfhsDivisionPercentChartJs.getContext('2d');
        const divisiondonutCtx = divisionDonut.getContext('2d');
        // Initialize the chart with empty data
        myDivisionBarChart = new Chart(divisionbarctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Form Request Percent(%) This Month',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        myDivisionDonutChart = new Chart(divisiondonutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Requester','Non-Requester'],
                datasets: [{
                    label: 'Applicant',
                    data: [],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)'
                    ],
                    hoverOffset: 4
                }]
            },
        });

    }


  //OTHERS
  const wfhsEveryPercentChartJs = document.getElementById('wfh-every-percent-chartjs')
  if(wfhsEveryPercentChartJs) {
      // AJAX request to fetch all user requests
      $.ajax({
          url: `${getContextPath()}/api/user/allRequest`,
          type: 'GET',
          success: function(data) {
              // Extract data from the response
              const usernames = data.map(entry => entry[0]);
              const requestPercent = data.map(entry => entry[1]);

              // Update bar chart data
              myEveryBarChart.data.labels = usernames;
              myEveryBarChart.data.datasets[0].data = requestPercent;

              // Update the chart
              myEveryBarChart.update();
          },
          error: function(xhr, status, error) {
              console.error(status, error);
          }
      });
      // AJAX request to fetch total staff requests
      $.ajax({
          url: `${getContextPath()}/api/user/requestAll`,
          type: 'GET',
          success: function(data) {
              // Extract data from the response
              const usersWithRequest = data[0][0];
              const usersWithoutRequest = data[0][1];

              // Update doughnut chart data
              myEveryDonutChart.data.datasets[0].data = [usersWithRequest, usersWithoutRequest];

              // Update the chart
              myEveryDonutChart.update();
          },
          error: function(xhr, status, error) {
              console.error(status, error);
          }
      });

      const everybarctx = wfhsEveryPercentChartJs.getContext('2d');
      const everydonutCtx = document.getElementById('every-gender-distribution-chartjs').getContext('2d');
      // Initialize the chart with empty data
      const myEveryBarChart = new Chart(everybarctx, {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: 'Form Request Percent(%) This Month',
                  data: [],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)',
                      'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });

      const myEveryDonutChart = new Chart(everydonutCtx, {
          type: 'doughnut',
          data: {
              labels: ['Requester','Non-Requester'],
              datasets: [{
                  label: 'Applicant',
                  data: [],
                  backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)'
                  ],
                  hoverOffset: 4
              }]
          },
      });
  }


  // Call getSessionUser() to fetch user data and update the chart
    getSessionUser().then((user) => {
        if (user) {
            if(wfhsTeamPercentChartJs) {
                getTeamData();
            }
                if(wfhsDepartmentPercentChartjs) {
                    getDepartmentData();
                }
                if (wfhsDivisionPercentChartJs) {
                    getDivisionData();
                }
        } else {
            console.error('No user data found.');
        }
    }).catch((error) => {
        console.error('Error fetching session user:', error);
    });


});
