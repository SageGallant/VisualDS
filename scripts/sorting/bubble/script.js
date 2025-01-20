document.addEventListener('DOMContentLoaded', () => {
    const arrayVisual = document.getElementById('arrayVisual');
    const resetBtn = document.getElementById('resetVisual');
    const nextStepBtn = document.getElementById('nextStep');
    
    let array = [64, 34, 25, 12, 22, 11, 90];
    let currentStep = 0;
    let comparing = [];
    
    function createArrayElements() {
        arrayVisual.innerHTML = '';
        array.forEach((num, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = num;
            if (comparing.includes(index)) {
                element.classList.add('comparing');
            }
            arrayVisual.appendChild(element);
        });
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function showNextStep() {
        if (currentStep >= array.length - 1) {
            currentStep = 0;
            comparing = [];
            createArrayElements();
            return;
        }
        
        comparing = [currentStep, currentStep + 1];
        createArrayElements();
        await sleep(500);
        
        if (array[currentStep] > array[currentStep + 1]) {
            // Swap elements
            const temp = array[currentStep];
            array[currentStep] = array[currentStep + 1];
            array[currentStep + 1] = temp;
            createArrayElements();
        }
        
        currentStep++;
    }
    
    function resetArray() {
        array = [64, 34, 25, 12, 22, 11, 90];
        currentStep = 0;
        comparing = [];
        createArrayElements();
    }
    
    resetBtn.addEventListener('click', resetArray);
    nextStepBtn.addEventListener('click', showNextStep);
    
    // Initialize visualization
    createArrayElements();

    // Update progress bar
    const progressFill = document.querySelector('.progress-line-fill');
    progressFill.style.width = '0%';
});