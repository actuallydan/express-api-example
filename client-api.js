const discountAxios = {
  findAll: () => {
    return fetch("http://localhost:3000/products").then((res) => res.json());
  },
  findById: (id) => {
    return fetch(`http://localhost:3000/products/${id}`).then((res) =>
      res.json()
    );
  },
  add: (product) => {
    return fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  update: (id, updates) => {
    return fetch("http://localhost:3000/products", {
      method: "PUT",
      body: JSON.stringify({ id, updates }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  remove: (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
};
