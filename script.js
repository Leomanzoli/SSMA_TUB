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
    titulo: 'Manobras Previstas',
    descricao: 'Acompanhamento em tempo real das manobras previstas nos berços PRMCV1, PRMCV2, TUBP02, TUBP1N, TUBP1S e TUBTGL.',
    categoria: 'Dashboard',
    tag: 'ROTINA',
    isModal: true,
    modalId: 'manobras-modal'
  },
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
        titulo: 'DT - Diagnóstico Técnico',
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
    tag: 'GESTÃO'
  },
  {
    titulo: 'App Tutoria',
    descricao: 'Aplicativo de gestão de tutoria e acompanhamento.',
    url: 'https://apps.powerapps.com/play/e/default-7893571b-6c2c-4cef-b4da-7d4b266a0626/a/26c4559c-dc51-4085-836c-19f1f69ca32e?tenantId=7893571b-6c2c-4cef-b4da-7d4b266a0626&hint=8415682f-7cf4-48e0-b8d7-3f41f1bc423b&sourcetime=1710955843781&source=portal',
    categoria: 'Aplicativo',
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
  },
  {
    titulo: 'Pátio de Carvão',
    descricao: 'Formulário de treinamento e integração para Pátio de Carvão.',
    url: 'https://vale-forms.valeglobal.net/public?id=8g4XP6DS7NGjnuZSj%2FnleA%3D%3D&lang=pt-BR&need_auth=false',
    categoria: 'Treinamento',
    tag: 'TREINAMENTOS'
  },
  {
    titulo: 'Píer de Carvão',
    descricao: 'Formulário de treinamento e integração para Píer de Carvão.',
    url: 'https://vale-forms.valeglobal.net/public?id=w9um%2BBUI9lQs0mIrGuGk5w%3D%3D&lang=pt-BR&need_auth=false',
    categoria: 'Treinamento',
    tag: 'TREINAMENTOS'
  },
  {
    titulo: 'Porto Minério',
    descricao: 'Formulário de treinamento e integração para Porto Minério.',
    url: 'https://vale-forms.valeglobal.net/public?id=Q%2F9FQsStnJFQm67KaD44kQ%3D%3D&lang=pt-BR',
    categoria: 'Treinamento',
    tag: 'TREINAMENTOS'
  },
  {
    titulo: 'SGC',
    descricao: 'Sistema de Gestão de Conformidade - Gestão de processos e conformidade.',
    url: 'https://valesgc.valeglobal.net/SGCMOB/#/main/home',
    categoria: 'Sistema',
    tag: 'GESTÃO'
  }
];

// Links de Saúde
const saudeLinks = [
  {
    titulo: 'Absenteísmo',
    descricao: 'Formulário para registro e controle de absenteísmo.',
    url: 'https://forms.office.com/e/svUMpmD1dH',
    categoria: 'Formulário',
    tag: 'ROTINA'
  },
  {
    titulo: 'Questionário de Saúde',
    descricao: 'Questionário de saúde ocupacional para preenchimento.',
    url: 'https://forms.office.com/e/svUMpmD1dH',
    categoria: 'Formulário',
    tag: 'GESTÃO'
  }
];

// Links de Meio Ambiente
const meioAmbienteLinks = [
  {
    titulo: 'Inspeções',
    descricao: 'Portal IRIS para registro de inspeções ambientais.',
    url: 'https://iris.valeglobal.net/login',
    categoria: 'Formulário',
    tag: 'ROTINA',
    hasInspectionListMA: true
  },
  {
    titulo: 'CCA',
    descricao: 'Centro de Controle Ambiental - Reporte de eventos ambientais.',
    categoria: 'Contato',
    tag: 'ROTINA',
    hasDualButtons: true,
    whatsappNumber: '5527988175824',
    informativoUrl: 'assets/cca-informativo.html'
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
        titulo: 'DT - Diagnóstico Técnico',
        url: 'https://vale-forms.valeglobal.net/public?id=v5W%2bBuuTI4HEm9JBbmccmQ%3d%3d&lang=pt-BR&need_auth=false'
      }
    ]
  },
  {
    titulo: 'VES',
    descricao: 'Acesso ao portal de treinamentos Vale.',
    url: 'https://vale.plateau.com/learning/user/portal.do?siteID=VES_FOR_CONTRACTORS&landingPage=login',
    categoria: 'Portal',
    tag: 'TREINAMENTOS'
  },
  {
    titulo: 'SISPAV',
    descricao: 'Diretório dos Procedimentos Vale.',
    url: 'https://vale.softexpert.com/softexpert/workspace?page=home',
    categoria: 'Sistema',
    tag: 'DOCUMENTOS'
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
  { code: 'INSP_RAC01_A', name: 'RAC 01 - Andaimes' },
  { code: 'DIFERR_5S', name: 'Inspeção de 5S – Vale' },
  { code: 'DIFERR_ART', name: 'Inspeção em ART - Diretoria de Ferrosos' },
  { code: 'INSP_LIMP_IND_FC', name: 'Limpeza industrial (manual) - Fiscalização de Contratos' },
  { code: 'INSP_PTS', name: 'Avaliação de Permissão de Trabalho Seguro (PTS)' }
];

