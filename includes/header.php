<?php
function getAuthButton() {
    if (isset($_SESSION['user_id'])) {
        return '<a href="/VisualDS/logout.php" class="auth-btn">Logout</a>';
    } else {
        return '<a href="/VisualDS/login.php" class="auth-btn">Login</a>';
    }
}
?>

<header class="main-header">
    <div class="header-left">
        <button id="mobile-menu-toggle" class="control-btn mobile-only">
            <span>☰</span>
        </button>
        <a href="/VisualDS/index.php" class="logo">
            <img src="/VisualDS/assets/images/Icon.gif" width="40" alt="Logo">
            <h1 class="brand-name">VisualDSA</h1>
        </a>
    </div>

    <nav class="header-center" id="main-nav">
        <ul class="nav-menu">
            <li><a href="/VisualDS/pages/home.html">Home</a></li>
            <li><a href="#">Sorting</a></li>
            <li><a href="#">Search</a></li>
            <li><a href="#">Help</a></li>
        </ul>
    </nav>

    <div class="header-right">
        <div class="controls-group">
            <button id="bgm-toggle" class="control-btn" title="Toggle Background Music">
                <span class="icon">🔊</span>
            </button>
            <select id="theme-select" class="theme-select">
                <option value="modern">Modern</option>
                <option value="dark">Dark</option>
                <option value="royal">Royal</option>
                <option value="elegant">Elegant</option>
            </select>
        </div>
        <?php echo getAuthButton(); ?>
    </div>
</header>

<style>
.main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 2rem;
    background: var(--header-bg);
    box-shadow: var(--shadow-sm);
    height: 64px;
}

.header-left {
    flex: 0 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
}

.brand-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--header-text);
    margin: 0;
}

.header-center {
    flex: 1;
    display: flex;
    justify-content: center;
}

.nav-menu {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-menu a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.2s;
}

.nav-menu a:hover {
    color: var(--primary-color);
}

.nav-menu a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.2s;
}

.nav-menu a:hover::after {
    width: 100%;
}

.header-right {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.control-btn {
    background: var(--button-bg);
    border: none;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background 0.2s;
}

.control-btn:hover {
    background: var(--button-hover);
}

.theme-select {
    padding: 0.5rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--button-bg);
    color: var(--text-color);
    cursor: pointer;
}

.auth-btn {
    padding: 0.5rem 1.25rem;
    border-radius: var(--border-radius);
    background: var(--primary-color);
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.2s;
}

.auth-btn:hover {
    background: var(--button-hover);
}

.mobile-only {
    display: none;
}

.controls-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

@media (max-width: 768px) {
    .main-header {
        padding: 0.5rem 1rem;
        position: relative;
    }

    .mobile-only {
        display: block;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .header-center {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--header-bg);
        padding: 1rem;
        box-shadow: var(--shadow-sm);
        display: none;
        z-index: 100;
    }

    .header-center.active {
        display: block;
    }

    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }

    .nav-menu a {
        display: block;
        padding: 0.5rem 0;
    }

    .header-right {
        gap: 0.5rem;
    }

    .controls-group {
        order: 1;
    }

    .theme-select {
        width: auto;
        padding: 0.5rem;
        display: block;
    }
}
</style>

<script>
// Initialize audio autoplay with user interaction
const bgm = document.getElementById('bgm');
const bgmToggle = document.getElementById('bgm-toggle');
let isMuted = true;

bgmToggle.addEventListener('click', function() {
    if (isMuted) {
        bgm.play();
        bgmToggle.querySelector('.icon').textContent = '🔊';
    } else {
        bgm.pause();
        bgmToggle.querySelector('.icon').textContent = '🔈';
    }
    isMuted = !isMuted;
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');

mobileMenuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!mainNav.contains(event.target) && 
        !mobileMenuToggle.contains(event.target) && 
        mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
    }
});

// Try to autoplay audio on page load (may be blocked by browser)
document.addEventListener('DOMContentLoaded', function() {
    bgm.volume = 0.3; // Set a comfortable default volume
    bgm.play().catch(function(error) {
        console.log("Audio autoplay was prevented:", error);
    });
});
</script>

<audio id="bgm" loop>
    <source src="/VisualDS/assets/audio/background-music.mp3" type="audio/mp3">
</audio>