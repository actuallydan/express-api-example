const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

// equivalent to our "controller"
const { Products } = require("./orm");

/*
 Middleware, this allows us to send form data (POST | PUT) OR a big ol' query string (GET et. al)
 and use it in our request object
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (Cross-Site ...uh... Resource Somthing?) allows us to call this API from anywhere on the internet
// https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

app.get("/", (_, res) => {
  res.send("My Express API");
});

/*
 GET - Gets all items in the database 
*/
app.get("/products", async (req, res) => {
  // log API request with timestamp
  console.log(`/products GET - ${new Date().toJSON()}`);
  try {
    // do "database" query
    let products = await Products.all();

    // return response as JSON
    res.status(200).json(products);
  } catch (e) {
    console.error(e);
    res.status(400).json(new Error(e));
  }
});

/*
 POST - Creates an item in the database
*/
app.post("/products", async (req, res) => {
  console.log(`/products POST - ${new Date().toJSON()}`);

  try {
    let newProduct = await Products.add(req.body);

    res.status(201).json(newProduct);
  } catch (e) {
    console.error(e);
    res.status(400).json(new Error(e));
  }
});

////////////////////////////////////////////////
// TBD
////////////////////////////////////////////////

/*
 GET - Find a single item by id
*/
app.get("/products/:id", async (req, res) => {
  console.log(`/products/:id GET - ${new Date().toJSON()}`);
  try {
    //  TODO: get 1 item by it's id
    const product = await Products.findById(req.params.id);

    res.status(200).json(product);
  } catch (e) {
    console.error(e);
    res.status(400).json(new Error(e));
  }
});

/*
  PUT - updates a single item by id
*/
app.put("/products", async (req, res) => {
  console.log(`/products PUT - ${new Date().toJSON()}`);

  try {
    // TODO: implement an update function
    const product = await Products.update(req.body.id, req.body.updates);

    res.status(200).json(product);
  } catch (e) {
    console.error(e);
    res.status(400).json(new Error(e));
  }
});

/*
  DELETE - removes a single item by id
*/
app.delete("/products/:id", async (req, res) => {
  console.log(`/products DELETE - ${new Date().toJSON()}`);

  try {
    let success = await Products.remove(req.params.id);

    res.status(200).json({ success });
  } catch (e) {
    console.error(e);
    res.status(400).json(new Error(e));
  }
});

////////////////////////////////////////////////
// ^TBD
////////////////////////////////////////////////

// start server, nothing fancy here
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
