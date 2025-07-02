// @ts-check
import { test, expect } from '@playwright/test';

test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  // await page.locator('#name').fill('rafaeltec_@live.com')

  // await page.locator('input[name=name]').fill('rafaeltec_@live.com')

  // await page.locator('input[placeholder="Seu nome completo"]').fill('rafaeltec_@live.com')


  // getByTestId => Deve ser usado quando a tag possui data-testid
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  // getByPlaceholder => Captura o elemento cujo o placeholder possui o texto informado
  await page.getByPlaceholder('Seu nome completo').fill('Rafael Batista')

  await page.getByPlaceholder('Seu email principal').fill('rafaeltec_@live.com')

  // await page.getByText('Quero entrar na fila!').click()
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  // getByText => Captura elementos que possuam o texto informado (cy.contains)
  await page.getByText('seus dados conosco').click()

  // page.content() => captura todo o html da página qual teve ação
  const content = await page.content()
  console.log(content)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })

  // await page.waitForTimeout(5000)
});


test('Não deve cadastrar com email errado', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  // getByPlaceholder => Captura o elemento cujo o placeholder possui o texto informado
  await page.getByPlaceholder('Seu nome completo').fill('Rafael Batista')
  await page.getByPlaceholder('Seu email principal').fill('rafaeltec.com.br')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
  // await page.waitForTimeout(5000)
});