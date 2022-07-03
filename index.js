const e = require('express')
const express = require('express')
const validarDevolverDoarLivro = require('./validarDevolverDoarLivro')
const app = express()

app.use(express.json())

const bancoDeDados = [
    { numero: 00001, titulo: 'Como fazer sentido e bater o martelo', autor: 'Alexandro Aolchique', ano: '2017', status: 'DISPONÍVEL', 'Emprestado para:': '' },
    { numero: 00002, titulo: 'Sejamos todos feministas', autor: 'Chimamanda Ngozi Adichie', ano: '2015', status: 'DISPONÍVEL', 'Emprestado para:': '' },
    { numero: 00003, titulo: 'Basquete 101', autor: 'Hortência Marcari', ano: '2010', status: 'DISPONÍVEL', 'Emprestado para:': '' },
]

app.get('/livros-disponiveis', (req, res) => {
    res.status(200).send(bancoDeDados)
})

// Retirar um livro
app.get('/retirar-livro', (req, res) => {
    const { titulo = null, autor = null, nome = null } = req.query
    let livroEncontrado

    if (!nome) {
        res.status(404).send({ mensagem: `Por favor informe o nome da pessoa que vai retirar o livro` })
    }

    if (titulo) {
        for (let i = 0; i < bancoDeDados.length; i++) {
            const { titulo: tituloDB, status } = bancoDeDados[i]
            
            if (titulo == tituloDB && status == 'DISPONÍVEL') {
                livroEncontrado = bancoDeDados[i]
                bancoDeDados[i].status = "INDISPONIVEL"
                bancoDeDados[i]['Emprestado para:'] = nome
                break
            }
        }
    }

    if (autor && !livroEncontrado) {
        for (let i = 0; i < bancoDeDados.length; i++) {
            const { autor: autorDB, status } = bancoDeDados[i]
            
            if (autor == autorDB && status == 'DISPONÍVEL') {
                livroEncontrado = bancoDeDados[i]
                bancoDeDados[i].status = "INDISPONIVEL"
                bancoDeDados[i]['Emprestado para:'] = nome
                break
            }
        }
    }

    if (!livroEncontrado) {
        if (autor) return res.status(404).send({ mensagem: `Não foi encontrado nenhum livro com o autor ${autor}` })
        if (titulo) return res.status(404).send({ mensagem: `Não foi encontrado nenhum livro com o titulo ${titulo}` })
    }

    res.status(200).send(livroEncontrado)
})

// Devolver livro
 app.patch('/devolver-livro', (req, res) => {
    const body = req.body
    let livroNaoEncontrado = true

    const error = validarDevolverDoarLivro(body)

    if (error) {
        res.status(400).send({ mensagem: error })
        return
    }

    for (let i = 0; i < bancoDeDados.length; i++) {
        const { titulo, autor } = bancoDeDados[i]

        if (titulo == body.titulo) {
            bancoDeDados[i]['Emprestado para:'] = ""
            bancoDeDados[i].status = "DISPONIVEL"
            livroNaoEncontrado = false
            break
        }
    }

    if (livroNaoEncontrado) {
        return res.status(400).send("O livro nao foi encontrado")
    }

    res.status(200).send("O livro foi devolvido com sucesso")
 })

 app.post(`/doar-livro`, (req, res) => {
    const body = req.body
    const error = validarDevolverDoarLivro(body)

    if (error) {
        res.status(400).send({ mensagem: error })
        return
    }
    body['Emprestado para:'] = ""
    body.numero = bancoDeDados.length +1
    body.status = "DISPONIVEL"
    bancoDeDados.push(body)
    res.status(200).send(`O livro foi doado com sucesso`)
 })


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})