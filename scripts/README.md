# Scripts Directory

## fetch_manobras.py

Script para buscar dados de manobras previstas de uma fonte externa e atualizar o arquivo `data/manobras.json`.

### Uso

```bash
python scripts/fetch_manobras.py
```

### Personalização

O script atualmente gera dados de exemplo. Para implementar a busca real de dados:

1. **Identificar a fonte de dados**: Determine a URL ou API de onde os dados serão obtidos.

2. **Implementar a lógica de busca**: Na função `fetch_manobras_data()`, adicione o código para:
   - Fazer requisição HTTP para a fonte de dados
   - Parsear o HTML ou JSON retornado
   - Extrair os campos necessários:
     - `data`: Data da manobra (formato: DD/MM/YYYY)
     - `horario`: Horário da manobra (formato: HH:MM)
     - `navio`: Nome do navio
     - `berco`: Berço/píer (ex: PIER 1, PIER 2)
     - `operacao`: Tipo de operação (ex: ATRACAÇÃO, DESATRACAÇÃO)
     - `status`: Status da manobra (ex: PREVISTO, CONFIRMADO, CANCELADO, CONCLUIDO)

3. **Exemplo de implementação com web scraping**:

```python
import requests
from bs4 import BeautifulSoup

def fetch_manobras_data():
    # Fazer requisição
    response = requests.get('https://exemplo.com/manobras')
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Parsear tabela
    manobras = []
    rows = soup.select('table.manobras tbody tr')
    
    for row in rows:
        cols = row.find_all('td')
        if len(cols) >= 6:
            manobra = {
                "data": cols[0].text.strip(),
                "horario": cols[1].text.strip(),
                "navio": cols[2].text.strip(),
                "berco": cols[3].text.strip(),
                "operacao": cols[4].text.strip(),
                "status": cols[5].text.strip()
            }
            manobras.append(manobra)
    
    return manobras
```

4. **Exemplo de implementação com API**:

```python
import requests

def fetch_manobras_data():
    response = requests.get('https://api.exemplo.com/manobras')
    data = response.json()
    
    # Transformar dados da API para o formato esperado
    manobras = []
    for item in data['items']:
        manobra = {
            "data": item['date'],
            "horario": item['time'],
            "navio": item['ship_name'],
            "berco": item['berth'],
            "operacao": item['operation_type'],
            "status": item['status']
        }
        manobras.append(manobra)
    
    return manobras
```

### Dependências

- `requests`: Para fazer requisições HTTP
- `beautifulsoup4`: Para parsear HTML (se usar web scraping)

Instalar:
```bash
pip install requests beautifulsoup4
```

### Automação

O script é executado automaticamente pelo GitHub Actions a cada 15 minutos via workflow `.github/workflows/update-manobras.yml`.

Para modificar a frequência de atualização, edite a linha `cron` no workflow:
- A cada 15 minutos: `*/15 * * * *`
- A cada 30 minutos: `*/30 * * * *`
- A cada hora: `0 * * * *`
- A cada 6 horas: `0 */6 * * *`
