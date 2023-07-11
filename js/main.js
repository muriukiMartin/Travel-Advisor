document.addEventListener('DOMContentLoaded', function () {
    getRecommendations();
})

function getRecommendations() {
    const destinationInput = document.getElementById("destination");
    const destinationList = document.getElementById("destinationList");

    const destination = destinationInput.value;
    const limit = 10;
    const requestOptions = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "",
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      };
    
      const hotelsEndpoint = `https://travel-advisor.p.rapidapi.com/locations/search?query=${destination}&limit=${limit}`;

  fetch(hotelsEndpoint, requestOptions)
    .then(response => response.json())
    .then(data => {
      const hotels = data.data.filter(item => item.result_type === "lodging");
      destinationList.innerHTML = ""; // Clear previous recommendations

      if (hotels.length > 0) {
        hotels.forEach(hotel => {
          const hotelItem = createHotelItem(hotel.result_object.name, hotel.result_object.rating, hotel.result_object.photo);
          destinationList.appendChild(hotelItem);
        });
      } else {
        const noHotelsItem = createNoDataItem("No hotels available");
        destinationList.appendChild(noHotelsItem);
      }
    })
    .catch(error => {
      console.error("Error fetching hotel data:", error);
    });
}
    
    function createHotelItem(name, rating, photo) {
      const item = document.createElement("div");
      item.className = "hotel-item";
    
      const nameElement = document.createElement("h3");
      nameElement.textContent = name;
    
      const ratingElement = document.createElement("p");
      ratingElement.textContent = `Rating: ${rating}`;
    
      item.appendChild(nameElement);
      item.appendChild(ratingElement);

      if (photo) {
        const imageElement = document.createElement("img");
        imageElement.src = photo.images.original.url;
        imageElement.alt = name;
        item.appendChild(imageElement);
      }
    
      return item;
    }
    
    function createNoDataItem(message) {
      const item = document.createElement("div");
      item.className = "no-data-item";
    
      const messageElement = document.createElement("p");
      messageElement.textContent = message;
    
      item.appendChild(messageElement);
    
      return item;
    }
