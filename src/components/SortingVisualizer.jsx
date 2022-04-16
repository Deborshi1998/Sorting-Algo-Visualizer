/*
 * Mozilla Public License, Version 2.0
 *
 * Copyright (c) 2022 Debarshi
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 * @author          Debarshi Raj Basumatary
 * @createdDate     16/04/2022
 */
import "../styles/SortingVisualizer.css";
import React, { useState, useEffect, useRef } from "react";
import Visualize from "./Visualize";
import About from "./About";

/**
 * [Sorting Algorithm Visualizer App]
 * @param           null  
 * @returns         sorting algorithm visualizer app component
 */
function SortingVisualizer() {
  const [start, setstart] = useState(false);
  const [range, setrange] = useState(21);
  const [Array, setarray] = useState([]);
  const [speed, setspeed] = useState(100);
  const [algo, setalgo] = useState("bubble");

  /**
   * @param         null
   * @returns       null
   * @description   generates an random array and visualizes it on window loading  
   */
  useEffect(() => {
    if (!start) {
      const arr = handleArrayGenerate();
      let color = [];
      for (let i = 0; i < arr.length; i++) {
        color.push("red");
      }
      Visualize(arr, color);
    }
  }, [range]);

  /**
   * @param         {event} e
   * @returns       null
   * @description   set the current selected algorithm
   */
  const handleAlgoChange = (e) => {
    setalgo(e.target.value);
  };

  /**
   * @param         null
   * @returns       An randomize array, with size depending on the size input slider
   * @description   generates an random array
   */
  const handleArrayGenerate = () => {
    let num = 500 / Math.round(range);
    let arr = Math.round(num);
    let tempArr = [];
    for (let i = 0; i < arr; i++) {
      tempArr.push(Math.floor(Math.random() * (40 - 10) + 10));
    }
    setarray(tempArr);
    return tempArr;
  };

  /**
   * 
   * @param         {event} e
   * @returns       null
   * @description   sets the range state of size input slider. 
   */
  const handleRange = (e) => {
    setrange(e.target.value);
  };

  /**
   * 
   * @param         {event} e
   * @returns       null
   * @description   sets the speed state of speed input slider 
   */
  const handleSpeed = (e) => {
    setspeed(e.target.value);
  };

  /**
   * @param             null
   * @returns           null
   * @description       1.Handler for generate button.
   *                    2.Generate a new random array.
   *                    3.And Visualizes the new array on the screen
   */
  const generate = () => {
    let tempArr = handleArrayGenerate();
    let color = [];
    for (let i = 0; i < tempArr.length; i++) {
      color.push("red");
    }
    Visualize(tempArr, color);
  };
  
  /**
   * 
   * @param         {mili seconds} ms 
   * @returns       new Promise object.
   * @description   It is used to add some time delay between various sorting operations
   */
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * @param         null
   * @returns       null
   * @description   1.Handler for Sort Button. 
   *                2.It call a sorting algorithm, depending on the selected algorithm
   */
  const handleSorting = async () => {
    setstart(true);
    switch (algo) {
      case "bubble":
        await bubblesort(Array);
        break;
      case "insertion":
        await insertionSort(Array, Array.length);
        break;
      case "merge":
        {
          await mergeSort(Array, 0, Array.length - 1);
          let color = [];
          for (let i = 0; i < Array.length; i++) {
            color[i] = "green";
          }
          Visualize(Array, color);
        }
        break;
      case "heap":
        await heapSort(Array);
        break;
      default:
        await bubblesort(Array);
        break;
    }
    setstart(false);
  };

  /**
   * 
   * @param           {Array} arr 
   * @param           {size} n
   * @description     1.It runs the insertion sort algorithm on the array
   *                  2.Visualizes the sorting steps
   *                  3.And Finally visualizes the final sorted array
   */
  const insertionSort = async (arr, n) => {
    let color = [];
    for (let i = 0; i < arr.length; i++) {
      color.push("red");
    }
    let i, key, j;
    for (i = 1; i < n; i++) {
      key = arr[i];
      j = i - 1;
      color[i - 1] = "red";
      color[i] = "yellow";
      while (j >= 0 && arr[j] > key) {
        await wait(speed);
        color[j] = "blue";
        arr[j + 1] = arr[j];
        j = j - 1;
        setarray(arr);
        Visualize(arr, color);
        color[j + 1] = "red";
      }
      await wait(speed);
      arr[j + 1] = key;
      color[i] = "red";
      setarray(arr);
      Visualize(arr, color);
    }
    for (let i = 0; i < arr.length; i++) {
      color[i] = "green";
    }
    Visualize(arr, color);
  };

  /**
   * 
   * @param           {Array} arr
   * @description     1.It runs the bubble sort algorithm on the array
   *                  2.Visualizes the sorting steps
   *                  3.And Finally visualizes the final sorted array
   */
  const bubblesort = async (arr) => {
    setstart(true);
    let color = [];
    for (let i = 0; i < arr.length; i++) {
      color.push("red");
    }
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          await wait(speed);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          color[j] = "blue";
          color[j + 1] = "blue";
          setarray(arr);
          Visualize(Array, color);
          color[j] = "red";
          color[j + 1] = "red";
        }
        await wait(speed);
        color[j] = "blue";
        color[j + 1] = "blue";
        setarray(arr);
        Visualize(Array, color);
        color[j] = "red";
        color[j + 1] = "red";
      }
      color[j] = "green";
    }
    color[0] = "green";
    color[1] = "green";
    Visualize(Array, color);
    setstart(false);
  };

  /**
   * 
   * @param           {Array} arr 
   * @param           {start index of array} start 
   * @param           {middle index of array} mid 
   * @param           {end index of array} end 
   * @returns         null
   * @description     1. It is a part of the Merge Sort Algorithm.
   *                  2. This function merges the sub arrays.
   */
  const merge = async (arr, start, mid, end) => {
    let color = [];
    for (let i = 0; i < arr.length; i++) {
      color[i] = "red";
    }
    let start2 = mid + 1;
    if (arr[mid] <= arr[start2]) {
      return;
    }
    while (start <= mid && start2 <= end) {
      await wait(speed);
      Visualize(arr, color);
      if (arr[start] <= arr[start2]) {
        color[start] = "blue";
        color[start2] = "blue";
        Visualize(arr, color);
        start++;
      } else {
        let value = arr[start2];
        let index = start2;
        while (index !== start) {
          arr[index] = arr[index - 1];
          color[index] = "blue";
          color[index - 1] = "blue";
          Visualize(arr, color);
          index--;
        }
        arr[start] = value;
        start++;
        mid++;
        start2++;
      }
      color[start] = "red";
      color[start2] = "red";
    }
    for (let i = 0; i < arr.length; i++) {
      color[i] = "red";
    }
    Visualize(arr, color);
  };

  /**
   * 
   * @param          {Array} arr 
   * @param          {start index} l 
   * @param          {end index} r
   * @description    1.It is the merge sort Algorithm
   *                 2.It repeatedly calls itself and divides the array
   *                 3.Later it call the merge function to merge the divides sub arrays
   */
  const mergeSort = async (arr, l, r) => {
    if (l < r) {
      let m = l + Math.floor((r - l) / 2);
      await mergeSort(arr, l, m);
      let color = [];
      for (let i = 0; i < arr.length; i++) {
        color[i] = "red";
      }
      Visualize(arr, color);
      await mergeSort(arr, m + 1, r);
      for (let i = 0; i < arr.length; i++) {
        color[i] = "red";
      }
      Visualize(arr, color);
      await merge(arr, l, m, r);
    }
  };

  /**
   * 
   * @param           {Array} arr
   * @returns         null
   * @description     1.It runs the heap sort algorithm.
   *                  2.Visualizes the sorting steps
   *                  3.And Finally visualizes the final sorted array
   */
  const heapSort = async (arr) => {
    let n = arr.length;
    let color = [];
    for (let i = 0; i <= n; i++) {
      color.push("red");
    }
    Visualize(arr, color);
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await wait(speed);
      heapify(arr, n, i, color);
    }
    for (let i = 0; i <= n; i++) {
      color[i] = "yellow";
    }
    Visualize(arr, color);
    for (let i = n - 1; i > 0; i--) {
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      await wait(speed);
      color[i] = "green";
      Visualize(arr, color);
      await heapify(arr, i, 0, color);
    }
    color[0] = "green";
    Visualize(arr, color);
  };
  /**
   * 
   * @param         {Array} arr 
   * @param         {size} n 
   * @param         {root index} i 
   * @param         {Color Array} color
   * @description   1.Part of the Heap Sort Algortihm.
   *                2.It heapify the arrays
   *                3.It visualizes steps 
   */
  const heapify = async (arr, n, i, color) => {
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2
    // If left child is larger than root
    if (l < n && arr[l] > arr[largest]) largest = l;
    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest]) largest = r;
    // If largest is not root
    if (largest != i) {
      let swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;
      // Recursively heapify the affected sub-tree
      heapify(arr, n, largest);
      await wait(speed);
      color[i] = "blue";
      color[largest] = "blue";
      Visualize(arr, color);
    }
    color[largest] = "yellow";
  };

  /**
   * @description     jsx components of the app
   */
  return (
    <div>
      <header class="header">
        <div className="nav-bar">
          <ul>
            <h3 id="nav-bar-logo">Sorting Algorithm</h3>
            <li>
              <button className="button-30" onClick={generate} disabled={start}>
                Randomize
              </button>
            </li>
            <li>
              {" "}
              <div className="slidecontainer">
                <label htmlFor="myRange">Set Size</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={range}
                  className="slider"
                  id="myRange"
                  onChange={handleRange}
                  disabled={start}
                />
              </div>
            </li>
            <li>
              <div className="slidecontainer">
                <label htmlFor="myRange">Set Speed</label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={speed}
                  className="slider"
                  id="myRange"
                  onChange={handleSpeed}
                  disabled={start}
                />
              </div>
            </li>
            <li>
              <select
                name="algos"
                id="algos"
                value={algo}
                onChange={handleAlgoChange}
                disabled={start}
              >
                <option value="bubble" onSelect={handleAlgoChange}>
                  Bubble Sort
                </option>
                <option value="insertion" onSelect={handleAlgoChange}>
                  Insertion Sort
                </option>
                <option value="merge" onSelect={handleAlgoChange}>
                  Merge Sort
                </option>
                <option value="heap" onSelect={handleAlgoChange}>
                  Heap Sort
                </option>
              </select>
            </li>
            <li>
              {" "}
              <button
                className="button-30"
                onClick={handleSorting}
                disabled={start}
              >
                Sort
              </button>
            </li>
          </ul>
        </div>
      </header>

      <label>Visualization:</label>

      <div id="sort-chart"></div>
      <hr />
      <About Algo={algo} />
    </div>
  );
}

export default SortingVisualizer;
