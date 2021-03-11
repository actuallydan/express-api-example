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
    // TBD: Implement get resource by id
  },
  update: async (id, updates) => {
    // TBD: Implement update by id
  },
  remove: async (id) => {
    // TBD: Implement remove by id
  },
};

module.exports = { Products };
