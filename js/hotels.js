document.addEventListener('DOMContentLoaded', function () {
  getHotelRecommendations();
})
function getHotelRecommendations() {
  const destinationInput = document.getElementById("destination");
  const destinationList = document.getElementById("destinationList");

  const destination = destinationInput.value;
  const limit = 5;
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
          fetchReviews(hotel.result_object.location_id, requestOptions)
            .then(reviewsData => {
              const reviews = reviewsData.data ? reviewsData.data.slice(0, 3) : [];
              const hotelItem = createHotelItem(hotel.result_object.name, hotel.result_object.rating, hotel.result_object.photo, reviews);
              destinationList.appendChild(hotelItem);
            })
            .catch(error => {
              console.error("Error fetching reviews:", error);
              const hotelItem = createHotelItem(hotel.result_object.name, hotel.result_object.rating, hotel.result_object.photo, []);
              destinationList.appendChild(hotelItem);
            });
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
//fetch destination reviews
async function fetchReviews(locationId, requestOptions) {
  const reviewsEndpoint = `https://travel-advisor.p.rapidapi.com/reviews/list?location_id=${locationId}`;
  try {
    const response = await fetch(reviewsEndpoint, requestOptions);
    return await response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { data: [] };
  }
}


function createHotelItem(name, rating, photo, reviews) {
  const item = document.createElement("div");
  item.className = "hotel-item";

  const nameElement = document.createElement("h3");
  nameElement.textContent = name;
  item.appendChild(nameElement);

  const ratingElement = document.createElement("p");
  ratingElement.textContent = `Rating: ${rating}`;
  item.appendChild(ratingElement);

  if (photo) {
    const imageElement = document.createElement("img");
    imageElement.src = photo.images.original.url;
    imageElement.alt = name;
    item.appendChild(imageElement);
  }

  if (reviews.length > 0) {
    const reviewsElement = document.createElement("div");
    reviewsElement.className = "reviews";

    reviews.forEach(review => {
      const reviewItem = document.createElement("p");
      reviewItem.textContent = review.text;
      reviewsElement.appendChild(reviewItem);
    });

    item.appendChild(reviewsElement);
  }

  const bookmarkButton = document.createElement("button");
  bookmarkButton.textContent = "Bookmark";
  bookmarkButton.addEventListener("click", () => {
    bookmarkHotel({ name, rating, photo, reviews });
  });
  item.appendChild(bookmarkButton);

  return item;
}

function createNoDataItem(message) {
  const noItem = document.createElement("div");
  noItem.className = "no-data-item";

  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  noItem.appendChild(messageElement);

  return noItem;
}

function bookmarkHotel(hotel) {
  // Get the existing bookmarks from local storage or initialize an empty array
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  // Check if the hotel is already bookmarked
  const isBookmarked = bookmarks.some(item => item.locationId === hotel.locationId);

  if (isBookmarked) {
    // Hotel is already bookmarked, remove it from bookmarks
    const updatedBookmarks = bookmarks.filter(item => {
      return item.locationId !== hotel.locationId;
    });
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    alert("Hotel removed from bookmarks!");
  } else {
    // Hotel is not bookmarked, add it to bookmarks
    bookmarks.push(hotel);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    alert("Hotel bookmarked!");
  }
}