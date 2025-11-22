#!/usr/bin/env python3
"""
Script to fetch scheduled maneuvers data from praticagem.org.br
Filters by specific berths and saves to JSON file
"""

import json
import sys
from datetime import datetime
from pathlib import Path

# Third-party imports
try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "requests", "beautifulsoup4", "lxml"])
    import requests
    from bs4 import BeautifulSoup

# Configuration
SOURCE_URL = "https://www.praticagem.org.br/manobras-previstas.html"
FILTERED_BERCOS = ["PRMCV1", "PRMCV2", "TUBP02", "TUBP1N", "TUBP1S", "TUBTGL"]
OUTPUT_FILE = Path(__file__).parent.parent / "data" / "manobras.json"

def fetch_manobras_data():
    """Fetch and parse maneuvers data from the website"""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        response = requests.get(SOURCE_URL, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the table with maneuvers data
        # This is a placeholder - actual selectors need to be adjusted based on the real HTML structure
        table = soup.find('table')
        
        if not table:
            print("Warning: No table found on the page")
            return []
        
        manobras = []
        rows = table.find_all('tr')[1:]  # Skip header row
        
        for row in rows:
            cols = row.find_all(['td', 'th'])
            if len(cols) < 6:
                continue
            
            # Extract data from columns
            # Adjust indices based on actual table structure
            manobra = {
                "nome": cols[0].get_text(strip=True),
                "data": cols[1].get_text(strip=True),
                "hora": cols[2].get_text(strip=True),
                "manobra": cols[3].get_text(strip=True),
                "berco": cols[4].get_text(strip=True),
                "situacao": cols[5].get_text(strip=True)
            }
            
            # Filter by berth
            if manobra["berco"] in FILTERED_BERCOS:
                manobras.append(manobra)
        
        return manobras
        
    except requests.RequestException as e:
        print(f"Error fetching data: {e}", file=sys.stderr)
        return []
    except Exception as e:
        print(f"Error parsing data: {e}", file=sys.stderr)
        return []

def save_to_json(manobras):
    """Save filtered maneuvers to JSON file"""
    # Create data directory if it doesn't exist
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    data = {
        "ultima_atualizacao": datetime.now().isoformat(),
        "manobras": manobras,
        "total": len(manobras)
    }
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Saved {len(manobras)} maneuvers to {OUTPUT_FILE}")
    return True

def main():
    """Main execution function"""
    print(f"Fetching maneuvers from {SOURCE_URL}...")
    manobras = fetch_manobras_data()
    
    if manobras:
        save_to_json(manobras)
        print(f"✓ Successfully updated maneuvers data ({len(manobras)} records)")
        return 0
    else:
        # Even if no data, save empty result with timestamp
        save_to_json([])
        print("⚠ No maneuvers found matching the filter criteria")
        return 0

if __name__ == "__main__":
    sys.exit(main())
