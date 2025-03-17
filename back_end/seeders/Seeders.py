from .greek_gods_seeder import GreekGodsSeeder
from back_end.SupabaseClient import Client

class Seeders :
    def __init__(self):
        self.conn = Client.getConnexion()

    def getAllSeeders(self):
        greeks_gods = GreekGodsSeeder(self.conn)
 
        return [
            greeks_gods,
        ]
    
    def runAllSeeders(self):
        seeders = self.getAllSeeders()
        
        ##########################
        print("Load seeders")
        ##########################
        for seeder in seeders:
            seeder.execute()
        ##########################
        print("Seeders loaded")
        ##########################
