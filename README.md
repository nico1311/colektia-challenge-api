# express-products-crud
API REST realizada con Node y Express, con operaciones CRUD para crear, listar, modificar y eliminar productos.

## Ejecutar localmente
1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Crear un archivo .env con los datos necesarios:
    ```
    DEBUG=backend:*
    PORT=3001
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER=
    MYSQL_PASS=
    MYSQL_DB=crud_api
    ```
4. Opcional: crear la tabla `products` en la base de datos con el esquema de `db.sql`. Si la tabla no existe al momento de arrancar el servidor por primera vez, será creada automáticamente
5. Ejecutar el servidor (en modo desarrollo, recargando ante cambios en el código) con `npm run dev`, o en modo producción con `npm start`
6. Por default, el servidor de API estará disponible en http://localhost:3001

## Rutas de la API
La documentación de la API, generada con Swagger UI, está disponible ingresando a la ruta `/docs`.

* **POST** `/api/products`: crea un nuevo producto.
* **GET** `/api/products`: obtiene el listado de todos los productos
* **GET** `/api/products/{id}`: obtiene un producto por su ID.
* **PATCH** `/api/products/{id}`: modifica un producto.
* **DELETE** `/api/products/{id}`: elimina un producto.
----
Los métodos **GET**, **POST** y **PATCH** devuelven respuestas en formato `application/json`. La estructura de los datos para cada producto es la siguiente:
* `id`: ID del producto (autogenerado)
* `name`: Nombre del producto
* `description`: Descripción del producto
* `price`: Precio del producto
* `image`: Nombre del archivo de la imagen del producto. Se puede acceder a la imagen desde la ruta `/images/{nombre}.{ext}`
* `createdAt`: timestamp de creación de este producto (autogenerado)
* `updatedAt`: timestamp de la última actualización de este producto (autogenerado)
----
Los métodos **POST** y **PATCH** aceptan los siguientes campos para describir un producto, que deben enviarse como `multipart/form-data`:
* `name`: Nombre del producto
* `description`: Descripción del producto
* `price`: Precio del producto
* `imageFile`: Archivo de imagen a subir. Se aceptan tipos MIME `image/*`, y el tamaño máximo del archivo es de 2 MB

Al completarse exitosamente, las operaciones de creación devuelven código `201`, las modificaciones devuelven código `200`, y las eliminaciones devuelven código `204`.

En caso de que el ID ingresado en el path para las operaciones de modificación o eliminación no exista, se devolverá el código de estado `404`. Asimismo, para las operaciones de escritura, si el `form-data` no tiene la estructura correcta, se devolverá código `422`.

## Tests
Se incluyen tests básicos que prueban las operaciones de la API. Los tests están escritos utilizando [Mocha](https://mochajs.org/), [chai](https://chaijs.com) y [supertest](https://www.npmjs.com/package/supertest).

Para ejecutar los tests, configurar la variable de entorno `MYSQL_TEST_DB` con el nombre de la base de datos a usar para las pruebas (se utilizan el mismo host y credenciales), y ejecutar `npm run test`.
