<?php 
require_once '../includes/config.php';
require_once '../includes/header.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Data Structures and Algorithms</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles/common/theme.css">
  <link rel="stylesheet" href="../styles/main.css">
</head>

<body class="theme-light">
  <section class="container">
    <button class="sidebar-toggle" id="sidebar-toggle" onclick="toggleSidebar()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 6L9 12L15 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <aside class="sidebar" id="sidebar">
      <h2>Algorithms</h2>
      <div class="dropdown" onclick="toggleDropdown(this)">
        Sorting <span class="icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 9L12 13L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
      <div class="dropdown-content">
        <div>Bubble</div>
        <div>Selection</div>
        <div>Insertion</div>
        <div>Heap</div>
      </div>
      <div class="dropdown" onclick="toggleDropdown(this)">
        Searching <span class="icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 9L12 13L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
      <div class="dropdown-content">
        <div>Binary Search</div>
        <div>Linear Search</div>
      </div>
      <div class="dropdown" onclick="toggleDropdown(this)">
        Linked List <span class="icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 9L12 13L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
      <div class="dropdown-content">
        <div>Singly</div>
        <div>Doubly</div>
      </div>
    </aside>

    <main class="main-content">
      <div class="card-grid">
        <!-- Card 1: Bubble -->
        <div class="card">
          <img src="../assets/images/sorting.gif" alt="Bubble Sort">
          <h3>Bubble Sort</h3>
          <div class="button-group">
            <div class="button-row">
              <button class="nav-button" data-page="bubble" data-section="concept">Concept</button>
              <button class="nav-button" data-page="bubble" data-section="algorithm">Algorithm</button>
            </div>
            <div class="button-row">
              <button class="nav-button" data-page="bubble" data-section="visualization">Visualization</button>
            </div>
          </div>
        </div>

        <div class="card">
          <img src="../assets/images/list.gif" alt="Linked List">
          <h3>Linked List</h3>
          <div class="button-group">
            <div class="button-row">
              <button class="nav-button" data-page="linkedList" data-section="concept">Concept</button>
              <button class="nav-button" data-page="linkedList" data-section="algorithm">Algorithm</button>
            </div>
            <div class="button-row">
              <button class="nav-button" data-page="linkedList" data-section="visualization">Visualization</button>
            </div>
          </div>
        </div>

        <!-- <div class="card">
          <img src="../assets/images/tree.gif" alt="Tree">
          <h3>Tree</h3>
          <div class="button-group">
            <div class="button-row">
              <button class="nav-button" data-page="tree" data-section="concept">Concept</button>
              <button class="nav-button" data-page="tree" data-section="algorithm">Algorithm</button>
            </div>
            <div class="button-row">
              <button class="nav-button" data-page="tree" data-section="visualization">Visualization</button>
            </div>
          </div>
        </div>
        <div class="card">
          <img src="../assets/images/recursion.gif" alt="Recursion">
          <h3>Recursion</h3>
          <div class="button-group">
            <div class="button-row">
              <button class="nav-button" data-page="recursion" data-section="concept">Concept</button>
              <button class="nav-button" data-page="recursion" data-section="algorithm">Algorithm</button>
            </div>
            <div class="button-row">
              <button class="nav-button" data-page="recursion" data-section="visualization">Visualization</button>
            </div>
          </div>
        </div>
        <div class="card">
          <img src="../assets/images/graph.gif" alt="Graph">
          <h3>Graph</h3>
          <div class="button-group">
            <div class="button-row">
              <button class="nav-button" data-page="graph" data-section="concept">Concept</button>
              <button class="nav-button" data-page="graph" data-section="algorithm">Algorithm</button>
            </div>
            <div class="button-row">
              <button class="nav-button" data-page="graph" data-section="visualization">Visualization</button>
            </div>
          </div>
        </div>
        <div class="card">
          <img src="../assets/images/hashtable.gif" alt="Hash Table">
          <h3>Hash Table</h3>
          <div class="button-group">
            <div class="button-row">
              <button class="nav-button" data-page="hash" data-section="concept">Concept</button>
              <button class="nav-button" data-page="hash" data-section="algorithm">Algorithm</button>
            </div>
            <div class="button-row">
              <button class="nav-button" data-page="hash" data-section="visualization">Visualization</button>
            </div>
          </div>
        </div> -->

        <script src="../scripts/themeManager.js"></script>
        <script src="../scripts/home.js"></script>
</body>

</html>