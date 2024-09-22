import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { OrderPage} from '../pages/order.page';

const URL = 'https://www.demoblaze.com/';
let homePage: HomePage;
let productPage: ProductPage;
let orderPage: OrderPage;

test.beforeEach('Go to Home Page',async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    orderPage = new OrderPage(page);
    await page.goto(URL)
});

test.describe('Buy product', () => {
   
    test('Buy Sony Xperia Z5', async ({ page }) => {

        await test.step('Go to product page', async () => {
            await homePage.clickXperiaButton();
            await expect(productPage.productTitle).toContainText('Sony xperia z5');
        });
           
        await test.step('Add product to cart', async () => {   
            page.on('dialog', async (d) => {
                expect(d.type()).toContain('alert');
                expect(d.message()).toContain('Product added');
                await d.accept();
              })
              await productPage.clickAddToCart();
              await page.waitForEvent('dialog');
        });

        await test.step('Go to Cart', async () => {
              await homePage.goToCart();
              await expect(orderPage.productOrder).toContainText('Sony xperia z5');
              await expect(orderPage.totalOrder).toHaveText('320');
              await orderPage.clickPlaceOrder();
              await expect(orderPage.orderModalTitle).toBeInViewport();
        });
        
        await test.step('Complete order with valid information', async () => {
            await orderPage.completeOrder('Eugenia', 'Rosario', 'Argentina', '09', '1234 5678 7890', '2014')
        });

        await test.step('Purchase', async () => {
            await orderPage.clickPurchase();
            await expect(orderPage.successModalTitle).toBeInViewport();
            await expect(orderPage.successAmount).toContainText('Amount: 320');
        });

        await test.step('Press OK', async () => {
            await orderPage.clickOkPurchase();
            await page.waitForTimeout(2000);
            //await expect(orderPage.successModalTitle).not.toBeVisible();
            await expect(page).toHaveURL(URL);
        })
        
        
    });
    
});
