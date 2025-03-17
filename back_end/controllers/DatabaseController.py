from back_end.migrations.Migrations import Migrations
from back_end.seeders.Seeders import Seeders
class DatabaseController:

    @staticmethod
    def createDatabase():
        migrations = Migrations()
        migrations.runAllMigrations()
        return "Executed"
    
    @staticmethod
    def insertData():
        seeders = Seeders()
        seeders.runAllSeeders()
        return "Executed"
    