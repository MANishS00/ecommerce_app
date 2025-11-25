// Change base URL as needed
const BASE_URL = "https://ecommerce-app-ci4j.onrender.com";

// Helper
function showJSON(id, data) {
  document.getElementById(id).textContent =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);
}
