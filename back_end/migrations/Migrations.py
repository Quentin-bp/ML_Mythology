from .create_greek_gods_table import CreateGreekGodsTable

class Migrations :
    def getAllMigrations(self):
        create_greek_gods = CreateGreekGodsTable()

        return [
            create_greek_gods,
        ]
    
    def runAllMigrations(self):
        migrations = self.getAllMigrations()
        
        ##########################
        print("Load migrations")
        ##########################
        for migration in migrations:
            migration.execute()
        ##########################
        print("Migrations loaded")
        ##########################
