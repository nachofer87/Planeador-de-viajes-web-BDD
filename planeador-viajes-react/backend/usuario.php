<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once 'db.php';

$accion = $_GET['accion'] ?? '';

switch ($accion) {
    case 'registro':
        $d      = json_decode(file_get_contents('php://input'), true);
        $nombre = trim($d['nombre']   ?? '');
        $email  = trim($d['email']    ?? '');
        $pass   = $d['password']      ?? '';

        if (!$nombre || !$email || !$pass) {
            http_response_code(400);
            echo json_encode(['error' => 'Todos los campos son obligatorios.']);
            break;
        }

        // Verificar que el correo no esté registrado
        $stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = :email');
        $stmt->execute([':email' => $email]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['error' => 'Ese correo ya está registrado.']);
            break;
        }

        $hash = password_hash($pass, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare(
            'INSERT INTO usuarios (nombre, email, password_hash)
             VALUES (:nombre, :email, :hash)'
        );
        $stmt->execute([':nombre' => $nombre, ':email' => $email, ':hash' => $hash]);

        $usuario = ['id' => (int) $pdo->lastInsertId(), 'nombre' => $nombre, 'email' => $email];
        $_SESSION['usuario'] = $usuario;

        http_response_code(201);
        echo json_encode(['usuario' => $usuario]);
        break;

    case 'login':
        $d     = json_decode(file_get_contents('php://input'), true);
        $email = trim($d['email']    ?? '');
        $pass  = $d['password']      ?? '';

        $stmt = $pdo->prepare(
            'SELECT id, nombre, email, password_hash FROM usuarios WHERE email = :email'
        );
        $stmt->execute([':email' => $email]);
        $fila = $stmt->fetch();

        if (!$fila || !password_verify($pass, $fila['password_hash'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Correo o contraseña incorrectos.']);
            break;
        }

        $usuario = ['id' => (int) $fila['id'], 'nombre' => $fila['nombre'], 'email' => $fila['email']];
        $_SESSION['usuario'] = $usuario;

        echo json_encode(['usuario' => $usuario]);
        break;

    case 'logout':
        session_destroy();
        echo json_encode(['ok' => true]);
        break;

    // Devuelve el usuario de la sesión activa, o null si no hay sesión
    case 'sesion':
        echo json_encode(['usuario' => $_SESSION['usuario'] ?? null]);
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Acción no válida.']);
}
?>