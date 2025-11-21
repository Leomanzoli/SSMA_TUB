const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const tabs = document.querySelectorAll('.nav-btn');
const panels = document.querySelectorAll('.tab-panel');
const searchInput = document.getElementById('search');

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panels.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(btn.dataset.target);
    if (target) target.classList.add('active');
    if (searchInput.value.trim() !== '') {
      searchInput.value = '';
      filterCards('');
    }
  });
});

const segurancaLinks = [
  {
    titulo: 'Inspeções e N3',
    descricao: 'Portal IRIS para registro de N3 e Permissão de Trabalho em Manutenção/Contrato.',
    url: 'https://iris.valeglobal.net/login',
    categoria: 'Formulário',
    tag: 'ROTINA'
  },
  {
    titulo: 'DBC',
    descricao: 'Formulários de diagnóstico e dados comportamentais (DBC).',
    categoria: 'Formulário',
    tag: 'ROTINA',
    expandable: true,
    subopcoes: [
      {
        titulo: 'TE - Teste de Eficiência Geral',
        url: 'https://vale-forms.valeglobal.net/public?id=89tgFjrT8sWB6U7jbAcWYQ%3d%3d&lang=pt-BR&need_auth=false'
      },
      {
        titulo: 'DT - Diagnóstico Técnico Ormec',
        url: 'https://vale-forms.valeglobal.net/public?id=v5W%2bBuuTI4HEm9JBbmccmQ%3d%3d&lang=pt-BR&need_auth=false'
      }
    ]
  },
  {
    titulo: 'Planejamento Seguro',
    descricao: 'Formulário para envio das inspeções e atuações realizadas em campo.',
    url: 'https://vale-forms.valeglobal.net/public?id=ga8mPEgjITLWumkbc0fahQ%3D%3D&lang=pt-BR&need_auth=false',
    categoria: 'Relatório',
    tag: 'ROTINA'
  },
  {
    titulo: 'Procedimentos SDX',
    descricao: 'Diretório dos Procedimentos Operacionais (OneDrive).',
    url: 'https://1drv.ms/f/s!Aqsd28UkGoOpatqHmQRQit8MBpQ?e=A5OF0E',
    categoria: 'Documentação',
    tag: 'DOCUMENTOS'
  },
  {
    titulo: 'Impressão de ARTs',
    descricao: 'Aplicativo PowerApps para geração/impressão das ARTs.',
    url: 'https://apps.powerapps.com/play/e/default-7893571b-6c2c-4cef-b4da-7d4b266a0626/a/4bd955ac-07d9-4ebd-a722-6c1e3260f758?tenantId=7893571b-6c2c-4cef-b4da-7d4b266a0626&sourcetime=1724266343911&source=portal',
    categoria: 'Aplicativo',
    tag: 'ROTINA'
  },
  {
    titulo: 'VES',
    descricao: 'Acesso ao portal VES para contratados (login).',
    url: 'https://vale.plateau.com/learning/user/portal.do?siteID=VES_FOR_CONTRACTORS&landingPage=login',
    categoria: 'Portal',
    tag: 'TREINAMENTOS'
  }
];

function renderSeguranca() {
  const cont = document.getElementById('seguranca-links');
  if (!cont) return;
  cont.innerHTML = '';
  
  segurancaLinks.forEach((link, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.search = (link.titulo + ' ' + link.descricao + ' ' + (link.categoria || '') + ' ' + (link.tag || '')).toLowerCase();
    
    if (link.expandable && link.subopcoes) {
      // Card expansível
      card.innerHTML = `
        <h3>${link.titulo} ${link.tag ? `<span class="badge">${link.tag}</span>` : ''}</h3>
        <p>${link.descricao}</p>
        <div class="actions">
          <button class="btn-link expand-btn" data-card-index="${index}" aria-label="Expandir opções">
            <span class="expand-text">Ver opções</span>
            <span class="expand-icon">▼</span>
          </button>
        </div>
        <div class="subopcoes" style="display: none;">
          ${link.subopcoes.map(sub => `
            <div class="subopcao-item">
              <strong>${sub.titulo}</strong>
              <a class="btn-link" href="${sub.url}" target="_blank" rel="noopener noreferrer">Abrir</a>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      // Card normal
      card.innerHTML = `
        <h3>${link.titulo} ${link.tag ? `<span class="badge">${link.tag}</span>` : ''}</h3>
        <p>${link.descricao}</p>
        <div class="actions">
          ${link.url
            ? `<a class="btn-link" href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir link: ${link.titulo}">Abrir</a>`
            : `<span class="btn-link secondary" title="Link não fornecido">Indisponível</span>`
          }
        </div>
      `;
    }
    cont.appendChild(card);
  });
  
  // Adicionar event listeners para botões de expansão
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.card');
      const subopcoes = card.querySelector('.subopcoes');
      const icon = this.querySelector('.expand-icon');
      const text = this.querySelector('.expand-text');
      
      if (subopcoes.style.display === 'none') {
        subopcoes.style.display = 'block';
        icon.textContent = '▲';
        text.textContent = 'Ocultar opções';
        card.style.minHeight = 'auto';
      } else {
        subopcoes.style.display = 'none';
        icon.textContent = '▼';
        text.textContent = 'Ver opções';
        card.style.minHeight = '140px';
      }
    });
  });
}

renderSeguranca();

// Filtro por tags
const filterTags = document.querySelectorAll('.filter-tag');
filterTags.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active de todos
    filterTags.forEach(b => b.classList.remove('active'));
    // Adiciona active no clicado
    this.classList.add('active');
    
    const tag = this.dataset.tag;
    const cards = document.querySelectorAll('#seguranca-links .card');
    
    cards.forEach(card => {
      if (tag === 'all') {
        card.style.display = 'flex';
      } else {
        const cardTag = card.querySelector('.badge')?.textContent || '';
        card.style.display = cardTag === tag ? 'flex' : 'none';
      }
    });
  });
});

function filterCards(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.tab-panel.active .card').forEach(card => {
    const hay = card.dataset.search || '';
    card.style.display = hay.includes(q) ? 'flex' : 'none';
  });
}

searchInput.addEventListener('input', e => filterCards(e.target.value));

tabs.forEach(btn => {
  btn.addEventListener('keydown', e => {
    if (['ArrowRight','ArrowLeft'].includes(e.key)) {
      const arr = Array.from(tabs);
      const idx = arr.indexOf(btn);
      let nextIdx = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
      if (nextIdx < 0) nextIdx = arr.length - 1;
      if (nextIdx >= arr.length) nextIdx = 0;
      arr[nextIdx].focus();
    }
  });
});

// Futuro: fetch('data/links.json').then(...)
