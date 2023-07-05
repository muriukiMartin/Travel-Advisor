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
    
    }
  