class CaixaDaLanchonete {
    cardapio = {
        cafe: { descricao: 'Café', valor: 3.00 },
        chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        suco: { descricao: 'Suco Natural', valor: 6.20 },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
        queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        salgado: { descricao: 'Salgado', valor: 7.25 },
        combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    };

    formasPagamento = ['dinheiro', 'debito', 'credito'];

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasPagamento.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.cardapio[codigo]) {
                return 'Item inválido!';
            }

            const precoItem = this.cardapio[codigo].valor;

            if (codigo !== 'chantily' && codigo !== 'queijo') {
                total += precoItem * parseInt(quantidade);
            } else {
                const itemPrincipal = codigo === 'chantily' ? 'cafe' : 'sanduiche';
                if (!itens.includes(`${itemPrincipal},${quantidade}`)) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
                total += precoItem * parseInt(quantidade);
            }
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95; // Aplica desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
            total *= 1.03; // Aplica acréscimo de 3% para pagamento a crédito
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
