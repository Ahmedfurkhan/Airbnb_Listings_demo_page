function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
  // 1. Handle Amenities array safely (showing first 4 tags)
  const amenitiesHTML = listing.amenities && Array.isArray(listing.amenities)
    ? listing.amenities.slice(0, 4).map(amt => `<span class="badge bg-light text-dark me-1 mb-1 border">${amt}</span>`).join("")
    : "";

  // 2. Extract rating safely from the text if it exists (e.g., "★4.87")
  const ratingText = listing.name && listing.name.includes('·') 
    ? listing.name.split('·')[1] 
    : '★ New';

  // 3. Return the clean Bootstrap card layout
  return `
    <div class="col-md-4 col-sm-6 mb-4 listing-item" data-name="${listing.name.toLowerCase()}" data-listing-id="${listing.id || listing.name}">
      <div class="listing card h-100 shadow-sm border-0" style="position: relative;">
        <button class="favorite-btn btn btn-sm" style="position: absolute; top: 10px; right: 10px; background: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; z-index: 10;" onclick="event.stopPropagation(); main.toggleFavorite('${listing.id || listing.name}')">
          ❤️
        </button>
        <span class="booked-badge" style="position: absolute; top: 10px; left: 10px; background: #28a745; color: white; padding: 5px 10px; border-radius: 5px; font-size: 0.8rem; display: none; z-index: 10;">📅 Booked</span>
        <img
          src="${listing.picture_url || listing.thumbnail_url || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500'}"
          class="card-img-top"
          alt="AirBNB Listing"
          style="height: 220px; object-fit: cover; border-top-left-radius: 0.375rem; border-top-right-radius: 0.375rem;"
        />
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title text-truncate mb-0" style="max-width: 80%;" title="${listing.name}">${listing.name.split('·')[0]}</h5>
            <span class="badge bg-warning text-dark">${ratingText}</span>
          </div>

          <h6 class="text-danger fw-bold mb-2">$${listing.price || 'N/A'} <span class="text-muted fw-normal" style="font-size: 0.8rem;">/ night</span></h6>
          
          <p class="card-text text-muted flex-grow-1" style="font-size: 0.9rem; line-height: 1.4;">
            ${listing.description ? listing.description.slice(0, 95) + '...' : 'No additional description provided.'}
          </p>
          
          <div class="mb-3">
            ${amenitiesHTML}
          </div>
          
          <hr class="text-muted opacity-25">

          <div class="d-flex justify-content-between align-items-center mt-auto">
            <div class="host-info d-flex align-items-center">
              <img 
                src="${listing.host_picture_url || 'https://api.dicebear.com/7.x/beta-avatars/svg?seed=' + (listing.host_name || 'Host')}" 
                alt="${listing.host_name}" 
                class="rounded-circle me-2 border" 
                style="width: 32px; height: 32px; object-fit: cover;"
              />
              <span class="text-secondary" style="font-size: 0.85rem;">Hosted by <strong class="text-dark">${listing.host_name || 'Host'}</strong></span>
            </div>
            
            <button class="btn btn-outline-primary btn-sm rounded-pill px-3" onclick="main.toggleBooked('${listing.id || listing.name}')">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

  function redraw(listings) {
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");

    // Update favorite buttons and booked badges
    const favorites = getFavoritesFromStorage();
    const booked = getBookedFromStorage();

    listings.forEach(listing => {
      const id = listing.id || listing.name;
      if (favorites.includes(id)) {
        updateHeartButton(id);
      }
      if (booked.includes(id)) {
        updateBookedButton(id);
      }
    });
  }

async function loadData() {
    // Dynamically query your JSON source
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();

    // Redraw with the first 500 entries
    me.listingsData = listings.slice(0, 500);
    me.redraw(me.listingsData);
    
    // Wire up our real-time search interface
    setupSearchFilter();
    setupDropdownHandlers();
  }

  function setupSearchFilter() {
    const searchBar = document.getElementById("searchBar");
    if (!searchBar) return;

    searchBar.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const items = document.querySelectorAll(".listing-item");

      items.forEach(item => {
        const textContent = item.getAttribute("data-name");
        if (textContent.includes(query)) {
          item.style.display = "block"; // Show match
        } else {
          item.style.display = "none";  // Hide non-match
        }
      });
    });
  }

  function setupDropdownHandlers() {
    const favoritesBtn = document.getElementById("favoritesBtn");
    const bookedBtn = document.getElementById("bookedBtn");

    if (favoritesBtn) {
      favoritesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showFavorites();
      });
    }

    if (bookedBtn) {
      bookedBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showBooked();
      });
    }
  }

  function getFavoritesFromStorage() {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  }

  function getBookedFromStorage() {
    return JSON.parse(localStorage.getItem("booked") || "[]");
  }

  function saveFavoritesToStorage(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function saveBookedToStorage(booked) {
    localStorage.setItem("booked", JSON.stringify(booked));
  }

  function toggleFavorite(listingId) {
    const favorites = getFavoritesFromStorage();
    const index = favorites.indexOf(listingId);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(listingId);
    }

    saveFavoritesToStorage(favorites);
    updateHeartButton(listingId);
  }

  function toggleBooked(listingId) {
    const booked = getBookedFromStorage();
    const index = booked.indexOf(listingId);

    if (index > -1) {
      booked.splice(index, 1);
    } else {
      booked.push(listingId);
    }

    saveBookedToStorage(booked);
    updateBookedButton(listingId);
  }

  function updateHeartButton(listingId) {
    const favorites = getFavoritesFromStorage();
    const heartBtn = document.querySelector(`[data-listing-id="${listingId}"] .favorite-btn`);
    if (heartBtn) {
      if (favorites.includes(listingId)) {
        heartBtn.classList.add("active");
      } else {
        heartBtn.classList.remove("active");
      }
    }
  }

  function updateBookedButton(listingId) {
    const booked = getBookedFromStorage();
    const bookedBtn = document.querySelector(`[data-listing-id="${listingId}"] .booked-badge`);
    if (bookedBtn) {
      if (booked.includes(listingId)) {
        bookedBtn.style.display = "inline-block";
      } else {
        bookedBtn.style.display = "none";
      }
    }
  }

  function showFavorites() {
    const favorites = getFavoritesFromStorage();
    if (favorites.length === 0) {
      alert("No favorites yet!");
      return;
    }
    const favoriteListings = me.listingsData.filter(listing => 
      favorites.includes(listing.id || listing.name)
    );
    me.redraw(favoriteListings);
  }

  function showBooked() {
    const booked = getBookedFromStorage();
    if (booked.length === 0) {
      alert("No booked listings yet!");
      return;
    }
    const bookedListings = me.listingsData.filter(listing => 
      booked.includes(listing.id || listing.name)
    );
    me.redraw(bookedListings);
  }

  me.redraw = redraw;
  me.loadData = loadData;
  me.toggleFavorite = toggleFavorite;
  me.toggleBooked = toggleBooked;
  me.showFavorites = showFavorites;
  me.showBooked = showBooked;

  return me;
}

const main = MainModule();
main.loadData();