document.addEventListener("DOMContentLoaded", function () {
  fetch("/menu")
    .then((response) => response.json())
    .then((data) => {
      const menuDiv = document.getElementById("menu");
      menuDiv.innerHTML = `<h2>${data.date}</h2>`;

      Object.keys(data.meals).forEach((meal) => {
        const mealData = data.meals[meal];
        let itemsHtml = mealData.items
          .map((item) => `<li>${item}</li>`)
          .join("");
        menuDiv.innerHTML += `<h3>${meal} (${mealData.time})</h3><ul>${itemsHtml}</ul>`;
      });
    })
    .catch((error) => console.error("Error fetching menu:", error));
});
