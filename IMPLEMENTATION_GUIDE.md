# Card de Segurança - Manobras Previstas
## Guia de Implementação e Uso

---

## 📋 O que foi implementado?

Um sistema completo para exibir dados de manobras previstas de navios em um modal interativo no Portal SSMA.

### Componentes Principais:

#### 1. Botão de Acesso
Localização: Seção de suporte (abaixo do botão "Calendário de Escalas")
```
[📍 Card de Segurança - Manobras Previstas]
```

#### 2. Modal Interativo
Quando clicado, abre um modal com:
- Cabeçalho: "Card de Segurança - Manobras Previstas"
- Indicador de última atualização
- Tabela com dados das manobras
- Botão "Atualizar Dados"

#### 3. Estrutura da Tabela
```
┌──────────┬──────────┬──────────────────┬────────┬──────────────┬───────────┐
│   Data   │ Horário  │      Navio       │ Berço  │   Operação   │  Status   │
├──────────┼──────────┼──────────────────┼────────┼──────────────┼───────────┤
│22/11/2025│  08:00   │ NAVIO EXEMPLO 1  │ PIER 1 │  ATRACAÇÃO   │ PREVISTO  │
│22/11/2025│  14:00   │ NAVIO EXEMPLO 2  │ PIER 2 │ DESATRACAÇÃO │ PREVISTO  │
└──────────┴──────────┴──────────────────┴────────┴──────────────┴───────────┘
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────┐
│  Fonte de Dados     │
│  (Externa)          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐    Executa a cada
│  GitHub Actions     │◄── 15 minutos
│  (Workflow)         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ fetch_manobras.py   │ ─── Busca e processa dados
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ data/manobras.json  │ ─── Salva no repositório
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Portal SSMA        │ ─── Carrega e exibe
│  (Navegador)        │     automaticamente
└─────────────────────┘
```

---

## 🎨 Estados Visuais

### Status das Manobras (Badges coloridos):

- **PREVISTO** → Badge amarelo
- **CONFIRMADO** → Badge verde
- **CANCELADO** → Badge vermelho
- **CONCLUIDO** → Badge azul
- **UNKNOWN** → Badge cinza (fallback)

### Notificações Toast:

✅ Sucesso (verde): "Dados atualizados com sucesso!"
❌ Erro (vermelho): "Erro ao atualizar dados. Tente novamente."

---

## 🔐 Segurança Implementada

### Proteções contra XSS:
```javascript
// Todos os dados são sanitizados antes de exibir
escapeHtml(data.navio)  // "NAVIO <script>" → "NAVIO &lt;script&gt;"
```

### Validação de Status:
```javascript
// Apenas status válidos são permitidos
normalizeStatus("previsto")  → "previsto" ✓
normalizeStatus("<script>")  → "unknown" ✓
```

---

## ⚙️ Como Personalizar

### 1. Conectar à Fonte de Dados Real

Edite: `scripts/fetch_manobras.py`

```python
def fetch_manobras_data():
    # SUBSTITUIR COM:
    
    # Opção A: Web Scraping
    response = requests.get('https://exemplo.com/manobras')
    soup = BeautifulSoup(response.content, 'html.parser')
    # ... parsear dados
    
    # Opção B: API REST
    response = requests.get('https://api.exemplo.com/manobras')
    data = response.json()
    # ... transformar dados
    
    return manobras_list
```

### 2. Ajustar Frequência de Atualização

#### No GitHub Actions:
Edite: `.github/workflows/update-manobras.yml`
```yaml
schedule:
  - cron: '*/15 * * * *'  # A cada 15 minutos
  # OU
  - cron: '*/30 * * * *'  # A cada 30 minutos
  # OU
  - cron: '0 * * * *'     # A cada hora
```

#### No JavaScript:
Edite: `script.js` (linha ~890)
```javascript
// Atualizar a cada 15 minutos
setInterval(loadManobrasData, 15 * 60 * 1000);

// ALTERAR PARA (exemplo: 30 minutos):
setInterval(loadManobrasData, 30 * 60 * 1000);
```

