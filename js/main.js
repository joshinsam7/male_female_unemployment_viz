// Hint: This is a great place to declare your global variables


// This function will be called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
   // Hint: create or set your svg element inside this function
    
   // This will load your CSV files and store them into two arrays.
   Promise.all([d3.csv('data/females_data.csv'),d3.csv('data/males_data.csv')])
        .then(function (values) {
            console.log('Loaded the females_data.csv and males_data.csv');
            female_data = values[0];
            male_data = values[1];

            // Hint: This is a good spot for data wrangling

            
            drawLolliPopChart();
        });
});

// You can use this function to draw the lollipop chart.
function drawLolliPopChart() {
    console.log('trace:drawLolliPopChart()');
}

