from pydantic import BaseModel

class PredictRequest(BaseModel):
    txt: str