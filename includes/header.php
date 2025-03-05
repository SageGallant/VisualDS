<?php
function getAuthButton() {
    if (isset($_SESSION['user_id'])) {
        // Get first letter of username
        $initial = strtoupper(substr($_SESSION['username'], 0, 1));
        return '
        <div class="user-menu">
            <button class="profile-btn" onclick="toggleDropdown(event)">
                <div class="avatar-initial">' . $initial . '</div>
                <span>' . htmlspecialchars($_SESSION['username']) . '</span>
            </button>
            <div class="dropdown-menu" id="userDropdown">
                <a href="/VisualDS/pages/profile.php">My Profile</a>
                <a href="/VisualDS/logout.php">Logout</a>
            </div>
        </div>';
    } else {
        return '<a href="/VisualDS/login.php" class="auth-btn">Login</a>';
    }
}
?>

<header class="main-header">
    <div class="header-left">
        <button id="mobile-menu-toggle" class="mobile-menu-toggle">
            <span class="hamburger"></span>
        </button>
        <a href="/VisualDS/index.php" class="logo">
            <img src="/VisualDS/assets/images/Icon.gif" width="40" alt="Logo">
            <h1 class="page-title">VisualDSA</h1>
        </a>
    </div>
    
    <nav class="header-nav" id="header-nav">
        <ul>
            <li><a href="/VisualDS/pages/home.php">Home</a></li>
            <li><a href="#">Sorting</a></li>
            <li><a href="#">Linked List</a></li>
            <li><a href="#">Help</a></li>
        </ul>
    </nav>

    <div class="header-right">
        <button id="bgm-toggle" class="control-btn" title="Toggle Background Music">
            <span class="icon">🔊</span>
        </button>
        <select id="theme-select" class="theme-select">
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value="modern">Modern</option>
            <option value="royal">Royal</option>
            <option value="elegant">Elegant</option>
        </select>
        <?php echo getAuthButton(); ?>
    </div>
</header>

<style>
.main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 2rem;
    background: var(--header-bg, #ffffff);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 9999;
}

.header-left {
    display: flex;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
}

.page-title {
    color: var(--text-primary, #333);
    font-size: 1.5rem;
    font-weight: 600;
}

.header-nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    z-index: 1000;
}

.header-nav a {
    text-decoration: none;
    color: var(--text-primary, #333);
    font-weight: 500;
    padding: 0.5rem 0;
    position: relative;
}

.header-nav a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color, #007bff);
    transition: width 0.3s ease;
}

.header-nav a:hover::after {
    width: 100%;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.control-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.control-btn:hover {
    background: var(--hover-bg, #f0f0f0);
}

.theme-select {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    border: 1px solid var(--border-color, #ddd);
    background: var(--bg-color);
    color: var(--text-color);
}

.auth-btn {
    padding: 0.5rem 1.2rem;
    border-radius: 4px;
    text-decoration: none;
    background: var(--primary-color, #007bff);
    color: white;
    font-weight: 500;
    transition: all 0.2s ease;
}

.auth-btn:hover {
    background: var(--primary-color-dark, #0056b3);
    transform: translateY(-1px);
}

.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    margin-right: 1rem;
}

.hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text-primary, #333);
    position: relative;
    transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: var(--text-primary, #333);
    transition: all 0.3s ease;
}

.hamburger::before {
    top: -6px;
}

.hamburger::after {
    bottom: -6px;
}

.mobile-menu-toggle.active .hamburger {
    background: transparent;
}

.mobile-menu-toggle.active .hamburger::before {
    transform: rotate(45deg);
    top: 0;
}

.mobile-menu-toggle.active .hamburger::after {
    transform: rotate(-45deg);
    bottom: 0;
}
@media (max-width: 768px) {
    .main-header {
        padding: 0.5rem 1rem;
    }

    .mobile-menu-toggle {
        display: block;
    }

    .header-nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--header-bg, #ffffff);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 1; /* Add this to ensure menu is above everything */
    }

    .header-nav.active {
        display: block;
    }

    .header-nav ul {
        flex-direction: column;
        gap: 0;
        padding: 1rem 0;
    }

    .header-nav ul li {
        width: 100%;
    }

    .header-nav ul li a {
        display: block;
        padding: 1rem 2rem;
    }

    .header-nav a::after {
        display: none;
    }

    .header-nav ul li a:hover {
        background: var(--hover-bg, #f0f0f0);
    }

    .header-right {
        gap: 0.5rem;
    }

    .auth-btn {
        padding: 0.4rem 0.8rem;
    }
}

.user-menu {
    position: relative;
    display: inline-block;
}

.profile-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: 1px solid var(--border-color, #ddd);
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
}

.avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.avatar-initial {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-color, #007bff);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
}

.dropdown-menu {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    background: var(--background-white);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    min-width: 150px;
    z-index: 1000;
}

.dropdown-menu.show {
    display: block;
}

.dropdown-menu a {
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--text-dark);
}

.dropdown-menu a:hover {
    background: var(--light-bg);
}

/*.user-menu:hover .dropdown-menu {
    display: block;
}*/
</style>

<audio id="bgm" loop></audio>
    <source src="/VisualDS/assets/audio/background-music.mp3" type="audio/mp3">
</audio>

<script>
document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('header-nav').classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('header-nav');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// Simple audio toggle functionality
const bgm = document.getElementById('bgm');
const bgmToggle = document.getElementById('bgm-toggle');

bgmToggle.addEventListener('click', function() {
    if (bgm.paused) {
        bgm.play();
        this.querySelector('.icon').textContent = '🔊';
    } else {
        bgm.pause();
        this.querySelector('.icon').textContent = '🔈';
    }
});

// Update the toggleDropdown function to be more explicit
function toggleDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    const dropdowns = document.getElementsByClassName('dropdown-menu');
    
    // Close all other dropdowns first
    Array.from(dropdowns).forEach(d => {
        if (d !== dropdown && d.classList.contains('show')) {
            d.classList.remove('show');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && !event.target.closest('.user-menu')) {
        dropdown.classList.remove('show');
    }
});
</script>