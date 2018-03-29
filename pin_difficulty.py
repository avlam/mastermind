# coding: utf-8
import pandas as pd
import requests
import matplotlib.pyplot as plt
import numpy as np

# Create a reference the CSV four-digit-pin-codes-and-frequency.csv
pins_csv_path = "raw_data/four-digit-pin-codes-and-frequency.csv"
pins_df = pd.read_csv(pins_csv_path)

# pins_df=pd.read_csv("four-digit-pin-codes-and-frequency.csv")
# pins_df.head(20)

# Split column Pins in two columns: pins and frequency.
new_pins_df = pd.DataFrame(pins_df.Pins.str.split(';',1).tolist(), columns = ["pins","frequency"])
# new_pins_df.dtypes

# Change object dtypes to numeric
new_pins_df = new_pins_df.apply(pd.to_numeric, errors='coerce')
# new_pins_df.dtypes

# Total of unique frequency numbers = 150
# frequency_list_df =new_pins_df.drop_duplicates(subset=["frequency"],keep="first")
# count_frequency = frequency_list_df.frequency.count()
# print(count_frequency)
list=new_pins_df.frequency.unique()
num_elements_list=len(list)
# print(list, num_elements_list)
#Create bins
bins=[-1, 97, 148, 255]
bin_labels=["difficult","moderate","easy"]
new_pins_df["level"]=pd.cut(new_pins_df["frequency"], bins, labels= bin_labels)
new_pins_df.to_csv("raw_data/pin-frequency-level.csv", index= False)

# new_pins_df

new_pins_df.groupby(by="level").size()

def map_level(pdf):
    data_url = 'https://ucbe-mastermind.herokuapp.com/data'
    response = requests.get(data_url)

    data_df = pd.DataFrame(response.json())
    result_data = pd.merge(data_df, pdf, how="left", left_on='password', right_on='pins')
    return(result_data)

output_data=map_level(new_pins_df)

# output_data

