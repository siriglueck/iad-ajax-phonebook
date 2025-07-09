<?php
error_reporting(null);
ini_set("display_errors", "off");

if (!empty($_GET)) {
  if (empty($_GET['val'])) {
    echo '{ "0": "keine Eingabe" }';
    exit;
  } else {
    $val = $_GET['val'];
  }

  $phoneNbrsFile = 'phonebook.txt';
  $fp = fopen($phoneNbrsFile, 'r');

  if (!$fp) {
    echo '{ "0": "Die Datei <b>' . $phoneNbrsFile . '</b> wurde nicht gefunden!" }';
    exit;
  }

  $phoneNbrsArr = array();

  while (($phoneNbr = fgets($fp)) !== false) {
    if (preg_match("/^$val/i", $phoneNbr)) {
      $phoneNbrsArr[] = $phoneNbr;
    }
  }

  echo json_encode($phoneNbrsArr);

  fclose($fp);
}
