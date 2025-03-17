For this project, you mainly need to have python fastapi, uvicorn, supabase and beautifulsoup installed  
For the Web Application, you need to have NPM installed
```sh
pip install fastapi
pip install uvicorn
pip install supabase
pip install beautifulsoup4
```

## || First step ||
Before to make everything, you have to install all packages.  
Once done, you have to load the api, then follow this steps : 

## || Run API ||
Under the root folder :  
You have to make the command :  ``` uvicorn api:app --reload ```   
You need to change the .env file with your informations 
Once done, you can use the application.

## || Run Web Application ||

Under the root folder :  
You have to make the commands :  
``` cd ./web_app ```   
``` npm install ```
``` npm start ```   

## || Architecture ||

In this project, you have 2 blocks : the Web application in React & the Back End (API) in Python. 
Since the project is a data one, there will be no explication about the Web Application which just print all the content obtained by using Python. 

Folder back_end : 

    - analysis : You will find the 2 jupyter notebooks used to have the results before to work on a complete application. There is some explication/analysis of the results. Most of the analysis are foundable in the Web application, fully redacted. 

    - controllers : You will find all the files which run the main code. 
        - DatabaseController.py is to use the generation of the Supabase structure, online. Please note that you can't create Table in code, you have to do it manually on Supabase.
        - Helper.py is a simple file to store some practical functions. 
        - IAController.py is the file where all the predictions of the API are made. 

    - migrations : You will find all the files which run the migrations used in the DatabaseController.
        - create_greek_gods_table.py : The sql code to create the table GreekGods is there, but is not used in the application. Copy-paste it to create the table in your Supabase database.   
        - Migration.py : Structure file for a single migration.
        - Migrations.py : File which allows to run all the migrations in once.

    - models : You will find the file used to get the parameters in the API calls.
        -PredictRequest.py : File which contains the API parameters used.

    - seeders : You will find all the files which run the seeders used in the DatabaseController.
        - greek_gods_sedeer.py : This file allows to inserts all data obtained in the scrapping, into your Supabase database.
        - Seeder.py : Structure file for a single seed.
        - Seeders.py : File which allows to run all the seeders in once.

    - greek_gods_list.py : This file is used to recolt all data from Wikipedia, using scrapping
    - SupabaseClient.py :  This file is used to sends commands to Supabase   


Folder config contains the .env of the application : 
    
    -.env : Contains all key used in the application. Don't forget to set the values with yours

Folder data contains the data of the application: 
    
    -greek_gods_dataset : Contains all data obtained by scrapping.

Folder web_app : 
    
    - Folder src Contains all the file used in the React Application.

api.py : Contains all routes used by API

## ||  API Call ||

Postman (or other app you want) and load the following routes :    
- GET ( Create database structure  ) : http://127.0.0.1:8000/create_database   Please note that the functionnality exists but doesn't work with supabase
- GET ( Insert data into the database (not required) ) : http://127.0.0.1:8000/insert_data

- GET ( Get all the main types of divinity, in data ) : http://127.0.0.1:8000/main_types
- GET ( Get all the sub types of divinity, in data ) : http://127.0.0.1:8000/sub_types

- POST ( Predict the category of a name and print all scores ) : http://127.0.0.1:8000/predict
    - parameters : 
    {
        "txt" : "Zeus" // change the name by what you want
    }
- POST ( Predict a name by using OpenAI API) : http://127.0.0.1:8000/predict_ia
    - parameters : 
    {
        "txt" : "god of the thunders" // change the description by what you want
    }

![Home Page](data/bye.gif)


