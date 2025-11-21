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
- (Opcional futuro) `data/links.json` — Para carregar via `fetch`.

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

## Melhorias Futuras
- Preencher links de Saúde e Meio Ambiente.
- Modo escuro.
- Carregamento por JSON externo.
- Filtro por categoria/tag.
- Agrupar por seções internas.
- Log de alterações.

## Contribuição
Use Pull Requests ou Issues para sugerir melhorias.

---
Feito para otimizar o trabalho diário da equipe SSMA.