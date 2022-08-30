let nome_mercado = localStorage.getItem('nome_mercado');
let logo_mercado = localStorage.getItem('logo_mercado');
let list_produtos = [];
let nome_produto = document.getElementById('nome_produto');
let categoria_produto = document.getElementById('categoria_produto');
let foto_produto = document.getElementById('foto_produto');
let unitario_produto = document.getElementById('unitario_produto');
let localizacao_produto = document.getElementById('localizacao_produto');
let foto_localizacao_produto = document.getElementById('foto_localizacao_produto'); 
let qtd_produto = document.getElementById('qtd_produto');
let qtd_produto_pack = document.getElementById('qtd_produto_pack');
let preco_unitario_produto = document.getElementById('preco_unitario_produto');

if (nome_mercado === null || nome_mercado === undefined) {
    document.title = "Mercado";
} else {
    document.title = nome_mercado;
}

function enviar_concluir_cadastro2(nome_mercado, logo_mercado) {
    localStorage.setItem("nome_mercado", nome_mercado.value);
    localStorage.setItem("logo_mercado", logo_mercado.value);
    alert('Cadastro concluido!');
    reload();
}

if (logo_mercado) {
    document.getElementById('avatar').style.backgroundImage = "url(" + logo_mercado + ")";
}

function enviar_concluir_adicionar() {
    let list_json = localStorage.getItem('Produtos');
    if(list_json) {
        list_produtos = JSON.parse(list_json);
    }
    
    let produto = {
    nome_produto: nome_produto.value,
    categoria_produto: categoria_produto.value,
    foto_produto: foto_produto.value,
    unitario_produto: unitario_produto.value,
    localizacao_produto: localizacao_produto.value,
    foto_localizacao_produto: foto_localizacao_produto.value,
    qtd_produto: qtd_produto.value,
    qtd_produto_pack: qtd_produto_pack.value,
    preco_unitario_produto: preco_unitario_produto.value
    }
    
    list_produtos.push(produto);
    localStorage.setItem('Produtos', JSON.stringify(list_produtos));
    alert('Produto adicionado com sucesso!');
    reload();
}

function enviar_concluir(nome_produto) {
    let produtos = JSON.parse(localStorage.getItem('Produtos'));
    let i;
    if (produtos) {
        for (i = 0; i < produtos.length; i++) {
                if (produtos[i] != null) {
                    if(produtos[i].nome_produto === nome_produto.value) {
                    document.getElementById('form_editar').innerHTML = '<p><label>Nome do produto: </label>' 
                        + produtos[i].nome_produto +
                        '<label> | | | Categoria do produto:   </label>' + produtos[i].categoria_produto + '</p>' +
                        '<p><label>Localizacao do produto:  </label>' + produtos[i].localizacao_produto + '</p>' +
                        '<div id=images1><p><img src="' + produtos[i].foto_produto + '" id="foto_produto_lista"></p></div>' +
                        '<div id=images2><p><img src="' + produtos[i].foto_localizacao_produto + '" id="foto_produto_lista"></p></div>' +
                        '<p><label>Tipo unitario do produto:    </label>' + produtos[i].unitario_produto + '</p>' +
                        '<p><label>Quantidade em estoque:   </label>' + produtos[i].qtd_produto + '</p>' +
                        '<p><label>Quantidade em pack fechado:  </label>' + produtos[i].qtd_produto_pack + '</p>' +
                        '<p><label>Preco unitario do produto:   R$</label>' + produtos[i].preco_unitario_produto + '</p>' +
                        '<p><label> Preco total em estoque:     R$</label>' + preco_total_estoque(produtos, i) + '</p>' + 
                        '<p><input type="button" id="enviar_remover" value="Remover produto" onclick="enviar_concluir_remover()">' +
                        ' \\-||-/' +
                        '<input type="button" id="enviar_editar" value="Editar produto" onclick="create_edit()"></p>';
                        i = -1;
                        break;
                    }
                }
            }
        if (!(i === -1)) {
            alert('Produto não encontrado!');
            reload();
        }
    }
}

function enviar_concluir_remover() {
    let produtos = JSON.parse(localStorage.getItem('Produtos'));
    let i;
    if (produtos) {
        for (i = 0; i < produtos.length; i++) {
                if (produtos[i] != null) {
                    if(produtos[i].nome_produto === nome_produto.value) {
                        produtos.splice(i, 1);
                        localStorage.setItem("Produtos", JSON.stringify(produtos));
                        alert('Produto removido!');
                        i = -1;
                        reload();
                        break;
                    }
                }
            }
        if (!(i === -1)) {
            alert('Produto não encontrado!');
            reload();
        }
    }
}

