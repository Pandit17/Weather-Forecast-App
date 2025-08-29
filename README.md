# Weather Forecast App 🌤️

A **beautiful, responsive weather forecasting app** built with **vanilla JavaScript, HTML, and Tailwind CSS**.  
Get **current weather** and a **5-day forecast** for any city, with **dynamic and shiny backgrounds** based on weather conditions.

---

## Features ✨

1. **Search by city:** Enter a city name to fetch current weather and forecast.
2. **Geolocation:** Automatically get weather for your current location.
3. **Recent cities:** Dropdown of last 5 searched cities saved in **localStorage**.
4. **Unit toggle:** Switch between **°C and °F** for temperature.
5. **Dynamic backgrounds:** Page background changes dynamically based on weather (clouds, rain, clear, snow).
6. **Shiny gradient effects:** Today’s weather card and forecast cards have animated gradients for visual appeal.
7. **Responsive design:** Works on all devices, using **Tailwind CSS**.
8. **Error handling:** Alerts for invalid city, location access denied, or extreme temperatures.

---

## Folder Structure 🗂️

```

T.W.CSS/
└─ src/
└─ Weather_Project/
├─ index.html
├─ script.js
└─ output.css  (Tailwind CSS generated)
Tail Wind CSS/
└─ tailwind.config.js

````

---

## Setup Instructions

1. Clone or download the repository.
2. Ensure **Node.js** is installed.
3. Install Tailwind CSS:

   ```bash
   npm install -D tailwindcss
````

4. Generate `output.css`:

   ```bash
   npx tailwindcss -c ../../tailwind.config.js -i ../input.css -o ./output.css --watch
   ```

5. Open `index.html` in a browser to run the application.

6. Enter a city or use your current location to see weather updates.

---

## Usage

1. **Search for a city:** Type the city name and click **Search**.
2. **Use current location:** Click **Use Location** to fetch weather for your current location.
3. **Toggle temperature units:** Click **Toggle °C/°F** to switch between Celsius and Fahrenheit.
4. **Recent cities:** Select from the dropdown to quickly view weather of previously searched cities.
5. **Dynamic backgrounds:** Background color changes based on weather conditions.

---

## How to Use 💻

1. Open `index.html` in a browser.
2. Enter a city name and click **Search**, or click **Use Location**.
3. View **today’s weather** in the highlighted card.
4. Check the **5-day forecast** below.
5. Use the **unit toggle** to switch between Celsius and Fahrenheit.

---

## Technologies Used 🛠️

* **HTML5**
* **Vanilla JavaScript (ES6+)**
* **Tailwind CSS**
* **OpenWeatherMap API**

---

## Commit Guidelines ✅

1. Initial HTML structure for Weather App
2. Added Tailwind CSS integration
3. Created input and button UI
4. Implemented search functionality in JS
5. Added geolocation feature
6. Fetch and display current weather data
7. Added 5-day forecast display
8. Implemented temperature unit toggle
9. Dynamic backgrounds based on weather
10. Added localStorage for recent cities
11. Styled today’s card with shiny gradient
12. Created README.md with instructions and features

---

## Notes ⚡

* This app uses **only vanilla JS** — no frameworks or libraries.
* Make sure you have a valid **OpenWeatherMap API key** in `script.js`.
* Tailwind CSS should be compiled into `output.css` before opening the app.

````

