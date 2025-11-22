# Portal SSMA - Limpeza Industrial - Porto de Tubarão

Portal web para centralizar links críticos das áreas de **Segurança, Saúde e Meio Ambiente (SSMA)**.

## Paleta de Cores (Sodexo)
- Azul: `#005EB8`
- Vermelho: `#E2001A`
- Branco: `#FFFFFF`

## Arquivos
- `index.html` — Estrutura principal e abas.
- `style.css` — Estilos (responsivo + acessibilidade).
- `script.js` — Lógica de abas, busca e renderização dinâmica.
- `data/manobras.json` — Dados de manobras previstas (atualizado automaticamente).
- `scripts/fetch_manobras.py` — Script para buscar dados de manobras.

## Funcionalidades

### Card de Segurança - Manobras Previstas
Exibe dados de manobras previstas em um modal, incluindo:
- Data e horário
- Nome do navio
- Berço/píer
- Tipo de operação (atracação/desatracação)
- Status da manobra

**Características:**
- ✅ Atualização automática a cada 15 minutos via GitHub Actions
- ✅ Botão de atualização manual
- ✅ Indicador de última atualização
- ✅ Interface responsiva com tabela
- ✅ Suporte a modo escuro

**Personalização:**
Para configurar a fonte de dados real, edite `scripts/fetch_manobras.py`. Veja `scripts/README.md` para instruções detalhadas.

## Adicionando Links
Edite o array `segurancaLinks` em `script.js`:
```json
{
  "titulo": "Nome",
  "descricao": "Descrição curta",
  "url": "https://exemplo.com",
  "categoria": "Formulário | Portal | Relatório | etc",
  "tag": "Rótulo"
}
```

## Publicar via GitHub Pages
1. Após o primeiro commit e push: abra Settings > Pages.
2. Em Source: escolha `Deploy from a branch`.
3. Branch: `main` / Pasta: `/root`.
4. Salve. URL esperada: `https://leomanzoli.github.io/SSMA_TUB/`.

## Automação
O workflow `.github/workflows/update-manobras.yml` executa automaticamente a cada 15 minutos para atualizar os dados de manobras.

Para modificar a frequência, edite a linha `cron` no workflow:
- A cada 15 minutos: `*/15 * * * *`
- A cada 30 minutos: `*/30 * * * *`
- A cada hora: `0 * * * *`

## Melhorias Futuras
- Preencher links de Saúde e Meio Ambiente.
- ~~Modo escuro~~ ✅ Implementado
- ~~Carregamento por JSON externo~~ ✅ Implementado para manobras
- Filtro por categoria/tag.
- Agrupar por seções internas.
- Log de alterações.

## Contribuição
Use Pull Requests ou Issues para sugerir melhorias.

---
Feito para otimizar o trabalho diário da equipe SSMA.