import express from 'express';
import multer from 'multer';
import path from 'path';
import { ZakazivanjeController } from '../controllers/zakazivanje.controller';
const zakazivanjeRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../pictures/gallery'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

zakazivanjeRouter.route('/zakazivanjePrivatno').post(
    (req, res) => new ZakazivanjeController().zakazivanjePrivatno(req, res)
);

zakazivanjeRouter.route('/zakazivanjeRestoransko').post(
    (req, res) => new ZakazivanjeController().zakazivanjeRestoransko(req, res)
);

zakazivanjeRouter.route('/dohvatiZakazivanjaVlasnika').post(
    (req, res) => new ZakazivanjeController().dohvatiZakazivanjaVlasnika(req, res)
);

zakazivanjeRouter.route('/dohvatiArhivuVlasnika').post(
    (req, res) => new ZakazivanjeController().dohvatiArhivuVlasnika(req, res)
);

zakazivanjeRouter.route('/dohvatiArhivuDekoratera').post(
    (req, res) => new ZakazivanjeController().dohvatiArhivuDekoratera(req, res)
);

zakazivanjeRouter.route('/dohvatiArhivuFirme').post(
    (req, res) => new ZakazivanjeController().dohvatiArhivuFirme(req, res)
);

zakazivanjeRouter.route('/dohvatiArhivuVlasnikaBezOdrzavanja').post(
    (req, res) => new ZakazivanjeController().dohvatiArhivuVlasnikaBezOdrzavanja(req, res)
);

zakazivanjeRouter.route('/dohvatiZakazivanjaFirme').post(
    (req, res) => new ZakazivanjeController().dohvatiZakazivanjaFirme(req, res)
);

zakazivanjeRouter.route('/dohvatiZakazivanjaDekoratera').post(
    (req, res) => new ZakazivanjeController().dohvatiZakazivanjaDekoratera(req, res)
);

zakazivanjeRouter.route('/otkaziZakazivanje').post(
    (req, res) => new ZakazivanjeController().otkaziZakazivanje(req, res)
);

zakazivanjeRouter.route('/dohvatiOcenjenaZakazivanja').get(
    (req, res) => new ZakazivanjeController().dohvatiOcenjenaZakazivanja(req, res)
);

zakazivanjeRouter.route('/dohvatiOcenjenaZakazivanjaFirme').post(
    (req, res) => new ZakazivanjeController().dohvatiOcenjenaZakazivanjaFirme(req, res)
);

zakazivanjeRouter.route('/dohvatiZavrsenaZakazivanja').get(
    (req, res) => new ZakazivanjeController().dohvatiZavrsenaZakazivanja(req, res)
);

zakazivanjeRouter.route('/ostaviKomentar').post(
    (req, res) => new ZakazivanjeController().ostaviKomentar(req, res)
);

zakazivanjeRouter.route('/odbijZakazivanje').post(
    (req, res) => new ZakazivanjeController().odbijZakazivanje(req, res)
);

zakazivanjeRouter.route('/potvrdiZakazivanje').post(
    (req, res) => new ZakazivanjeController().potvrdiZakazivanje(req, res)
);

zakazivanjeRouter.route('/zavrsiPosao').post(
    upload.single('slikaPosla'),
    (req, res) => new ZakazivanjeController().zavrsiPosao(req, res)
);

zakazivanjeRouter.route('/oznaciZaOdrzavanje').post(
    (req, res) => new ZakazivanjeController().oznaciZaOdrzavanje(req, res)
);

zakazivanjeRouter.route('/dohvatiOdrzavanjaVlasnika').post(
    (req, res) => new ZakazivanjeController().dohvatiOdrzavanjaVlasnika(req, res)
);

zakazivanjeRouter.route('/dohvatiOdrzavanjaFirme').post(
    (req, res) => new ZakazivanjeController().dohvatiOdrzavanjaFirme(req, res)
);

zakazivanjeRouter.route('/odbijOdrzavanje').post(
    (req, res) => new ZakazivanjeController().odbijOdrzavanje(req, res)
);

zakazivanjeRouter.route('/obaviOdrzavanje').post(
    (req, res) => new ZakazivanjeController().obaviOdrzavanje(req, res)
);

export default zakazivanjeRouter;