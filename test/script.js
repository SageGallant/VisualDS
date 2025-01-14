document.addEventListener('DOMContentLoaded', () => {
    const arrayDemo = document.getElementById('arrayDemo');
    const nextStepBtn = document.getElementById('nextStep');
    const resetBtn = document.getElementById('resetDemo');
    const stepExplanation = document.getElementById('stepExplanation');

    let array = [5, 3, 8, 4, 2];
    let currentStep = 0;
    let currentPass = 0;
    let comparing = [];
    
    function renderArray() {
        arrayDemo.innerHTML = '';
        array.forEach((num, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            if (comparing.includes(index)) {
                element.classList.add('comparing');
            }
            element.textContent = num;
            arrayDemo.appendChild(element);
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function highlightElements(i, j) {
        comparing = [i, j];
        renderArray();
        await sleep(1000);
    }

    async function swap(i, j) {
        const elements = arrayDemo.children;
        elements[i].classList.add('swapping');
        elements[j].classList.add('swapping');
        await sleep(500);

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        
        renderArray();
        await sleep(500);
    }

    async function bubbleSortStep() {
        const n = array.length;
        
        if (currentStep >= n - 1 - currentPass) {
            currentStep = 0;
            currentPass++;
            if (currentPass >= n - 1) {
                stepExplanation.textContent = 'Sorting complete!';
                nextStepBtn.disabled = true;
                return;
            }
        }

        stepExplanation.textContent = `Comparing elements ${array[currentStep]} and ${array[currentStep + 1]}`;
        await highlightElements(currentStep, currentStep + 1);

        if (array[currentStep] > array[currentStep + 1]) {
            stepExplanation.textContent = `Swapping ${array[currentStep]} and ${array[currentStep + 1]}`;
            await swap(currentStep, currentStep + 1);
        }

        currentStep++;
        comparing = [];
        renderArray();
    }

    function resetDemo() {
        array = [5, 3, 8, 4, 2];
        currentStep = 0;
        currentPass = 0;
        comparing = [];
        nextStepBtn.disabled = false;
        stepExplanation.textContent = "Click 'Next Step' to start the demonstration";
        renderArray();
    }

    nextStepBtn.addEventListener('click', bubbleSortStep);
    resetBtn.addEventListener('click', resetDemo);

    // Initialize the demo
    renderArray();
});