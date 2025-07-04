const {test, expect} = require('@playwright/test')

export class MoviesPage {

    constructor(page){
        this.page = page
    }

    async isLoggedIn(){
        // const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    } 
}