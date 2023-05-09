from flask import Flask, jsonify, request
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import csv
import time

app = Flask(__name__)


def ScrapeLetterboxdUsernames(num_pages):
    for i in range(num_pages):
        driver = webdriver.Chrome()
        driver.get(
            'https://letterboxd.com/members/popular/this/all-time/page' + str(i))

        driver.implicitly_wait(1)
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')
        usernames_list = soup.find_all('td', class_='table-person')

        for usernames in usernames_list:
            for username in usernames.find_all('a', class_='name'):
                print(username.get('href'))
                with open('usernames.txt', 'a') as csvfile:
                    writer = csv.writer(csvfile)
                    writer.writerow([username.get('href')])

        driver.quit()


@app.route('/ScrapeLetterboxdFavourites', methods=['GET'])
def ScrapeLetterboxdFavourites():
    print("Scraping favourites for... " + str(request.args.get('username')))
    favouriteFilms = []

    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)

    driver.get('https://letterboxd.com/'+str(request.args.get('username'))+'/')

    time.sleep(0.08)
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
                # with open("favourites.txt", "a") as csvfile:
                #     writer = csv.writer(csvfile)
                #     writer.writerow([title.text])
                favouriteFilms.append(title.text)
                count += 1
        if count == 4:
            break

    driver.quit()
    return jsonify({'favourite_films': favouriteFilms})


if __name__ == '__main__':
    app.run()
    # with open('usernames.txt', newline='') as csvfile:
    #     reader = csv.reader(csvfile)
    #     for row in reader:
    # ScrapeLetterboxdUsernames(2)
