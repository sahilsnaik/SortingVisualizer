const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let array = [];
let arraySize = 100;
let sorting = false;

function getSpeed() {
    const speedInput = document.getElementById('speed');
    return 100 - parseInt(speedInput.value);
}

function getArraySize() {
    const arraySizeInput = document.getElementById('array-size');
    return parseInt(arraySizeInput.value);
}

function generateRandomArray() {
    arraySize = getArraySize();
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.random() * canvas.height);
    }
    drawArray();
}

function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / arraySize;
    array.forEach((value, index) => {
        ctx.fillStyle = '#3498db';
        ctx.fillRect(index * barWidth, canvas.height - value, barWidth, value);
    });
}

async function bubbleSort() {
    if (sorting) return;
    sorting = true;
    const speed = getSpeed();
    for (let i = 0; i < arraySize - 1; i++) {
        for (let j = 0; j < arraySize - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray();
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
    }
    sorting = false;
}

async function insertionSort() {
    if (sorting) return;
    sorting = true;
    const speed = getSpeed();
    for (let i = 1; i < arraySize; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            drawArray();
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        array[j + 1] = key;
    }
    sorting = false;
}

async function mergeSort() {
    if (sorting) return;
    sorting = true;
    await performMergeSort(array, 0, arraySize - 1);
    drawArray();
    sorting = false;
}

async function performMergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await performMergeSort(arr, left, mid);
        await performMergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
}

async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    for (let i = 0; i < n1; i++) {
        leftArr[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArr[j] = arr[mid + 1 + j];
    }

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
        drawArray();
        await new Promise(resolve => setTimeout(resolve, getSpeed()));
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
        drawArray();
        await new Promise(resolve => setTimeout(resolve, getSpeed()));
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
        drawArray();
        await new Promise(resolve => setTimeout(resolve, getSpeed()));
    }
}

async function quickSort() {
    if (sorting) return;
    sorting = true;
    await performQuickSort(array, 0, arraySize - 1);
    drawArray();
    sorting = false;
}

async function performQuickSort(arr, low, high) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await performQuickSort(arr, low, pivotIndex - 1);
        await performQuickSort(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            drawArray();
            await new Promise(resolve => setTimeout(resolve, getSpeed()));
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    drawArray();
    await new Promise(resolve => setTimeout(resolve, getSpeed()));
    return i + 1;
}

async function selectionSort() {
    if (sorting) return;
    sorting = true;
    const speed = getSpeed();
    for (let i = 0; i < arraySize - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arraySize; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            drawArray();
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }
    sorting = false;
}

document.getElementById('generate-array').addEventListener('click', generateRandomArray);
document.getElementById('bubble-sort').addEventListener('click', bubbleSort);
document.getElementById('insertion-sort').addEventListener('click', insertionSort);
document.getElementById('merge-sort').addEventListener('click', mergeSort);
document.getElementById('quick-sort').addEventListener('click', quickSort);
document.getElementById('selection-sort').addEventListener('click', selectionSort);

generateRandomArray();
