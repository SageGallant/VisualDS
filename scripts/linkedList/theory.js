// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Interactive Linked List Visualization
class Node {
    constructor(value) {
        this.value = value;
        this.element = this.createNodeElement();
    }

    createNodeElement() {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node';
        nodeDiv.style.cssText = `
            background: var(--accent-color);
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease;
        `;

        const valueSpan = document.createElement('span');
        valueSpan.textContent = this.value;
        valueSpan.style.fontWeight = 'bold';

        const arrow = document.createElement('span');
        arrow.textContent = '→';
        arrow.style.marginLeft = '0.5rem';

        nodeDiv.appendChild(valueSpan);
        nodeDiv.appendChild(arrow);

        return nodeDiv;
    }
}

// Create initial linked list visualization
const nodeContainer = document.querySelector('.node-container');
const initialValues = [1, 2, 3, 4, 5];

initialValues.forEach(value => {
    const node = new Node(value);
    nodeContainer.appendChild(node.element);
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Navigation
const nextButton = document.querySelector('.nav-button.next');
nextButton.addEventListener('click', () => {
    // Add navigation logic here
    console.log('Navigate to Algorithm page');
});