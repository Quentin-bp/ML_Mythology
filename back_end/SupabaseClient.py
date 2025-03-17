from supabase import create_client, Client as client
from decouple import Config, RepositoryEnv

DOTENV_FILE = './config/.env'
class Client:
    
    @staticmethod
    def getConnexion():
        try:
            print("- class connexionBD() is running ... \n\n")
            env_config = Config(RepositoryEnv(DOTENV_FILE))

            db = env_config.get("SUPABASE_URL")
            key = env_config.get("SUPABASE_KEY")

            connexion = create_client(db, key)
            return connexion
        except Exception as e:
            print(f"Erreur-CONNECTION ::: {e}")
            raise e