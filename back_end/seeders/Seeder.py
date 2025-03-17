

class Seeder :
    def __init__(self,connexion,table):
        self.query = ""
        self.conn = connexion
        self.table = table

    def execute(self):
        print(self.query)
        
        res = self.conn.table(self.table).insert(self.query).execute()
        # pas besoin de fermer la connexion, supabase est fait expres