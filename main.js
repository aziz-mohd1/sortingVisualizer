let slider1 = document.querySelector(".slider1");
let showValue1 = document.querySelector(".myText1");

let slider2 = document.querySelector(".slider2");
let showValue2 = document.querySelector(".myText2");

let barContainer = document.querySelector(".barContainer");

let randomizeBtn = document.querySelector(".RandomizeArray");
let sortBtn = document.querySelector(".StartSorting");

let sortingDropdown = document.querySelector("#sortingDropdown");
let algoName = document.querySelector(".algoName");

let bestTC = document.querySelector(".bestTC");
let averageTC = document.querySelector(".averageTC");
let worstTC = document.querySelector(".worstTC");

let bestSC = document.querySelector(".bestSC");
let averageSC = document.querySelector(".averageSC");
let worstSC = document.querySelector(".worstSC");

let bwToggleBtn = document.querySelector(".blackWhiteToggleBtn");
let innerToggleBtn = document.querySelector(".innerToggleBtn");
let wrapper = document.querySelector(".wrapper");

let color = true;
bwToggleBtn.addEventListener("click", ()=>{
    if(color){
        bwToggleBtn.classList.remove("justify-start");
        bwToggleBtn.classList.add("justify-end");
        bwToggleBtn.style.backgroundColor = "white";
        innerToggleBtn.style.backgroundColor = "black";
        wrapper.style.backgroundColor = "black";
        color = false;
    }else{
        bwToggleBtn.classList.remove("justify-end");
        bwToggleBtn.classList.add("justify-start");
        bwToggleBtn.style.backgroundColor = "black";
        innerToggleBtn.style.backgroundColor = "white";
        wrapper.style.backgroundColor = "#C87AFF";
        color = true;
    }
    
});

let timeComplexity = {
    bubbleSort : ["O(n)", "O(n^2)", "O(n^2)"],
    selectionSort : ["O(n^2)", "O(n^2)", "O(n^2)"],
    insertionSort : ["O(n)", "O(n^2)", "O(n^2)"],
    mergeSort : ["O(n log n)", "O(n log n)", "O(n log n)"],
    quickSort : ["O(n log n)", "O(n log n)", "O(n^2)"],
    cycleSort : ["O(n^2)", "O(n^2)", "O(n^2)"],
};

let spaceComplexity = {
    bubbleSort : ["O(1)", "O(1)", "O(1)"],
    selectionSort : ["O(1)", "O(1)", "O(1)"],
    insertionSort : ["O(1)", "O(1)", "O(1)"],
    mergeSort : ["O(n)", "O(n)", "O(n)"],
    quickSort : ["O(log n)", "O(log n)", "O(n)"],
    cycleSort : ["O(1)", "O(1)", "O(1)"],
};



function updateSliderValue(slider, display) {
    if (slider.classList.contains("slider1"))   display.innerText = `${slider.value}`;
    else    display.innerText = `${slider.value}x`;
}

function updateSliderBackground(slider, min, max) {
    let x = (slider.value - min) / (max - min) * 100;
    let color = `linear-gradient(to right, #3498db ${x}%, gray ${x}%)`;
    slider.style.background = color;
}

function initializeSlider(sliderClass, textClass, min = 1, max = 5) {
    const slider = document.querySelector(`.${sliderClass}`);
    const showValue = document.querySelector(`.${textClass}`);

    updateSliderValue(slider, showValue);
    updateSliderBackground(slider, min, max);

    slider.oninput = function() {
        updateSliderValue(slider, showValue);
        if (slider.classList.contains("slider1")) init();
    };

    slider.addEventListener("mousemove", () => {
        updateSliderBackground(slider, min, max);
    });

}

// Initialize sliders
initializeSlider("slider1", "myText1", 5, 100);
initializeSlider("slider2", "myText2", 1, 5);



// show bars
const arr = [];

