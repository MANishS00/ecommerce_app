async function uploadProduct() {
  const form = new FormData();
  form.append("name", p_name.value);
  form.append("description", p_desc.value);
  form.append("rating", p_rating.value);
  form.append("totalPrice", p_total.value);
  form.append("offerPrice", p_offer.value);

  [file1, file2, file3, file4].forEach(f => {
    if (f.files.length > 0) form.append("images", f.files[0]);
  });

  const res = await fetch(BASE_URL + "/api/products/create", {
    method: "POST",
    body: form
  });

  showJSON("productResult", await res.json());
}

async function fetchProducts() {
  const res = await fetch(BASE_URL + "/api/products/all");
  showJSON("fetchProductsPre", await res.json());
}
