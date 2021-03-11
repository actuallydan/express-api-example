const fs = require("fs").promises;

const DB = "./db.json";

const Products = {
  all: async () => {
    try {
      // db.json holds our array of products
      return JSON.parse(await fs.readFile(DB, "utf-8"));
    } catch (error) {
      throw e;
    }
  },

  add: async (product) => {
    try {
      // get the old file
      const productsString = await fs.readFile(DB, "utf-8");
      const productsArr = JSON.parse(productsString);

      // give our product a uid
      product = {
        ...product,
        id: new Date().getTime().toString(16),
      };
      productsArr.push(product);

      // write new array to file, overwriting what was there before
      await fs.writeFile(DB, JSON.stringify(productsArr));

      return product;
    } catch (e) {
      throw e;
    }
  },
  findById: async (id) => {
    try {
      const productsString = await fs.readFile(DB, "utf-8");
      const productsArr = JSON.parse(productsString);

      const product = productsArr.find((p) => p.id === id);

      if (!product) {
        throw `Item ${id} does not exist`;
      }

      // return with the specific item
      return product;
    } catch (e) {
      throw e;
    }
  },
  update: async (id, updates) => {
    try {
      const productsString = await fs.readFile(DB, "utf-8");
      const productsArr = JSON.parse(productsString);

      const productIndex = productsArr.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        throw `Item ${id} does not exist`;
      }

      // update our array by modifying just the item we want to change
      productsArr[productIndex] = {
        ...productsArr[productIndex],
        ...updates,
      };

      await fs.writeFile(DB, JSON.stringify(productsArr));

      // return with the modified item
      return productsArr[productIndex];
    } catch (e) {
      throw e;
    }
  },
  remove: async (id) => {
    try {
      const productsString = await fs.readFile(DB, "utf-8");
      const oldProductsArr = JSON.parse(productsString);

      const newProductsArr = oldProductsArr.filter((p) => p.id !== id);

      await fs.writeFile(DB, JSON.stringify(newProductsArr));

      return true;
    } catch (e) {
      throw e;
    }
  },
};

module.exports = { Products };
