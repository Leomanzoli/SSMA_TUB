const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Tema escuro/claro
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

// Função para alternar tema
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Suporte para touch e click
themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('touchend', (e) => {
  e.preventDefault();
  toggleTheme();
});

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
    descricao: 'Portal IRIS para registro de N3 e inspeções.',
    url: 'https://iris.valeglobal.net/login',
    categoria: 'Formulário',
    tag: 'ROTINA',
    hasInspectionList: true
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
    descricao: 'Diretório dos Procedimentos Operacionais.',
    url: 'https://sodexo.sharepoint.com/:f:/r/sites/SSMA5900127640/Documents%20partages/SSMA%205900127640/SST/4.%20Gest%C3%A3o%20de%20Performance%20e%20Melhoria%20Cont%C3%ADnua/00_PROCEDIMENTOS_ORMEC?csf=1&web=1&e=pY34Br',
    categoria: 'Documentação',
    tag: 'DOCUMENTOS'
  },
  {
    titulo: 'SISPAV',
    descricao: 'Diretório dos Procedimentos Vale.',
    url: 'https://vale.softexpert.com/softexpert/workspace?page=home',
    categoria: 'Sistema',
    tag: 'DOCUMENTOS'
  },
  {
    titulo: 'Programa Tutor',
    descricao: 'Dashboard do Programa Tutor.',
    url: 'https://app.powerbi.com/groups/me/apps/c6b7ad92-428f-4ce8-a17b-5e57be6ebdad/reports/c20236ef-2e92-4d92-9559-6482fab042c4/ReportSectione9aa759ab59550b8ac99?experience=power-bi&bookmarkGuid=9d682296d5f62e7bc084',
    categoria: 'Dashboard',
    tag: 'ROTINA'
  },
  {
    titulo: 'Painel de Inspeções',
    descricao: 'Dashboard de acompanhamento de inspeções realizadas.',
    url: 'https://app.powerbi.com/groups/me/apps/f1e0a66d-7fb8-481d-837f-121fc3dc59be/reports/4b150e89-01be-4a50-b790-2db09cc797a9/ae22d23fed00c17264bb?ctid=7893571b-6c2c-4cef-b4da-7d4b266a0626&experience=power-bi',
    categoria: 'Dashboard',
    tag: 'GESTÃO'
  },
  {
    titulo: 'Painel de N3',
    descricao: 'Dashboard de monitoramento e análise de N3.',
    url: 'https://app.powerbi.com/groups/me/apps/c6b7ad92-428f-4ce8-a17b-5e57be6ebdad/reports/235a1467-8c85-4aa5-a489-4026d8841c4f/ReportSection2efad9912839b66f11be?experience=power-bi&bookmarkGuid=7b4f0100c534d9d7a663',
    categoria: 'Dashboard',
    tag: 'GESTÃO'
  },
  {
    titulo: 'Painel Planejamento Seguro',
    descricao: 'Dashboard de acompanhamento do Planejamento Seguro.',
    url: 'https://app.powerbi.com/groups/me/apps/0210860e-0e28-494e-b142-fff48076bfcc/reports/3d00fa8c-dd02-4c2e-a97a-2a49fdefac10/d75a967fa092e070c509?ctid=7893571b-6c2c-4cef-b4da-7d4b266a0626&experience=power-bi&bookmarkGuid=d64746e0bd90e941d19a',
    categoria: 'Dashboard',
    tag: 'GESTÃO'
  },
  {
    titulo: 'Cadastro de ARTs',
    descricao: 'Aplicativo PowerApps para cadastro das ARTs.',
    url: 'https://apps.powerapps.com/play/e/default-7893571b-6c2c-4cef-b4da-7d4b266a0626/a/4bd955ac-07d9-4ebd-a722-6c1e3260f758?tenantId=7893571b-6c2c-4cef-b4da-7d4b266a0626&sourcetime=1724266343911&source=portal',
    categoria: 'Aplicativo',
    tag: 'GESTÃO'
  },
  {
    titulo: 'Impressão de ARTs',
    descricao: 'Relatório Power BI para impressão de ARTs cadastradas.',
    url: 'https://app.powerbi.com/groups/me/apps/f1e0a66d-7fb8-481d-837f-121fc3dc59be/rdlreports/e8176833-ef86-4cd2-b6fe-7e369435df7b?ctid=7893571b-6c2c-4cef-b4da-7d4b266a0626&experience=power-bi',
    categoria: 'Relatório',
    tag: 'ROTINA',
    hasArtList: true
  },
  {
    titulo: 'VES',
    descricao: 'Acesso ao portal de treinamentos Vale.',
    url: 'https://vale.plateau.com/learning/user/portal.do?siteID=VES_FOR_CONTRACTORS&landingPage=login',
    categoria: 'Portal',
    tag: 'TREINAMENTOS'
  }
];