const inspectionListMeioAmbiente = [
  { code: 'DIFERR_MA_ADM', name: 'Inspeção de Meio Ambiente Administrativo - Diretoria de Operações' },
  { code: 'DIFERR_INCEND_FLOREST', name: 'Inspeção de Prevenção de Incêndio Florestal' },
  { code: 'DIFERR_MA_OPERACIONAL', name: 'Inspeção de Meio Ambiente Operacional - Diretoria de Operações' },
  { code: 'DIFERR_PLANO_CHUVA', name: 'Inspeção de Plano de Chuvas' },
  { code: 'DIFERR_5S', name: 'Inspeção de 5S – Vale' }
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
  { id: '41961', area: 'ROÇADEIRA', description: 'OPERAR ROÇADEIRA MECANIZADA' },
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
          ${link.isCalendar
            ? `<button class="btn-link" aria-label="Abrir calendário de escalas">Ver Calendário</button>`
            : link.isModal
              ? `<button class="btn-link" data-modal-id="${link.modalId}" aria-label="Abrir ${link.titulo}">Visualizar</button>`
              : link.url
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
  
  // Event listener para botão de calendário
  document.querySelectorAll('.actions .btn-link').forEach(btn => {
    if (btn.textContent.includes('Ver Calendário')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        showCalendarModal();
      });
    }
  });
  
  // Event listener para botões de modal (como Manobras Previstas)
  document.querySelectorAll('.actions .btn-link[data-modal-id]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal-id');
      
      if (modalId === 'manobras-modal') {
        openManobrasModal();
      }
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

