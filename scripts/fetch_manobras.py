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
        # Try multiple selectors to find the correct table
        table = soup.find('table', class_='manobras') or soup.find('table', id='manobras')
        
        if not table:
            # Fallback: find any table that looks like maneuvers table
            tables = soup.find_all('table')
            for t in tables:
                headers = t.find_all('th')
                if headers and any('berço' in h.get_text().lower() for h in headers):
                    table = t
                    break
        
        if not table:
            print("Warning: No maneuvers table found on the page")
            return []
        
        # Get header row to map column names to indices
        header_row = table.find('tr')
        if not header_row:
            print("Warning: No header row found in table")
            return []
        
        headers = [th.get_text(strip=True).lower() for th in header_row.find_all(['th', 'td'])]
        
        # Map expected column names to their indices
        column_map = {}
        for i, header in enumerate(headers):
            if 'nome' in header or 'navio' in header:
                column_map['nome'] = i
            elif 'data' in header:
                column_map['data'] = i
            elif 'hora' in header:
                column_map['hora'] = i
            elif 'manobra' in header:
                column_map['manobra'] = i
            elif 'berço' in header or 'berco' in header:
                column_map['berco'] = i
            elif 'situação' in header or 'situacao' in header or 'status' in header:
                column_map['situacao'] = i
        
        # Validate we have all required columns
        required_columns = ['nome', 'data', 'hora', 'manobra', 'berco', 'situacao']
        missing_columns = [col for col in required_columns if col not in column_map]
        if missing_columns:
            print(f"Warning: Missing required columns: {missing_columns}")
            print(f"Available columns: {headers}")
            return []
        
        manobras = []
        rows = table.find_all('tr')[1:]  # Skip header row
        
        for row in rows:
            cols = row.find_all(['td', 'th'])
            if len(cols) < max(column_map.values()) + 1:
                continue
            
            try:
                # Extract data using column map
                manobra = {
                    "nome": cols[column_map['nome']].get_text(strip=True),
                    "data": cols[column_map['data']].get_text(strip=True),
                    "hora": cols[column_map['hora']].get_text(strip=True),
                    "manobra": cols[column_map['manobra']].get_text(strip=True),
                    "berco": cols[column_map['berco']].get_text(strip=True),
                    "situacao": cols[column_map['situacao']].get_text(strip=True)
                }
                
                # Filter by berth
                if manobra["berco"] in FILTERED_BERCOS:
                    manobras.append(manobra)
            except (IndexError, KeyError) as e:
                print(f"Warning: Error parsing row: {e}")
                continue
        
        return manobras
        
    except requests.RequestException as e:
        print(f"Error fetching data: {e}", file=sys.stderr)
        return []
    except Exception as e:
        print(f"Error parsing data: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
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
