const funcionariosOriginais = [
  "ADEMAR",
  "ALEXANDRE DONARIO",
  "ANDERSON RODRIGO",
  "ANDERSON VERPLOTZ",
  "BRUNO",
  "CARLOS FELIPE",
  "DIEGO",
  "DIRCEU",
  "FABIO",
  "FELIPE",
  "GABRIEL",
  "JEFFERSON",
  "JORGE",
  "JONATHAS",
  "JONNY",
  "MAICON",
  "MARCOS",
  "MARLON",
  "MATHEUS",
  "TIAGO BORGES",
  "WELINTON",
  "WILLIAM MONTEIRO",
  "AIRTON",
  "ALESSANDRO",
  "CLEBER",
  "DANIEL",
  "FERNANDO",
  "IVAN ALEMAO",
  "JOAO CARLOS - JC",
  "JOAO VITOR",
  "JOSE",
  "MAZOTTO",
  "MOISES",
  "SIDNEI",
  "TIAGO EDUARDO",
  "ALEXANDRE CATAFESTA",
  "CALEBE ESTAGIARIO",
  "LOIA",
  "VALLERIA",
  "ELISANGELA",
  "FERNANDA",
  "LUCIANE",
  "MESSERA",
  "RAFAELLA CRISTINA",
  "TAMARA",
  "YURI",
  "WILLIAN SCHMITZ",
  "ODAIR",
  "EVANDRO",
  "JULIANO",
  "CHALYTON",
  "JOSE",
  "RAFAEL",
  "GUILHERME",
  "RAFAELA PROF",
  "TAIS EMPREGADA",
  "ANDERSON ELETRICA",
  "LEO ELETRICA",
  "MONSTRO",
  "JEAN"
];

const produtosOriginais = [
  "ASPIRADOR",
  "ASPIRADOR",

  "CAFETEIRA",

  "CAIXA DE SOM (RETIRAR NA SEGUNDA-FEIRA)",
  "CAIXA DE SOM (RETIRAR NA SEGUNDA-FEIRA)",

  "CELULAR MOTO G",

  "CHURRASQUEIRA ELETRICA",
  "CHURRASQUEIRA ELETRICA",
  "CHURRASQUEIRA ELETRICA",
  "CHURRASQUEIRA ELETRICA",

  "COBRELEITO KING",

  "ESMERILHADEIRA ANGULAR",

  "FRITADEIRA ELETRICA (AIR FRYER)",
  "FRITADEIRA ELETRICA",
  "FRITADEIRA ELETRICA",
  "FRITADEIRA ELETRICA",
  "FRITADEIRA ELETRICA",
  "FRITADEIRA ELETRICA",
  "FRITADEIRA ELETRICA",

  "FURADEIRA ELETRICA",
  "FURADEIRA ELETRICA",

  "GELADEIRA",

  "GRILL ELETRICO",
  "GRILL ELETRICO",
  "GRILL ELETRICO",

  "KIT DE FERRAMENTAS BASICAS",
  "KIT DE FERRAMENTAS BASICAS",

  "LIQUIDIFICADOR",
  "LIQUIDIFICADOR",
  "LIQUIDIFICADOR",
  "LIQUIDIFICADOR",
  "LIQUIDIFICADOR",
  "LIQUIDIFICADOR",
  "LIQUIDIFICADOR",
  "LIQUIDIFICADOR",

  "PANELA DE PRESSÃO",
  "PANELA DE PRESSÃO",

  "PARAFUSADEIRA ELETRICA",
  "PARAFUSADEIRA ELETRICA",

  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",
  "SANDUICHEIRA",

  "SERRA TICO-TICO",

  "SOPRADOR TERMICO",
  "SOPRADOR TERMICO",

  "TV 32",
  "TV 32",
  "TV 32",
  "TV 32",

  "TV 42",

  "VENTILADOR",
  "VENTILADOR"
];

let participantes = funcionariosOriginais.map(nome => ({ nome, presente: true }));
let funcionariosAtivos = [];
let produtosAtivos = [...produtosOriginais];
let historicoSorteios = [];
let primeiroSorteioRealizado = false;

