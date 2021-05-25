<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;

// bikin client dulu
$client = new Client();
//request(method, url, [params url])
$response = $client->request('GET', 'http://omdbapi.com?', [
    //kalo pake params jadinya query, beda lagi kalo nanti pake body
    'query' => [
        'apikey' => 'e5deb4a5',
        's' => 'transformers'
    ]
]);

// getBody & getContents agar hasil yang tampil sama seperti di PostMan
// json_decode(p) = object, json_decode(p, true) = array
$result = json_decode($response->getBody()->getContents(), true);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie</title>
</head>
<body>
    <?php foreach($result['Search'] as $movie) : ?>
    <ul>
        <li> Title : <?= $movie['Title']; ?> </li>
        <li> Year : <?= $movie['Year']; ?> </li>
        <li>
            <img src="<?= $movie['Poster']; ?>" width="80">
        </li>
    </ul>
    <?php endforeach; ?>
</body>
</html>