function showInspectionModalMA() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>Lista de Inspeções - Meio Ambiente</h3>
        <button class="modal-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="modal-body">
        <input type="search" id="inspection-search-ma" placeholder="Buscar inspeção..." class="inspection-search" />
        <div class="inspection-list">
          ${inspectionListMeioAmbiente.map(insp => `
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
  const searchInput = modal.querySelector('#inspection-search-ma');
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

// Configuração das escalas
// Referências:
//   Operação: mantém referência em 21/11 também sem quebrar sequência (C,C,D,D,A,A,B,B)
//   Segurança: 22/11 é o SEGUNDO dia do par 3/1, portanto referência precisa ser 21/11 para que índice 1 seja 22/11.
// Padrão Segurança (ciclo de 4 dias): 2 dias 3/1, 2 dias 2/4, repete.
// Amostragem confirmada:
// 21-22/11: dia=3 noite=1 | 23-24/11: dia=2 noite=4 | 25-26/11: dia=3 noite=1 | 27-28/11: dia=2 noite=4 | 29-30/11: dia=3 noite=1 ...
const scaleConfig = {
  referenceDate: new Date(2025, 10, 22), // 22 de novembro de 2025
  operation: {
    morning: ['C', 'C', 'B', 'B', 'C', 'C', 'B', 'B'], // Ciclo de 8 dias
    night: ['A', 'A', 'D', 'D', 'A', 'A', 'D', 'D']
  },
  safety: {
    day:  ['3', '2', '2', '3', '3', '2', '2', '3'],
    night:['1', '4', '4', '1', '1', '4', '4', '1']
  }
};

function getScaleForDate(date) {
  const diffTime = date - scaleConfig.referenceDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const cycleDay = ((diffDays % 8) + 8) % 8; // Garante valor positivo
  
  return {
    operation: {
      morning: scaleConfig.operation.morning[cycleDay],
      night: scaleConfig.operation.night[cycleDay]
    },
    safety: {
      day: scaleConfig.safety.day[cycleDay],
      night: scaleConfig.safety.night[cycleDay]
    }
  };
}

function showCalendarModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let selectedScale = null; // Nenhuma escala selecionada inicialmente
  
  function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const weekdayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    let calendarHTML = `
      <div class="calendar-header">
        <button class="calendar-nav" data-action="prev">&larr;</button>
        <h4>${monthNames[currentMonth]} ${currentYear}</h4>
        <button class="calendar-nav" data-action="next">&rarr;</button>
      </div>
      <div class="calendar-days">
    `;
    
    // Dias vazios antes do primeiro dia
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const scales = getScaleForDate(date);
      const weekdayLabel = weekdayNames[date.getDay()];
      
      // Verificar se o dia contém a escala selecionada
      let hasSelectedScale = false;
      if (selectedScale) {
        const allScales = [
          scales.operation.morning,
          scales.operation.night,
          scales.safety.day,
          scales.safety.night
        ];
        hasSelectedScale = allScales.includes(selectedScale);
      }
      
      calendarHTML += `
        <div class="calendar-day ${isToday ? 'today' : ''} ${hasSelectedScale ? 'highlighted' : ''}" data-date="${date.toISOString()}">
          <div class="weekday-label">${weekdayLabel}</div>
          <div class="day-number">${day}</div>
          <div class="day-scales">
            <div class="scale-row">
              <span class="scale-label">Op:</span>
              <span class="scale-letter ${selectedScale === scales.operation.morning ? 'selected-scale' : ''}">${scales.operation.morning}</span>
              <span class="scale-letter night ${selectedScale === scales.operation.night ? 'selected-scale' : ''}">${scales.operation.night}</span>
            </div>
            <div class="scale-row">
              <span class="scale-label">Seg:</span>
              <span class="scale-letter ${selectedScale === scales.safety.day ? 'selected-scale' : ''}">${scales.safety.day}</span>
              <span class="scale-letter night ${selectedScale === scales.safety.night ? 'selected-scale' : ''}">${scales.safety.night}</span>
            </div>
          </div>
        </div>
      `;
    }
    
    calendarHTML += '</div>';
    
    return calendarHTML;
  }
  
  modal.innerHTML = `
    <div class="modal-content calendar-modal">
      <div class="modal-header">
        <h3>Calendário de Escalas</h3>
        <button class="modal-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="modal-body">
        <div class="calendar-scale-filter">
          <label for="scale-selector">Filtrar por escala:</label>
          <select id="scale-selector" class="scale-selector">
            <option value="">Todas as escalas</option>
            <option value="A">Escala A</option>
            <option value="B">Escala B</option>
            <option value="C">Escala C</option>
            <option value="D">Escala D</option>
            <option value="1">Escala 1</option>
            <option value="2">Escala 2</option>
            <option value="3">Escala 3</option>
            <option value="4">Escala 4</option>
          </select>
        </div>
        <div class="calendar-legend">
          <div><strong>Op:</strong> Operação</div>
          <div><strong>Seg:</strong> Segurança</div>
          <div><span class="legend-day">▪</span> Dia</div>
          <div><span class="legend-night">▪</span> Noite</div>
        </div>
        <div class="calendar-container">
          ${renderCalendar()}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Seletor de escala
  const scaleSelector = modal.querySelector('#scale-selector');
  scaleSelector.addEventListener('change', function() {
    selectedScale = this.value || null;
    modal.querySelector('.calendar-container').innerHTML = renderCalendar();
    setupNavigation();
  });
  
  // Fechar modal
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Navegação de mês
  function setupNavigation() {
    modal.querySelectorAll('.calendar-nav').forEach(btn => {
      btn.addEventListener('click', function() {
        if (this.dataset.action === 'prev') {
          currentMonth--;
          if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
          }
        } else {
          currentMonth++;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
          }
        }
        
        modal.querySelector('.calendar-container').innerHTML = renderCalendar();
        setupNavigation(); // Re-anexar eventos após re-render
      });
    });
  }
  
  setupNavigation();
}

renderSeguranca();

// Função para renderizar links de Saúde
function renderSaude() {
  const cont = document.getElementById('saude-links');
  if (!cont) return;
  cont.innerHTML = '';
  
  saudeLinks.forEach((link) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.search = (link.titulo + ' ' + link.descricao + ' ' + (link.categoria || '') + ' ' + (link.tag || '')).toLowerCase();
    
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
    cont.appendChild(card);
  });
}

