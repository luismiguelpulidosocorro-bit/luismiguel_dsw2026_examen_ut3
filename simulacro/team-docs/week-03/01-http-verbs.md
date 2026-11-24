# Actividad 01 — Verbos HTTP: elige el método correcto

## Objetivo

Entender qué significa cada verbo HTTP y elegir el correcto para cada caso de
uso de Connectia.

> **Dónde trabajas**: en el **repositorio del backend** de tu equipo.

## Apuntes: el verbo es la acción

En una API el **path nombra el recurso** (un sustantivo) y el **verbo HTTP
aporta la acción**. No existe un verbo «leer» ni «crear» en el path: se usan
los métodos HTTP.

Ejemplo con una app distinta de Connectia (una lista de tareas):

| Verbo | Significado | Ejemplo |
|-------|-------------|---------|
| `GET` | Lee una tarea | `GET /api/v1/tasks` |
| `POST` | Crear una tarea | `POST /api/v1/tasks` |
| `PUT` | Reemplazar una tarea entera | `PUT /api/v1/tasks/{id}` |
| `PATCH` | Modificar **parte** de una tarea por ejemplo su título o la persona asignada | `PATCH /api/v1/tasks/{id}` |
| `DELETE` | Eliminar una tarea | `DELETE /api/v1/tasks/{id}` |

El verbo **nunca** va en el path. `/getTasks` o `/createTask` están mal;
`GET /tasks` y `POST /tasks` están bien.

Fíjate en el detalle: la misma ruta `/api/v1/tasks` cambia de significado según
el método. `GET` la lee; `POST` crea. Y lo mismo con `/api/v1/tasks/{id}`:
`GET` lo consulta, `PUT`/`PATCH` lo modifican y `DELETE` lo borra.

## Ejercicio: tradúcelo a Connectia

Ahora te toca a ti. Relaciona cada **caso de uso de Connectia** con el **verbo**
y la **ruta** que le corresponden, y anota el **código de estado** de éxito.

Completa la tabla:

| Caso de uso de Connectia | Verbo | Ruta | Éxito |
|--------------------------|-------|------|-------|
| Enviar una pregunta a la IA (respuesta simulada) | POST |/api/v1/questions | 201 |
| Listar los documentos de la base de conocimiento | GET | /api/v1/admin/documents | 200 |
| Crear los metadatos de un documento nuevo | PUT |/api/v1/admin/documents | 201 |
| Consultar un documento por su `documentId` | GET |/api/v1/admin/documents/{documentId}| 200 |
| Modificar **solo** el `title` de un documento | PATH |/api/v1/admin/documents/{documentId}| 200|

**Pistas** (para las rutas, no para los verbos):

- Todas las rutas de Connectia empiezan por `/api/v1`.
- Los documentos cuelgan de `/api/v1/admin/documents`.
- Una pregunta se envía a `/api/v1/questions`.
- Un documento concreto se identifica con `{documentId}` al final de la ruta.

## Preguntas

1. En el caso «Enviar una pregunta a la IA» el método es `POST`, pero el éxito
   ¿es `200` o `201`? ¿Por qué? (Recuerda revisar http.cat 😉)
   Es debido a que la respuesta 200 indica que se ha recibido correctamente la peticion, y la 201 es que se ha creado un recurso, como en esta caso no se crea nada, la respuesta es 200
2. Para cambiar solo el `title` de un documento, ¿por qué usamos `PATCH` y no
   `PUT`?
   Porque PATH es como si el verbo se llamara MODIFICAR mientras que PUT es como si se llamara SUBIR, lo cual, con lo segundo estariamos creando un nuevo elemento
3. ¿Por qué «Listar los documentos» es `GET` y no `POST`?
Porque con GET la peticion obtiene y con POST añade, como queremos obtener la respuesta del listado pues es GET. 
4. Escribe una ruta **mal** con el verbo en el path y su versión correcta.

| INCORRECTO | CORRECTO |
|--------------------------|-------|
| /getDocuments | GET /documents |
