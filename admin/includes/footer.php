<?php
// File Path: admin/includes/footer.php
?>
        </div><!-- .admin-wrapper -->
        <script src="<?php echo ADMIN_URL; ?>/assets/js/main.js"></script>
        <script src="<?php echo ADMIN_URL; ?>/assets/js/modal.js"></script>
        <script src="<?php echo ADMIN_URL; ?>/assets/js/validation.js"></script>
        <?php if(basename($_SERVER['PHP_SELF']) == 'dashboard.php'): ?>
            <script src="<?php echo ADMIN_URL; ?>/assets/js/dashboard.js"></script>
        <?php endif; ?>
    </body>
</html>