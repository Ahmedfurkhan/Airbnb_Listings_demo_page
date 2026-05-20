# Airbnb SF Listings Demo

A modern, interactive web application to browse and manage Airbnb listings in San Francisco. Built with vanilla JavaScript, Bootstrap 5, and dynamic data filtering.

## 🌟 Features

- **Browse Listings**: View 500+ Airbnb listings with detailed information
- **Search & Filter**: Real-time search by location, room styles, or host names
- **Favorites**: Save your favorite listings (persisted in browser)
- **Booking Tracker**: Mark listings as booked and track your bookings
- **Responsive Design**: Mobile-friendly interface with Bootstrap 5
- **Dynamic Rendering**: Fast card-based layout with amenities and host information
- **Dropdown Navigation**: Quick access to Favorites and Booked listings

## 🎯 Live Demo

**[View Live Demo](https://john-guerra.github.io/Airbnb_Listings_demo_page/)**

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5
- **Data**: JSON (500 San Francisco listings)
- **Storage**: Browser LocalStorage for favorites and bookings

## 📋 Project Structure

```
Airbnb_Listings_demo_page/
├── index.html                          # Main HTML file
├── css/
│   └── main.css                        # Custom styles
├── js/
│   └── main.js                         # Main JavaScript module
├── airbnb_sf_listings_500.json        # Listing data
├── package.json                        # Project metadata
└── README.md                           # This file
```

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/john-guerra/Airbnb_Listings_demo_page.git
cd Airbnb_Listings_demo_page
```

2. Open in your browser:
```bash
# Simple method - just open the file
open index.html

# Or use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

## 💻 Usage

### Browse Listings
- Scroll through the card-based listing display
- View property details, pricing, and host information
- See amenities for each listing

### Search Listings
- Use the search bar with emoji: "🔍 Search locations, room styles, or hosts..."
- Results filter in real-time as you type
- Clear the search to view all listings

### Save Favorites
- Click the ❤️ heart button on any card to add/remove from favorites
- Heart turns red when favorited
- Access favorites via the dropdown menu: **Favorites**

### Track Bookings
- Click the **Book** button to mark a listing as booked
- A 📅 badge appears on booked listings
- Access booked listings via the dropdown menu: **Booked**

### Data Persistence
- All favorites and bookings are saved in your browser's LocalStorage
- Data persists across page refreshes
- Clear browser cache to reset

## 📊 Data

The application uses `airbnb_sf_listings_500.json` containing:
- Listing name and description
- Price per night
- Host information (name, picture)
- Amenities (beds, bathrooms, etc.)
- Rating information
- Picture URLs

## 🎨 Customization

### Add More Listings
Edit the `loadData()` function in `main.js`:
```javascript
me.listingsData = listings.slice(0, 500); // Change 500 to desired number
```

### Modify Styles
Edit `css/main.css` to customize colors, fonts, and layout.

### Add New Features
Extend the `MainModule` in `main.js` with additional functionality.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔧 Troubleshooting

**Listings not loading?**
- Ensure `airbnb_sf_listings_500.json` is in the root directory
- Check browser console for errors (F12)
- Verify you're using a local server, not opening the file directly

**Favorites/Bookings not saving?**
- Check if LocalStorage is enabled in your browser
- Clear browser cache and try again
- Check browser console for errors

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by [John Guerra](https://github.com/john-guerra)

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⭐ Support

If you found this helpful, please consider giving it a star! ⭐
