import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('Extract product information from Demoblaze and save to text file', async ({ page }) => {
  // Navegar a la página especificada
  await page.goto('https://www.demoblaze.com/index.html');


  // Esperar a que los productos se carguen
  await page.waitForSelector('.card'); // Asegúrate de que los productos estén cargados

  // Seleccionar todos los productos
  const products = await page.$$eval('.card', (cards) => {
    return cards.map((card) => {
      // Extraer la información deseada
      const title = card.querySelector('.card-title a')?.textContent?.trim() || 'No Title';
      const price = card.querySelector('.card-block h5')?.textContent?.trim() || 'No Price';
      const link = card.querySelector('.card-title a')?.getAttribute('href') || 'No Link';
      return { title, price, link: `https://www.demoblaze.com/${link}` };
    });
  });

  // Formatear la información en un solo texto
  let productText = 'Product Information:\n\n';
  products.forEach((product, index) => {
    productText += `Product ${index + 1}:\n`;
    productText += `Title: ${product.title}\n`;
    productText += `Price: ${product.price}\n`;
    productText += `Link: ${product.link}\n\n`;
  });

  // Guardar la información en un archivo de texto
  const filePath = 'products_infoPages.txt';
  fs.writeFileSync(filePath, productText);


  await page.getByRole('button', { name: 'Next' }).last().click();
  await page.waitForTimeout(4000);
  await expect(page.locator('#next2')).not.toBeInViewport();


  //await page.waitForSelector('.card'); // Asegúrate de que los productos estén cargados

  // Seleccionar todos los productos
  const products2 = await page.$$eval('.card', (cards) => {
    return cards.map((card) => {
      // Extraer la información deseada
      const title = card.querySelector('.card-title a')?.textContent?.trim() || 'No Title';
      const price = card.querySelector('.card-block h5')?.textContent?.trim() || 'No Price';
      const link = card.querySelector('.card-title a')?.getAttribute('href') || 'No Link';
      return { title, price, link: `https://www.demoblaze.com/${link}` };
    });
  });

  // Formatear la información en un solo texto
  let productText2 = 'Product Information:\n\n';
  products2.forEach((productN, index) => {
    productText2 += `Product ${index + 1}:\n`;
    productText2 += `Title: ${productN.title}\n`;
    productText2 += `Price: ${productN.price}\n`;
    productText2 += `Link: ${productN.link}\n\n`;
  });

  // Guardar la información en un archivo de texto
  const filePath2 = 'products_infoPages.txt';
  fs.appendFileSync(filePath2, productText2);

  // Imprimir la ubicación del archivo
  console.log(`Product information saved to ${filePath}`);

  // Verificar que se hayan extraído productos
  expect(products.length).toBeGreaterThan(0);
});
