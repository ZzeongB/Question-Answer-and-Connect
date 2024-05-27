import pandas as pd
import argparse

# Create the parser
parser = argparse.ArgumentParser(description='Process a CSV file and save it as a JSON file.')

# Add the arguments
parser.add_argument('csv_file_path', type=str, help='The path to the CSV file', nargs="?", default='src/data/MathDNN.csv')
parser.add_argument('json_file_path', type=str, help='The path to save the JSON file', nargs="?",default='src/data/MathDNN.json')

# Parse the arguments
args = parser.parse_args()

# Read the CSV data
df = pd.read_csv(args.csv_file_path, encoding='utf-8')


# Add a new column 'key' with row number
# df['key'] = df.reset_index().index

# Save the DataFrame to a JSON file
df.to_json(args.json_file_path, orient='index', force_ascii=False)