document.addEventListener('DOMContentLoaded', function () {
    getRecommendations();
})

function getRecommendations() {
    const destinationInput = document.getElementById("destination");
    const budgetInput = document.getElementById("budget");
    const durationInput = document.getElementById("duration");
    const destinationList = document.getElementById("destinationList");

    const destination = destinationInput.value;
    const budget = budgetInput.value;
    const duration = durationInput.value;
    const limit = 10;

    const requestOptions = {
        method: "GET",
        headers: {
            "x-rapidapi-key": '',
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
    };

    // Make an API request using fetch
    fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${destination}&limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Clear previous recommendations
            destinationList.innerHTML = "";

            // Display locations
            data.data.forEach(location => {
                const listItem = document.createElement("li");
                // const listImage = document.createElement('img');
                listItem.textContent = location.result_object.name;
                listItem.style.padding = "10px";
                listItem.style.border = "1px solid #ccc";
                listItem.style.borderRadius = "5px";
                listItem.style.marginBottom = "10px";
                
                const photoRef = location.result_object.photo ? location.result_object.photo.images.original.url : null;
                if (photoRef) {
                    // Create image element and set source attribute
                    const image = document.createElement("img");
                    image.src = photoRef;
                    image.style.maxWidth = "50%";
                    image.style.height = "auto";
                    listItem.appendChild(image);
                }
                destinationList.appendChild(listItem);

            });
        })
        .catch(error => {
            console.error("Error fetching locations:", error);
        });
}
