document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/menu")
    .then(response => response.json())
    .then(data => {
      const menuDiv = document.getElementById("menu");
      if (data.day && Array.isArray(data.items)) {
        menuDiv.innerHTML = `<h2>Menu for ${data.day}</h2>`;
        data.items.forEach((item) => {
          if (!item.match(/\b\d{4}\b/)) { // Exclude lines with a year (e.g., "2024")
            // Format meal names and times, ensuring they're on separate lines
            item = item.replace(/(Breakfast|Lunch|Dinner)(\s+\d{1,2}:\d{2}[ap]m\s+-\s+\d{1,2}:\d{2}[ap]m)/, '<div class="meal-name"><strong>$1</strong></div><div class="meal-time">$2</div>');

            // Add breaks before keywords for readability, maintaining semantic structure
            item = item.replace(/(Grill Station|Salad Bar|Soup|Sauté Station|Chef's Corner|Sandwich Station)/g, '<div class="menu-section">$1');

            // Closing div for menu-section
            item = item + '</div>';

            menuDiv.innerHTML += `<div class="meal-item">${item}</div>`;
          }
        });
      } else {
        menuDiv.innerHTML = "Error loading menu or no menu available for today.";
        console.error("Unexpected data structure:", data);
      }
    })
    .catch(error => {
      console.error("Error fetching menu:", error);
      document.getElementById("menu").innerHTML = "Error fetching menu.";
    });
});





/* document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/menu")
    .then(response => response.json())
    .then(data => {
      const menuDiv = document.getElementById("menu");
      if (data.day && Array.isArray(data.items)) {
        menuDiv.innerHTML = `<h2>Menu for ${data.day}</h2>`;
        data.items.forEach((item) => {
          if (!item.match(/\b\d{4}\b/)) { // Exclude lines with a year (e.g., "2024")
            // Apply formatting to separate meal names and times onto new lines
            item = item.replace(/(Breakfast|Lunch|Dinner)(\s+\d{1,2}:\d{2}[ap]m\s+-\s+\d{1,2}:\d{2}[ap]m)/, '<strong>$1</strong>$2<br>');

            // Ensure "Dinner" and its following items are on separate lines
            item = item.replace(/(<strong>Dinner<\/strong>\s+\d{1,2}:\d{2}[ap]m\s+-\s+\d{1,2}:\d{2}[ap]m)<br>/, '$1<br><br>');

            // For readability, insert breaks before certain keywords
            item = item.replace(/(Grill Station|Salad Bar|Soup|Sauté Station|Chef's Corner|Sandwich Station|Specialty Salad - )/g, '<br>$1');
            // Example of adding a space after certain keywords
          item = item.replace(/(Salad Bar|Grill Station|Soup -)/g, '$1 ');

            menuDiv.innerHTML += `<div class="meal-item">${item}</div>`;
          }
        });
      } else {
        menuDiv.innerHTML = "Error loading menu or no menu available for today.";
        console.error("Unexpected data structure:", data);
      }
    })
    .catch(error => {
      console.error("Error fetching menu:", error);
      document.getElementById("menu").innerHTML = "Error fetching menu.";
    });
});
 */