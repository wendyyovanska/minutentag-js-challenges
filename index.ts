import express, { Express, Request, Response, Application, NextFunction } from 'express';
const router = express.Router();
import { StockPriceRouter } from "./routes/stock-price"
import { ProductRouter } from './routes/product';

const crossOriginAuth = (req: Request, res: Response, next: NextFunction): void => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(crossOriginAuth);
app.use(express.json());

router.use('/stock-price', StockPriceRouter);
router.use('/product', ProductRouter);

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
