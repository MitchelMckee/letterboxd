import csv
from collections import Counter


def find_mode(file_path, output_path='/Users/mitchelmckee/My Drive/React Projects/letterboxd/data/mode.csv'):
    with open(file_path, 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        # flatten the 2D list into a 1D list
        data = [item for sublist in csvreader for item in sublist]

        # count the occurrences of each string
        count = Counter(data)

        # find the most common string(s)
        mode = count.most_common()

        # write each mode and its count to a new row in the output file

        with open(output_path, 'w', newline='') as outfile:
            csvwriter = csv.writer(outfile)
            csvwriter.writerow(['String', 'Count'])  # header row
            for m in mode:
                csvwriter.writerow([m[0], m[1]])
        return mode


mode = find_mode(
    '/Users/mitchelmckee/My Drive/React Projects/letterboxd/data/favourites.txt')
print(mode)
