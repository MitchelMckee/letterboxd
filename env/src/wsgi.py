from letterboxd_scraper import ScrapeLetterboxdFavourites, app

app.add_url_rule('/ScrapeLetterboxdFavourites',
                 view_func=ScrapeLetterboxdFavourites)

# Path: env/src/wsgi.py
if __name__ == '__main__':
    app.run()

# Command to start the server:
# gunicorn wsgi:app --bind=0.0.0.0:8080 --certfile=../cert.pem --keyfile=../key.pem
