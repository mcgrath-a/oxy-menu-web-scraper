from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import datetime

app = Flask(__name__)

def scrape_menu_for_today():
    # Determine the current day
    current_day = datetime.datetime.now().strftime("%A")
    
    # URL of the menu page
    url = "https://www.oxy.edu/student-life/campus-dining/where-eat/marketplace"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Assuming each day's menu is clearly identified, e.g., by a heading containing the day's name
        # This is a simplified example; you might need to adjust the logic based on the actual page structure
        day_section = soup.find(lambda tag: tag.name == "h2" and current_day in tag.text)
        if day_section:
            menu_items = []
            for sibling in day_section.find_next_siblings():
                # Assuming menu items for a day are contained within <p> tags following the day's heading
                # Adjust this logic as needed based on the actual HTML structure
                if sibling.name == "h2":  # Stop if we reach the heading of the next day
                    break
                if sibling.name == "p":
                    menu_items.append(sibling.text.strip())
            
            # Structure the scraped data
            menu_data = {
                "day": current_day,
                "items": menu_items
            }
            return menu_data
        else:
            return {"error": f"No menu information found for {current_day}."}
    else:
        return {"error": "Failed to retrieve the webpage."}

@app.route('/menu')
def get_menu():
    menu_data = scrape_menu_for_today()
    return jsonify(menu_data)

if __name__ == '__main__':
    app.run(debug=True)
