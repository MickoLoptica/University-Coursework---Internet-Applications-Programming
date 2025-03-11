import express from 'express';
import multer from 'multer';
import path from 'path';
import { KorisnikController } from '../controllers/korisnik.controller';
const korisnikRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../pictures/profiles'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

korisnikRouter.route('/prijava').post(
    (req, res) => new KorisnikController().prijava(req, res)
)

korisnikRouter.route('/dohvatiBrojDekorisanihBasti').get(
    (req, res) => new KorisnikController().dohvatiBrojDekorisanihBasti(req, res)
)

korisnikRouter.route('/dohvatiBrojVlasnika').get(
    (req, res) => new KorisnikController().dohvatiBrojVlasnika(req, res)
)

korisnikRouter.route('/dohvatiBrojDekoratera').get(
    (req, res) => new KorisnikController().dohvatiBrojDekoratera(req, res)
)

korisnikRouter.route('/promeniLozinku').post(
    (req, res) => new KorisnikController().promeniLozinku(req, res)
)

korisnikRouter.route('/registracijaVlasnika').post(
    upload.single('profilnaSlika'),
    (req, res) => new KorisnikController().registracijaVlasnika(req, res)
);

korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res) => new KorisnikController().dohvatiKorisnika(req, res)
)

korisnikRouter.route('/dohvatiKorisnikaNaOsnovuMejla').post(
    (req, res) => new KorisnikController().dohvatiKorisnikaNaOsnovuMejla(req, res)
)

korisnikRouter.route('/dohvatiVlasnike').get(
    (req, res) => new KorisnikController().dohvatiVlasnike(req, res)
)

korisnikRouter.route('/dohvatiDekoratere').get(
    (req, res) => new KorisnikController().dohvatiDekoratere(req, res)
)

korisnikRouter.route('/dohvatiZahteve').get(
    (req, res) => new KorisnikController().dohvatiZahteve(req, res)
)

korisnikRouter.route('/odobriVlasnika').post(
    (req, res) => new KorisnikController().odobriVlasnika(req, res)
)

korisnikRouter.route('/aktivirajKorisnika').post(
    (req, res) => new KorisnikController().aktivirajKorisnika(req, res)
)

korisnikRouter.route('/deaktivirajKorisnika').post(
    (req, res) => new KorisnikController().deaktivirajKorisnika(req, res)
)

korisnikRouter.route('/blokirajDekoratera').post(
    (req, res) => new KorisnikController().blokirajDekoratera(req, res)
)

korisnikRouter.route('/odblokirajDekoratera').post(
    (req, res) => new KorisnikController().odblokirajDekoratera(req, res)
)

korisnikRouter.route('/azurirajPodatke').post(
    upload.single('profilnaSlika'),
    (req, res) => new KorisnikController().azurirajPodatke(req, res)
);

korisnikRouter.route('/registracijaDekoratera').post(
    upload.single('profilnaSlika'),
    (req, res) => new KorisnikController().registracijaDekoratera(req, res)
);

korisnikRouter.route('/registracijaDekorateraUOkviruFirme').post(
    (req, res) => new KorisnikController().registracijaDekorateraUOkviruFirme(req, res)
);

korisnikRouter.route('/aploudujSliku').post(
    upload.single('profilnaSlika'),
    (req, res) => {
        if (req.file) {
            let fileName = req.file.filename;
            res.json(fileName);
        } 
        else {
            res.json('podrazumevanaProfilna.jpg');
        }
    }
);

korisnikRouter.route('/obrisiProfilnuSliku').post(
    (req, res) => new KorisnikController().obrisiProfilnuSliku(req, res)
);

korisnikRouter.route('/dohvatiRadnike').post(
    (req, res) => new KorisnikController().dohvatiRadnike(req, res)
)

export default korisnikRouter;