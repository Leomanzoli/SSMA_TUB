#!/usr/bin/env python3
"""
Script para coletar dados de manobras previstas do site da Praticagem
e filtrar apenas os berços de interesse: PRMCV1, PRMCV2, TUBP02, TUBP1N, TUBP1S, TUBTGL
"""

import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
from zoneinfo import ZoneInfo
import sys

# URLs e configurações
URL_BASE = "https://www.praticagem.org.br"
URL_MANOBRAS = f"{URL_BASE}/asp/previstas.asp"
BERCOS_INTERESSE = ["PRMCV1", "PRMCV2", "TUBP02", "TUBP1N", "TUBP1S", "TUBTGL"]
OUTPUT_FILE = "manobras-data.json"

def fetch_manobras():
    """Busca e processa os dados de manobras previstas"""
    try:
        print(f"Buscando dados de {URL_MANOBRAS}...")
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(URL_MANOBRAS, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Procurar tabela de manobras
        tabela = soup.find('table', {'border': '1'})
        
        if not tabela:
            print("Erro: Tabela de manobras não encontrada no HTML")
            return None
        
        manobras_filtradas = []
        
        # Processar linhas da tabela (pular as 2 primeiras linhas de cabeçalho)
        linhas = tabela.find_all('tr')[2:]
        
        print(f"Total de linhas encontradas: {len(linhas)}")
        
        for linha in linhas:
            colunas = linha.find_all('td')
            
            if len(colunas) < 13:
                continue
            
            # Extrair dados das colunas conforme a estrutura da tabela
            # Colunas: Nome, Tipo, LOA, Calado Proa, Calado Popa, Data, Hora, Manobra, Porto, Berço, Bordo, Agência, Situação
            nome = colunas[0].get_text(strip=True)
            data = colunas[5].get_text(strip=True)
            hora = colunas[6].get_text(strip=True)
            manobra = colunas[7].get_text(strip=True)
            berco = colunas[9].get_text(strip=True)
            situacao = colunas[12].get_text(strip=True)
            
            # Filtrar apenas berços de interesse
            if berco in BERCOS_INTERESSE:
                manobras_filtradas.append({
                    "nome": nome,
                    "data": data,
                    "hora": hora,
                    "manobra": manobra,
                    "berco": berco,
                    "situacao": situacao
                })
        
        print(f"Manobras filtradas: {len(manobras_filtradas)}")
        return manobras_filtradas
        
    except requests.RequestException as e:
        print(f"Erro ao buscar dados: {e}")
        return None
    except Exception as e:
        print(f"Erro ao processar dados: {e}")
        import traceback
        traceback.print_exc()
        return None

def save_to_json(manobras):
    """Salva os dados em formato JSON com timestamp"""
    if manobras is None:
        return False
    
    try:
        # Usar horário de Brasília (UTC-3)
        br_timezone = ZoneInfo("America/Sao_Paulo")
        agora_br = datetime.now(br_timezone)
        
        data_output = {
            "ultima_atualizacao": agora_br.isoformat(),
            "total": len(manobras),
            "manobras": manobras
        }
        
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(data_output, f, ensure_ascii=False, indent=2)
        
        print(f"✓ Dados salvos em {OUTPUT_FILE}")
        return True
        
    except Exception as e:
        print(f"Erro ao salvar JSON: {e}")
        return False

def main():
    """Função principal"""
    print("=" * 60)
    print("SCRAPER DE MANOBRAS PREVISTAS - PRATICAGEM")
    print("=" * 60)
    
    manobras = fetch_manobras()
    
    if manobras is not None:
        if save_to_json(manobras):
            print("\n✓ Processo concluído com sucesso!")
            return 0
    
    print("\n✗ Processo falhou")
    return 1

if __name__ == "__main__":
    sys.exit(main())
