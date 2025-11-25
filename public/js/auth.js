async function signup() {
  const res = await fetch(BASE_URL + "/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: s_mobile.value,
      password: s_pass.value
    })
  });

  showJSON("signupResult", await res.json());
}

async function login() {
  const res = await fetch(BASE_URL + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: l_mobile.value,
      password: l_pass.value
    })
  });

  const json = await res.json();
  showJSON("loginResult", json);

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(json.user));
  }
}

function logout() {
  localStorage.removeItem("user");
  showJSON("loginResult", "Logged out");
}

async function forgetPass() {
  const res = await fetch(BASE_URL + "/api/auth/forget", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile: f_mobile.value })
  });

  showJSON("forgetResult", await res.json());
}
