const { test, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')

let loginPage
let toast
let moviesPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})

test('Deve logar como administrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
})

test('Não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123456')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await toast.haveText(message)
})

test('Não deve logar quando o e-mail é invalido ', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('teste.com.br', 'pwd123456')

    await loginPage.alertHaveText('Email incorreto')
})

test('Não deve logar quando o e-mail não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', 'pwd123456')

    await loginPage.alertHaveText('Campo obrigatório')
})

test('Não deve logar quando a Senha não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', '')

    await loginPage.alertHaveText('Campo obrigatório')
})

test('Não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', '')

    await loginPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})