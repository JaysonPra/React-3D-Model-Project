const API = `http://localhost:5000`;

export const getAllCategories = () => {
  return fetch(`${API}/getAllCategories`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export const getCategoryDetails = (id) => {
  return fetch(`${API}/getcategorydetails/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const addCategory = (category_name) => {
  let category = { category_name };
  return fetch(`${API}/addcategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "token",
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export const editCategory = (id, category_name) => {

  let category = { category_name };
  return fetch(`${API}/updatecategory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteCategory = (id) => {

  return fetch(`${API}/deletecategory/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
