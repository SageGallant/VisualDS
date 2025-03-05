<?php 
require_once '../includes/config.php';
require_once '../includes/header.php';
require_once '../includes/database.php';

// Fetch sidebar categories
$categories_query = "SELECT * FROM sidebar_categories ORDER BY display_order";
$categories_result = mysqli_query($conn, $categories_query);

// Fetch content cards with their actions
$cards_query = "SELECT * FROM content_cards ORDER BY display_order";
$cards_result = mysqli_query($conn, $cards_query);
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
      <?php 
      while($category = mysqli_fetch_assoc($categories_result)) {
          // Fetch items for this category
          $items_query = "SELECT * FROM sidebar_items WHERE category_id = {$category['category_id']} ORDER BY display_order";
          $items_result = mysqli_query($conn, $items_query);
      ?>
          <div class="dropdown" onclick="toggleDropdown(this)">
              <?php echo $category['category_name']; ?> 
              <span class="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M8 9L12 13L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
              </span>
          </div>
          <div class="dropdown-content">
              <?php while($item = mysqli_fetch_assoc($items_result)) { ?>
                  <div onclick="window.location.href='<?php echo $item['link_url']; ?>'">
                      <?php echo $item['item_name']; ?>
                  </div>
              <?php } ?>
          </div>
      <?php } ?>
    </aside>

    <main class="main-content">
      <div class="card-grid">
        <?php 
        while($card = mysqli_fetch_assoc($cards_result)) {
            // Fetch actions for this card
            $actions_query = "SELECT * FROM card_actions WHERE card_id = {$card['card_id']} ORDER BY display_order";
            $actions_result = mysqli_query($conn, $actions_query);
        ?>
            <div class="card">
                <img src="<?php echo $card['image_path']; ?>" alt="<?php echo $card['title']; ?>">
                <h3><?php echo $card['title']; ?></h3>
                <div class="button-group">
                    <?php 
                    $button_count = 0;
                    echo "<div class='button-row'>";
                    while($action = mysqli_fetch_assoc($actions_result)) {
                        if($button_count == 2) {
                            echo "</div><div class='button-row'>";
                            $button_count = 0;
                        }
                        ?>
                        <button class="nav-button" 
                                data-page="<?php echo $action['page_name']; ?>" 
                                data-section="<?php echo $action['section_name']; ?>">
                            <?php echo $action['button_text']; ?>
                        </button>
                        <?php
                        $button_count++;
                    }
                    echo "</div>";
                    ?>
                </div>
            </div>
        <?php } ?>
      </div>
    </main>
  </section>

  <script src="../scripts/themeManager.js"></script>
  <script src="../scripts/home.js"></script>
</body>

</html>