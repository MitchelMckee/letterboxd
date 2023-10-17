import json
from bs4 import BeautifulSoup
from headless_chrome import create_driver
from flask import jsonify
import time

def ScrapeLetterboxdFavourites(event, context):
    
    queryStringParameters = event.get('queryStringParameters', {})
    username = queryStringParameters and queryStringParameters.get('username')

    if username is None:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'username is required'})
        } 
    
    print("Scraping favourites for... " + str(username))
    favouriteFilms = []

    driver = create_driver()
    driver.get('https://letterboxd.com/' + str(username) + '/')
    time.sleep(0.4)

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

    try:
       return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': 'https://mjkm.co.uk',
                'Access-Control-Allow-Credentials': True,
            },
    'body': json.dumps({'favourite_films': favouriteFilms})
}

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Failure: {e}'
        }




