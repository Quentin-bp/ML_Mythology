from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from back_end.controllers.DatabaseController import DatabaseController
from back_end.controllers.IAController import IAController


from back_end.models.PredictRequest import PredictRequest

app = FastAPI()
descriptionGeneral = "Operations on the table"

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=['Init'])
async def start():
    return {"Init msg": "Welcome to Mythology ML !"}

################# BDD #############################################

'''
@app.get("/full_setup", tags=['BDD'])
async def fullSetup():
    res1 = DatabaseController.createDatabase()
    res2 = DatabaseController.insertData()
    return [res1, res2]
'''

@app.get("/create_database", tags=['BDD'])
async def createDatabase():
    return DatabaseController.createDatabase()
@app.get("/insert_data", tags=['BDD'])
async def insertData():
    return DatabaseController.insertData()


@app.get("/main_types")
async def main_types():
    return IAController.getMainTypes()

@app.get("/sub_types")
async def main_types():
    return IAController.getSubTypes()

@app.post("/predict")
async def predict(req: PredictRequest):
    return IAController.predict(req.txt)

@app.post("/predict_ia")
async def predict(req: PredictRequest):
    return IAController.predict_openai(req.txt)




''' 
################# Nationalities #############################################
nationalitiesTag = "Nationalities"
@app.get("/nationalities", tags=[nationalitiesTag], description=descriptionGeneral + nationalitiesTag)
async def getNationalities():
    return NationalitiesController.findAll()

@app.get("/nationality/{id}", tags=[nationalitiesTag], description=descriptionGeneral + nationalitiesTag)
async def getNationality(id):
    return NationalitiesController.findById(id)

@app.post("/nationality", tags=[nationalitiesTag], description=descriptionGeneral + nationalitiesTag)
async def createNationality(nationality : NationalityModel):
    return NationalitiesController.insertOne(nationality)

@app.put("/nationality/{id}", tags=[nationalitiesTag], description=descriptionGeneral + nationalitiesTag)
async def updateNationality(id : int,nationality : NationalityModel):
    return NationalitiesController.update(id,nationality)

@app.delete("/nationality/{id}", tags=[nationalitiesTag], description=descriptionGeneral + nationalitiesTag)
async def deleteNationality(id : int):
    return NationalitiesController.delete(id)

'''
if __name__=='__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)