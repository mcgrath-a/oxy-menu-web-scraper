from flask import Flask, jsonify
from flask_cors import CORS  # Ensure CORS is handled for cross-origin AJAX requests
import requests
from bs4 import BeautifulSoup, NavigableString
import datetime

app = Flask(__name__)
CORS(app)  # Apply CORS to the Flask app

def scrape_menu_for_today():
    current_day = datetime.datetime.now().strftime("%A")
    url = "https://www.oxy.edu/student-life/campus-dining/where-eat/marketplace"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        current_day_anchor = soup.find('a', {'name': current_day})

        if current_day_anchor:
            found_current_day = False
            menu_items = []  # Store menu items here
            for sibling in current_day_anchor.find_all_next():
                if found_current_day and sibling.name == 'u' and sibling.find('strong'):
                    break

                if sibling.name == 'p':
                    found_current_day = True
                    item_text = ' '.join(sibling.stripped_strings)  # Combine text from strings and children
                    menu_items.append(item_text)

            if menu_items:  # Check if we've found any items
                return {"day": current_day, "items": menu_items}
            else:
                return {"error": f"No menu information found for {current_day}."}
        else:
            return {"error": f"No anchor tag found for {current_day}."}
    else:
        return {"error": "Failed to retrieve the webpage."}

@app.route('/menu')
def get_menu():
    menu_data = scrape_menu_for_today()
    return jsonify(menu_data)

if __name__ == '__main__':
    app.run(debug=True)
