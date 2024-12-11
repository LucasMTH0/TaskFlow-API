import { errorMiddleware } from './middlewares/error';
import { taskRouter } from './routes/TaskRouter';
import { userRouter } from './routes/UserRouter';
const PORT = 9990
const express = require('express');
var cors = require('cors');
const app = express();

app.use(errorMiddleware);
app.use(express.json());
app.use(cors())

app.use(taskRouter);
app.use(userRouter);

app.listen(PORT, () => {console.log(`running in http://localhost:${PORT} !`)})