
import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
url = 'https://en.wikipedia.org/wiki/List_of_Greek_deities'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

name_english = []
name_greek = []
t = []
t_sub = []
description = []

# Major Gods
def get_majors_gods():
    df = []
    major = soup.find_all('table', {'class': 'wikitable'})
    for tr in major[0].find_all('tr')[1:]:
        name_e = tr.find('b')
        name_g = tr.find('span', {'lang': 'grc'})
        d = tr.find('p')
        t.append('god')
        t_sub.append('olympian')
        #description.append(d.text)
        df.append({'name_english': name_e.text, "name_greek" : name_g.text, "description" : d.text, "main_type": 'god','sub_type': 'olympian'})
    return df

def get_primordial_gods():
    df = []
    primordial = soup.find_all('table', {'class': 'wikitable sortable'})
    for tr in primordial[0].find_all('tr')[1:]:
        name_g = tr.find('span', {'lang': 'grc'})
        name_e = tr.find('a')
        d = name_e.find_next('td')

        #name_english.append(name_e.text)
        #name_greek.append(name_g.text)
        t.append('god')
        t_sub.append('primordial')
        #description.append(d.text)
        df.append({'name_english': str(name_e.text), "name_greek" : name_g.text, "description" : d.text,"main_type": 'god' ,'sub_type': 'primordial'})
    return df

def get_titans():
    df = [] 
    titans = soup.find_all('table', {'class': 'wikitable','cellpadding': '6'})
    for tr in titans[0].find_all('tr')[2:14]:
        name_g = tr.find('span', {'lang': 'grc'})
        name_e = tr.find('a')
        d = name_e.find_next('td')

        #name_english.append(name_e.text)
        #name_greek.append(name_g.text)
        t.append('titan')
        t_sub.append('twelve titan')
        #description.append(d.text)
        df.append({'name_english': str(name_e.text), "name_greek" : name_g.text, "description" : d.text,"main_type": 'titan' , 'sub_type': 'major'})
    for tr in titans[0].find_all('tr')[15:]:
        name_g = tr.find('span', {'lang': 'grc'})
        name_e = tr.find('a')
        d = name_e.find_next('td')

        #name_english.append(name_e.text)
        #name_greek.append(name_g.text)
        t.append('titan')
        t_sub.append('other titan')
        #description.append(d.text)
        df.append({'name_english': str(name_e.text), "name_greek" : name_g.text, "description" : d.text, "main_type": 'titan', 'sub_type': 'other'})
    return df

def get_categoricals_deities():
    df = [] 
    types = [("personification","personification") , ("god","chthonic"),("god","sea"),
             ("god","sky") , ("god","rustic"),("god","agriculture"),
             ("god","health") , ("god","sleep"),("god","other"),("god","humans")
             ] 
    for i in range(len(types)):
        data = extract_row('div', {'class': 'div-col'},types[i][0],types[i][0],i,"li")
        if (data != None):
            df.extend(data)

    return df
#print(get_majors_gods()[0])

def extract_data(_row,main_type,sub_type):
    row = _row.text.strip()
    name_g = re.findall(r'\(\s*([^()]+)\)', row)  # Capture tout sauf parenthèses
    name_e = re.findall(r'^(.*?)(?:\s\(|,)', row)  # Capture avant '(' ou ','
    d = re.findall(r'\)\s*[:|,|  "]?\s*(.*)', row) or re.findall(r',\s*(.*)', row)
    #print(name_e)
    if ( name_e == [] ): 
        return None
    return {'name_english': name_e[0], "name_greek" : name_g[0] if name_g else None, "description" : d[0], "main_type": main_type,'sub_type': sub_type }

def extract_row(soupName, soupAttr,  main_type, sub_type, indexSoup = 0, findAllLabel = "", startIndexFindAll = None, endIndexFindAll = None):
    df = []
    data = soup.find_all(soupName, soupAttr)

    if (indexSoup != -1):
        data = data[indexSoup]

    for li in data.find_all(findAllLabel)[startIndexFindAll:endIndexFindAll]:
        res = extract_data(li,main_type,sub_type)
        if res:
            df.append(res)

    return df
def clearData(data):
    data_clear = data[data['name_english'].notna()]
      # Regroupement par 'name_english' et 'name_greek' et concaténation des descriptions
    data_merged = data_clear.groupby(['name_english', 'name_greek'], as_index=False).agg({
        'description': lambda x: ' '.join(x),  # Fusionner les descriptions avec un espace
        'main_type': 'first',  # Garder le premier 'main_type' (supposons qu'il soit le même)
        'sub_type': 'first'   # Garder le premier 'sub_type' (supposons qu'il soit le même)
    })

    return data_merged

def get_datas_from_scraping():
    gods = get_majors_gods()
    primordial_gods = get_primordial_gods()
    titans = get_titans()
    categoricals_deities = get_categoricals_deities()
    data = pd.concat([
        pd.DataFrame(gods), 
        pd.DataFrame(primordial_gods), 
        pd.DataFrame(titans), 
        pd.DataFrame(categoricals_deities)
        ], ignore_index=True) 
    
    data = clearData(data)

    data.to_csv('greek_gods_dataset.csv', index=False) 
    
    return data

#print(get_datas())