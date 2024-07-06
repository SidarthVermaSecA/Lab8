const yearSelect = document.getElementById("year_options");  //making year selection limit from 1995 to 2050
yearSelect.innerHTML = ''; 
for (let i = 1995; i < 2050; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option); 
}  

//this function gets called once user chooses country and year and clicks on submit button
const fetchPublicHolidays = () => {  //taking necessary elements from html structure
    const year = document.getElementById("year_options").value;
    const country = document.getElementById("country_options").value;
    const names = document.getElementById("holiday_names");
    const dates = document.getElementById("holiday_dates");
    const tableContainer = document.getElementById("holiday_table");
    console.log(year);
    console.log(country);
    const url = `https://date.nager.at/api/v3/publicholidays/${year}/${country}`; //fetching api based on required data which user inputs like name of country and year
    fetch(url)
        .then(response => response.json()) //converting the response from api to json 
        .then(data => { //once response received, then getting the data and performing operations on it
            console.log(data);
            tableContainer.innerHTML = '';
            names.innerText = '';
            dates.innerText = '';

            const table = document.createElement('table'); //creating a table-structure to put the data
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
        .catch(error => console.error(error));  //printing errors in the console
};
