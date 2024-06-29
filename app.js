new Vue({
    el: '#app',
    data: {
        abaAtiva: 'clientes',
        exibirListagem: true,
        clientes: [],
        produtos: [],
        vendas: [],
        novoCliente: {
            nome: '',
            endereco: '',
            telefone: '',
            cpf: ''
        },
        novoProduto: {
            nome: '',
            descricao: '',
            preco: 0
        },
        novaVenda: {
            idCliente: '',
            idProduto: '',
            quantidade: 1
        }
    },
    computed: {
        totalClientes() {
            return this.clientes.length;
        },
        totalProdutos() {
            return this.produtos.length;
        },
        totalVendas() {
            return this.vendas.length;
        }
    },
    methods: {
        mudarExibicao(){
            this.exibirListagem = !this.exibirListagem;
        },

        limparCampos() {
            this.novoCliente = {
                nome: '',
                endereco: '',
                telefone: '',
                cpf: ''
            };
        
            this.novoProduto = {
                nome: '',
                descricao: '',
                preco: 0
            };
        
            this.novaVenda = {
                idCliente: '',
                idProduto: '',
                quantidade: 1
            };
        },
        
        validarCliente() {
            if (this.novoCliente.nome && this.novoCliente.endereco && this.novoCliente.telefone && this.novoCliente.cpf) {
                this.adicionarCliente();
            } else {
                alert('Por favor, preencha todos os campos do cliente.');
            }
        },

        validarProduto() {
            if (this.novoProduto.nome && this.novoProduto.descricao && this.novoProduto.preco > 0) {
                this.adicionarProduto();
            } else {
                alert('Por favor, preencha todos os campos do produto.');
            }
        },

        validarVenda() {
            if (this.novaVenda.idCliente && this.novaVenda.idProduto && this.novaVenda.quantidade > 0) {
                this.adicionarVenda();
            } else {
                alert('Por favor, preencha todos os campos da venda.');
            }
        },

        adicionarCliente() {
            let novoId;

            if (this.clientes.length) {
                novoId = this.clientes[this.clientes.length - 1].id + 1;
            } else {
                novoId = 1;
            }

            this.clientes.push({ ...this.novoCliente, id: novoId });
            this.novoCliente = { nome: '', endereco: '', telefone: '', cpf: ''};
        },

        editarCliente(cliente) {
            this.novoCliente = { ...cliente };
            this.excluirCliente(cliente.id);
        },

        excluirCliente(id) {
            this.clientes = this.clientes.filter(cliente => cliente.id !== id);
        },

        adicionarProduto() {
            let novoId;

            if(this.produtos.length){
                novoId = this.produtos[this.produtos.length - 1].id + 1
            } else{
                novoId = 1; 
            } 

            this.produtos.push({ ...this.novoProduto, id: novoId });
            this.novoProduto = { nome: '', descricao: '', preco: 0 };
        },

        editarProduto(produto) {
            this.novoProduto = { ...produto };
            this.excluirProduto(produto.id);
        },

        excluirProduto(id) {
            this.produtos = this.produtos.filter(produto => produto.id !== id);
        },

        adicionarVenda() {
            let novoId;

            if(this.vendas.length){
                novoId = this.vendas[this.vendas.length - 1].id + 1;
            } else{
                novoId = 1; 
            } 

            this.vendas.push({ ...this.novaVenda, id: novoId });
            this.novaVenda = { idCliente: '', idProduto: '', quantidade: 1 };
        },

        excluirVenda(id) {
            this.vendas = this.vendas.filter(venda => venda.id !== id);
        },

        obterNomeCliente(id) {
            const cliente = this.clientes.find(cliente => cliente.id === id);
            if(cliente){
                return cliente.nome;
            } else{
                return "Cliente desconhecido"
            }
        },

        obterNomeProduto(id) {
            const produto = this.produtos.find(produto => produto.id === id);
            if(produto){
                return produto.nome;
            } else{
                return "Produto desconhecido"
            }
        },

        calcularValorTotal(idProduto, quantidade) {
            const produto = this.produtos.find(produto => produto.id === idProduto);
            if (produto) {
                return (produto.preco * quantidade).toFixed(2);
            } else {
                return '0.00';
            }
        },

        confirmarExclusao(id, tipo) {
            if (confirm(`Você realmente deseja excluir este ${tipo}?`)) {
                if (tipo === 'cliente') {
                    this.excluirCliente(id);
                } else if (tipo === 'produto') {
                    this.excluirProduto(id);
                } else if (tipo === 'venda') {
                    this.excluirVenda(id);
                }
            }
        }
    }
});
