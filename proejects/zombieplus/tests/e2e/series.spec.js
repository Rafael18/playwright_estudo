import { test, expect } from '../support/index';

const data = require('../support/fixtures/series.json')

test('Deve poder cadastrar uma nova serie', async ({ page }) => {

    const series = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    
    await page.series.create(series)

    


    // const html = await page.content()
    // console.log(html)
})