#!/usr/bin/env python3
"""
Script to fetch manobras previstas (predicted maneuvers) data from external source.
This is a template script that should be customized with the actual data source.
"""

import json
import os
from datetime import datetime, timezone
import sys

def fetch_manobras_data():
    """
    Fetch manobras data from external source.
    
    TODO: Replace this with actual web scraping or API call logic.
    For now, this generates sample data to demonstrate the structure.
    
    When implementing:
    1. Use requests library to fetch data from the external website
    2. Parse the HTML using BeautifulSoup or parse JSON from API
    3. Extract relevant fields: data, horario, navio, berco, operacao, status
    4. Return structured data
    """
    
    # TODO: Replace with actual data fetching logic
    # Example:
    # response = requests.get('https://example.com/manobras')
    # soup = BeautifulSoup(response.content, 'html.parser')
    # # Parse table rows and extract data
    
    # For now, return sample data structure
    sample_data = [
        {
            "data": datetime.now().strftime("%d/%m/%Y"),
            "horario": "08:00",
            "navio": "NAVIO EXEMPLO 1",
            "berco": "PIER 1",
            "operacao": "ATRACAÇÃO",
            "status": "PREVISTO"
        },
        {
            "data": datetime.now().strftime("%d/%m/%Y"),
            "horario": "14:00",
            "navio": "NAVIO EXEMPLO 2",
            "berco": "PIER 2",
            "operacao": "DESATRACAÇÃO",
            "status": "PREVISTO"
        }
    ]
    
    return sample_data


def save_manobras_data(data):
    """Save manobras data to JSON file."""
    output = {
        "lastUpdate": datetime.now(timezone.utc).isoformat(),
        "manobras": data if data else []
    }
    
    # Ensure data directory exists
    os.makedirs("data", exist_ok=True)
    
    # Write to JSON file
    output_path = "data/manobras.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Data saved to {output_path}")
    print(f"📊 Total manobras: {len(data) if data else 0}")
    print(f"🕒 Last update: {output['lastUpdate']}")


def main():
    """Main function."""
    try:
        print("🚢 Fetching manobras data...")
        data = fetch_manobras_data()
        
        if not data:
            print("⚠️  No data fetched, keeping existing data")
            sys.exit(0)
        
        save_manobras_data(data)
        print("✅ Update completed successfully")
        
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