function create_edit() {
    let produtos = JSON.parse(localStorage.getItem('Produtos'));
    let i;
    if (produtos) {
        for (i = 0; i < produtos.length; i++) {
                if (produtos[i] != null) {
                    if(produtos[i].nome_produto === nome_produto.value) {
                        document.getElementById('form_editar').innerHTML = '<p><h1><label id="editarProduto">Editar produto</label></h1></p>' +
                        '<p><input type="text" style="width: 40%" value="'+ produtos[i].nome_produto +'" placeholder="Nome do produto" id="nome_produto">' +
                        '<input type="text" style="width: 40%" value="'+ produtos[i].categoria_produto +'" placeholder="Categoria do produto" id="categoria_produto">' +
                        '<input type="text" style="width: 40%" value="'+ produtos[i].foto_produto +'" placeholder="Link da foto do produto" id="foto_produto">' +
                        '<select style="width: 40% "value="'+ produtos[i].unitario_produto +'" placeholder="Tipo unitario do produto" id="unitario_produto">' +
                        '<option>Metro</option>' +
                        '<option>Quilo</option>' +
                        '<option>Libra</option>' +
                        '<option>Litro</option>' +
                        '<option>Unidade</option>' +
                        '<option>Bar</option>' +
                        '<input type="text" style="width: 40%" value="'+ produtos[i].localizacao_produto +'" placeholder="Localizacao do produto" id="localizacao_produto">' +
                        '<input type="text" style="width: 40%" value="'+ produtos[i].foto_localizacao_produto +'" placeholder="Foto da localizacao produto" id="foto_localizacao_produto">' +
                        '<input type="number" style="width: 40%" value="'+ produtos[i].qtd_produto +'" placeholder="Quantidade em estoque" id="qtd_produto">' +
                        '<input type="number" style="width: 40%" value="'+ produtos[i].qtd_produto_pack +'" placeholder="Quantidade em pack fechado" id="qtd_produto_pack">' +
                        '<input type="number" style="width: 40%" value="'+ produtos[i].preco_unitario_produto +'" placeholder="Preco unitario do produto" id="preco_unitario_produto"></p>' +
                        '<p><input type="button" id="enviar_concluir_editar" value="Enviar" onclick="enviar_concluir_editar(nome_produto, categoria_produto, foto_produto, unitario_produto,' +
                        'localizacao_produto, foto_localizacao_produto, qtd_produto, qtd_produto_pack, preco_unitario_produto)"></p>'
                        produtos.splice(i, 1);
                        localStorage.setItem("Produtos", JSON.stringify(produtos));
                        i = -1;
                        break;
                    }
                }
            }
        if (!(i === -1)) {
            alert('Produto não encontrado!');
            reload();
        }
    }
}

function enviar_concluir_editar (nome_produto, categoria_produto, foto_produto, unitario_produto, 
        localizacao_produto, foto_localizacao_produto, qtd_produto, qtd_produto_pack, preco_unitario_produto) {
        let list_json = localStorage.getItem('Produtos');
        if(list_json) {
            list_produtos = JSON.parse(list_json);
        }
        
        let produto = {
        nome_produto: nome_produto,
        categoria_produto: categoria_produto,
        foto_produto: foto_produto,
        unitario_produto: unitario_produto,
        localizacao_produto: localizacao_produto,
        foto_localizacao_produto: foto_localizacao_produto,
        qtd_produto: qtd_produto,
        qtd_produto_pack: qtd_produto_pack,
        preco_unitario_produto: preco_unitario_produto
        }
        
        list_produtos.push(produto);
        localStorage.setItem('Produtos', JSON.stringify(list_produtos));
        alert('Produto editado com sucesso!');
        reload();
}

function remover_tudo() {
    localStorage.clear();
    alert('Todos os dados removidos com sucesso!');
    reload();
}

function listar_tudo() {
    let div_lista = document.getElementById('listar');
    div_lista.innerHTML = '<div id="div_to_list">' + 
    '<input type="button" value="Parar de listar tudo" id="button_to_not_list" onclick="not_listar_tudo()">' + 
    '</div>';
    let produtos = JSON.parse(localStorage.getItem('Produtos'));
    let String_list = div_lista.innerHTML;
    if (produtos) {
        for (i = 0; i < produtos.length; i++) {
            if (produtos[i] !== null) {
                String_list += '<p><label>Nome do produto: </label>' + produtos[i].nome_produto +
                '<label> | | | Categoria do produto:   </label>' + produtos[i].categoria_produto + '</p>' +
                '<p><label>Localizacao do produto:  </label>' + produtos[i].localizacao_produto + '</p>' +
                '<div id=images1><p><img src="' + produtos[i].foto_produto + '" id="foto_produto_lista"></p></div>' +
                '<div id=images2><p><img src="' + produtos[i].foto_localizacao_produto + '" id="foto_produto_lista"></p></div>' +
                '<p><label>Tipo unitario do produto:    </label>' + produtos[i].unitario_produto + '</p>' +
                '<p><label>Quantidade em estoque:   </label>' + produtos[i].qtd_produto + '</p>' +
                '<p><label>Quantidade em pack fechado:  </label>' + produtos[i].qtd_produto_pack + '</p>' +
                '<p><label>Preco unitario do produto:   R$</label>' + produtos[i].preco_unitario_produto + '</p>' +
                '<p><label> Preco total em estoque:     R$</label>' + preco_total_estoque(produtos, i) + '</p>' + 
                '<p> \\-||-/</p>' +
                '<br>' +
                '<br>' +
                '<br>'
            }
        }
        div_lista.innerHTML = String_list;
    }
}

function not_listar_tudo() {
    let div_lista = document.getElementById('listar');
    div_lista.innerHTML = '<div id="div_to_list">' +
    '<input type="button" value="Listar tudo" id="button_to_list" onclick="listar_tudo()">' + 
    '</div>';
}

function preco_total_estoque(produtos, i) {
    return produtos[i].preco_unitario_produto * (produtos[i].qtd_produto / produtos[i].qtd_produto_pack);
}

function voltar_remover_tudo() {
    alert('Operação cancelada!')
    reload();
}

function reload() {
    location.reload();
}