# Portal SSMA - Limpeza Industrial - Porto de Tubarão

Portal web para centralizar links críticos das áreas de **Segurança, Saúde e Meio Ambiente (SSMA)**.

## Funcionalidades

### 🔗 Central de Links
Portal unificado com abas para Segurança, Saúde e Meio Ambiente, incluindo:
- Formulários e inspeções
- Dashboards e relatórios
- Procedimentos e documentação
- Treinamentos

### 🚢 Manobras Previstas (Novo!)
Monitoramento em tempo real das manobras previstas nos berços:
- PRMCV1, PRMCV2
- TUBP02, TUBP1N, TUBP1S, TUBTGL

**Características:**
- ✅ Atualização automática a cada 15 minutos via GitHub Actions
- ✅ Modal interativo com tabela filtrada
- ✅ Indicador de última atualização
- ✅ Dados coletados de https://www.praticagem.org.br/manobras-previstas.html

## Estrutura do Projeto

```
SSMA_TUB/
├── index.html              # Página principal
├── style.css               # Estilos CSS
├── script.js               # JavaScript do site
├── scraper.py              # Script de coleta de dados
├── requirements.txt        # Dependências Python
├── manobras-data.json      # Dados de manobras (atualizado automaticamente)
└── .github/
    └── workflows/
        └── update-manobras.yml  # Automação GitHub Actions
```

## Configuração

### 1. GitHub Actions
O workflow já está configurado para executar automaticamente a cada 15 minutos.

**Para habilitar:**
1. Vá em Settings > Actions > General
2. Em "Workflow permissions", selecione "Read and write permissions"
3. Salve as alterações

### 2. Teste Manual do Scraper

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar o scraper
python scraper.py
```

### 3. Publicar via GitHub Pages
1. Vá em Settings > Pages
2. Em Source: escolha `Deploy from a branch`
3. Branch: `main` / Pasta: `/root`
4. Salve. URL: `https://leomanzoli.github.io/SSMA_TUB/`

## Adicionando Novos Links

Edite o array `segurancaLinks` em `script.js`:

```javascript
{
  titulo: 'Nome do Link',
  descricao: 'Descrição curta',
  url: 'https://exemplo.com',
  categoria: 'Formulário | Portal | Dashboard | etc',
  tag: 'ROTINA | DOCUMENTOS | GESTÃO | TREINAMENTOS'
}
```

## Como Funciona - Manobras Previstas

1. **Coleta de Dados**: O script `scraper.py` acessa o site da Praticagem e extrai os dados da tabela
2. **Filtragem**: Apenas os berços de interesse são mantidos
3. **Armazenamento**: Os dados são salvos em `manobras-data.json`
4. **Automação**: GitHub Actions executa o scraper a cada 15 minutos
5. **Exibição**: O site carrega o JSON e mostra em um modal interativo

## Paleta de Cores (Sodexo)
- Azul: `#005EB8`
- Vermelho: `#E2001A`
- Branco: `#FFFFFF`

## Tecnologias
- HTML5 + CSS3 (responsivo)
- JavaScript (vanilla)
- Python 3 (BeautifulSoup4)
- GitHub Actions (CI/CD)

## Melhorias Futuras
- [ ] Preencher links de Saúde e Meio Ambiente
- [x] Modo escuro
- [ ] Notificações de novas manobras
- [ ] Filtro por tipo de manobra
- [ ] Histórico de manobras executadas

## Contribuição
Use Pull Requests ou Issues para sugerir melhorias.

---
Desenvolvido para otimizar o acesso rápido a recursos críticos de SSMA.