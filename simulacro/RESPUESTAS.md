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