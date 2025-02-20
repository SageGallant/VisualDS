<?php
// File Path: admin/includes/config.php

session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('BASE_PATH', realpath(dirname(__FILE__) . '/..'));
define('ADMIN_URL', 'http://localhost/admin'); // Change this according to your setup

require_once('database.php');
require_once('functions.php');
require_once('auth.php');
?>