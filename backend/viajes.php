<?php
header('Content-Type: application/json; charset=utf-8');

// Preflight OPTIONS (lo envía el navegador antes de POST/PUT/DELETE)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once 'db.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int) $_GET['id'] : null;

switch ($metodo) {

    // GET /api/viajes.php → devuelve todos los viajes
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM viajes ORDER BY fecha_inicio ASC');
        echo json_encode($stmt->fetchAll());
        break;

    // POST /api/viajes.php → crea un viaje
    // Body: { nombre, tipo, fechaInicio, fechaFinal }
    case 'POST':
        $d = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare(
            'INSERT INTO viajes (nombre, tipo, fecha_inicio, fecha_final)
             VALUES (:nombre, :tipo, :fecha_inicio, :fecha_final)'
        );
        $stmt->execute([
            ':nombre'      => $d['nombre'],
            ':tipo'        => $d['tipo'],
            ':fecha_inicio'=> $d['fechaInicio'],
            ':fecha_final' => $d['fechaFinal'],
        ]);
        http_response_code(201);
        echo json_encode(['id' => (int) $pdo->lastInsertId()]);
        break;

    // PUT /api/viajes.php?id=X → edita un viaje
    case 'PUT':
        if (!$id) { http_response_code(400); echo json_encode(['error' => 'Falta id']); break; }
        $d = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare(
            'UPDATE viajes
             SET nombre = :nombre, tipo = :tipo,
                 fecha_inicio = :fecha_inicio, fecha_final = :fecha_final
             WHERE id = :id'
        );
        $stmt->execute([
            ':nombre'      => $d['nombre'],
            ':tipo'        => $d['tipo'],
            ':fecha_inicio'=> $d['fechaInicio'],
            ':fecha_final' => $d['fechaFinal'],
            ':id'          => $id,
        ]);
        echo json_encode(['ok' => true]);
        break;

    // DELETE /api/viajes.php?id=X → elimina un viaje
    case 'DELETE':
        if (!$id) { http_response_code(400); echo json_encode(['error' => 'Falta id']); break; }
        $stmt = $pdo->prepare('DELETE FROM viajes WHERE id = :id');
        $stmt->execute([':id' => $id]);
        echo json_encode(['ok' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
