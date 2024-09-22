import { Locator, Page } from "@playwright/test";

export class OrderPage {
readonly page: Page;     //Variables
readonly placeOrderButton: Locator;
readonly totalOrder: Locator;
readonly productOrder: Locator;
readonly orderModalTitle: Locator;
readonly nameInput: Locator;
readonly cityInput: Locator;
readonly countryInput: Locator;
readonly monthInput: Locator;
readonly cardInput: Locator;
readonly yearInput: Locator;
readonly purchaseButton: Locator;
readonly successModalTitle: Locator;
readonly successAmount: Locator;
readonly acceptModalPurchase: Locator;

  constructor(page: Page) {
this.page = page;
this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
this.totalOrder = page.locator('#totalp');
this.productOrder = page.locator('#tbodyid');
this.orderModalTitle = page.locator('#orderModalLabel');
this.nameInput = page.locator('#name');
this.cityInput = page.locator('#city');
this.countryInput = page.locator('#country');
this.monthInput = page.locator('#month');
this.cardInput = page.locator('#card');
this.yearInput = page.locator('#year');
this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
this.successModalTitle = page.getByRole('heading', { name: 'Thank you for your purchase!' });
this.successAmount = page.locator('xpath=//body/div[10]/p');
this.acceptModalPurchase = page.locator('.sa-confirm-button-container')
                               .filter({ has: page.getByRole('button', { name: 'OK', exact: true }) })

  };

 //Methods
async clickPlaceOrder(){
    await this.placeOrderButton.click();
};

async fillNameInput(name: string){
  await this.nameInput.fill(name);
};

async fillCityInput(city: string) {
  await this.cityInput.fill(city);
};

async fillCountryInput(country: string) {
  await this.countryInput.fill(country);
};

async fillMonthInput(month: string) {
  await this.monthInput.fill(month);
};

async fillCardInput(card: string) {
  await this.cardInput.fill(card);
};

async fillYearInput(year: string) {
  await this.yearInput.fill(year);
};

async completeOrder(name: string, city: string, country: string, month: string, card: string, year: string) {
  await this.fillNameInput(name);
  await this.fillCityInput(city);
  await this.fillCountryInput(country);
  await this.fillMonthInput(month);
  await this.fillCardInput(card);
  await this.fillYearInput(year);
};

async clickPurchase(){
  await this.purchaseButton.click();
};

async clickOkPurchase(){
  await this.acceptModalPurchase.click();
};
  
};


