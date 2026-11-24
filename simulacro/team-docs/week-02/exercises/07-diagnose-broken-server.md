# Diagnosticar un servidor que no arranca — Actividad 7

## Para qué sirve esta actividad

Un servidor que no arranca es, con diferencia, el problema más frecuente
que vais a diagnosticar en todo el curso. Casi siempre entra en una de tres
categorías: **falta configuración** (`.env`), **falta una dependencia**
(`node_modules/`) o **el puerto ya está ocupado**. Esta actividad os hace
provocar los tres fallos a propósito, sobre un proyecto que sabéis que
funciona, para que reconozcáis el síntoma la próxima vez que ocurra por
accidente.

Reproduce los tres escenarios **por separado**, uno detrás de otro, dejando
el proyecto en estado funcional entre cada uno.

## Escenario A — falta `.env`

```bash
cd topics/topic-02-UT1-running-project-bruno-basics/code/backend
mv .env .env.bak
npm run dev
```

**Qué observar**: el proceso termina con un mensaje que nombra la variable
que falta y cómo solucionarlo. Cuando termines, restaura el fichero:

```bash
mv .env.bak .env
```

### Evidencia

```text
Missing required environment variable: PORT.
Copy .env.example to .env (e.g. 'cp .env.example .env') and try again.
```

**¿Por qué falla?**

```text
Es necesario este archivo de configuracion porque guarda secretos, o configuración, en este caso no se puede levantar el servidor porque no detecta la variable PORT, donde se guarda el numero de puerto donde se levantará el servidor
```

## Escenario B — falta una dependencia (`node_modules/` ausente)

```bash
cd topics/topic-02-UT1-running-project-bruno-basics/code/backend
mv node_modules node_modules.bak
npm run dev
```

**Qué observar**: el intérprete no encuentra el comando `tsx` (o el módulo
`express`), porque `node_modules/` no existe. Este es el mismo síntoma que
verás si clonas un proyecto nuevo y olvidas ejecutar `npm install`. Cuando
termines, restaura la carpeta:

```bash
rm -rf node_modules
mv node_modules.bak node_modules
```

### Evidencia

```text
"tsx" no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.
```

**¿Cómo se soluciona?**

```text
O bien instalando las dependencias con npm install, o en este caso, volviendo a renombrar la carpeta a su nombre original para que se reconozca
```

## Escenario C — puerto ya en uso

Necesitas **dos** terminales para este escenario.

**Terminal 1** — arranca el servidor normalmente y déjalo corriendo:

```bash
cd topics/topic-02-UT1-running-project-bruno-basics/code/backend
npm run dev
```

**Terminal 2** — con el anterior aún corriendo, intenta arrancar una
segunda copia:

```bash
cd topics/topic-02-UT1-running-project-bruno-basics/code/backend
npm run dev
```

**Qué observar**: la segunda copia no puede escuchar en el puerto `3000`
porque la primera ya lo tiene ocupado, y termina con un mensaje que nombra
el puerto en conflicto. Cierra ambas terminales con `Ctrl+C` al terminar.

> Nota de la salida real observada en macOS: puede aparecer brevemente la
> línea "Connectia Week 02 demo backend listening..." seguida
> **inmediatamente** del mensaje de puerto ocupado, y el proceso termina con
> código de salida distinto de cero. Documenta la salida real de tu propio
> sistema operativo — puede variar ligeramente entre macOS, Linux y
> Windows, pero el resultado final (error claro + salida no-cero) es el
> mismo en los tres.

### Evidencia

```text
Connectia Week 02 demo backend listening on http://localhost:3000
Port 3000 is already in use.
Stop the process using it, or change PORT in .env, and try again.
```

**¿Cómo se soluciona?**

```text
Se puede hacer hacer Ctrl + C donde se encuentra la terminal con el puerto 3000 corriendo, o bien, cambiar el valor de la variable del .env
```
