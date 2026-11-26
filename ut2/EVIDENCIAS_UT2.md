**npm run typecheck**

Este comando sirve para indicarte los errores ortograficos que tiene el codigo.

Por ejemplo, si en app.ts, le quito una p a:

`const app = express();`

Me sale el error:

```
src/app.ts:20:3 - error TS2304: Cannot find name 'app'.
```

Seguido de las lineas donde esta la constante app, que al estar mal escrita, salta el error:

```
src/app.ts:20:3 - error TS2304: Cannot find name 'app'.

20   app.use(requestId); // first: everything after it can read req.requestId

```

**npm run lint**

Este comando sirve para indicarte los errores de ejecucion que tiene el codigo.

Por ejemplo, si un condicional como:

`if(env.DEPURACION = 1){
    console.log('[errorHandler]', req.requestId, 
    err.message);
  }`

Esta mal planteada, sale el siguiente error:

```
D:\Users\LuisMPS\Desktop\luismiguel_dsw2026_examen_ut3\ut3\src\middlewares\errorHandler.ts
  18:6  error  Expected a conditional expression and instead saw an assignment  no-cond-assign
  18:6  error  Unexpected constant condition                                    no-constant-condition
```

**npm run build**

Este comando sirve para indicarte los errores que impide inicar el servidor.

Por ejemplo, si quitamos:

`export const articlesRouter = Router();`

de articles.ts, nos saldrá los siguientes errores asociados a la contante:

```
src/app.ts:13:10 - error TS2305: Module '"./routes/articles.js"' has no exported member 'articlesRouter'.

13 import { articlesRouter } from './routes/articles.js';

src/routes/articles.ts:11:1 - error TS2304: Cannot find name 'articlesRouter'.

11 articlesRouter.get('/', articlesController.list);

src/routes/articles.ts:12:1 - error TS2304: Cannot find name 'articlesRouter'.

12 articlesRouter.post('/', articlesController.create);

src/routes/articles.ts:13:1 - error TS2304: Cannot find name 'articlesRouter'.

13 articlesRouter.get('/:articleId', articlesController.getById);

src/routes/articles.ts:14:1 - error TS2304: Cannot find name 'articlesRouter'.

14 articlesRouter.patch('/:articleId', articlesController.update);
```
