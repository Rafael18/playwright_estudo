// @ts-check
import { test, expect } from '@playwright/test';

const { LandingPage } = require('./pages/LandingPage')

let landingPage

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
})

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rafael Batista', 'rafaeltec_@live.com')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.toastHaveText(message)

  // await page.locator('#name').fill('rafaeltec_@live.com')
  // await page.locator('input[name=name]').fill('rafaeltec_@live.com')
  // await page.locator('input[placeholder="Seu nome completo"]').fill('rafaeltec_@live.com')

  // getByTestId => Deve ser usado quando a tag possui data-testid

  // getByPlaceholder => Captura o elemento cujo o placeholder possui o texto informado

  // await page.getByText('Quero entrar na fila!').click()

  // getByText => Captura elementos que possuam o texto informado (cy.contains)

  // page.content() => captura todo o html da página qual teve ação




  // await page.waitForTimeout(5000)
});


test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rafael Batista', 'rafaeltec.com')

  await landingPage.alertHaveText('Email incorreto')
  // await page.waitForTimeout(5000)
});

test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'rafaeltec_@live.com')

  await landingPage.alertHaveText('Campo obrigatório')
  // await page.waitForTimeout(5000)
});

test('Não deve cadastrar quando o campo e-mail não for preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Rafael Batista', '')

  await landingPage.alertHaveText('Campo obrigatório')
  // await page.waitForTimeout(5000)
});

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
  // await page.waitForTimeout(5000)
});