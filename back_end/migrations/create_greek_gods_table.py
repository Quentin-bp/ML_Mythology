from back_end.seeders.Seeder import Seeder


class CreateGreekGodsTable(Seeder):
    def __init__(self):
        self.query = """
            CREATE TABLE IF NOT EXISTS greek_gods (
                id SERIAL PRIMARY KEY,
                name_english VARCHAR(255),
                name_greek VARCHAR(255),
                description VARCHAR(3000),
                main_type VARCHAR(255),
                sub_type VARCHAR(255)
            ); """