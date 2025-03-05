const API = `http://localhost:5000`;

export const getAllProducts = (filters) => {
  return fetch(`${API}/getallproducts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const addProduct = (product, token) => {
  return fetch(`${API}/addproduct`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateProduct = (id, product, token) => {
  return fetch(`${API}/updateproduct/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getProductDetails = (id) => {
  return fetch(`${API}/getproductdetails/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteProduct = (id, token) => {
  return fetch(`${API}/deleteproduct/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
