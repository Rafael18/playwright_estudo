import { test, expect } from '../support/index';
const { faker } = require('@faker-js/faker')

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)

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

test('Não deve cadastrar o mesmo email', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});


test('Não deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Rafael Batista', 'rafaeltec.com')

  await page.leads.alertHaveText('Email incorreto')
  // await page.waitForTimeout(5000)
});

test('Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'rafaeltec_@live.com')

  await page.leads.alertHaveText('Campo obrigatório')
  // await page.waitForTimeout(5000)
});

test('Não deve cadastrar quando o campo e-mail não for preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Rafael Batista', '')

  await page.leads.alertHaveText('Campo obrigatório')
  // await page.waitForTimeout(5000)
});

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
  // await page.waitForTimeout(5000)
});