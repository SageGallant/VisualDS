<header>
    <div class="logo">
        <!-- Embedded SVG Logo (Triangle) -->
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5 L25 25 L5 25 Z" fill="#1abc9c"/>
        </svg>
        VisualDS Admin Panel
    </div>
    <div class="header-buttons">
        <a href="/VisualDS/" class="home-btn">Website</a>
        <div class="theme-toggle">
            <button id="themeToggle" onclick="toggleTheme()">Toggle Theme</button>
        </div>
        <a href="../logout.php" class="logout-btn">Logout</a>
    </div>
</header>

<style>
.header-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.home-btn {
    padding: 0.5rem 1rem;
    background-color: #1abc9c;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.home-btn:hover {
    background-color: #16a085;
}
</style>