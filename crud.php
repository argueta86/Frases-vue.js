<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frases_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'create') {
    $data = json_decode(file_get_contents("php://input"), true);
    $texto = $conn->real_escape_string($data['texto']);
    $autor = $conn->real_escape_string($data['autor']);

    $sql = "INSERT INTO frases (texto, autor) VALUES ('$texto', '$autor')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'id' => $conn->insert_id]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

if ($action === 'read') {
    $result = $conn->query("SELECT * FROM frases");
    $frases = [];

    while ($row = $result->fetch_assoc()) {
        $frases[] = $row;
    }

    echo json_encode($frases);
}

if ($action === 'update') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = intval($data['id']);
    $texto = $conn->real_escape_string($data['texto']);
    $autor = $conn->real_escape_string($data['autor']);

    $sql = "UPDATE frases SET texto = '$texto', autor = '$autor' WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

if ($action === 'delete') {
    $id = intval($_GET['id']);

    $sql = "DELETE FROM frases WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

$conn->close();
?>
