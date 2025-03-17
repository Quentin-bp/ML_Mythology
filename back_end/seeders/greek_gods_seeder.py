from back_end.seeders.Seeder import Seeder
from back_end.greek_gods_list import get_datas_from_scraping
class GreekGodsSeeder(Seeder):
      def __init__(self,connexion):
        super().__init__(connexion,"greek_gods")
        df = get_datas_from_scraping().to_dict(orient="records")
        self.query =df

