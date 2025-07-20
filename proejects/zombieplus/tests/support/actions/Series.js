export class Series {
    constructor(page) {
        this.page = page
    }

    async goSeries() {
        await this.page.getByRole('link', { name: 'Séries de TV' })
            .click()
    }

    async goForm() {
        await this.goSeries()

        await this.page.locator('a[href$="register"]')
            .click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
    }

    async create(serie) {
        await this.goForm()

        await this.page.locator('#title').fill(serie.title)
        await this.page.locator('#overview').fill(serie.overview)

        // Clica no botão do campo Select
        await this.page.locator('#select_company_id .react-select__indicator')
            .click()
        // Após o click acima, seleciona o valor
        await this.page.locator('.react-select__option')
            .filter({ hasText: serie.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: serie.release_year })
            .click()

        await this.page.locator('#seasons').fill(`${serie.seasons}`)

        await this.page.locator('input[name="cover"]')
            .setInputFiles(serie.cover)

        if (serie.featured === true) {
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
    }
}