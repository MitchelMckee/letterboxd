from letterboxd_scraper import ScrapeLetterboxdFavourites, app

app.add_url_rule('/ScrapeLetterboxdFavourites',
                 view_func=ScrapeLetterboxdFavourites)

# Path: env/src/wsgi.py
if __name__ == '__main__':
    app.run()
