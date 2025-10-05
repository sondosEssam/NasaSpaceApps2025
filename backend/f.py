import requests

url = "https://goldsmr4.gesdisc.eosdis.nasa.gov/opendap/MERRA2/M2T1NXAER.5.12.4/2025/10/MERRA2_400.tavg1_2d_aer_Nx.20251004.nc4"
username = "youssefhegazy7410@gmail.com"
password = "AbCD1-EFGH-IJKL-MNOP"

session = requests.Session()
session.auth = (username, password)

r = session.get(url)
if r.status_code == 200:
    with open("MERRA2_400_20251004.nc4", "wb") as f:
        f.write(r.content)
    print("✅ Downloaded successfully!")
else:
    print("❌ Error:", r.status_code, r.text)
