<?php

$url = 'https://dev.aid4.me/api/voice';

header('Content-Type: audio/mpeg');

$data = json_decode(file_get_contents('php://input'), true);

$udid = $data['udid'] ?? '';
$text = $data['text'] ?? '';

$text = mb_convert_encoding($text, 'UTF-8', 'auto');

$jsonData = json_encode([
    "udid" => $udid,
    "text" => $text,
]);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json; charset=UTF-8',
        'Content-Length: ' . strlen($jsonData),
    ],
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $jsonData,
]);

$response = curl_exec($ch);

if ($response === false) {
    echo 'Ошибка cURL: ' . curl_error($ch);
} else {
    header('Content-Type: application/json');
    echo $response;
}
