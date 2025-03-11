import express, { Router } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import path from 'path'
import firmaRouter from './routes/firma.routes';
import zakazivanjeRouter from './routes/zakazivanje.routes';

const app = express();

app.use('/pictures', express.static(path.join(__dirname, '../../pictures')));
app.use('/pictures/profiles', express.static(path.join(__dirname, '../../pictures/profiles')));

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/projekat")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router = Router()

router.use('/korisnik', korisnikRouter)
router.use('/firma', firmaRouter)
router.use('/zakazivanje', zakazivanjeRouter)
app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));