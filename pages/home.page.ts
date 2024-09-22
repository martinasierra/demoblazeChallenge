import { Locator, Page } from "@playwright/test";

export class HomePage {
readonly page:Page;     //Variables
readonly cartButton:Locator;
readonly xperiaButton:Locator;
readonly categoriesSection:Locator;
readonly nextPageButton:Locator;

  constructor(page: Page) {
this.page = page;
this.xperiaButton = page.getByRole('link', { name: 'Sony xperia z5' });
this.cartButton = page.getByRole('link', { name: 'Cart', exact: true });
this.categoriesSection = page.getByRole('link', { name: 'CATEGORIES' });
this.nextPageButton = page.getByRole('button', { name: 'Next' }).last();

  };

 //Methods
 
 async clickXperiaButton() {
    await this.xperiaButton.click();
 };

 async goToCart() {
    await this.cartButton.click();
 };

 async clickNext() {
   await this.nextPageButton.click();
 }
  
};

