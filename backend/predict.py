import sys
import os
import json
import pandas as pd
from xgboost import XGBRegressor

# Time of day bucket — same logic as training
def time_of_day(hour):
    if 4 <= hour < 8:    return 0
    elif 8 <= hour < 12: return 1
    elif 12 <= hour < 16:return 2
    elif 16 <= hour < 20:return 3
    elif 20 <= hour < 24:return 4
    else:                return 5

# Airport code -> city name (must match dataset city names exactly)
CITY_MAP = {
    "DEL": "Delhi",
    "BOM": "Mumbai",
    "BLR": "Banglore",
    "CCU": "Kolkata",
    "HYD": "Hyderabad",
    "MAA": "Chennai",
    "COK": "Cochin"
}

# Absolute paths, so this works no matter what directory the Node
# process's cwd was when it spawned this script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)

# Only standard economy airlines — no premium/business
STANDARD_AIRLINES = [
    "Air Asia", "Air India", "GoAir", "IndiGo",
    "Jet Airways", "Multiple carriers", "SpiceJet", "Trujet", "Vistara"
]

FEATURES = [
    "Airline_Code", "Source_Code", "Destination_Code",
    "Journey_Day", "Journey_Month", "Journey_Day_of_Week", "Is_Weekend",
    "Dep_Hour", "Dep_Min", "Dep_Time_Of_Day",
    "Arr_Hour", "Arr_Min", "Arr_Time_Of_Day",
    "Duration_Minutes", "Total_Stops_Code", "Additional_Info_Code"
]

def find_file(names):
    for name in names:
        if os.path.exists(name):
            return name
    return None

def main():
    try:
        query = json.loads(sys.stdin.read())

        model_path   = find_file([
            os.path.join(ROOT_DIR, "best_model.json"),
            "best_model.json",
            "../best_model.json",
        ])
        mapping_path = find_file([
            os.path.join(ROOT_DIR, "mappings.json"),
            "mappings.json",
            "../mappings.json",
        ])

        if not model_path or not mapping_path:
            raise FileNotFoundError("best_model.json or mappings.json not found.")

        with open(mapping_path, "r", encoding="utf-8") as f:
            mappings = json.load(f)

        # Load XGBoost model using native format (no pickle, no version warning)
        model = XGBRegressor()
        model.load_model(model_path)

        # Parse city codes to names
        source_name = CITY_MAP.get(query["source_code"])
        dest_name   = CITY_MAP.get(query["dest_code"])
        if not source_name or not dest_name:
            raise ValueError(f"Unknown city code: {query['source_code']} or {query['dest_code']}")

        src_enc = mappings["Source"][source_name]
        dst_enc = mappings["Destination"][dest_name]

        day   = int(query["day"])
        month = int(query["month"])
        year  = int(query["year"])
        dep_h = int(query["dep_hour"])
        arr_h = int(query["arr_hour"])

        dt      = pd.to_datetime(f"{year}-{month:02d}-{day:02d}")
        dow     = dt.dayofweek
        weekend = 1 if dow >= 5 else 0

        dep_tod  = time_of_day(dep_h)
        arr_tod  = time_of_day(arr_h)
        duration = (arr_h - dep_h) * 60
        if duration < 0:
            duration += 1440
        stops   = 0 if duration <= 180 else 1
        no_info = mappings["Additional_Info"].get("No info", 0)

        results = []
        for airline in STANDARD_AIRLINES:
            if airline not in mappings["Airline"]:
                continue

            air_code = mappings["Airline"][airline]
            row = pd.DataFrame([[
                air_code, src_enc, dst_enc,
                day, month, dow, weekend,
                dep_h, 0, dep_tod,
                arr_h, 0, arr_tod,
                duration, stops, no_info
            ]], columns=FEATURES)

            price = float(model.predict(row)[0])
            display_name = "AirAsia" if airline == "Air Asia" else airline

            results.append({
                "airline_name": display_name,
                "price": round(price, 2),
                "duration": duration
            })

        results.sort(key=lambda x: x["price"])

        print(json.dumps({
            "route": f"{query['source_code']} -> {query['dest_code']}",
            "journey_date": f"{day}-{month}-{year}",
            "results": results
        }))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
