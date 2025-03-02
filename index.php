<?php 
require_once 'includes/config.php';
require_once 'includes/header.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/index.css">
</head>

<body class="theme-light">
    <header class="main-header">
        <a href="index.php" class="logo">
            <img src="assets/images/Icon.gif" width="40" alt="Logo">
        </a>
        <h1 class="page-title"><a href="index.php">VisualDSA</a></h1>
        <div class="header-controls">
            <label for="theme-select">Theme:</label>
            <?php echo getAuthButton(); ?>
        </div>
    </header>

    <main class="main-container">
        <section class="left-section">
            <nav class="navbar">
                <a href="#about">About</a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
            </nav>
            <header class="header">
                <div class="logo">VisualDSA</div>
                <h1>Master Data Structures and Algorithms</h1>
                <p>Learn through interactive visualizations and grow your skills in Computer Science.</p>
            </header>
            <footer class="footer">
                <div class="social-links">
                    <a href="#" class="social-icon" title="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a href="#" class="social-icon" title="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                    <a href="#" class="social-icon" title="Twitter">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                    </a>
                    <a href="#" class="social-icon" title="YouTube">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                    </a>
                </div>
            </footer>
            <div class="copyright">
                <p>© 2025 VisualDSA. All rights reserved.</p </div>
        </section>

        <section class="right-section">
            <section class="feature">
                <h2>Discover, Learn, Succeed</h2>
                <p>Our platform provides in-depth visualizations of complex data structures and algorithms to help
                    you succeed
                    in your Computer Science journey.</p>
                <a href="pages/home.html"><button>Get Started</button></a>
            </section>

            <div id="about" class="about-section">
                <div class="slider">
                    <div class="slides">
                        <div class="slide">
                            <div class="profile-card">
                                <div class="profile-header">
                                    <div class="profile-img">
                                        <div class="profile-img-placeholder">AA</div>
                                    </div>
                                    <div class="profile-badges">
                                        <span class="badge">Front-End</span>
                                        <span class="badge">UI/UX Designer</span>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <h3>Ayaz Ahmad</h3>
                                    <p class="bio">Proficient in HTML, CSS, JavaScript, Node.js, and UI/UX; builds
                                        dynamic, user-centric web applications.</p>
                                </div>
                            </div>
                        </div>
                        <div class="slide">
                            <div class="profile-card">
                                <div class="profile-header">
                                    <div class="profile-img">
                                        <div class="profile-img-placeholder">KP</div>
                                    </div>
                                    <div class="profile-badges">
                                        <span class="badge">Full Stack</span>
                                        <span class="badge">Java Developer</span>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <h3>Komal Parihar</h3>
                                    <p class="bio">Full-stack developer skilled in React, Java, and Bootstrap; crafts
                                        robust, end-to-end web solutions.</p>
                                </div>
                            </div>
                        </div>
                        <div class="slide">
                            <div class="profile-card">
                                <div class="profile-header">
                                    <div class="profile-img">
                                        <div class="profile-img-placeholder">RC</div>
                                    </div>
                                    <div class="profile-badges">
                                        <span class="badge">Average C</span>
                                        <span class="badge">Basic C++</span>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <h3>Ram Chouhan</h3>
                                    <p class="bio">BCA student with basic C knowledge; exploring web
                                        development fundamentals with team support.</p>
                                </div>
                                <!-- <div class="profile-links">
                                    <a href="#" class="profile-btn github">GitHub</a>
                                    <a href="#" class="profile-btn linkedin">LinkedIn</a>
                                    <a href="#" class="profile-btn portfolio">Portfolio</a>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <button class="slider-button prev-button">
                        <span class="arrow arrow-left"></span>
                    </button>
                    <button class="slider-button next-button">
                        <span class="arrow arrow-right"></span>
                    </button>
                </div>

                <div id="contact" class="contact">
                    <h3>Contact Us</h3>
                    <p>Email: support@VisualDSA.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
        </section>
    </main>

    <script src="scripts/themeManager.js"></script>
    <script src="scripts/index.js"></script>
</body>

</html>