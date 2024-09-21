import { Locator, Page } from "@playwright/test";

export class ProductPage {
readonly page:Page;     //Variables
readonly productTitle:Locator;
readonly addToCartButton:Locator;

  constructor(page: Page) {
this.page = page;
this.productTitle = page.locator('h2');
this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  };

 //Methods
 async clickAddToCart(){
    await this.addToCartButton.click();
 };


  
};

