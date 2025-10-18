 // Estado do sistema
        let currentUser = null;
        let userType = null;
        let transactionHistory = [];
        let retirada = false;

        // Navegação entre páginas
        function goToPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
        }

        // Atualizar informações do usuário no header
        function updateUserInfo() {
            const userInfo = document.getElementById('user-info');
            const userName = document.getElementById('user-name');
            const userTypeDisplay = document.getElementById('user-type-display');

            if (currentUser) {
                userInfo.style.display = 'flex';
                userName.textContent = currentUser;
                userTypeDisplay.textContent = userType === 'employee' ? 'Funcionário' : 'Gerente';
            } else {
                userInfo.style.display = 'none';
            }
        }

        // Atualizar mensagem de boas-vindas
        function updateWelcomeMessage() {
            const welcomeUser = document.getElementById('welcome-user');
            const welcomeType = document.getElementById('welcome-type');
            const welcomeUserEmployee = document.getElementById('welcome-user-employee');
            const welcomeTypeEmployee = document.getElementById('welcome-type-employee');
            const userRole = document.getElementById('user-role');

            if (currentUser) {
                const roleText = userType === 'employee' ? 'Funcionário' : 'Gerente';
                welcomeUser.textContent = 'Bem-vindo, ' + currentUser + '!';
                welcomeType.innerHTML = 'Painel de Controle ' + (roleText === 'Gerente' ? 'Administrativo' : '');
                welcomeUserEmployee.textContent = 'Bem-vindo, ' + currentUser + '!';
                welcomeTypeEmployee.innerHTML = 'Você está logado como <span id="user-role">' + roleText + '</span>';
                userRole.textContent = roleText;
            }
        }

        // Seleção de usuário
        function selectUser(selectedUserType) {
            userType = selectedUserType;
            
            // Atualizar o formulário de login
            document.getElementById('user-type').value = userType;
            document.getElementById('user-type').disabled = false;
            
            // Atualizar avatar e subtítulo do login
            const loginAvatar = document.getElementById('login-avatar');
            const loginSubtitle = document.getElementById('login-subtitle');
            
            if (userType === 'employee') {
                loginAvatar.innerHTML = '<i class="fas fa-user"></i>';
                loginSubtitle.textContent = 'Acesso de Funcionário - Controle de Materiais';
            } else {
                loginAvatar.innerHTML = '<i class="fas fa-user-tie"></i>';
                loginSubtitle.textContent = 'Acesso de Gerente - Controle Completo do Sistema';
            }
            
            goToPage('login');
        }

        // Configurar gráficos para o dashboard do gerente
        function initializeManagerCharts() {
            // Gráfico de movimentações por categoria
            const categoryCtx = document.getElementById('categoryChart').getContext('2d');
            new Chart(categoryCtx, {
                type: 'bar',
                data: {
                    labels: ['Ferramentas', 'Eletrônicos', 'Escritório', 'Equipamentos', 'Construção'],
                    datasets: [{
                        label: 'Entradas',
                        data: [65, 59, 80, 81, 56],
                        backgroundColor: 'rgba(139, 92, 246, 0.8)',
                        borderColor: 'rgba(139, 92, 246, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Saídas',
                        data: [28, 48, 40, 19, 86],
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#e2e8f0'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#94a3b8'
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#94a3b8'
                            },
                            grid: {
                                color: 'rgba(148, 163, 184, 0.1)'
                            }
                        }
                    }
                }
            });
        }

        // Ativar modo gerente
        function activateManagerMode() {
            const header = document.getElementById('main-header');
            const logoIcon = document.getElementById('logo-icon');
            const logoText = document.getElementById('logo-text');
            const userInfo = document.getElementById('user-info');
            const userTypeDisplay = document.getElementById('user-type-display');
            
            // Aplicar estilos do gerente
            header.classList.add('manager-mode');
            logoIcon.classList.add('manager');
            logoText.classList.add('manager');
            userInfo.classList.add('manager');
            userTypeDisplay.classList.add('manager');
            
            // Mostrar dashboard do gerente e esconder interface normal
            document.getElementById('manager-dashboard').classList.add('active');
            document.getElementById('employee-interface').style.display = 'none';
            
            // Inicializar gráficos
            initializeManagerCharts();
        }

        // Desativar modo gerente
        function deactivateManagerMode() {
            const header = document.getElementById('main-header');
            const logoIcon = document.getElementById('logo-icon');
            const logoText = document.getElementById('logo-text');
            const userInfo = document.getElementById('user-info');
            const userTypeDisplay = document.getElementById('user-type-display');
            
            // Remover estilos do gerente
            header.classList.remove('manager-mode');
            logoIcon.classList.remove('manager');
            logoText.classList.remove('manager');
            userInfo.classList.remove('manager');
            userTypeDisplay.classList.remove('manager');
            
            // Mostrar interface normal e esconder dashboard do gerente
            document.getElementById('manager-dashboard').classList.remove('active');
            document.getElementById('employee-interface').style.display = 'block';
        }

        // Configuração do tipo de transação
        function setTransactionType(type) {
            const depositBtn = document.getElementById('deposit-btn');
            const withdrawalBtn = document.getElementById('withdrawal-btn');
            const submitBtn = document.getElementById('submit-btn');
            
            if (type === 'deposit') {
                depositBtn.classList.remove('btn-secondary');
                depositBtn.classList.add('active');
                withdrawalBtn.classList.remove('active');
                withdrawalBtn.classList.add('btn-secondary');
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Registrar Entrada</span>';
                submitBtn.className = 'btn btn-block btn-success';
            } else {
                depositBtn.classList.remove('active');
                depositBtn.classList.add('btn-secondary');
                withdrawalBtn.classList.remove('btn-secondary');
                withdrawalBtn.classList.add('active');
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Registrar Retirada</span>';
                submitBtn.className = 'btn btn-block btn-danger';
            }
        }

        // Login
       async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const dados = {
        email: username,
        senha: password
    };

    try {
        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            // Login aceito pelo servidor
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);

            updateUserInfo();
            updateWelcomeMessage();

            goToPage('deposit');
            loadHistory();
        } else {
            // Exibe mensagem de erro retornada pelo servidor
            document.getElementById("controleLogin").innerHTML =
                resultado.mensagem || "Usuário ou senha inválidos.";
        }

    } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        document.getElementById("controleLogin").innerHTML =
            "Erro ao conectar ao servidor.";
    }
}


        // Logout
        function logout() {
            currentUser = null;
            userType = null;
            
            localStorage.removeItem('userType');
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            
            updateUserInfo();
            goToPage('user-selection');
        }

        // Simulação de histórico
        function loadHistory() {
            const historyBody = document.getElementById('history-body');
            const history = [
                { date: '15/10/2023 14:30', type: 'Entrada', material: 'Ferramentas', quantity: 10, location: 'Almoxarifado A', responsible: 'João Silva' },
                { date: '15/10/2023 11:15', type: 'Retirada', material: 'Componentes Eletrônicos', quantity: 5, location: 'Setor de Manutenção', responsible: 'Maria Santos' },
                { date: '14/10/2023 16:45', type: 'Entrada', material: 'Materiais de Escritório', quantity: 25, location: 'Almoxarifado B', responsible: 'Carlos Oliveira' },
                { date: '14/10/2023 09:20', type: 'Entrada', material: 'Equipamentos', quantity: 3, location: 'Setor de Produção', responsible: 'Ana Costa' },
                { date: '13/10/2023 13:10', type: 'Retirada', material: 'Ferramentas', quantity: 7, location: 'Setor de Manutenção', responsible: 'Pedro Almeida' }
            ];
            
            historyBody.innerHTML = '';
            history.forEach(item => {
                const row = document.createElement('tr');
                const badgeClass = item.type === 'Entrada' ? 'badge-success' : 'badge-danger';
                const badgeIcon = item.type === 'Entrada' ? 'fa-arrow-down' : 'fa-arrow-up';
                
                row.innerHTML = `
                    <td>${item.date}</td>
                    <td><span class="badge ${badgeClass}"><i class="fas ${badgeIcon}"></i> ${item.type}</span></td>
                    <td>${item.material}</td>
                    <td>${item.quantity}</td>
                    <td>${item.location}</td>
                    <td>${item.responsible}</td>
                `;
                historyBody.appendChild(row);
            });
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Verificar se já está logado
            if (localStorage.getItem('loggedIn') === 'true') {
                currentUser = localStorage.getItem('username') || 'Usuário';
                userType = localStorage.getItem('userType') || 'employee';
                updateUserInfo();
                
                if (userType === 'manager') {
                    activateManagerMode();
                } else {
                    deactivateManagerMode();
                }
                
                goToPage('deposit');
                loadHistory();
                updateWelcomeMessage();
            }

            // Seleção de usuário
            document.querySelectorAll('.user-option').forEach(option => {
                option.addEventListener('click', function() {
                    const selectedUserType = this.getAttribute('data-user');
                    selectUser(selectedUserType);
                });
            });
            
            // Botões de navegação
            document.querySelectorAll('[data-page]').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('data-page');
                    goToPage(pageId);
                });
            });
            
            // Botões de transação
            document.getElementById('deposit-btn').addEventListener('click', function() {
                setTransactionType('deposit');
                retirada = false;
                alert("Entrada")
            });
            
            document.getElementById('withdrawal-btn').addEventListener('click', function() {
                setTransactionType('withdrawal');
                retirada = true;
                alert("Retirada")
            });
            
            // Controles de gráficos do gerente
            document.querySelectorAll('.control-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Aqui você implementaria a troca de gráficos
                    const chartType = this.getAttribute('data-chart');
                    console.log('Mudar para gráfico:', chartType);
                });
            });
            
            // Login
            document.getElementById('login-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const type = document.getElementById('user-type').value;
                
                if (!username || !password || !type) {
                    alert('Por favor, preencha todos os campos!');
                    return;
                }
                
                login(username, password, type);
            });
            
            // Transação
            document.getElementById('transaction-form').addEventListener('submit', async(e) => {
                e.preventDefault();

                const idProduto = document.getElementById('idProduto').value;
                const quantity = document.getElementById('quantity').value;
                const location = document.getElementById('location').value;
                const responsible = document.getElementById('responsible').value;
                const dataEntrada = document.getElementById('dataEntrada'). value;
                const observacao = document.getElementById('notes').value;
                
                const dadosEntradaEstoque = {
                    idProduto,
                    quantity,
                    location,
                    responsible,
                    dataEntrada,
                    observacao
                }
                
                if (!idProduto || !quantity || !location || !responsible || !dataEntrada || !observacao) {
                    alert('Por favor, preencha todos os campos obrigatórios!');
                    return;
                }
                
                // dados enviados para o servidor
                if(!retirada){
                    const respostaEntradaEstoque = await fetch ("http://localhost:3000/estoqueEntrada", {
                        method:"POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dadosEntradaEstoque)
                    });
                 }
                 else if(retirada){
                    const respostaEntradaEstoque = await fetch ("http://localhost:3000/estoqueRetirada", {
                        method:"POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dadosEntradaEstoque)
                        });
                 }
            
                 const textoEntradaEstoque = await respostaEntradaEstoque.text()
                 alert(textoEntradaEstoque)
                loadHistory(); // Recarregar histórico após nova movimentação
            });
            
            // Logout para funcionário
            document.getElementById('logout-btn').addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
            
            // Logout para gerente
            document.getElementById('logout-btn-manager').addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
        });