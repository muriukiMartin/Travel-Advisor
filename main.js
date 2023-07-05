function getRecommendations() {
    const destinationInput = document.getElementById("destination");
    const budgetInput = document.getElementById("budget");
    const durationInput = document.getElementById("duration");
    const destinationList = document.getElementById("destinationList");
  
    const destination = destinationInput.value;
    const budget = budgetInput.value;
    const duration = durationInput.value;

    const requestOptions = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "e07daa2d2cmshfffbbba03323ee5p1e90aejsn0691df87cec2",
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      };
    
      // Make an API request using fetch
      fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${destination}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          // Clear previous recommendations
          destinationList.innerHTML = "";
    
          // Display locations
          data.data.forEach(location => {
            const listItem = document.createElement("li");
            listItem.textContent = location.result_object.name;
            destinationList.appendChild(listItem);
          });
        })
        .catch(error => {
          console.error("Error fetching locations:", error);
        });
    }
  