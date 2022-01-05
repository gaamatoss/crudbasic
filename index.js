var dados = []

function EditarRegistro(id){
    $("#modalRegistro").modal("show")
    dados.forEach(function(item){
        if (item.Id == id){
            $("#hdId").val(item.Id)
            $("#txtNome").val(item.Nome)
            $("#txtSobrenome").val(item.Sobrenome)
            $("#txtEmail").val(item.Email)
        }
    })
}

function ApagarRegistro(id){
    let _confirm = confirm("Tem certeza que deseja excluir o usuário?")

    if (_confirm) {
        for(let i = 0; i < dados.length; i++){
            if (dados[i].Id == id){
                dados.splice(i, 1)
            }
        }
        PopulaTabela()
    }
}

function PopulaTabela(){
    if (Array.isArray(dados)){

        localStorage.setItem("__dados__", JSON.stringify(dados))
        
        $("#tbldados tbody").html("")

        dados.forEach(function (item){
            //TEMPLATE STRING
            $("#tbldados tbody").append(`<tr>
                <td>${item.Id}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.Email}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:EditarRegistro(${item.Id});"><i class="fas fa-edit"></i></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:ApagarRegistro(${item.Id});"><i class="fas fa-trash"></i></button></td>
            </tr>`)
        })
    }
}

$(function(){
    //executa ao carregar da tela
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        PopulaTabela()
    }

    $('#btnSalvar').click(function(){
        //Evento click
        let _id = $("#hdId").val()
        let Nome = $("#txtNome").val()
        let Sobrenome = $("#txtSobrenome").val()
        let Email = $("#txtEmail").val()
        
        if (!_id || _id == "0"){
            let registro = {}
            registro.Nome = Nome
            registro.Sobrenome = Sobrenome
            registro.Email = Email
            registro.Id = dados.length + 1
            dados.push(registro)
        } else {
            dados.forEach(function(item){
                if (item.Id == _id){
                    item.Nome = Nome
                    item.Sobrenome = Sobrenome
                    item.Email = Email
                }
            })
        }

        //alert("Registro Salvo!")
        $("#modalRegistro").modal("hide")

        //limpando o conteudo da modal após salvar
        $("#hdId").val("0")
        $("#txtNome").val("")
        $("#txtSobrenome").val("")
        $("#txtEmail").val("")
        
        PopulaTabela()
    })
})