<?php 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['audio']) && isset($_POST['udid'])) {
        $audioFile = $_FILES['audio'];
        $udid = $_POST['udid'];

        error_log(print_r($_FILES, true)); // Логируем содержимое $_FILES
        error_log(print_r($_POST, true)); // Логируем содержимое $_POST

        if ($audioFile['error'] !== UPLOAD_ERR_OK) {
            echo 'Ошибка загрузки файла: ' . $audioFile['error'];
            exit;
        }

        $uploadDir = __DIR__ . '/audio/';
        $uploadFile = $uploadDir . basename($audioFile['name']);

        if (!move_uploaded_file($audioFile['tmp_name'], $uploadFile)) {
            echo 'Ошибка при сохранении файла.';
            exit;
        }

        // Отправка файла на API
        $ch = curl_init();
        $data = [
            'file' => new CURLFile($uploadFile, $audioFile['type'], $audioFile['name']),
            'udid' => $udid
        ];

        curl_setopt($ch, CURLOPT_URL, "https://api.textok.ai/transcription");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        unlink($uploadFile);

        if ($response === false) {
            echo 'Ошибка при отправке запроса: ' . curl_error($ch);
        } elseif ($httpCode !== 200) {
            echo 'Неудачный запрос. HTTP статус: ' . $httpCode;
        } else {
            echo $response;
        }

        curl_close($ch);
    } else {
        echo 'Файл или параметр udid не получен.';
    }
} else {
    echo 'Неверный метод запроса.';
}