### 3. Adicionar Novos Campos

No `fetch_manobras.py`, adicione campos ao JSON:
```python
manobra = {
    "data": "22/11/2025",
    "horario": "08:00",
    "navio": "NAVIO EXEMPLO",
    "berco": "PIER 1",
    "operacao": "ATRACAÇÃO",
    "status": "PREVISTO",
    "novo_campo": "valor"  # ← Adicionar aqui
}
```

No `script.js`, adicione coluna à tabela:
```javascript
<th>Novo Campo</th>  // ← No <thead>
// ...
<td>${escapeHtml(m.novo_campo || '-')}</td>  // ← No <tbody>
```

---

## 🧪 Como Testar

### Teste Local:
1. Abrir arquivo localmente: `file:///caminho/para/index.html`
2. OU usar servidor HTTP: `python3 -m http.server 8000`
3. Clicar no botão "Card de Segurança - Manobras Previstas"
4. Verificar exibição da tabela
5. Testar botão "Atualizar Dados"

### Teste de Responsividade:
- Redimensionar janela do navegador
- Testar em dispositivo móvel
- Verificar orientação portrait/landscape

### Teste de Modo Escuro:
- Clicar no botão de alternância de tema (☀️/🌙)
- Verificar cores da tabela e badges
- Confirmar legibilidade

### Teste de Automação:
- Fazer commit no repositório
- Aguardar 15 minutos
- Verificar novo commit automático com dados atualizados

---

## 📊 Métricas de Performance

### Tempos Esperados:
- Carregamento inicial: < 100ms
- Abertura do modal: < 50ms
- Atualização de dados: < 500ms (depende da rede)
- Animação toast: 3 segundos

### Consumo de Rede:
- Arquivo JSON: ~1-2 KB (para 10 manobras)
- Requests por hora: ~4 (quando página ativa)
- Zero requests quando página inativa

---

## 🐛 Resolução de Problemas

### Modal não abre:
- Verificar console do navegador (F12)
- Confirmar que `data/manobras.json` existe
- Verificar sintaxe do JSON

### Dados não atualizam:
- Verificar GitHub Actions (aba "Actions" no repo)
- Ver logs do workflow
- Confirmar que `fetch_manobras.py` não tem erros

### Botão "Atualizar" não funciona:
- Verificar conexão de rede
- Confirmar que arquivo JSON está acessível
- Ver console para erros JavaScript

### Estilos quebrados:
- Verificar que `style.css` foi carregado
- Limpar cache do navegador (Ctrl+Shift+R)
- Confirmar que não há conflitos de CSS

---

## 📝 Checklist de Deployment

- [ ] Personalizar `fetch_manobras.py` com fonte real
- [ ] Testar script Python: `python3 scripts/fetch_manobras.py`
- [ ] Verificar dados em `data/manobras.json`
- [ ] Testar página localmente
- [ ] Fazer commit e push
- [ ] Verificar GitHub Actions executou com sucesso
- [ ] Testar página no GitHub Pages
- [ ] Verificar responsividade mobile
- [ ] Testar modo escuro
- [ ] Confirmar atualização automática após 15 minutos

---

## 🎯 Funcionalidades Avançadas (Futuras)

Possíveis melhorias:
- Filtros por berço/status
- Ordenação de colunas
- Exportação para CSV/PDF
- Notificações push
- Histórico de manobras
- Gráficos de ocupação
- Integração com calendário

---

## 📞 Suporte

Para dúvidas sobre:
- **Implementação**: Ver `scripts/README.md`
- **Customização**: Ver comentários no código
- **Bugs**: Abrir issue no GitHub
- **Melhorias**: Abrir Pull Request

---

**Versão:** 1.0.0  
**Data:** 22/11/2025  
**Status:** ✅ Produção  
**Mantenedor:** SSMA - Limpeza Industrial - Porto de Tubarão
