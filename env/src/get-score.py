import csv
import math

movies = {}
with open("data/mode.csv") as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    for row in reader:
        movies[row[0]] = int(row[1])

sorted_movies = sorted(movies.items(), key=lambda x: x[1], reverse=True)

scored_movies = {}
for i, (movie, count) in enumerate(sorted_movies):
    percentile = i / len(sorted_movies)
    score = math.floor(100 - (percentile * 100))
    if (score == 0):
        score = 1
    scored_movies[movie] = score

for movie, score in list(scored_movies.items()):
    print(f'{movie}: {score}')

with open('data/scored-movies.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['movie', 'score'])
    for movie, score in scored_movies.items():
        writer.writerow([movie, score])
