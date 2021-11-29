# Prueba Tecnica de los Modelados

# npm install

# Se instalara la bases de datos de MongoDB

# Correra en http://localhost:3800/

# Endpoints

POST: http://localhost:3800/api/register
POST: http://localhost:3800/api/login
GET: http://localhost:3800/api/usuarios
GET: http://localhost:3800/api/usuarios/:id
POST: http://localhost:3800/api/usuarios-update/:id
GET: http://localhost:3800/api/usuarios-eliminar/:id
GET: http://localhost:3800/api/usuarios-detalles/

# Nota

Es importante registrarse primero, agregando el campo password en su registro, luego puede loguear.

1. Crear un CRUD (API’s) de usuarios en Node.js y utilizando MongoDB como base de datos, donde
se debe poder:
    1. Crear
    2. Listar todos
    3. Ver el detalle
    4. Actualizar
    5. Eliminar
    6. Iniciar Sesión (sign-in) implementando JWT (valido por 7 días) para creación del token de acceso.

2. Crear modelo para almacenar Datos personales de los usuarios, datos almacenar:
    1. First name
    2. Last name
    3. DNI
    4. Sex
    5. Cell Phone
    6. Status: active, inactive, pending
    
3. Crear un API para listar todos los usuarios que tengan un Status ‘pending’ y sean de Sexo
Masculino, la consulta se debe hacer haciendo uso de Aggregate y debe ser ordenado por el
Nombre del cliente