const funcionarioDisplay = document.getElementById('funcionarioDisplay');
const produtoDisplay = document.getElementById('produtoDisplay');
const funcionariosRestantes = document.getElementById('funcionariosRestantes');
const produtosRestantes = document.getElementById('produtosRestantes');
const participantesResumo = document.getElementById('participantesResumo');
const secaoParticipantes = document.getElementById('secaoParticipantes');
const sortearBtn = document.getElementById('sortearBtn');
const relatorioBtn = document.getElementById('relatorioBtn');
const gerenciarBtn = document.getElementById('gerenciarBtn');
const reiniciarContainer = document.getElementById('reiniciarContainer');
const reiniciarBtn = document.getElementById('reiniciarBtn');
const resultadoDiv = document.getElementById('resultado');
const participantesModal = document.getElementById('participantesModal');
const relatorioModal = document.getElementById('relatorioModal');
const confirmarModal = document.getElementById('confirmarModal');
const listaParticipantes = document.getElementById('listaParticipantes');
const relatorioBody = document.getElementById('relatorioBody');
const closeButtons = document.querySelectorAll('.close');
const confirmarSim = document.getElementById('confirmarSim');
const confirmarNao = document.getElementById('confirmarNao');

let intervaloAnimacao;
let sorteando = false;
let filtroAtual = 'todos';

function reiniciarSorteio() {
    participantes = funcionariosOriginais.map(nome => ({ nome, presente: true }));
    produtosAtivos = [...produtosOriginais];
    historicoSorteios = [];
    primeiroSorteioRealizado = false;
    
    secaoParticipantes.style.display = 'block';
    reiniciarContainer.style.display = 'none';
    relatorioBtn.style.display = 'none';
    sortearBtn.disabled = false;
    sorteando = false;
    
    if (intervaloAnimacao) {
        clearInterval(intervaloAnimacao);
        funcionarioDisplay.classList.remove('sorteando');
        produtoDisplay.classList.remove('sorteando');
    }
    
    atualizarParticipantesAtivos();
    
    if (funcionariosAtivos.length > 0) {
        funcionarioDisplay.textContent = funcionariosAtivos[0];
    }
    if (produtosAtivos.length > 0) {
        produtoDisplay.textContent = produtosAtivos[0];
    }
    
    resultadoDiv.classList.remove('mostrar');
    resultadoDiv.textContent = '';
    
    confirmarModal.style.display = 'none';
}

function atualizarParticipantesAtivos() {
    funcionariosAtivos = participantes.filter(p => p.presente).map(p => p.nome);
    atualizarContadores();
    atualizarResumo();
}

function atualizarContadores() {
    funcionariosRestantes.textContent = funcionariosAtivos.length;
    produtosRestantes.textContent = produtosAtivos.length;
}

function atualizarResumo() {
    participantesResumo.innerHTML = '';
    
    const presentes = participantes.filter(p => p.presente);
    const ausentes = participantes.filter(p => !p.presente);
    
    presentes.slice(0, 5).forEach(p => {
        const tag = document.createElement('span');
        tag.className = 'participante-tag';
        tag.textContent = p.nome.split(' ')[0];
        participantesResumo.appendChild(tag);
    });
    
    if (ausentes.length > 0) {
        const tag = document.createElement('span');
        tag.className = 'participante-tag ausente';
        tag.textContent = `${ausentes.length} ausente${ausentes.length > 1 ? 's' : ''}`;
        participantesResumo.appendChild(tag);
    }
    
    if (participantes.length > 5 + ausentes.length) {
        const tag = document.createElement('span');
        tag.className = 'participante-tag';
        tag.textContent = `+${participantes.length - 5 - ausentes.length}`;
        participantesResumo.appendChild(tag);
    }
}

function renderizarListaParticipantes() {
    listaParticipantes.innerHTML = '';
    
    let participantesFiltrados = participantes;
    if (filtroAtual === 'presentes') {
        participantesFiltrados = participantes.filter(p => p.presente);
    } else if (filtroAtual === 'ausentes') {
        participantesFiltrados = participantes.filter(p => !p.presente);
    }
    
    participantesFiltrados.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = `participante-item ${!p.presente ? 'ausente' : ''}`;
        
        item.innerHTML = `
            <div class="participante-info">
                <span class="participante-nome">${p.nome}</span>
                <span class="participante-status">${p.presente ? 'Presente' : 'Ausente'}</span>
            </div>
            <button class="btn-status ${!p.presente ? 'ausente' : ''}" data-index="${index}">
                ${p.presente ? 'Marcar Ausente' : 'Marcar Presente'}
            </button>
        `;
        
        listaParticipantes.appendChild(item);
    });
    
    document.querySelectorAll('.btn-status').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            participantes[index].presente = !participantes[index].presente;
            atualizarParticipantesAtivos();
            
            if (funcionariosAtivos.length === 0) {
                sortearBtn.disabled = true;
                resultadoDiv.textContent = "Não há participantes presentes!";
                resultadoDiv.classList.add('mostrar');
            }
            
            renderizarListaParticipantes();
            verificarFimSorteio();
        });
    });
}

