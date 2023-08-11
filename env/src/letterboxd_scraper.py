from flask import Flask, jsonify, request
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from flask_cors import CORS
import csv
import time

app = Flask(__name__)
CORS(app)

@app.route('/ScrapeLetterboxdFavourites', methods=['GET'])
def ScrapeLetterboxdFavourites():
    print("Scraping favourites for... " + str(request.args.get('username')))
    favouriteFilms = []

    options = Options()
    service = Service()
    options.add_argument('--headless')
    driver = webdriver.Chrome(service=service, options=options)

    driver.get('https://letterboxd.com/'+str(request.args.get('username'))+'/')

    time.sleep(0.4)
    # Seems to be the smallest amount of time that works
    # can go as low as 0.05 but sometimes doesn't get all titles

    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    favorite_films_section = soup.find_all('li', class_='poster-container')

    count = 0
    for film in favorite_films_section:
        for title in film.find_all('span', class_='frame-title'):
            if count < 4:
                print(title.text)
                favouriteFilms.append(title.text)
                count += 1
        if count == 4:
            break

    driver.quit()
    return jsonify({'favourite_films': favouriteFilms})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

