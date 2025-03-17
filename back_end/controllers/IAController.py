import pandas as pd
from back_end.controllers.Helper import extractTokensInName,syllablesToString

import pandas as pd
from sklearn.model_selection import train_test_split

from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import MultinomialNB
from openai import OpenAI
from decouple import Config, RepositoryEnv

import os


DOTENV_FILE = "./config/.env"

class IAController:

    @staticmethod
    def getMainTypes():
        df = IAController.getDataset()
        return df["main_type"].unique().tolist() # sinon fastapi retourne une erreur car il n'arrive pas a obtenir un json
    
    @staticmethod
    def getSubTypes():
        df = IAController.getDataset()
        return df["sub_type"].unique().tolist() # sinon fastapi retourne une erreur car il n'arrive pas a obtenir un json
    
    @staticmethod
    def getDataset():
        df = pd.read_csv("./data/greek_gods_dataset.csv")
        df['tokens'] = df['name_english'].apply(extractTokensInName)
        return df
    
    @staticmethod
    def predict(name):
        # le mieux a faire est d'enregistree le model dans un fichier & de faire les prediction dessus, ça evite de reentrainer le model a chaque fois
        modelMainType, vectorizerMainType, accuracyMainType  = IAController.trainModelMain()
        modelSubType, vectorizerSubType, accuracySubType  = IAController.trainModelSub()

        syllabes = extractTokensInName(name)
        namePrepared = syllablesToString(syllabes)# on prepare le nom en le decoupant en syllabes
    
        nameVec = vectorizerMainType.transform([namePrepared]) # on vectorize le noms comme avec les donnees d'entrainement
        probas = modelMainType.predict_proba(nameVec)

        nameVecSub = vectorizerSubType.transform([namePrepared]) # on vectorize le noms comme avec les donnees d'entrainement
        probasSub = modelSubType.predict_proba(nameVecSub)

        res = {}
        res["main_type"] = {}
        res["sub_type"] = {}

        for i in range(len(modelMainType.classes_)):
            res["main_type"][modelMainType.classes_[i]] = probas[0][i]

        for i in range(len(modelSubType.classes_)):
            res["sub_type"][modelSubType.classes_[i]] = probasSub[0][i]

        ''' on obtient une valeur du genre : 
        {
            "god": 0.6624388083008774,
            "personification": 0.2766745307812323,
            "titan": 0.060886660917890294
        }
        '''
        return res

    
    @staticmethod
    def trainModelMain():
        df = IAController.getDataset()
        df['tokens_str'] = df['tokens'].apply(syllablesToString) # si on laisse en tableau, ca fera une erreur 
        X = df['tokens_str'] 
        y = df['main_type']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
        
        vectorizer = CountVectorizer()
        
        X_train_vec = vectorizer.fit_transform(X_train)
        X_test_vec = vectorizer.transform(X_test)
        
        model = LogisticRegression(random_state=42)
        model.fit(X_train_vec, y_train)
        
        y_pred = model.predict(X_test_vec)
        
        accuracy = accuracy_score(y_test, y_pred)
        
        return model, vectorizer, accuracy
    
    def trainModelSub():
        df = IAController.getDataset()
        df['tokens_str'] = df['tokens'].apply(syllablesToString) # si on laisse en tableau, ca fera une erreur 
    
        X = df['tokens_str'] 
        y = df['sub_type']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
        
        vectorizer = CountVectorizer()
        
        X_train_vec = vectorizer.fit_transform(X_train)
        X_test_vec = vectorizer.transform(X_test)
        
        model = MultinomialNB()
        model.fit(X_train_vec, y_train)
        
        y_pred = model.predict(X_test_vec)
        
        accuracy = accuracy_score(y_test, y_pred)
        
        return model, vectorizer, accuracy
    
    def predict_openai(text):
        
        env_config = Config(RepositoryEnv(DOTENV_FILE))
        key = env_config.get("OPENAI_KEY")
        df = IAController.getDataset()
        df = df[['name_english', 'description']]# rien besoin d'autre, ça permet de limiter la consommation gpt
        df_txt = df.to_string(index=False) 
        client = OpenAI(api_key=key)

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "developer", "content": "voici un dataset avec lequel tu dois faire tes réponses. Ne retourne rien d'autre que le nom et ne fait pas de blabla. Si le dataset donné ne contient pas le nom recherché, retourne un string vide. Tu dois retourner le nom le plus proche de la description donnée par l'utilisateur, uniquement avec le df que je te donne : " + df_txt},
                {
                    "role": "user",
                    "content": text,
                },
            ],
        )
        return completion.choices[0].message.content