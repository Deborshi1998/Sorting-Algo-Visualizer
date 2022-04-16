import React from "react";
/**
 * 
 * @param           {selected algorithm} prop 
 * @returns         About section of the Sorting Algorithm Visualizer app
 * @description     About Section. Renders different info based on the passed prop, i.e selected algorithm
 */
function About(prop) {
  const bubbleSortBody =
    "Bubble sort,sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.";
  const bubbleSortPerf =
    "Bubble sort has a worst-case and average complexity of O(N²), where N is the number of input.";
  const insertionSortBody =
    "Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.";
  const insertionSortPerf =
    "More efficient in practice than most other simple quadratic (i.e., O(n2)) algorithms such as selection sort or bubble sort. Efficient for data sets that are already substantially sorted: the time complexity is O(kn) when each element in the input is no more than k places away from its sorted position. Stable; i.e., does not change the relative order of elements with equal keys. In-place; i.e., only requires a constant amount O(1) of additional memory space. Online; i.e., can sort a list as it receives it";
  const heapSortBody =
    "Build a max heap from the input data. At this point, the largest item is stored at the root of the heap. Replace it with the last item of the heap followed by reducing the size of heap by 1. Finally, heapify the root of the tree. Repeat step 2 while the size of the heap is greater than 1.";
  const heapSortPerf =
    "Time complexity of heapify is O(Logn). Time complexity of createAndBuildHeap() is O(n) and the overall time complexity of Heap Sort is O(nLogn).";
  const mergeSortBody =
    "Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.";
  const mergeSortPerf =
    "Time complexity of Merge Sort is  θ(nLogn) in all 3 cases (worst, average and best) as merge sort always divides the array into two halves and takes linear time to merge two halves.";
  console.log(prop.Algo);

  return (
    <>
      <div className="about">
        {prop.Algo == "bubble" ? (
          <div className="heading">
            <h2>Bubble Sort</h2>
          </div>
        ) : prop.Algo === "insertion" ? (
          <div className="heading">
            <h2>Insertion Sort</h2>
          </div>
        ) : prop.Algo === "merge" ? (
          <div className="heading">
            <h2>Merge Sort</h2>
          </div>
        ) : prop.Algo === "heap" ? (
          <div className="heading">
            <h2>Heap Sort</h2>
          </div>
        ) : (
          <></>
        )}

        <div className="about-algo">
          <div>
            <h3>About</h3>
            {prop.Algo == "bubble" ? (
              <p>{bubbleSortBody}</p>
            ) : prop.Algo === "insertion" ? (
              <p>{insertionSortBody}</p>
            ) : prop.Algo === "merge" ? (
              <p>{mergeSortBody}</p>
            ) : prop.Algo === "heap" ? (
              <p>{heapSortBody}</p>
            ) : (
              <></>
            )}
          </div>

          <div>
            <h4>Performance</h4>
            {prop.Algo == "bubble" ? (
              <p>{bubbleSortPerf}</p>
            ) : prop.Algo === "insertion" ? (
              <p>{insertionSortPerf}</p>
            ) : prop.Algo === "merge" ? (
              <p>{mergeSortPerf}</p>
            ) : prop.Algo === "heap" ? (
              <p>{heapSortPerf}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default About;
