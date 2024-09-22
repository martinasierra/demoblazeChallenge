import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import axios from 'axios';
import * as fs from 'fs';

const baseURL = 'https://www.demoblaze.com';
const filePath = 'products_info.txt';

test.describe('Extract products information and save to text file', () => {
  
  test('Get products from page 1 and 2', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto(baseURL);
  await page.waitForSelector('#tbodyid');

  // Make the API request to the /entries endpoint
  try {
    const response = await axios.get('https://api.demoblaze.com/entries');
    const products = response.data.Items;

    // Process products
    let productText = 'Products Information:\n\n';
    products.forEach((product: any, index: number) => {
      productText += `Product ${index + 1}:\n`;
      productText += `Title: ${product.title}\n`;
      productText += `Price: $${product.price}\n`;
      productText += `Link: ${baseURL}/prod.html?idp_=${product.id}\n\n`;
    });

    // Save the information in a text file
    fs.writeFileSync(filePath, productText);

    // Verify that products have been extracted
    expect(products.length).toBeGreaterThan(0);

  } catch (error) {
    console.error('Error fetching product information from API:', error);
  };
 
  // Go to products next page
  await homePage.clickNext();
  await page.waitForTimeout(2000);
  await expect(homePage.nextPageButton).not.toBeInViewport();

  // Select all products
  const products2 = await page.$$eval('.card', (products, base) => {
    return products.map((product) => {
      // Extract information
      const title = product.querySelector('.card-title a')?.textContent?.trim() || 'No Title';
      const price = product.querySelector('.card-block h5')?.textContent?.trim() || 'No Price';
      const link = product.querySelector('.card-title a')?.getAttribute('href') || 'No Link';
      return { title, price, link: `${base}/${link}` };
    });
  }, baseURL);

  // Format information
  let productText2 = 'Page 2\n\n';
  products2.forEach((productN, index) => {
    productText2 += `Product ${index + 1}:\n`;
    productText2 += `Title: ${productN.title}\n`;
    productText2 += `Price: ${productN.price}\n`;
    productText2 += `Link: ${productN.link}\n\n`;
  });

  // Add the information to the text file
  fs.appendFileSync(filePath, productText2);

  // Show file location
  console.log(`Product information saved to ${filePath}`);
 
});

});
