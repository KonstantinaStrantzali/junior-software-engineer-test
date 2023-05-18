const boroughSelect = document.getElementById("borough");
const selectedBorough = document.getElementById("selected-borough");
const tableContainer = document.getElementById("table-container");

boroughSelect.addEventListener("change", (event) => {
    const boroughSelect = event.target.value;
    selectedBorough.textContent = boroughSelect;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Process the API response and update the UI as needed
            const response = JSON.parse(xhr.responseText);
            const coffeeshops = response.coffeeshops || [];

            // Filter the coffee shops based on the selected borough
            const filteredCoffeeshops = coffeeshops.filter((coffeeshop) => coffeeshop.borough === boroughSelect);

            const table = document.createElement("table");
            table.classList.add("table");
            // Create the header row
            const headerRow = document.createElement("tr");
            headerRow.classList.add("header-row");
            // Create table header cells
            const headerShop = document.createElement("th");
            const headerBorough = document.createElement("th");
            const headerRevenue = document.createElement("th");

            // Set the header cell content
            headerShop.textContent = "Shop";
            headerBorough.textContent = "Borough";
            headerRevenue.textContent = "Revenue";

            // Append header cells to the header row
            headerRow.appendChild(headerShop);
            headerRow.appendChild(headerBorough);
            headerRow.appendChild(headerRevenue);

            // Append the header row to the table
            table.appendChild(headerRow);

            filteredCoffeeshops.forEach((coffeeshop) => {
                // Remove any existing table
                const existingTable = tableContainer.querySelector("table");

                if (tableContainer) {
                    // Remove any existing table
                    const existingTable = tableContainer.querySelector("table");
                    if (existingTable) {
                        tableContainer.removeChild(existingTable);
                    }
                }

                // Create a row for the coffee shop data
                const dataRow = document.createElement("tr");

                // Create table cells for each data item
                const cellShop = document.createElement("td");
                const cellBorough = document.createElement("td");
                const cellRevenue = document.createElement("td");

                // Set the cell content with coffee shop data
                cellShop.textContent = coffeeshop.shop;
                cellBorough.textContent = coffeeshop.borough;
                cellRevenue.textContent = coffeeshop.revenue;

                // Append data cells to the data row
                dataRow.appendChild(cellShop);
                dataRow.appendChild(cellBorough);
                dataRow.appendChild(cellRevenue);

                // Append the data row to the table
                table.appendChild(dataRow);

                // Append the table to the document body or any desired container element
                tableContainer.appendChild(table);
            });
        }
    };
    xhr.open("GET", "http://localhost:3000/coffeeshops");
    xhr.send();
});
