# Respuestas a la preguntas

**1. ¿Cómo se instala y arranca tu proyecto?**

Una vez descargado el repositorio, accedemos a la carpeta principal (`simulacro`) para poder instalar los repositorios:

```
cd /simulacro
```

Ahora, usaremos el siguiente comando para descagar las dependecias:

```
npm install
```

Ya instaladas las dependencias, deberemos configurar el archivo .env con el puerto del servidor:

```
PORT= 4000;
```

Por ultimo, para encender el servidor, usamos el siguiente comando:

```
npm run dev (modo desarrollador)
npm start (modo producción)
```


**2. ¿Dónde se configura el puerto y cómo llega ese valor hasta el arranque del servidor?**

El puerto se configura en el archivo `.env` de la siguiente manera:

```
PORT= 3000;
```

Una vez configurado, cuando se arranca el servidor, la aplicación lee el archivo .env, via el archivo princial (`server.ts`), que en el caso de nuestra env, esta usa el archivo env.ts, el cual via la constante app, detecta si tiene un puerto definido (En caso que no, poner el puerto 3000 por defecto)

```
export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};
```

Finalmente, dicho valor se le pasa al metodo `.listen()` en el archivo server.ts para que agarre dicho puerto y pueda empezar a escuchar peticiones:

```
app.listen(env.PORT, () => {
  console.log(`Listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});
```


**3. ¿Por qué se sube a GitHub el .env.example y se excluye .env?**

Se excluye el archivo `.env` por temas de seguridad y entorno debido que contiene datos privados que no deben ser publicos, asi como configuraciones propias de cada ordenador, mientras que `.env.examen se sube debido que es una platillas con las variables necesarias para iniciar el proyecto.

**4. ¿Dónde se crea el error de "documento no encontrado" y dónde se convierte en respuesta HTTP?**

El error se crea en `src/services/documentsService.ts`, dentro de `getById`. Si no encuentra el documento, lanza `ResourceNotFoundError` (definido en `src/errors/ResourceNotFoundError.ts`):

```
throw new ResourceNotFoundError(404, `Document with id '${documentId}' not found`, documentId, 'RESOURCE_NOT_FOUND');
``` 

El controlador no lo captura. Express 5 envía automáticamente al middleware de errores cualquier excepción síncrona.

Se convierte en respuesta HTTP en `src/middlewares/errorHandler.ts`, que comprueba el tipo de error y responde con un 404:

``` 
if (err instanceof ResourceNotFoundError) {
  res.status(404).json({ message: err.message, resourceId: err.resourceId });
}
```

Este middleware funciona porque `app.ts` lo registra el último, después de las rutas y de `notFound`.