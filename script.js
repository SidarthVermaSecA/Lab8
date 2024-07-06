const yearSelect = document.getElementById("year_options");
yearSelect.innerHTML = ''; 
for (let i = 1995; i < 2050; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option); 
}  

const fetchPublicHolidays = () => {
    const year = document.getElementById("year_options").value;
    const country = document.getElementById("country_options").value;
    const names = document.getElementById("holiday_names");
    const dates = document.getElementById("holiday_dates");
    const tableContainer = document.getElementById("holiday_table");
    console.log(year);
    console.log(country);
    const url = `https://date.nager.at/api/v3/publicholidays/${year}/${country}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            tableContainer.innerHTML = '';
            names.innerText = '';
            dates.innerText = '';

            const table = document.createElement('table');
            table.className = "table";
            const header = table.insertRow();
            const Headerdate = header.insertCell();
            const Headername = header.insertCell();
            Headerdate.textContent = "Date";
            Headername.textContent = "Holiday Name";

            data.forEach(holiday => {
                const row = table.insertRow();
                const dateCell = row.insertCell();
                const nameCell = row.insertCell();
                dateCell.textContent = holiday.date;
                nameCell.textContent = holiday.localName;
            });
  
           

            tableContainer.appendChild(table);
        })
        .catch(error => console.error(error));
};