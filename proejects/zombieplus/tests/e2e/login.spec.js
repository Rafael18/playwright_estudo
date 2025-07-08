const { test } = require('../support/index')

test('Deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('Não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123456')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await page.toast.containText(message)
})

test('Não deve logar quando o e-mail é invalido ', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('teste.com.br', 'pwd123456')

    await page.login.alertHaveText('Email incorreto')
})

test('Não deve logar quando o e-mail não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'pwd123456')

    await page.login.alertHaveText('Campo obrigatório')
})

test('Não deve logar quando a Senha não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')

    await page.login.alertHaveText('Campo obrigatório')
})

test('Não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')

    await page.login.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})