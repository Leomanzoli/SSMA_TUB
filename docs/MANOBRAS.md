# Manobras Previstas - Documentation

## Overview

This feature displays scheduled maneuvers (manobras previstas) from the external source in a modal popup. The data is automatically updated every 15 minutes via GitHub Actions.

## Components

### 1. Data Collection Script (`scripts/fetch_manobras.py`)

Python script that:
- Fetches data from https://www.praticagem.org.br/manobras-previstas.html
- Parses the HTML table to extract maneuver information
- Filters by specific berths: PRMCV1, PRMCV2, TUBP02, TUBP1N, TUBP1S, TUBTGL
- Saves filtered data to `data/manobras.json`

**Columns extracted:**
- Nome (Name/Vessel)
- Data (Date)
- Hora (Time)
- Manobra (Maneuver type)
- Berço (Berth)
- Situação (Status)

**Requirements:**
```bash
pip install requests beautifulsoup4 lxml
```

**Usage:**
```bash
python3 scripts/fetch_manobras.py
```

### 2. GitHub Actions Workflow (`.github/workflows/update-manobras.yml`)

Automated workflow that:
- Runs every 15 minutes (configurable via cron schedule)
- Executes the fetch script
- Commits and pushes changes if data has been updated

**Manual trigger:**
Go to Actions tab in GitHub → "Update Manobras Data" → "Run workflow"

### 3. Frontend Display

**Card Location:** Security section, tagged as "ROTINA"

**Features:**
- Button to open modal: "Ver Manobras"
- Modal displays:
  - List of monitored berths
  - Last update timestamp
  - Table with all scheduled maneuvers
  - Empty state when no maneuvers are scheduled

## Configuration

### Adjusting Update Frequency

Edit `.github/workflows/update-manobras.yml`:

```yaml
# Every 15 minutes (current)
- cron: '*/15 * * * *'

# Every 30 minutes
- cron: '*/30 * * * *'

# Every hour
- cron: '0 * * * *'

# Every 2 hours
- cron: '0 */2 * * *'
```

### Changing Filtered Berths

Edit `scripts/fetch_manobras.py`:

```python
FILTERED_BERCOS = ["PRMCV1", "PRMCV2", "TUBP02", "TUBP1N", "TUBP1S", "TUBTGL"]
```

### Customizing Table Columns

If the source website changes its column structure, update the column mapping logic in `fetch_manobras_data()` function.

## Troubleshooting

### Workflow Not Running

1. Check if GitHub Actions is enabled for the repository
2. Verify the workflow file syntax
3. Check Actions tab for error messages

### No Data Displayed

1. Verify `data/manobras.json` exists and contains data
2. Check browser console for fetch errors
3. Ensure the JSON file is accessible (not blocked by .gitignore)

### Script Fails to Parse Data

1. The external website structure may have changed
2. Review script output for error messages
3. Update the table selectors in `fetch_manobras_data()` function
4. Test manually: `python3 scripts/fetch_manobras.py`

## Data Structure

The `data/manobras.json` file has the following structure:

```json
{
  "ultima_atualizacao": "2025-11-22T13:28:29.664279",
  "manobras": [
    {
      "nome": "NAVIO EXEMPLO 1",
      "data": "22/11/2025",
      "hora": "14:30",
      "manobra": "ATRACAÇÃO",
      "berco": "TUBP1N",
      "situacao": "PROGRAMADA"
    }
  ],
  "total": 1
}
```

## Maintenance

### Regular Checks

- Monitor workflow runs in GitHub Actions
- Verify data is being updated correctly
- Check for parsing errors in workflow logs

### When Source Website Changes

1. Review the HTML structure of the source page
2. Update table selectors in `fetch_manobras.py`
3. Test the script locally before committing
4. Monitor the first few automated runs after changes
