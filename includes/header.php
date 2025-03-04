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
    <a href="/VisualDS/index.php" class="logo">
        <img src="/VisualDS/assets/images/Icon.gif" width="40" alt="Logo">
    </a>
    <h1 class="page-title"><a href="/VisualDS/index.php">VisualDSA</a></h1>
    <div class="header-controls">
        <button id="bgm-toggle" class="bgm-toggle" title="Toggle Background Music">
            <span class="icon">🔊</span>
        </button>
        <button id="menu-toggle">☰</button>
        <nav class="nav-menu" id="menu">
            <ul>
                <li><a href="/VisualDS/pages/home.html">Home</a></li>
                <li><a href="#">Sorting</a></li>
                <li><a href="#">Search</a></li>
                <li><a href="#">Help</a></li>
            </ul>
        </nav>
        <label for="theme-select">Theme:</label>
        <?php echo getAuthButton(); ?>
    </div>
</header>

<style>
.main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: var(--header-bg, #ffffff);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.page-title {
    margin: 0 1rem;
}

.page-title a {
    text-decoration: none;
    color: var(--text-primary, #333);
    font-size: 1.5rem;
    font-weight: 600;
}

.header-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.bgm-toggle {
    background: none;
    border: 1px solid var(--border-color, #ddd);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 5px;
    margin-right: 0.5rem;
    transition: all 0.2s ease;
}

.bgm-toggle:hover {
    transform: scale(1.1);
    background: var(--button-hover-bg, #f0f0f0);
}

.nav-menu {
    position: relative;
    display: inline-block;
}

.nav-menu ul {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--menu-bg, #ffffff);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 0.5rem 0;
    margin: 0;
    list-style: none;
    min-width: 150px;
}

.nav-menu.active ul {
    display: block;
}

.nav-menu ul li a {
    display: block;
    padding: 0.5rem 1rem;
    color: var(--text-primary, #333);
    text-decoration: none;
    transition: background-color 0.2s;
}

.nav-menu ul li a:hover {
    background-color: var(--menu-hover-bg, #f5f5f5);
}

#menu-toggle {
    background: none;
    border: 1px solid var(--border-color, #ddd);
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.2s ease;
}

#menu-toggle:hover {
    background: var(--button-hover-bg, #f0f0f0);
}

.auth-btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    background: var(--primary-color, #007bff);
    color: white;
    transition: background-color 0.2s;
}

.auth-btn:hover {
    background: var(--primary-color-dark, #0056b3);
}

@media (max-width: 768px) {
    .main-header {
        padding: 0.5rem 1rem;
    }

    .page-title {
        font-size: 1.2rem;
    }

    .header-controls {
        gap: 0.5rem;
    }
}
</style>

<script>
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (!menu.contains(event.target) && event.target !== menuToggle) {
        menu.classList.remove('active');
    }
});
</script>

<audio id="bgm" loop>
    <source src="/VisualDS/assets/audio/background-music.mp3" type="audio/mp3">
</audio>