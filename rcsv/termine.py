import requests
from bs4 import BeautifulSoup


url = f"https://www.ljv-thueringen.de/aktuelles/termine/"
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')
data = soup.find(id="c2094")
daten = data.text.split()
print(daten)
