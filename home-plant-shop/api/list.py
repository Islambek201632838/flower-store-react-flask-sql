import json
from random import randint, choice
from datetime import datetime, timedelta

categories = [
    "House Plants",
    "Potter Plants",
    "Small Plants",
    "Big Plants",
    "Succulents",
    "Gardening",
    "Accessories"
]

names = [
    "Small Snake Plant",
    "ZZ Plant",
    "Pothos",
    "Spider Plant",
    "Peace Lily",
    "Monstera Deliciosa",
    "Fiddle-Leaf Fig",
    "African Violet",
    "Aloe Vera",
    "Cactus",
    "Succulent",
    "Orchid",
    "Bonsai Tree",
    "Air Plant",
    "String of Pearls",
    "Areca Palm",
    "Rubber Plant",
    "Bird of Paradise",
    "Kentia Palm",
    "Burro's Tail",
    "Echeveria",
    "Haworthia",
    "Potting Mix",
    "Fertilizer",
    "Garden Tools",
    "Watering Can",
    "Garden Hose",
    "Garden Gloves",
    "Plant Stand",
    "Hanging Basket",
    "Planter",
    "Watering Globe",
    "Plant Mister",
    "Plant Food"
]


data = []

start_date = datetime(2023, 9, 1)
end_date = datetime(2023, 10, 12)

for i in range(100):
    row = {
        "id": i + 1,
        "name": choice(names),
        "price": round(randint(299, 9999) / 100, 2),  # Random price between 2.99 and 99.99
        "size": choice(["Small", "Medium", "Large"]),
        "category": choice(categories),
        "discount": choice(["0%","10%", "30%", "50%"]),
        "url": "",  # Empty string for URL
        "date": (start_date + timedelta(days=randint(0, (end_date - start_date).days))).strftime('%Y-%m-%d')
    }
    data.append(row)

# Write data to a JSON file
with open("flower_data.json", "w") as outfile:
    json.dump(data, outfile, indent=4)
