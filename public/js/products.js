async function uploadProduct() {
  const name = document.getElementById('p_name').value;
  const description = document.getElementById('p_desc').value;
  const rating = document.getElementById('p_rating').value;
  const totalPrice = document.getElementById('p_total').value;
  const offerPrice = document.getElementById('p_offer').value;

  // Get all file inputs
  const fileInputs = [
    document.getElementById('file1'),
    document.getElementById('file2'),
    document.getElementById('file3'),
    document.getElementById('file4')
  ];

  // Filter out empty file inputs
  const files = fileInputs
    .filter(input => input.files[0])
    .map(input => input.files[0]);

  if (files.length === 0) {
    alert('Please select at least one image');
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('rating', rating);
  formData.append('totalPrice', totalPrice);
  formData.append('offerPrice', offerPrice);

  // Append each file
  files.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch('/api/products/create', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    const resultElement = document.getElementById('productResult');
    
    if (result.success) {
      resultElement.innerHTML = `✅ ${result.message}\n\nProduct Details:\n${JSON.stringify(result.product, null, 2)}`;
      resultElement.style.color = 'green';
      
      // Clear form
      document.getElementById('p_name').value = '';
      document.getElementById('p_desc').value = '';
      document.getElementById('p_total').value = '';
      document.getElementById('p_offer').value = '';
      fileInputs.forEach(input => input.value = '');
    } else {
      resultElement.innerHTML = `❌ Error: ${result.error}`;
      resultElement.style.color = 'red';
    }
  } catch (error) {
    document.getElementById('productResult').innerHTML = `❌ Network Error: ${error.message}`;
    document.getElementById('productResult').style.color = 'red';
  }
}

async function fetchProducts() {
  const res = await fetch(BASE_URL + "/api/products/all");
  showJSON("fetchProductsPre", await res.json());
}
