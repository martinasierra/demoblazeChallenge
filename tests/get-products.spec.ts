import { test, expect } from '@playwright/test';
import axios from 'axios';
import * as fs from 'fs';

const baseURL = 'https://www.demoblaze.com';
const filePath = 'products_infoPages.txt';

test.describe('Extract products information and save to text file', () => {
  
  test('Get products page 1', async ({ page }) => {
  await page.goto(baseURL);

  // Esperar a que los productos se carguen
  await page.waitForSelector('.card'); // Asegúrate de que los productos estén cargados

  // Realizar la solicitud API al endpoint /entries
  try {
    const response = await axios.get('https://api.demoblaze.com/entries');
    
    // Asumimos que la respuesta tiene un formato JSON con la lista de productos en 'Items'
    const products = response.data.Items;

    // Procesar los productos
    let productText = 'Product Information:\n\n';
    products.forEach((product: any, index: number) => {
      productText += `Product ${index + 1}:\n`;
      productText += `Title: ${product.title}\n`;
      productText += `Price: $${product.price}\n`;
      productText += `Link: https://www.demoblaze.com/prod.html?idp_=${product.id}\n\n`;
    });

    // Guardar la información en un archivo de texto
    const filePath = 'products_info3.txt';
    fs.writeFileSync(filePath, productText);

    // Imprimir la ubicación del archivo
   // console.log(`Product information saved to ${filePath}`);
  } catch (error) {
    console.error('Error fetching product information from API:', error);
  };
   // Verificar que se hayan extraído productos
  // expect(products.length).toBeGreaterThan(0);


  await page.getByRole('button', { name: 'Next' }).last().click();
  await page.waitForTimeout(4000);
  await expect(page.locator('#next2')).not.toBeInViewport();
  //await page.waitForSelector('.card'); // Asegúrate de que los productos estén cargados

  // Seleccionar todos los productos
  const products2 = await page.$$eval('.card', (cards, base) => {
    return cards.map((card) => {
      // Extraer la información deseada
      const title = card.querySelector('.card-title a')?.textContent?.trim() || 'No Title';
      const price = card.querySelector('.card-block h5')?.textContent?.trim() || 'No Price';
      const link = card.querySelector('.card-title a')?.getAttribute('href') || 'No Link';
      return { title, price, link: `${base}/${link}` };
    });
  }, baseURL);

  // Formatear la información en un solo texto
  let productText2 = 'Page 2:\n\n';
  products2.forEach((productN, index) => {
    productText2 += `Product ${index + 1}:\n`;
    productText2 += `Title: ${productN.title}\n`;
    productText2 += `Price: ${productN.price}\n`;
    productText2 += `Link: ${productN.link}\n\n`;
  });

  // Guardar la información en un archivo de texto
  fs.appendFileSync(filePath, productText2);

  // Imprimir la ubicación del archivo
  console.log(`Product information saved to ${filePath}`);
 
});

});