function showBars(move){
    barContainer.innerHTML = ""; // Clear existing bars
    
    
    for(let i = 0; i<arr.length; i++){
        const bar = document.createElement("div");
        bar.style.height = `${arr[i]*100}%`;
        bar.classList.add("bar");

        // if(move && move.indices.includes(i)){
        //     bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
        // }

        if (move) {
            if (move.type === "swap" && move.indices.includes(i)) {
                bar.style.backgroundColor = "red"; // Color for swap
            } 
            else if (move.type === "comp" && move.indices.includes(i)) {
                bar.style.backgroundColor = "blue"; // Color for comparison
            } 
            else if (move.type === "move" && move.indices.includes(i)) {
                bar.style.backgroundColor = "orange"; // Color for shift
            } 
            else if (move.type === "insert" && move.indices.includes(i)) {
                bar.style.backgroundColor = "green"; // Color for final placement
            }
        }

        let barText = document.createElement("span");
        barText.innerText = Math.floor(arr[i]*100);
        barText.classList.add("barText");
        // text length
        if(arr.length <= 50){
            barText.style.fontSize = `100%`;
        }else if(arr.length > 50 && arr.length <= 70){
            barText.style.fontSize = `75%`;
        }else{
            barText.style.fontSize = `50%`;
        }
        
        barContainer.appendChild(barText);
        barContainer.appendChild(bar);
    }
}

//init
function init(){
    arr.length = slider1.value;

    for(let i = 0; i<arr.length; i++){
        arr[i] = Math.random();
    }

    showBars();
}
init();


// RandomizeArray
const RandomizeArray = ()=>{
    randomizeBtn.addEventListener("click",()=>{
        init();
    });
}
RandomizeArray();

// Bubble Sort
const bubbleSort = (arr) => {
    const moves = [];
    let n = arr.length;
    
    let swapped = false;
    for(let i = 0; i<n-1; i++){
        swapped = false;
        for(let j = 0; j<n-i-1; j++){
            moves.push({ indices: [j,j+1], type: "comp"});  // comparison
            if(arr[j] > arr[j+1]) {
                swapped = true;
                moves.push({ indices: [j,j+1], type: "swap"}); // swapping
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
        
        if(swapped==false) break;
    }
    return moves;
}

// Selection Sort
const selectionSort = (arr) => {
    const moves = [];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i; j < n; j++) {
            moves.push({ indices: [j, minIdx], type: "comp" }); // comparison
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        moves.push({ indices: [i, minIdx], type: "swap" }); // swap the elements
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

    }

    return moves;
};

// insertion sort
const insertionSort = (arr) => {
    const moves = [];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Move elements greater than key to one position ahead
        while (j >= 0 && arr[j] > key) {
            moves.push({ indices: [j + 1, j], type: "move" }); // mark the move (shift)
            arr[j + 1] = arr[j]; // shift the element
            j = j - 1;
        }
        arr[j + 1] = key;
        moves.push({ indices: [j + 1, key], type: "insert" }); // mark the final insertion of key
    }

    return moves;
};

// Merge Sort
// const mergeSort = (arr)=>{
//     let moves = [];

//     const merge = (v, left, mid, right) => {
//         let n1 = mid - left + 1;
//         let n2 = right - mid;
    
//         // Temporary arrays to hold the two halves
//         let L = new Array(n1);
//         let R = new Array(n2);
    
//         // Copy data to temp arrays L[] and R[]
//         for (let i = 0; i < n1; i++) L[i] = v[left + i];
//         for (let j = 0; j < n2; j++) R[j] = v[mid + 1 + j];
    
//         // Merge the temporary arrays back into v[left..right]
//         let i = 0, j = 0, k = left;
//         while (i < n1 && j < n2) {
//             moves.push({ indices: [left + i, mid + 1 + j], type: "comp" });
//             if (L[i] <= R[j]) {
//                 v[k] = L[i];
//                 moves.push({ indices: [k, left+i], type: "move"}); // Track the move
//                 i++;
//             } else {
//                 v[k] = R[j];
//                 moves.push({ indices: [k, mid+j+1], type: "move"}); // Track the move
//                 j++;
//             }
//             k++;
//         }
    
//         // Copy the remaining elements of L[], if any
//         while (i < n1) {
//             v[k] = L[i];
//             moves.push({ indices: [k, left+i], type: "move"}); // Track the move
//             k++;
//             i++;
//         }
    
//         // Copy the remaining elements of R[], if any
//         while (j < n2) {
//             v[k] = R[j];
//             moves.push({ indices: [k, mid+j+1], type: "move"}); // Track the move
//             k++;
//             j++;
//         }
//     };
    
//     const mergeSortHelper = (v, left, right) => {
//         if (left < right) {
//             let mid = Math.floor((left + right) / 2);
    
//             // Recursively sort first and second halves
//             mergeSortHelper(v, left, mid);
//             mergeSortHelper(v, mid + 1, right);
    
//             // Merge the sorted halves
//             merge(v, left, mid, right);
//         }
//     };

