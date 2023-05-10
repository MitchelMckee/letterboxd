import csv
from collections import Counter


def find_mode(file_path, output_path='/Users/mitchelmckee/My Drive/React Projects/letterboxd/data/mode.csv'):
    with open(file_path, 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        data = [item for sublist in csvreader for item in sublist]
        count = Counter(data)
        mode = count.most_common()

        with open(output_path, 'w', newline='') as outfile:
            csvwriter = csv.writer(outfile)
            csvwriter.writerow(['String', 'Count'])  # header row
            for m in mode:
                csvwriter.writerow([m[0], m[1]])
        return mode


mode = find_mode(
    '/Users/mitchelmckee/My Drive/React Projects/letterboxd/data/favourites.txt')
print(mode)