// Função para renderizar links de Meio Ambiente
function renderMeioAmbiente() {
  const cont = document.getElementById('meio-ambiente-links');
  if (!cont) return;
  cont.innerHTML = '';
  
  meioAmbienteLinks.forEach((link, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.search = (link.titulo + ' ' + link.descricao + ' ' + (link.categoria || '') + ' ' + (link.tag || '')).toLowerCase();
    
    if (link.expandable && link.subopcoes) {
      // Card expansível
      card.innerHTML = `
        <h3>${link.titulo} ${link.tag ? `<span class="badge">${link.tag}</span>` : ''}</h3>
        <p>${link.descricao}</p>
        <div class="actions">
          <button class="btn-link expand-btn-ma" data-card-index="${index}" aria-label="Expandir opções">
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
          ${link.hasDualButtons
            ? `
              <a class="btn-link" href="https://wa.me/${link.whatsappNumber}" target="_blank" rel="noopener noreferrer" aria-label="Contatar via WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px; vertical-align: middle;">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <button class="btn-link secondary view-informativo-btn" data-url="${link.informativoUrl}" aria-label="Ver informativo">Ver Informativo</button>
            `
            : link.url
              ? `<a class="btn-link" href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir link: ${link.titulo}">Abrir</a>`
              : `<span class="btn-link secondary" title="Link não fornecido">Indisponível</span>`
          }
          ${link.hasInspectionListMA 
            ? `<button class="btn-link secondary inspection-list-btn-ma" aria-label="Ver lista de inspeções de meio ambiente">Lista de Inspeções</button>`
            : ''
          }
        </div>
      `;
    }
    cont.appendChild(card);
  });
  
  // Event listeners para botões de expansão
  document.querySelectorAll('.expand-btn-ma').forEach(btn => {
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
  
  // Event listener para botões de lista de inspeções de meio ambiente
  document.querySelectorAll('.inspection-list-btn-ma').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      showInspectionModalMA();
    });
  });
  
  // Event listener para botões de ver informativo
  document.querySelectorAll('.view-informativo-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.dataset.url;
      showInformativoModal(url);
    });
  });
}

function showInformativoModal(url) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 900px;">
      <div class="modal-header">
        <h3>Informativo CCA - Centro de Controle Ambiental</h3>
        <button class="modal-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="modal-body" style="padding: 0; max-height: 80vh; overflow-y: auto;">
        <iframe src="${url}" style="width: 100%; height: 80vh; border: none;" title="Informativo CCA"></iframe>
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
}

renderSaude();
renderMeioAmbiente();

// Event listener para botão de calendário global
const calendarBtn = document.getElementById('open-calendar-btn');
if (calendarBtn) {
  calendarBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showCalendarModal();
  });
}

// Event listener para botão de downloads
const downloadsBtn = document.getElementById('open-downloads-btn');
if (downloadsBtn) {
  downloadsBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showDownloadsModal();
  });
}

// Função para mostrar modal de downloads
function showDownloadsModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 500px;">
      <div class="modal-header">
        <h3>Downloads - App IRIS</h3>
        <button class="modal-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="modal-body">
        <div class="download-links">
          <a href="https://play.google.com/store/apps/details?id=com.vale.iris.app" target="_blank" rel="noopener noreferrer" class="download-link android">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.341c-.74 0-1.342.606-1.342 1.353s.602 1.353 1.342 1.353c.74 0 1.342-.606 1.342-1.353s-.602-1.353-1.342-1.353zm-11.046 0c-.74 0-1.342.606-1.342 1.353s.602 1.353 1.342 1.353c.74 0 1.342-.606 1.342-1.353s-.602-1.353-1.342-1.353zM12 .5c-.434 0-.856.028-1.27.08L8.078 3.233a8.98 8.98 0 013.844-.855c1.37 0 2.662.306 3.822.852l-2.652-2.653A11.463 11.463 0 0012 .5zm-8.51 4.556L.736 7.81C.264 8.837 0 9.955 0 11.136c0 .637.067 1.258.192 1.857l2.937-2.937a8.972 8.972 0 01.361-5zm16.982.008a8.965 8.965 0 01.361 4.992l2.937 2.937A11.427 11.427 0 0024 11.136c0-1.18-.264-2.298-.736-3.326l-2.753-2.754zM5.04 16.521l-2.88 2.88a11.435 11.435 0 004.007 3.157l2.655-2.655a8.975 8.975 0 01-3.782-3.382zm13.922.004a8.972 8.972 0 01-3.782 3.378l2.655 2.655a11.435 11.435 0 004.007-3.157l-2.88-2.876zM12 21.923a8.964 8.964 0 01-1.847-.192l2.653 2.653c.394.052.796.08 1.206.08.41 0 .812-.028 1.206-.08l2.653-2.653A8.964 8.964 0 0112 21.923z"/>
            </svg>
            <div>
              <strong>Iris para Android</strong>
              <span>Baixar na Google Play Store</span>
            </div>
          </a>
          <a href="https://apps.apple.com/us/app/iris-application/id6744179282" target="_blank" rel="noopener noreferrer" class="download-link ios">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <div>
              <strong>Iris para iPhone</strong>
              <span>Baixar na App Store</span>
            </div>
          </a>
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
}

// Filtro por tags
const filterTags = document.querySelectorAll('.filter-tag');
filterTags.forEach(btn => {
  btn.addEventListener('click', function() {
    const section = this.dataset.section || 'seguranca';
    const currentSection = document.getElementById(section);
    
    // Remove active apenas dos botões da mesma seção
    const sectionButtons = currentSection.querySelectorAll('.filter-tag');
    sectionButtons.forEach(b => b.classList.remove('active'));
    
    // Adiciona active no clicado
    this.classList.add('active');
    
    const tag = this.dataset.tag;
    const containerId = `${section}-links`;
    const cards = document.querySelectorAll(`#${containerId} .card`);
    
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

// ===== Modal de Manobras Previstas =====
const manobrasModal = document.getElementById('manobras-modal');
const manobrasCloseBtn = manobrasModal?.querySelector('.modal-close');

// Função para abrir o modal de manobras
function openManobrasModal() {
  if (!manobrasModal) return;
  
  manobrasModal.classList.add('active');
  manobrasModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Carregar dados ao abrir
  loadManobrasData();
}

// Função para fechar o modal
function closeManobrasModal() {
  if (!manobrasModal) return;
  
  manobrasModal.classList.remove('active');
  manobrasModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Event listeners do modal
if (manobrasCloseBtn) {
  manobrasCloseBtn.addEventListener('click', closeManobrasModal);
}

if (manobrasModal) {
  // Fechar ao clicar fora do conteúdo
  manobrasModal.addEventListener('click', (e) => {
    if (e.target === manobrasModal) {
      closeManobrasModal();
    }
  });
  
  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && manobrasModal.classList.contains('active')) {
      closeManobrasModal();
    }
  });
}

// Função para carregar e exibir dados de manobras
async function loadManobrasData() {
  const tbody = document.getElementById('manobras-tbody');
  const timestampEl = document.getElementById('manobras-timestamp');
  const totalEl = document.getElementById('manobras-total');
  
  if (!tbody) return;
  
  // Mostrar loading
  tbody.innerHTML = '<tr><td colspan="6" class="loading-msg">Carregando dados...</td></tr>';
  
  try {
    const response = await fetch('manobras-data.json?' + Date.now()); // Cache bust
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    // Atualizar timestamp
    if (data.ultima_atualizacao && timestampEl) {
      const date = new Date(data.ultima_atualizacao);
      timestampEl.textContent = date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Atualizar total
    if (totalEl) {
      totalEl.textContent = data.total || 0;
    }
    
    // Renderizar tabela
    if (!data.manobras || data.manobras.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-msg">Nenhuma manobra prevista para os berços monitorados.</td></tr>';
      return;
    }
    
    tbody.innerHTML = data.manobras.map(manobra => {
      // Determinar classe da situação
      let situacaoClass = 'situacao-badge ';
      const sit = (manobra.situacao || '').toLowerCase();
      
      if (sit.includes('prevista') || sit.includes('programada')) {
        situacaoClass += 'situacao-prevista';
      } else if (sit.includes('atracado') || sit.includes('atracada')) {
        situacaoClass += 'situacao-atracado';
      } else if (sit.includes('operando') || sit.includes('operação')) {
        situacaoClass += 'situacao-operando';
      } else if (sit.includes('encerrado') || sit.includes('concluído')) {
        situacaoClass += 'situacao-encerrado';
      }
      
      return `
        <tr>
          <td><strong>${escapeHtml(manobra.nome || '-')}</strong></td>
          <td>${escapeHtml(manobra.data || '-')}</td>
          <td>${escapeHtml(manobra.hora || '-')}</td>
          <td>${escapeHtml(manobra.manobra || '-')}</td>
          <td><strong>${escapeHtml(manobra.berco || '-')}</strong></td>
          <td><span class="${situacaoClass}">${escapeHtml(manobra.situacao || '-')}</span></td>
        </tr>
      `;
    }).join('');
    
  } catch (error) {
    console.error('Erro ao carregar manobras:', error);
    tbody.innerHTML = '<tr><td colspan="6" class="error-msg">Erro ao carregar dados. Tente novamente mais tarde.</td></tr>';
    
    if (timestampEl) {
      timestampEl.textContent = 'Indisponível';
    }
    if (totalEl) {
      totalEl.textContent = '0';
    }
  }
}

// Função auxiliar para escapar HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Futuro: fetch('data/links.json').then(...)
