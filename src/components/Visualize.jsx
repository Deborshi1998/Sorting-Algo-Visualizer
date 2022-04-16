import React from "react";
/**
 * 
 * @param         {Array} array 
 * @param         {Color Array} color 
 * @returns       Bars elements
 * @description   Generated the bars for the visualization of the arrays and algorithm
 */
function Visualize(array, color) {
  let sortChart = document.getElementById("sort-chart");
  let width = 500 / array.length;
  sortChart.innerHTML = "";
  return array.map((value, index) => {
    let row = document.createElement("div");
    row.innerHTML = value;
    row.className = "row";
    row.style.backgroundColor = `${color[index]}`;
    row.style.height = `${value * 10}px`;
    row.style.width = `${width}px`;
    sortChart.appendChild(row);
  });
}

export default Visualize;
