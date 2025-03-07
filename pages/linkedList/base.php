<?php 
require_once '../../includes/config.php';
require_once '../../includes/header.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Linked List</title>
    <link rel="stylesheet" href="../../styles/pages/linkedList/styles.css">
    <style>
        .bgm-toggle {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            padding: 5px 10px;
            border-radius: 5px;
            margin-right: 10px;
            transition: transform 0.2s;
        }

        .bgm-toggle:hover {
            transform: scale(1.1);
        }
    </style>
</head>

<body class="theme-classic">
    <audio id="bgm" loop>
        <source src="../../assets/audio/background-music.mp3" type="audio/mp3">
    </audio>

    <nav class="progress-bar">
        <button class="prev-btn">Previous</button>
        <div class="progress-container">
            <div class="progress-indicator">
                <div class="progress-fill"></div>
            </div>
            <div class="step-item" data-step="0">
                <div class="step-circle" id="circle-0">1</div>
                <div class="step-label">Theory</div>
            </div>
            <div class="step-item" data-step="1">
                <div class="step-circle" id="circle-1">2</div>
                <div class="step-label">Algorithm</div>
            </div>
            <div class="step-item" data-step="2">
                <div class="step-circle" id="circle-2">3</div>
                <div class="step-label">Visualization</div>
            </div>
        </div>
        <button class="next-btn">Next</button>
    </nav>

    <div class="content-wrapper">
        <section id="section-0" class="content-section active">
            <div id="theory-content"></div>
        </section>

        <section id="section-1" class="content-section">
            <div id="algorithm-content"></div>
        </section>

        <section id="section-2" class="content-section">
            <div id="visualization-content"></div>
        </section>
    </div>
    <script src="../../scripts/themeManager.js"></script>
    <script src="../../scripts/linkedList/base.js"></script>
</body>

</html>