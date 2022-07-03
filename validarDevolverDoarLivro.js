const validarDevolverDoarLivro = (body) => {
    if(!body.titulo) {
        return `Para devolver o livro é preciso digitar um titulo`
    }

    if(!body.autor) {
        return `Para devolver o livro é preciso digitar o autor`
    }

    if(!body.ano) {
        return `Para devolver o livro é preciso digitar o ano`
    }
}

module.exports = validarDevolverDoarLivro