import express from 'express';
import { FirmaController } from '../controllers/firma.controller';
const firmaRouter = express.Router();

firmaRouter.route('/dohvatiFirme').get(
    (req, res) => new FirmaController().dohvatiFirme(req, res)
)

firmaRouter.route('/registracijaFirme').post(
    (req, res) => new FirmaController().registracijaFirme(req, res)
);

firmaRouter.route('/zaposliUFirmu').post(
    (req, res) => new FirmaController().zaposliUFirmu(req, res)
);

firmaRouter.route('/dohvatiFirmu').post(
    (req, res) => new FirmaController().dohvatiFirmu(req, res)
);

export default firmaRouter;