const inspectionList = [
  { code: 'INSP_RAC10_PE', name: 'RAC 10 - Planejamento e execução' },
  { code: 'INSP_RAC08_P', name: 'RAC 08 - Pilhas' },
  { code: 'INSP_RAC09_T', name: 'RAC 09 - Transporte' },
  { code: 'INSP_RAC10_IE', name: 'RAC 10 - Instalações e equipamentos' },
  { code: 'INSP_RAC08_ES', name: 'RAC 08 - Escavação subterrânea' },
  { code: 'INSP_RAC08_CT', name: 'RAC 08 - Cavas e taludes' },
  { code: 'INSP_RAC02_VO', name: 'RAC 02 - Veículos que acessam área operacional' },
  { code: 'INSP_RAC03_EM', name: 'RAC 03 - Motoniveladoras, escrêipes, pás carregadeiras, retroescavadeiras, escavadeiras e tratores' },
  { code: 'INSP_RAC01_EP', name: 'RAC 01 - Escadas móveis e plataformas' },
  { code: 'INSP_RAC05_PR', name: 'RAC 05 - Pontes rolantes, monovias e talhas' },
  { code: 'INSP_RAC03_OC', name: 'RAC 03 - Outros caminhões' },
  { code: 'INSP_RAC03_CV', name: 'RAC 03 - Condições de vias operacionais' },
  { code: 'INSP_RAC09_A', name: 'RAC 09 - Armazenamento' },
  { code: 'INSP_RAC01_RG', name: 'RAC 01 - Requisitos gerais - Aberturas (grades de piso, guarda-corpo e alçapões)' },
  { code: 'INSP_RAC07', name: 'RAC 07 - Proteção de máquinas' },
  { code: 'INSP_RAC09_E', name: 'RAC 09 - Execução' },
  { code: 'INSP_RAC05_O', name: 'RAC 05 - Outros dispositivos ou equipamentos de içamento' },
  { code: 'INSP_RAC04_IB', name: 'RAC 04 - Identificação, bloqueio e zero energia' },
  { code: 'INSP_RAC02_CV', name: 'RAC 02 - Condições de vias operacionais' },
  { code: 'INSP_RAC06', name: 'RAC 06 - Espaços confinados' },
  { code: 'INSP_RAC05_G', name: 'RAC 05 - Guindastes sobre rodas e guindastes veiculares articulados' },
  { code: 'INSP_RAC10_PP', name: 'RAC 10 - Pessoas e procedimentos' },
  { code: 'INSP_RAC01_A', name: 'RAC 01 - Andaimes' }
];

