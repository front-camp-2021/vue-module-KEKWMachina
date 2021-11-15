const API_ROOT = "http://localhost:3001";

export const getCards = async function () {
  const request = await fetch(`${API_ROOT}/products`);
  const response = await request.json();
  return response
};
export const getCategories = async function () {
  const request = await fetch(`${API_ROOT}/categories`);
  const response = await request.json();
  return response
};
export const getBrands = async function () {
  const request = await fetch(`${API_ROOT}/brands`);
  const response = await request.json();
  return response
};
