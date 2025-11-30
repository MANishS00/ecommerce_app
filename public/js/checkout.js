const BASE_URL = "http://localhost:5000";

function fetchCheckout() {
    document.getElementById("result").innerHTML = "<p>Loading...</p>";

    fetch(`${BASE_URL}/api/checkout/all`)
        .then(res => res.json())
        .then(data => {
            if (!data.success || data.data.length === 0) {
                document.getElementById("result").innerHTML =
                    `<p class="no-data">No checkout entries found.</p>`;
                return;
            }

            let html = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Name (Optional)</th>
                            <th>Mobile</th>
                            <th>2nd Mobile (Optional)</th>
                            <th>Address 1</th>
                            <th>Address 2 (Optional)</th>
                            <th>Street</th>
                            <th>Landmark (Optional)</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Pincode</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.data.forEach(item => {
                html += `
                    <tr>
                        <td>${item.firstName}</td>
                        <td>${item.lastName || "-"}</td>
                        <td>${item.mobile}</td>
                        <td>${item.altMobile || "-"}</td>
                        <td>${item.address1}</td>
                        <td>${item.address2 || "-"}</td>
                        <td>${item.street}</td>
                        <td>${item.landmark || "-"}</td>
                        <td>${item.city}</td>
                        <td>${item.state}</td>
                        <td>${item.pincode}</td>
                    </tr>
                `;
            });

            html += `</tbody></table>`;

            document.getElementById("result").innerHTML = html;
        })
        .catch(err => {
            document.getElementById("result").innerHTML =
                `<p class="no-data">Error: ${err.message}</p>`;
        });
}
