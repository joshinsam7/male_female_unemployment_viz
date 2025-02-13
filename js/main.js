maleresult = {"Angola" : 0,"India": 1 ,"Australia": 2, "Argentina": 3, "Afghanistan": 4 }
femaleresult = {"Angola" : 0,"India": 1 ,"Australia": 2, "Argentina": 3, "Afghanistan": 4 } 
malevalues = []
femalevalues = []
// This function will be called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
   // Hint: create or set your svg element inside this function
   // This will load your CSV files and store them into two arrays.
   document.getElementById('countrySelect').addEventListener('change', function(){
        drawLolliPopChart()
    })
    svg = d3.select("svg")
        .append("g")
        .attr("transform", `translate(50,50)`);
   Promise.all([d3.csv('data/females_data.csv'),d3.csv('data/males_data.csv')])
        .then(function (values) {
            console.log('Loaded the females_data.csv and males_data.csv');
            female_data = values[0];
            male_data = values[1];
            // Hint: This is a good spot for data wrangling
            for (let country in maleresult) {
                if (maleresult.hasOwnProperty(country)) {
                    temp = []
                    male_data.forEach(element => {
                        year = new Date(element["Year"], 0, 1);
                        value = +element[country];
                        temp.push([year,value]);
                    });
                    malevalues.push(temp);
                }
            }
            for (let country in femaleresult) {
                if (femaleresult.hasOwnProperty(country)) {
                    temp = []
                    female_data.forEach(element => {
                        year = new Date(element["Year"], 0, 1);
                        value = +element[country];
                        temp.push([year,value]);
                    });
                    femalevalues.push(temp);
                }
            }
            console.log(malevalues);
            drawLolliPopChart();
        });
});

// You can use this function to draw the lollipop chart.
function drawLolliPopChart() {
    console.log('trace:drawLolliPopChart()');

    const selectedCountry = document.getElementById("countrySelect").value;
    let femalearr = femalevalues[femaleresult[selectedCountry]]
    let malearr = malevalues[maleresult[selectedCountry]]
    console.log(femalearr)
    console.log(malearr)
    let malerates = malearr.map(tuple => tuple[1]);
    let femalerates = femalearr.map(tuple => tuple[1]);
    let maxim = Math.max(...malerates, ...femalerates);
    console.log("Max value:",maxim);
    let xScale = d3.scaleTime()
        .domain([new Date(1990, 0, 1), new Date(2023, 0, 1)]) 
        .range([0, 700]);
    
    let yScale = d3.scaleLinear()
        .domain([0, maxim]) 
        .range([300, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(10);
    const yAxis = d3.axisLeft(yScale);
    
    svg.selectAll(".male-line, .female-line, .male-circle, .female-circle, .x-axis, .y-axis").remove();

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,300)`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

    svg.append("text")
    .attr("x", 700 / 2)
    .attr("y", 350)
    .attr("text-anchor", "middle")
    .text("Year(1991-2022)");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -300)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .text("Rate of Employment");
    
    svg.selectAll(".female-line")
    .data(femalearr)
    .enter()
    .append("line")
    .attr("class", "female-line")
    .attr("x1", d => xScale(d[0])+10) 
    .attr("y1", d => yScale(d[1]))  
    .attr("x2", d => xScale(d[0])+10)  
    .attr("y2", 300)  
    .attr("stroke", "green") 
    .attr("stroke-width", 1.5);

    svg.selectAll(".female-circle")
        .data(femalearr)
        .enter()
        .append("circle")
        .attr("class", "female-circle")
        .attr("cx", d => xScale(d[0])+10)  
        .attr("cy", d => yScale(d[1]))
        .attr("r", 3)
        .attr("fill", "green");

    svg.selectAll(".male-line")
        .data(malearr)
        .enter()
        .append("line")
        .attr("class", "male-line")
        .attr("x1", d => xScale(d[0]))  
        .attr("y1", d => yScale(d[1]))  
        .attr("x2", d => xScale(d[0]))  
        .attr("y2", 300)  
        .attr("stroke", "blue")  
        .attr("stroke-width", 1.5);

    svg.selectAll(".male-circle")
        .data(malearr)
        .enter()
        .append("circle")
        .attr("class", "male-circle")
        .attr("cx", d => xScale(d[0]))  
        .attr("cy", d => yScale(d[1]))
        .attr("r", 3)
        .attr("fill", "blue");
    
        let legend = svg.append("g")
        .attr("transform", "translate(700, -80)");
    
    legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "purple");
    
    legend.append("text")
        .attr("x", 25)  
        .attr("y", 12)
        .text("Female Employment Rates")
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
    

    legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("y", 25)  
        .attr("fill", "blue");
    
    legend.append("text")
        .attr("x", 25)
        .attr("y", 37)
        .text("Male Employment Rates")
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");    
}