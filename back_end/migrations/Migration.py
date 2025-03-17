from sqlalchemy import create_engine
from sqlalchemy import text
from supabase import create_client, Client as client
from decouple import Config, RepositoryEnv

DOTENV_FILE = './config/.env'

class Migration :
    def __init__(self):
        self.query = ""
        env_config = Config(RepositoryEnv(DOTENV_FILE))

        pg_url = env_config.get("SUPABASE_POSTGRES_URL")
        self.conn = create_engine(pg_url)
        self.conn = create_client(env_config.get("SUPABASE_URL"), env_config.get("SUPABASE_KEY"))

    def execute(self):
         # impossible de creer la table sur supabase, il faut creer les tables a la main
         '''
        res = self.conn.rpc('pg_execute', {'sql': self.query})
        print
        return
        with self.conn.connect() as connection:
            connection.execute(text(self.query))'
            
        ''' 