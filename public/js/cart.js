async function fetchCarts() {
  const res = await fetch(BASE_URL + "/api/cart/all");
  showJSON("cartResult", await res.json());
}
