# coding: utf-8
import pandas as pd
import requests
import matplotlib.pyplot as plt
import numpy as np
import os

# Function for reading files in given directory.

def read_base_file(folder, file):
    file_csv = os.path.join(folder,file)
    try:
        df = pd.read_csv(file_csv)
    except (IOException, e):
        print ("Error in reading", file)
        print (e)
        df = pd.DataFrame()
    return df

# Function for get pins difficulty.

def pin_difficulty(data_df):
    
    # Split column Pins in two columns: pins and frequency.
    new_pins_df = pd.DataFrame(data_df.Pins.str.split(';',1).tolist(), columns = ["pins","frequency"])

    # Change object dtypes to numeric
    new_pins_df = new_pins_df.apply(pd.to_numeric, errors='coerce')

    #Create bins
    bins=[-1, 97, 148, 255]
    bin_labels=["difficult","moderate","easy"]
    new_pins_df["level"]=pd.cut(new_pins_df["frequency"], bins, labels= bin_labels)
    new_pins_df.to_csv("raw_data/pin-frequency-level.csv", index= False)
    
    # Remove column Frequency that is not used anymore
    new_pins_df.drop(columns=["frequency"], inplace=True)
    
    return(new_pins_df)

def map_level(pl_df):
    data_url = 'https://ucbe-mastermind.herokuapp.com/data'
    response = requests.get(data_url)

    data_df = pd.DataFrame(response.json())
    result_data = pd.merge(data_df, pl_df, how="left", left_on='password', right_on='pins')
    return(result_data)

def passwd_difficulty():
    
    # Create a reference the CSV four-digit-pin-codes-and-frequency.csv
    data_folder = 'raw_data'
    base_file = 'four-digit-pin-codes-and-frequency.csv'
    pins_df = read_base_file(data_folder,base_file)
    
    pins_levels_df = pin_difficulty(pins_df)
    output_data=map_level(pins_levels_df)
    return(output_data)

# output_data

