import { test, expect } from '../support/index';

const data = require('../support/fixtures/series.json')

const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL('DELETE FROM tvshows')
})

test('Deve poder cadastrar uma nova serie', async ({ page }) => {

    const serie = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.series.create(serie)

    await page.popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`)

})

test('Deve poder remover um filme', async ({ page, request }) => {
    const serie = data.to_remove
    await request.api.postSerie(serie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.goSeries()
    await page.series.remove(serie.title)
    await page.popup.haveText('Série removida com sucesso.')

})

test('Não deve poder cadastrar uma série duplicada', async ({ page, request }) => {

    const serie = data.duplicate
    await request.api.postSerie(serie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.create(serie)
    await page.popup.haveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})