import { Locator, Page } from "@playwright/test";

export class HomePage {
readonly page:Page;     //Variables
readonly cartButton:Locator;
readonly xperiaButton:Locator;
readonly categoriesSection:Locator;

  constructor(page: Page) {
this.page = page;
this.xperiaButton = page.getByRole('link', { name: 'Sony xperia z5' });
this.cartButton = page.getByRole('link', { name: 'Cart', exact: true });
this.categoriesSection = page.getByRole('link', { name: 'CATEGORIES' });

  };

 //Methods
 
 async clickXperiaButton() {
    await this.xperiaButton.click();
 };

 async goToCart() {
    await this.cartButton.click();
 };

  
};