const artList = [
  { id: '143576', area: 'PORTO (todas as áreas)', description: 'LIMPEZA DE VIA COM AUXÍLIO DO CAMINHÃO PIPA' },
  { id: '143587', area: 'PORTO (todas as áreas)', description: 'LIMPEZA DAS LATERAIS DA VIA COM USO DE FERRAMENTAS' },
  { id: '143692', area: 'PORTO (todas as áreas)', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA (NR33)-R2' },
  { id: '144045', area: 'PORTO (todas as áreas)', description: 'SERVIÇO DE SINALEIRO DE VIA EM PARE E SIGA' },
  { id: '145892', area: 'PORTO (todas as áreas)', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTAS NOS PÁTIOS E RETROÁRIAS' },
  { id: '41934', area: 'PORTO (todas as áreas)', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTAS COM TRABALHO EM ALTURA' },
  { id: '150367', area: 'PORTO (todas as áreas)', description: 'VIGIA DE LIMPEZA NO CAMINHO DE ROLAMENTO COM EQUIPAMENTO MÓVEL' },
  { id: '150606', area: 'PORTO (todas as áreas)', description: 'TROCA DE PNEUS' },
  { id: '150953', area: 'PORTO (todas as áreas)', description: 'RECOLHIMENTO DE SUCATAS - 5S' },
  { id: '41916', area: 'EMBARQUE', description: 'LIMPEZA COM FLUTUANTE NO PÍER 2 - COM USO DE FERRAMENTAS MANUAIS' },
  { id: '41968', area: 'EMBARQUE', description: 'AMARRAÇÃO E DESAMARRAÇÃO DE NAVIOS - PÍER 1 - REV.02' },
  { id: '105463', area: 'EMBARQUE', description: 'LIMPEZA NA LAGE DO CONTRAPESO DA D15' },
  { id: '112228', area: 'EMBARQUE', description: 'ABASTECIMENTO DE CX D\'ÁGUA-PÍER 1' },
  { id: '81924', area: 'EMBARQUE', description: 'ABASTECIMENTO DE CX D\'ÁGUA-PÍER 2' },
  { id: '134180', area: 'EMBARQUE', description: 'LIMPEZA MANUAL COM ÁGUA - ER 01, 02 e 03 (MINÉRIO)' },
  { id: '139256', area: 'EMBARQUE', description: 'LIMPEZA COM ÁGUA E SABÃO DAS ESTRUTURAS DOS CNs' },
  { id: '145230', area: 'EMBARQUE', description: 'LIMPEZA COM ÁGUA E FERRAMENTAS ENCLAUSURAMENTO PIER 1 MINÉRIO' },
  { id: '145891', area: 'EMBARQUE', description: 'AMARRAÇÃO E DESAMARRAÇÃO DE NAVIOS - PÍER 2' },
  { id: '41906', area: 'EMBARQUE', description: 'LIMPEZA EMBARCADA PIER 1 E PIER 2' },
  { id: '146226', area: 'EMBARQUE', description: 'LIMPEZA MANUAL COM FERRAMENTAS ACIONAMENTO CN03 E CN04' },
  { id: '146321', area: 'EMBARQUE', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA PÍER 2' },
  { id: '146304', area: 'EMBARQUE', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA PÍER E CANALETAS PÍER 1' },
  { id: '146279', area: 'EMBARQUE', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA NO LADO NORTE PÍER 1' },
  { id: '150534', area: 'EMBARQUE', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA CNs - PÍER 2' },
  { id: '146066', area: 'TPM', description: 'ABASTECIMENTO DE CAIXA D\'ÁGUA DNs' },
  { id: '146208', area: 'TPM', description: 'ENLONAMENTO DE CARRETAS' },
  { id: '41923', area: 'TPM', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA PÍER E CANALETAS-R2' },
  { id: '103739', area: 'TPM', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA DESCARREGADORES DE NAVIO' },
  { id: '110801', area: 'TPM', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA NO SILO DE CARVÃO' },
  { id: '128813', area: 'TPM', description: 'LIMPEZA COM AGUA E FERRAMENTAS ENCLAUSURAMENTO PIER TPM' },
  { id: '134168', area: 'TPM', description: 'LIMPEZA MANUAL COM ÁGUA - RC 06 (TPM)' },
  { id: '134170', area: 'TPM', description: 'LIMPEZA MANUAL COM ÁGUA - RC 07 (TPM)' },
  { id: '138476', area: 'TPM', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA NO LADO NORTE-R2' },
  { id: '145867', area: 'TPM', description: 'AMARRAÇÃO E DESAMARRAÇÃO DE NAVIOS -PÍER DE CARVÃO' },
  { id: '146199', area: 'TPM', description: 'LIMPEZA EMBARCADA TPM' },
  { id: '41957', area: 'TPM', description: 'POSICIONAMENTO E RETIRADA DE LONA EM NAVIO' },
  { id: '151010', area: 'TPM', description: 'LIMPEZA MANUAL COM ÁGUA DA GRELHA E CALHA - DN06 E DN07' },
  { id: '154316', area: 'TPM', description: 'LIMPEZA MANUAL COM ÁGUA CHUTE CABEÇA MÓVEL TC28 (SILO)' },
  { id: '134181', area: 'DESCARREGAMENTO', description: 'LIMPEZA MANUAL COM ÁGUA - RC 03 E RC01 (MINÉRIO)' },
  { id: '139410', area: 'DESCARREGAMENTO', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTA RODA EQUALIZADORA' },
  { id: '146027', area: 'DESCARREGAMENTO', description: 'LIMPEZA MANUAL COM ÁGUA E FERRAMENTAS VIRADORES DE VAGÕES' },
  { id: '147442', area: 'DESCARREGAMENTO', description: 'LIMPEZA MANUAL COM ÁGUA - EP01' },
  { id: '151854', area: 'DESCARREGAMENTO', description: 'LIMPEZA MANUAL COM ÁGUA - 5PA4' },
  { id: '96317', area: 'DESCARREGAMENTO', description: 'DES-CANALETA ETE N X ETE S-LIMPEZA MANUAL C ÁGUA E FERRAMENTA-R0' },
  { id: '41887', area: 'DESCARREGAMENTO', description: 'DES-PÁTIOS E RETROÁREAS-DESOBSTRUÇÃO DE CHUTES C ÁGUA E FERRAMENTA-R1' },
  { id: '41931', area: 'DESCARREGAMENTO', description: 'DES-PÁTIOS E RETROÁREAS-LIMP C ÁGUA DE CALHAS E BANEJAMENTOS SOBRE VIAS-R1' },
  { id: '41946', area: 'DESCARREGAMENTO', description: 'DES-VV-BARRILETE-LIMPEZA MANUAL C ÁGUA E FERRAMENTA-R1' },
  { id: '41948', area: 'DESCARREGAMENTO', description: 'DES-VV-RETIRADA DE MATACO COM AUXILIO DO ORMIG-R2' },
  { id: '41904', area: 'DESCARREGAMENTO', description: 'DES-VV-RODA EQUALIZADORA-LIMPEZA MANUAL C ÁGUA E FERRAMENTA-R1' },
  { id: '41953', area: 'DESCARREGAMENTO', description: 'DES-PÁTIOS-LIMP EM CHUTES DE MÁQUINAS DE PÁTIO-R1' },
  { id: '41958', area: 'DESCARREGAMENTO', description: 'DES-VV-LIMP MANUAL C ÁGUA E FERRAMENTA-R1' },
  { id: '41966', area: 'DESCARREGAMENTO', description: 'DES-VV-RECOLHIMENTO DE SUCATAS 5S-R1' },
  { id: '98302', area: 'MECÂNICA', description: 'INSTALAÇÃO DE PONTOS DE AGUA' },
  { id: '103050', area: 'MECÂNICA', description: 'LIMPEZA COM UTILIZAÇÃO ROMPEDOR ELÉTRICO' },
  { id: '146212', area: 'MECÂNICA', description: 'SUCATEAMENTO E REPARO DE PEÇAS METALICAS' },
  { id: '146211', area: 'MECÂNICA', description: 'FABRICAÇÃO E INSTALAÇÃO DE PEÇAS METÁLICAS (CALDEIRARIA)' },
  { id: '105629', area: 'MECÂNICA', description: 'SUBTITUIÇÃO DE TUBULAÇÃO' },
  { id: '103488', area: 'MECÂNICA', description: 'UTILIZAÇÃO DE FERRAMENTAS DE GOLPE' },
  { id: '41961', area: 'OPERAÇÃO', description: 'OPERAR ROÇADEIRA MECANIZADA' },
  { id: '41967', area: 'PINTURA', description: 'PINTURAS EM GERAL' }
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
          ${link.hasInspectionList 
            ? `<button class="btn-link secondary inspection-list-btn" aria-label="Ver lista de inspeções">Lista de Inspeções</button>`
            : ''
          }
          ${link.hasArtList 
            ? `<button class="btn-link secondary art-list-btn" aria-label="Ver lista de ARTs">Lista de ARTs</button>`
            : ''
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
  
  // Event listener para botões de lista de inspeções
  document.querySelectorAll('.inspection-list-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      showInspectionModal();
    });
  });
  
  // Event listener para botões de lista de ARTs
  document.querySelectorAll('.art-list-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      showArtModal();
    });
  });
}

function showInspectionModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Lista de Inspeções</h3>
        <button class="modal-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="modal-body">
        <input type="search" id="inspection-search" placeholder="Buscar inspeção..." class="inspection-search" />
        <div class="inspection-list">
          ${inspectionList.map(insp => `
            <div class="inspection-item" data-search="${insp.code.toLowerCase()} ${insp.name.toLowerCase()}">
              <div class="inspection-info">
                <strong>${insp.code}</strong>
                <span>${insp.name}</span>
              </div>
              <button class="btn-copy" data-code="${insp.code}" title="Copiar código">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copiar
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Fechar modal
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Busca dentro do modal
  const searchInput = modal.querySelector('#inspection-search');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    modal.querySelectorAll('.inspection-item').forEach(item => {
      const searchText = item.dataset.search || '';
      item.style.display = searchText.includes(query) ? 'flex' : 'none';
    });
  });
  
  // Copiar código
  modal.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', async function() {
      const code = this.dataset.code;
      try {
        await navigator.clipboard.writeText(code);
        this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copiado!';
        this.style.background = '#28a745';
        setTimeout(() => {
          this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copiar';
          this.style.background = '';
        }, 2000);
      } catch (err) {
        alert('Erro ao copiar: ' + err);
      }
    });
  });
}

function showArtModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Lista de ARTs</h3>
        <button class="modal-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="modal-body">
        <input type="search" id="art-search" placeholder="Buscar ART por ID, área ou descrição..." class="inspection-search" />
        <div class="inspection-list">
          ${artList.map(art => `
            <div class="inspection-item art-item" data-search="${art.id} ${art.area.toLowerCase()} ${art.description.toLowerCase()}">
              <div class="inspection-info">
                <strong>${art.id}</strong>
                <span class="art-area">${art.area}</span>
                <span>${art.description}</span>
              </div>
              <button class="btn-copy" data-code="${art.id}" title="Copiar ID">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copiar
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Fechar modal
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Busca dentro do modal
  const searchInput = modal.querySelector('#art-search');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    modal.querySelectorAll('.art-item').forEach(item => {
      const searchText = item.dataset.search || '';
      item.style.display = searchText.includes(query) ? 'flex' : 'none';
    });
  });
  
  // Copiar ID
  modal.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', async function() {
      const code = this.dataset.code;
      try {
        await navigator.clipboard.writeText(code);
        this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copiado!';
        this.style.background = '#28a745';
        setTimeout(() => {
          this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copiar';
          this.style.background = '';
        }, 2000);
      } catch (err) {
        alert('Erro ao copiar: ' + err);
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