//     mergeSortHelper(arr, 0, arr.length-1);
//     console.log(moves);
    
//     return moves;
// };

// const mergeSort = (arr) => {
//     let moves = [];

//     const merge = (arr, left, mid, right) => {
//         let i = left, j = mid + 1, k = left;
//         let tempArr = [];

//         // Compare and merge the two halves
//         while (i <= mid && j <= right) {
//             moves.push({ indices: [i, j], type: "comp" });
//             if (arr[i] <= arr[j]) {
//                 tempArr.push(arr[i]);
//                 moves.push({ indices: [k, i], type: "move" });
//                 i++;
//             } else {
//                 tempArr.push(arr[j]);
//                 moves.push({ indices: [k, j], type: "move" });
//                 j++;
//             }
//             k++;
//         }

//         // Copy any remaining elements from the left half
//         while (i <= mid) {
//             tempArr.push(arr[i]);
//             moves.push({ indices: [k, i], type: "move" });
//             i++;
//             k++;
//         }

//         // Copy any remaining elements from the right half
//         while (j <= right) {
//             tempArr.push(arr[j]);
//             moves.push({ indices: [k, j], type: "move" });
//             j++;
//             k++;
//         }

//         // Copy the merged array back into the original array
//         for (let i = left; i <= right; i++) {
//             arr[i] = tempArr[i - left];
//         }
//     };

//     const mergeSortHelper = (arr, left, right) => {
//         if (left < right) {
//             let mid = Math.floor((left + right) / 2);
//             mergeSortHelper(arr, left, mid);
//             mergeSortHelper(arr, mid + 1, right);
//             merge(arr, left, mid, right);
//         }
//     };

//     mergeSortHelper(arr, 0, arr.length - 1);
//     return moves;
// };


function sortingProcess(sortAlgo, algoText, timeSpace){
    let copyArr = [...arr];           
    let moves = sortAlgo(copyArr);          
    animate(moves);
    algoName.innerText = algoText;
    timeAndSpaceComplexity(timeSpace);
}

let selectedSortingTechnique = null; // nothing is there in dropdown

// Handle dropdown change
sortingDropdown.addEventListener("change", () => {
    selectedSortingTechnique = sortingDropdown.value;
});

sortBtn.addEventListener("click", ()=>{
    if(selectedSortingTechnique === "BubbleSort"){
        sortingProcess(bubbleSort, "Bubble Sort", "bubbleSort");
    }else if (selectedSortingTechnique === "SelectionSort") {
        sortingProcess(selectionSort, "Selection Sort", "selectionSort");
    } else if (selectedSortingTechnique === "InsertionSort") {
        sortingProcess(insertionSort, "Insertion Sort", "insertionSort");
    }
    // else if (selectedSortingTechnique === "MergeSort") {
    //     sortingProcess(mergeSort, "Merge Sort", "mergeSort");
    // }
});


const animate = (moves)=>{
    slider1.disabled = true;
    slider1.style.cursor = "not-allowed";

    sortingDropdown.disabled = true;
    sortingDropdown.style.cursor = "not-allowed";

    sortBtn.disabled = true;
    sortBtn.style.cursor = "not-allowed";
    
    randomizeBtn.disabled = true;
    randomizeBtn.style.cursor = "not-allowed";

    if(moves.length == 0){
        slider1.disabled = false;
        slider1.style.cursor = "pointer";
        sortingDropdown.disabled = false;
        sortingDropdown.style.cursor = "pointer";
        sortBtn.disabled = false;
        sortBtn.style.cursor = "pointer";
        randomizeBtn.disabled = false;
        randomizeBtn.style.cursor = "pointer";
        showBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;

    if(move.type == "swap"){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }else if (move.type == "move") {
        arr[i] = arr[j];
    } else if (move.type == "insert") {
        arr[i] = j;
    }

    showBars(move);

    setTimeout(() => {
        animate(moves); // Recursively call the animate function to continue with the next swap
    }, 1/slider2.value*200);
}


function timeAndSpaceComplexity(algo){
    bestTC.innerText = `${timeComplexity[algo][0]}`;
    averageTC.innerText = `${timeComplexity[algo][1]}`;
    worstTC.innerText = `${timeComplexity[algo][2]}`;
    
    bestSC.innerText = `${spaceComplexity[algo][0]}`;
    averageSC.innerText = `${spaceComplexity[algo][1]}`;
    worstSC.innerText = `${spaceComplexity[algo][2]}`;
}