function verificarFimSorteio() {
    if (funcionariosAtivos.length === 0 || produtosAtivos.length === 0) {
        sortearBtn.disabled = true;
        relatorioBtn.style.display = 'block';
        reiniciarContainer.style.display = 'block';
        
        if (funcionariosAtivos.length === 0) {
            resultadoDiv.textContent = "Todos os participantes foram sorteados!";
        } else if (produtosAtivos.length === 0) {
            resultadoDiv.textContent = "Todos os produtos foram sorteados!";
        }
        resultadoDiv.classList.add('mostrar');
    } else {
        sortearBtn.disabled = false;
    }
}

function getItemAleatorio(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function atualizarAnimacao() {
    if (funcionariosAtivos.length > 0) {
        funcionarioDisplay.textContent = getItemAleatorio(funcionariosAtivos);
    }
    if (produtosAtivos.length > 0) {
        produtoDisplay.textContent = getItemAleatorio(produtosAtivos);
    }
}

function iniciarSorteio() {
    if (sorteando || funcionariosAtivos.length === 0 || produtosAtivos.length === 0) return;
    
    if (!primeiroSorteioRealizado) {
        primeiroSorteioRealizado = true;
        secaoParticipantes.style.display = 'none';
    }
    
    sorteando = true;
    sortearBtn.disabled = true;
    resultadoDiv.classList.remove('mostrar');
    
    funcionarioDisplay.classList.add('sorteando');
    produtoDisplay.classList.add('sorteando');
    
    intervaloAnimacao = setInterval(atualizarAnimacao, 80);
    setTimeout(finalizarSorteio, 2000);
}

function finalizarSorteio() {
    clearInterval(intervaloAnimacao);
    
    funcionarioDisplay.classList.remove('sorteando');
    produtoDisplay.classList.remove('sorteando');
    
    const indexFuncionario = Math.floor(Math.random() * funcionariosAtivos.length);
    const indexProduto = Math.floor(Math.random() * produtosAtivos.length);
    
    const funcionarioSorteado = funcionariosAtivos[indexFuncionario];
    const produtoSorteado = produtosAtivos[indexProduto];
    
    funcionariosAtivos.splice(indexFuncionario, 1);
    produtosAtivos.splice(indexProduto, 1);
    
    historicoSorteios.push({
        funcionario: funcionarioSorteado,
        produto: produtoSorteado,
        data: new Date().toLocaleString()
    });
    
    funcionarioDisplay.textContent = funcionarioSorteado;
    produtoDisplay.textContent = produtoSorteado;
    
    atualizarContadores();
    
    resultadoDiv.textContent = `🎉 ${funcionarioSorteado} ganhou ${produtoSorteado}! 🎉`;
    resultadoDiv.classList.add('mostrar');
    
    sorteando = false; 
    verificarFimSorteio(); 
}

function mostrarRelatorio() {
    relatorioBody.innerHTML = '';
    
    if (historicoSorteios.length === 0) {
        relatorioBody.innerHTML = '<div class="relatorio-vazio">Nenhum sorteio realizado</div>';
    } else {
        historicoSorteios.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'relatorio-item';
            div.innerHTML = `<strong>${index + 1}º</strong> ${item.funcionario}<br><small>🎁 ${item.produto}</small>`;
            relatorioBody.appendChild(div);
        });
    }
    
    relatorioModal.style.display = 'block';
}

sortearBtn.addEventListener('click', iniciarSorteio);
relatorioBtn.addEventListener('click', mostrarRelatorio);

gerenciarBtn.addEventListener('click', () => {
    renderizarListaParticipantes();
    participantesModal.style.display = 'block';
});

reiniciarBtn.addEventListener('click', () => {
    confirmarModal.style.display = 'block';
});

confirmarSim.addEventListener('click', reiniciarSorteio);
confirmarNao.addEventListener('click', () => {
    confirmarModal.style.display = 'none';
});

document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
        e.target.classList.add('ativo');
        filtroAtual = e.target.dataset.filtro;
        renderizarListaParticipantes();
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        participantesModal.style.display = 'none';
        relatorioModal.style.display = 'none';
        confirmarModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === participantesModal || e.target === relatorioModal || e.target === confirmarModal) {
        participantesModal.style.display = 'none';
        relatorioModal.style.display = 'none';
        confirmarModal.style.display = 'none';
    }
});

window.addEventListener('load', () => {
    atualizarParticipantesAtivos();
    
    if (funcionariosAtivos.length > 0) {
        funcionarioDisplay.textContent = funcionariosAtivos[0];
    }
    if (produtosAtivos.length > 0) {
        produtoDisplay.textContent = produtosAtivos[0];
    }
    
    atualizarContadores();
});