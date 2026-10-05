import pandas as pd
import numpy as np
import json
import os

print("=== RUNNING FAST DATA BUILD PIPELINE ===")

out_dir = "public/data"
os.makedirs(out_dir, exist_ok=True)

parquet_path = "data/raw/mutual_funds_nav_history_cleaned.parquet"
selected_codes = [118989, 119063, 120716]

# Read only the selected scheme codes using pyarrow filters!
df = pd.read_parquet(
    parquet_path,
    filters=[('Scheme_Code', 'in', selected_codes)],
    columns=['Scheme_Code', 'Date', 'NAV']
)

df['Date_dt'] = pd.to_datetime(df['Date'])
df['YearMonth'] = df['Date_dt'].dt.strftime('%Y-%m')

selected_schemes = [
    {
        "code": 118989,
        "name": "HDFC Mid-Cap Opportunities Fund - Direct - Growth",
        "shortName": "HDFC Mid-Cap Opportunities",
        "category": "Mid-Cap",
        "isDemo": True,
        "asOfDate": "2025-02-24",
        "asOfNav": 184.08,
        "peak12m": 214.13,
        "drawdownPct": 14.03
    },
    {
        "code": 119063,
        "name": "HDFC Flexi Cap Fund - Direct - Growth",
        "shortName": "HDFC Flexi Cap",
        "category": "Flexi-Cap",
        "isDemo": False,
        "asOfDate": "2025-03-12",
        "asOfNav": 216.59,
        "peak12m": 251.96,
        "drawdownPct": 14.04
    },
    {
        "code": 120716,
        "name": "UTI Nifty 50 Index Fund - Direct - Growth",
        "shortName": "UTI Nifty 50 Index",
        "category": "Nifty 50 Index",
        "isDemo": False,
        "asOfDate": "2025-03-12",
        "asOfNav": 155.67,
        "peak12m": 181.06,
        "drawdownPct": 14.02
    }
]

nav_daily_map = {}
nav_monthly_map = {}

for scheme in selected_schemes:
    code = scheme["code"]
    sub = df[df['Scheme_Code'] == code].sort_values('Date_dt').copy()
    
    # Daily NAV list
    daily_records = []
    for idx, row in sub.iterrows():
        daily_records.append({
            "date": row['Date_dt'].strftime('%Y-%m-%d'),
            "nav": round(float(row['NAV']), 4)
        })
    nav_daily_map[str(code)] = daily_records
    
    # Month-start NAV list (first trading day of each month)
    monthly_sub = sub.groupby('YearMonth').first().reset_index().sort_values('Date_dt')
    monthly_records = []
    for idx, row in monthly_sub.iterrows():
        monthly_records.append({
            "date": row['Date_dt'].strftime('%Y-%m-%d'),
            "nav": round(float(row['NAV']), 4)
        })
    nav_monthly_map[str(code)] = monthly_records

# Nifty 50 data from archive CSV
nifty_path = "data/raw/archive/Nifty 50 Historical Data.csv"
nifty_records = []
if os.path.exists(nifty_path):
    ndf = pd.read_csv(nifty_path)
    ndf['Date_dt'] = pd.to_datetime(ndf['Date'])
    ndf = ndf.sort_values('Date_dt')
    for idx, row in ndf.iterrows():
        try:
            val = float(str(row['Price']).replace(',', ''))
            nifty_records.append({
                "date": row['Date_dt'].strftime('%Y-%m-%d'),
                "close": round(val, 2)
            })
        except ValueError:
            pass

# Save files to public/data
with open(os.path.join(out_dir, "funds.json"), "w") as f:
    json.dump(selected_schemes, f, indent=2)

with open(os.path.join(out_dir, "nav_daily.json"), "w") as f:
    json.dump(nav_daily_map, f, indent=2)

with open(os.path.join(out_dir, "nav_monthly.json"), "w") as f:
    json.dump(nav_monthly_map, f, indent=2)

with open(os.path.join(out_dir, "nifty_daily.json"), "w") as f:
    json.dump(nifty_records, f, indent=2)

print(f"Data pipeline complete! Output files generated in {out_dir}:")
print(f"  - funds.json ({os.path.getsize(os.path.join(out_dir, 'funds.json'))} bytes)")
print(f"  - nav_daily.json ({os.path.getsize(os.path.join(out_dir, 'nav_daily.json'))} bytes)")
print(f"  - nav_monthly.json ({os.path.getsize(os.path.join(out_dir, 'nav_monthly.json'))} bytes)")
print(f"  - nifty_daily.json ({os.path.getsize(os.path.join(out_dir, 'nifty_daily.json'))} bytes)")
