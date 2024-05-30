class Pedido
{
    constructor (idPedido, idCliente, status, dataPedido)
    {
        this.idPedido = idPedido;
        this.idCliente = idCliente;
        this.status = status;
        this.dataPedido = dataPedido;
    }
}

class Funcionario
{
    constructor (id, nome, cpf, email, senha)
    {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Cliente
{
    constructor (id, nome, dataNascimento, cpf, email, senha)
    {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Produtos 
{
    constructor (dataValidade, preco, qtdEstoque, nome, descricao)
    {
        this.dataValidade = dataValidade;
        this.preco = preco;
        this.qtdEstoque = qtdEstoque;
        this.nome = nome;
        this.descricao = descricao;
    }
}

class Sistema 
{
    constructor ()
    {
        this.funcionariosLogados = [];
        this.clientesLogados = [];
        this.listaProdutos = [];
        this.lerOpcao = require('readline-sync');
    }
    
    //Metodos Auxiliares Gerais

    MensagemSucesso()
    {
        console.log ("Dados Alterados Com sucesso!");
    }

    TelaInicial ()
    {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo a Tela Inicial!"
        this.MensagemInicial(MensagemInicial);

        //Interface do Usuario
        let listaOpcoesValidas = [1,2,3];
        let mensagemUsuario = "\n1 - Login \n2 - Cadastrar \n3 - Sair \n\nEscolha uma opcao: "
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        //Validacao de Entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Acoes:
        switch (opcao)
        {
            case 1:
                this.Login();
                break;

            case 2:
                this.Cadastrar();
                break;

            default:
                this.Sair();
                break;
        }

    }
    
    ValidacaoEntrada (listaOpcoesValidas, opcaoUsuario, mensagem)
    {
        /*Valida Entradas do Usuario recebendo: "listaOpcoesValidas: lista com as opcoes de entradas validas", "opcaoUsuario = a opcao que o usuario digitou",
        "mensagem: mensagem que voce quer que apareca para o usuario caso ele digite uma opcao Invalida"*/
        while (!listaOpcoesValidas.includes(opcaoUsuario))
            {
                console.log ("\nPor favor digite uma opcao valida: ")
                opcaoUsuario = parseInt(this.lerOpcao.question(mensagem));
            }
        
        return opcaoUsuario;
    }

    MensagemInicial (MensagemInicial)
    {
        /*Cria uma mensagem inicial ao entrar nos métodos*/
        console.log ("*".repeat(20));
        console.log (MensagemInicial);
        console.log ("*".repeat(20));
    }

    VerificarInt (numero)
    {
        let numeroVerificado = numero;

        while (!Number.isInteger(numeroVerificado))
        {
            numeroVerificado = parseInt (this.lerOpcao.question("\n Digite apenas numeros: "));
        }

        return numeroVerificado;
        
    }

    /*VerificarString (string)
    {
        let stringVerificada = string;

        while (typeof stringVerificada != 'string')
        {
            stringVerificada = this.lerOpcao.question("\n Digite apenas caracteres nao numericos: ");
        }

        return stringVerificada;

    }*/

    //Metodos Auxiliares Cadastros
    MensagemFinalCadastros (nome)
    {
        //Cria uma mensagem personalizada ao final dos cadastros
        console.log (nome + "," + "cadastrado com sucesso!");
    }

    ValidarId(id, usuario)
    {
        let idVerificada = id;
        let usuarioVerificado = usuario;
        let idIsValida = false;

        while (!idIsValida)
        {
            idVerificada = this.VerificarInt(idVerificada);
            idIsValida = true;

            if (usuarioVerificado == 'funcionario')
            {
                for (let i = 0; i < this.funcionariosLogados.length; i++)
                {

                    if(this.funcionariosLogados[i].id == idVerificada)
                    {
                        console.log ("esse id ja existe!");
                        idVerificada = parseInt(this.lerOpcao.question ("\nInforme um Id Valido: "));
                        idIsValida = false
                        break;
                    }
                }
            }

            else if (usuarioVerificado == 'cliente')
            {
                for (let i = 0; i < this.clientesLogados.length; i++)
                {
                    
                    if(this.clientesLogados[i].id == idVerificada)
                    {
                        console.log ("esse id ja existe!");
                        idVerificada = parseInt(this.lerOpcao.question ("\nInforme um Id Valido: "));
                        idIsValida = false
                        break;
                    }
                }
            }
        }

        return  idVerificada;
    }

    CadastrarFuncionario()
    {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo Funcionario Novo!"
        this.MensagemInicial(MensagemInicial);

        //Solicitar dados Funcionario;
        let id = parseInt(this.lerOpcao.question("\nInforme seu ID:"));
        id = this.ValidarId(id, 'funcionario');

        let nome = this.lerOpcao.question ("\nInforme seu nome de Usuario: ")
        //nome = this.VerificarString(nome);

        let cpf = parseInt(this.lerOpcao.question ("\nInforme seu CPF: "));
        cpf = this.VerificarInt(cpf);

        let email = this.lerOpcao.question ("\nInforme seu email: ");
        let senha = this.lerOpcao.question ("\nInforme sua senha: ");

        //Cadastrar o Funcionario
        let funcionario = new Funcionario(id, nome, cpf, email, senha);
        this.funcionariosLogados.push(funcionario);
        console.log(this.funcionariosLogados);

        //Mensagem Final e Voltar ao Menu Inicial
        this.MensagemFinalCadastros(nome);
        this.TelaInicial();

        
    }

    CadastrarCliente()
    {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo Cliente Novo!"
        this.MensagemInicial(MensagemInicial);

        //Solicitar dados Cliente;
        let id = parseInt(this.lerOpcao.question("\nInforme seu ID:"));
        id = this.ValidarId(id, 'cliente');

        let nome = this.lerOpcao.question ("\nInforme seu nome: ")
        let dataNascimento = this.lerOpcao.question ("\nInforme sua Data de Nascimento: ") //Verificar data de nascimento?

        let cpf = parseInt(this.lerOpcao.question ("\nInforme seu CPF: "));
        cpf = this.VerificarInt(cpf);

        let email = this.lerOpcao.question ("\nInforme seu email: ");
        let senha = this.lerOpcao.question ("\nInforme sua senha: ");

        //Cadastrar o Cliente
        let cliente = new Cliente(id, nome, dataNascimento, cpf, email, senha);
        this.clientesLogados.push(cliente);
        console.log(this.clientesLogados);

        //Mensagem Final e Voltar ao Menu Inicial
        this.MensagemFinalCadastros(nome);
        this.TelaInicial();
    }

     //Logar Clientes e Funcionarios
    LoginCliente()
    {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo Cliente:"
        this.MensagemInicial(MensagemInicial);

        //Solicitar Informacoes de Login
        let email = this.lerOpcao.question ("\nInforme seu email: ");
        let senha = this.lerOpcao.question ("\nInforme sua senha: ");

        //verificar Login
        let isCliente = this.clientesLogados.find(cliente => cliente.email == email && cliente.senha == senha);

        //Acoes
        if (isCliente)
        {
            let listaOpcoesValidas = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            console.log ("Ola," + isCliente.nome + "!");

            let mensagemUsuario = `
            1. Ver Meus Dados
            2. Modificar Meus Dados
            3. Ver Lista de Produtos
            4. Fazer Pedido
            5. Cancelar Pedido
            6. Ver Meus Pedidos
            7. Avaliar Pedido
            8. Visualizar Avaliacoes
            9. Retornar ao Menu Inicial
            
            Escolha uma opcao: `;

            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            // Validação de Entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            //Acao
            switch (opcao) 
            {
                case 1:
                    this.VerDados('cliente', isCliente);
                    break;
                case 2:
                    this.ModificarDados('cliente', isCliente);
                    break;
                case 3:
                    this.VerListaProdutos();
                    break;
                case 4:
                    this.FazerPedido();
                    break;
                case 5:
                    this.CancelarPedido();
                    break;
                case 6:
                    this.VerMeusPedidos();
                    break;
                case 7:
                    this.AvaliarPedido();
                    break;
                case 8:
                    this.VisualizarAvaliacoes();
                    break;
                case 9:
                    this.TelaInicial();
                    break;
            }

        }

        else
        {

            let listaOpcoesValidas = [1, 2];
            let mensagemUsuario = "\nCliente Nao Cadastrado:\n\n1 - Tentar Novamente\n2 - Retornar ao Menu Inicial\n\nEscolha uma opcao: "
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            //Validacao de Entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            switch (opcao)

            {
                case 1:
                    this.LoginCliente();
                    break;

                case 2:
                    this.TelaInicial();
                    break;
            }

        }

    }

    LoginFuncionario()
    {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo Funcionario:"
        this.MensagemInicial(MensagemInicial);

        //Solicitar Informacoes de Login
        let email = this.lerOpcao.question ("\nInforme seu email: ");
        let senha = this.lerOpcao.question ("\nInforme sua senha: ");

        //verificar Login
        let isFuncionario = this.funcionariosLogados.find(funcionario => funcionario.email == email && funcionario.senha == senha);

        //Acoes
        if (isFuncionario)
        {
            let listaOpcoesValidas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            console.log ("Ola," + isFuncionario.nome + "!");

            let mensagemUsuario = `
            1. Ver Meus Dados
            2. Modificar Meus Dados
            3. Ver Lista de Pedidos
            4. Ver Lista de Produtos
            5. Ver Lista de Clientes
            6. Mudar Status do pedido
            7. Adicionar produto
            8. Editar produto
            9. Excluir produto
            10. Voltar ao Menu Inicial
            
            Escolha uma opcao: `;

            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            // Validação de Entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            //Acao
            switch (opcao) 
            {
                case 1:
                    this.VerDados('funcionario', isFuncionario);
                    break;
                case 2:
                    this.ModificarDados('funcionario', isFuncionario);
                    break;
                case 3:
                    this.VerListaPedidos();
                    break;
                case 4:
                    this.VerListaProdutos();
                    break;
                case 5:
                    this.VerListaClientes();
                    break;
                case 6:
                    this.MudarStatusPedido();
                    break;
                case 7:
                    this.AdicionarProduto();
                    break;
                case 8:
                    this.EditarProduto();
                    break;
                case 9:
                    this.ExcluirProduto();
                    break;
                case 10:
                    this.TelaInicial();
                    break;
            }

        }

        else
        {

            let listaOpcoesValidas = [1, 2];
            let mensagemUsuario = "\nFuncionario Nao Cadastrado:\n\n1 - Tentar Novamente\n2 - Retornar ao Menu Inicial\n\nEscolha uma opcao: "
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            //Validacao de Entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            switch (opcao)

            {
                case 1:
                    this.LoginFuncionario();
                    break;

                case 2:
                    this.TelaInicial();
                    break;
            }

        }
    }

    //Metodos Funcionario e Clientes Nao Logados
    Login ()
    {
        //Mensagem Inicial
        let MensagemInicial = "Bem Vindo a tela de Login:"
        this.MensagemInicial(MensagemInicial);

        //Interface do Usuario
        let listaOpcoesValidas = [1, 2, 3];
        let mensagemUsuario = "\n1 - Login Cliente\n2 - Login Funcionario\n3 - Retornar ao Menu Inicial\n\nEscolha uma opcao: "
        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        //Validacao de Entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        //Acoes
        switch (opcao)
        {
            case 1:
                this.LoginCliente();
                break;
            case 2:
                this.LoginFuncionario();
                break;

            default:
                this.TelaInicial();
                break;
        }

    }

    Cadastrar ()
    {
         //Mensagem Inicial
         let MensagemInicial = "Bem Vindo a tela de Cadastro:"
         this.MensagemInicial(MensagemInicial);
 
         //Interface do Usuario
         let listaOpcoesValidas = [1, 2, 3];
         let mensagemUsuario = "\n1 - Cadastrar Cliente\n2 - Cadastrar Funcionario\n3 - Retornar ao Menu Inicial\n\nEscolha uma opcao: "
         let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
 
         //Validacao de Entrada
         opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
 
         //Acoes
         switch (opcao)
        {
            case 1:
                this.CadastrarCliente();
                break;
            case 2:
                this.CadastrarFuncionario();
                break;

            default:
                this.TelaInicial();
                break;
        }

    }

    Sair ()
    {
        console.log ("Obrigado Volte Sempre!");
    }

    //Funcionarios Logados (Ver Lista Pedidos, Ver Lista Clientes, Mudar Status Pedido, Add Produto)
    //(Editar Produto, Excluir Produto)

    EditarProduto() {

        if (this.listaProdutos.length == 0)
        {
            console.log ("\nNao existem produtos cadastrados\n");
            this.TelaInicial();
        }

        //Mensagem Inicial
        let MensagemInicial = "Editar Um Produto!"
        this.MensagemInicial(MensagemInicial);
        let listaOpcoesValidas = [];
        let mensagemUsuario = "Digite Alguma Opcao Acima: ";
        let indexProdutoEscolhido;


        //Mostrar Produtos Disponiveis
        for (let i = 0; i < this.listaProdutos.length; i++) {
            let nomeProduto = this.listaProdutos[i].nome;
            console.log(i + "-" + nomeProduto);
            listaOpcoesValidas.push(i);
        }

        let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
        indexProdutoEscolhido = opcao;

        //Alterar produto
        listaOpcoesValidas = [1, 2, 3, 4, 5, 6]; //constructor (dataValidade, preco, qtdEstoque, nome, descricao)
        mensagemUsuario = `
            Escolha o que quer alterar no produto:
            1 - Alterar Data de Validade
            2 - Alterar Preco
            3 - Alterar Quantidade em Estoque
            4 - Alterar Nome
            5 - Alterar Descricao
            6 - Voltar ao Menu Inicial
            \nEscolha uma opcao: `;

        opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

        // Validação de entrada
        opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

        // Ações 
        switch (opcao) {
            case 1:
                //ESCOLHER NOVO ATRIBUTO
                let novaDataValidade = this.lerOpcao.question("Digite a nova Data de Validade: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].dataValidade = novaDataValidade;
                this.MensagemSucesso();
                break;

            case 2:
                //ESCOLHER NOVO ATRIBUTO
                let novoPreco = this.lerOpcao.question("Digite o novo preco: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].preco = novoPreco;
                this.MensagemSucesso();
                break;

            case 3:
                //ESCOLHER NOVO ATRIBUTO
                let novaQtdEstoque = this.lerOpcao.question("Digite a nova Qtd em Estoque: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].qtdEstoque = novaQtdEstoque;
                this.MensagemSucesso();
                break;

            case 4: //**constructor (dataValidade, preco, qtdEstoque, nome, descricao)
                //ESCOLHER NOVO ATRIBUTO
                let novoNome = this.lerOpcao.question("Digite o novo Nome: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].nome = novoNome;
                this.MensagemSucesso();
                break;

            case 5: //**constructor (dataValidade, preco, qtdEstoque, nome, descricao)
                //ESCOLHER NOVO ATRIBUTO
                let novaDescricao = this.lerOpcao.question("Digite uma nova Descricao: ");

                //MODIFICAR ATRIBUTO
                this.listaProdutos[indexProdutoEscolhido].descricao = novaDescricao;
                this.MensagemSucesso();
                break;
            
            case 6:
                this.TelaInicial();
                break;

        }

        this.TelaInicial();

    }
    
    VerListaClientes()
    {
        let listaOrdemAlfabetica = [];

        for (let i = 0; i < this.clientesLogados.length; i++)
        {
            let nome = this.clientesLogados[i].nome;
            nome = nome.toLowerCase();
            listaOrdemAlfabetica.push(nome);
        }

        listaOrdemAlfabetica.sort();
        console.log("Lista de Clientes: " + listaOrdemAlfabetica);
        this.TelaInicial();
    }

    AdicionarProduto()
    {
        //Mensagem Inicial
        let MensagemInicial = "Adicionar Porduto!"
        this.MensagemInicial(MensagemInicial);

        //Solicitar dados do Produto;
        let dataValidade = parseInt(this.lerOpcao.question("\nInforme a Data de validade Do produto:"));

        let preco = this.lerOpcao.question ("\nInforme Preco do Produto: ")
        preco = this.VerificarInt(preco);

        let qtdEstoque = parseInt(this.lerOpcao.question ("\nInforme a quantidade em estoque: "));
        qtdEstoque = this.VerificarInt(qtdEstoque);

        let nome = this.lerOpcao.question ("\nInforme nome do produto: ");
        let descricao = this.lerOpcao.question ("\nFaca uma breve descricao do produto: ");

        //Cadastrar Produto
        let novoProduto = new Produtos(dataValidade, preco, qtdEstoque, nome, descricao);//constructor (dataValidade, preco, qtdEstoque, nome, descricao)
        this.listaProdutos.push(novoProduto);
        console.log(this.listaProdutos);

        //Mensagem Final e Voltar ao Menu Inicial
        this.MensagemFinalCadastros(nome);
        this.TelaInicial();
    }

    //Metodos Clientes e Funcionarios Logados (Ver Dados, Modificar Dados, Ver Lista de Produtos)
    VerDados(tipoUsuario, dados)
    {
        let dadosUsuario = dados;
        if(tipoUsuario == 'cliente') //constructor (id, nome, dataNascimento, cpf, email, senha)
        {
            console.log ("\n Dados Cadastrados:");
            console.log ("Id: " + dadosUsuario.id);
            console.log ("Nome: " + dadosUsuario.nome);
            console.log ("Data de nascimento: " + dadosUsuario.dataNascimento);
            console.log ("CPF: " + dadosUsuario.cpf);
            console.log ("Email: " + dadosUsuario.email);
            console.log ("Senha: " + dadosUsuario.senha + '\n');
        }

        else if(tipoUsuario == 'funcionario') //constructor (id, nome, cpf, email, senha)
        {
            console.log ("\n Dados Cadastrados: \n");
            console.log ("Id: " + dadosUsuario.id);
            console.log ("Nome Usuario: " + dadosUsuario.nome);
            console.log ("CPF: " + dadosUsuario.cpf);
            console.log ("Email: " + dadosUsuario.email);
            console.log ("Senha: " + dadosUsuario.senha + '\n');
        }

        this.TelaInicial();
    }

    VerListaProdutos ()
    {
        let listaOrdemAlfabetica = [];
        let contador1 = this.listaProdutos.length;
        let contador2 = 0;

        for (let i = 0; i < this.listaProdutos.length; i++)
        {
            let nome = this.listaProdutos[i].nome;
            nome = nome.toLowerCase();
            listaOrdemAlfabetica.push(nome);

        }
        listaOrdemAlfabetica.sort();

        while (contador1 > 0)
        {
            for (let i = 0; i < this.listaProdutos.length; i++)
            {
                if (this.listaProdutos[i].nome == listaOrdemAlfabetica[contador2])//constructor (dataValidade, preco, qtdEstoque, nome, descricao)
                {
                console.log ("\nProduto " + (contador2 + 1));
                console.log ("Validade: " + this.listaProdutos[i].dataValidade);
                console.log ("Preco: " + this.listaProdutos[i].preco);
                console.log ("Qtd Estoque: " + this.listaProdutos[i].qtdEstoque);
                console.log ("Nome: " + this.listaProdutos[i].nome);
                console.log ("Descricao: " + this.listaProdutos[i].descricao);
                contador1 --;
                contador2++;
                break;
                }
            }
        }
        this.TelaInicial();
    }

    ModificarDados (tipoUsuario, dados)
    {
        //Mensagem Inicial
        let MensagemInicial = "Modificar Dados!"
        this.MensagemInicial(MensagemInicial);

        let dadosUsuario = dados;

        if(tipoUsuario == 'cliente') //constructor (id, nome, dataNascimento, cpf, email, senha)
        {
            

            // Interface do usuário
            let listaOpcoesValidas = [1, 2, 3, 4, 5, 6];
            let mensagemUsuario = `
                Escolha o dado a ser alterado:
                1 - Alterar Nome
                2 - Alterar Data de Nascimento
                3 - Alterar CPF
                4 - Alterar Email
                5 - Alterar Senha
                6 - Voltar ao Menu Inicial
                \nEscolha uma opcao: `;
            let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));

            // Validação de entrada
            opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);

            // Ações
            switch (opcao) 
            {

                case 1:
                    let novoNome = this.lerOpcao.question("Digite o novo nome: ");

                    for (let i = 0; i < this.clientesLogados.length; i++)
                        {
                            if(this.clientesLogados[i].id == dadosUsuario.id)
                            {
                                this.clientesLogados[i].nome = novoNome; 
                                break;
                            }
                        }
                    this.MensagemSucesso();
                    break;

                case 2:
                    let novaDataNascimento = this.lerOpcao.question("Digite a nova data de nascimento: ");
                    for (let i = 0; i < this.clientesLogados.length; i++)
                        {
                            if(this.clientesLogados[i].id == dadosUsuario.id)
                            {
                                this.clientesLogados[i].dataNascimento = novaDataNascimento; 
                                break;
                            }
                        }
                    this.MensagemSucesso();
                    break;

                case 3:
                    let novoCPF = parseInt(this.lerOpcao.question("Digite o novo CPF: "));
                    for (let i = 0; i < this.clientesLogados.length; i++)
                        {
                            if(this.clientesLogados[i].id == dadosUsuario.id)
                            {
                                this.clientesLogados[i].cpf = novoCPF; 
                                break;
                            }
                        }
                    this.MensagemSucesso();  
                    break;

                case 4:
                    let novoEmail = this.lerOpcao.question("Digite o novo email: ");
                    for (let i = 0; i < this.clientesLogados.length; i++)
                        {
                            if(this.clientesLogados[i].id == dadosUsuario.id)
                            {
                                this.clientesLogados[i].email = novoEmail; 
                                break;
                            }
                        }
                    this.MensagemSucesso(); 
                    break;

                case 5:
                    let novaSenha = this.lerOpcao.question("Digite a nova senha: ");

                    for (let i = 0; i < this.clientesLogados.length; i++)
                        {
                            if(this.clientesLogados[i].id == dadosUsuario.id)
                            {
                                this.clientesLogados[i].senha = novaSenha; 
                                break;
                            }
                        }
                    this.MensagemSucesso(); 
                    break;

                case 6:
                    this.TelaInicial();
                    break;
            }

            //voltar ao menu iniciar
            this.TelaInicial();
        }

        //Modificar Dados Do Funcionario
        if(tipoUsuario == 'funcionario') //constructor (id, nome, cpf, email, senha)
            {
                //Mensagem Inicial
                let MensagemInicial = "Modificar Dados!"
                this.MensagemInicial(MensagemInicial);
    
                // Interface do usuário
                let listaOpcoesValidas = [1, 2, 3, 4, 5];
                let mensagemUsuario = `
                    Escolha o dado a ser alterado:
                    1 - Alterar Nome Usuario
                    2 - Alterar CPF
                    3 - Alterar Email
                    4 - Alterar Senha
                    5 - Voltar ao Menu Inicial
                    \nEscolha uma opcao: `;
                let opcao = parseInt(this.lerOpcao.question(mensagemUsuario));
    
                // Validação de entrada
                opcao = this.ValidacaoEntrada(listaOpcoesValidas, opcao, mensagemUsuario);
    
                // Ações
                switch (opcao) 
                {
    
                    case 1:
                        let novoNome = this.lerOpcao.question("Digite o novo nome de Usuario: ");
    
                        for (let i = 0; i < this.funcionariosLogados.length; i++)
                            {
                                if(this.funcionariosLogados[i].id == dadosUsuario.id)
                                {
                                    this.funcionariosLogados[i].nome = novoNome; 
                                    break;
                                }
                            }
                        this.MensagemSucesso();
                        break;
    
                    case 2:
                        let novoCPF = parseInt(this.lerOpcao.question("Digite o novo CPF: "));
                        for (let i = 0; i < this.funcionariosLogados.length; i++)
                            {
                                if(this.funcionariosLogados[i].id == dadosUsuario.id)
                                {
                                    this.funcionariosLogados[i].cpf = novoCPF; 
                                    break;
                                }
                            }
                        this.MensagemSucesso();  
                        break;
    
                    case 3:
                        let novoEmail = this.lerOpcao.question("Digite o novo email: ");
                        for (let i = 0; i < this.funcionariosLogados.length; i++)
                            {
                                if(this.funcionariosLogados[i].id == dadosUsuario.id)
                                {
                                    this.funcionariosLogados[i].email = novoEmail; 
                                    break;
                                }
                            }
                        this.MensagemSucesso(); 
                        break;
    
                    case 4:
                        let novaSenha = this.lerOpcao.question("Digite a nova senha: ");
    
                        for (let i = 0; i < this.funcionariosLogados.length; i++)
                            {
                                if(this.funcionariosLogados[i].id == dadosUsuario.id)
                                {
                                    this.funcionariosLogados[i].senha = novaSenha; 
                                    break;
                                }
                            }
                        this.MensagemSucesso(); 
                        break;
    
                    case 5:
                        this.TelaInicial();
                        break;
                }
    
                //voltar ao menu iniciar
                this.TelaInicial();
            }
    }
}

const sistema = new Sistema();
sistema.TelaInicial();


