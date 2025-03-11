import * as express from 'express';
import Korisnik from '../models/korisnik'
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import bcrypt from 'bcrypt';

const tempDir = path.join(__dirname, '..', 'pictures', 'temp');
const profilesDir = path.join(__dirname, '..', 'pictures', 'profiles');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

export class KorisnikController {
    
    registracijaVlasnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let imejl = req.body.imejl;
        let profilnaSlika = req.file ? req.file.filename : 'podrazumevanaProfilna.jpg';
        let tip = "vlasnik";
        let deaktiviran = "ne";
        let brojKartice = req.body.brojKartice;
        let odobren = "ne";
        bcrypt.hash(lozinka, 10, (err, hesiranaLozinka) => {
            if (err) {
                console.log(err);
            }
            const newKorisnik = new Korisnik({
                'korisnickoIme': korisnickoIme,
                'lozinka': hesiranaLozinka,
                'ime': ime,
                'prezime': prezime,
                'pol': pol,
                'adresa': adresa,
                'telefon': telefon,
                'imejl': imejl,
                'profilnaSlika': profilnaSlika,
                'tip': tip,
                'deaktiviran': deaktiviran,
                'brojKartice': brojKartice,
                'odobren': odobren
            });
            newKorisnik.save()
            .then(() => {
                return res.json({ msg: 'ok' });
            })
            .catch((err: any) => {
                return res.json({ msg: 'Грешка при регистрацији' });
            });
        });
    }

    registracijaDekoratera = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let imejl = req.body.imejl;
        let profilnaSlika = req.file ? req.file.filename : 'podrazumevanaProfilna.jpg';
        let tip = "dekorater";
        let deaktiviran = "ne";
        let firma = req.body.firma;
        let blokiran = "ne";
        bcrypt.hash(lozinka, 10, (err, hesiranaLozinka) => {
            if (err) {
                console.log(err);
            }
            const newKorisnik = new Korisnik({
                'korisnickoIme': korisnickoIme,
                'lozinka': hesiranaLozinka,
                'ime': ime,
                'prezime': prezime,
                'pol': pol,
                'adresa': adresa,
                'telefon': telefon,
                'imejl': imejl,
                'profilnaSlika': profilnaSlika,
                'tip': tip,
                'deaktiviran': deaktiviran,
                'firma': firma,
                'blokiran': blokiran
            });
            newKorisnik.save()
            .then(() => {
                return res.json({ msg: 'ok' });
            })
            .catch((err: any) => {
                return res.json({ msg: 'Грешка при регистрацији' });
            });
        });
    }

    registracijaDekorateraUOkviruFirme = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let imejl = req.body.imejl;
        let profilnaSlika = req.body.profilnaSlika;
        let tip = "dekorater";
        let deaktiviran = "ne";
        let firma = req.body.firma;
        let blokiran = "ne";
        bcrypt.hash(lozinka, 10, (err, hesiranaLozinka) => {
            if (err) {
                console.log(err);
            }
            const newKorisnik = new Korisnik({
                'korisnickoIme': korisnickoIme,
                'lozinka': hesiranaLozinka,
                'ime': ime,
                'prezime': prezime,
                'pol': pol,
                'adresa': adresa,
                'telefon': telefon,
                'imejl': imejl,
                'profilnaSlika': profilnaSlika,
                'tip': tip,
                'deaktiviran': deaktiviran,
                'firma': firma,
                'blokiran': blokiran
            });
            newKorisnik.save()
            .then(() => {
                return res.json({ msg: 'ok' });
            })
            .catch((err: any) => {
                return res.json({ msg: 'Грешка при регистрацији' });
            });
        });
    }

    prijava = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        Korisnik.findOne({ 'korisnickoIme': korisnickoIme}).then(korisnik=>{
            if (korisnik) {
                if (korisnik.lozinka) {
                    bcrypt.compare(lozinka, korisnik.lozinka, (err, isMatch) => {
                        if (err) {
                            console.log(err);
                        }
                        if (isMatch) {
                            res.json(korisnik);
                        }
                        else {
                            res.json(null);
                        }
                    });
                }
            }
            else {
                res.json(null);
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    
    dohvatiBrojDekorisanihBasti = (req: express.Request, res: express.Response) => {
        Korisnik.aggregate([
            { $match: { 'tip': 'dekorater' } },
            { $group: { _id: null, ukupnoBasti: { $sum: '$brojBasti' } } }
        ]).then(data => {
            const brojDekorisanihBasti = data[0].ukupnoBasti    
            res.json(brojDekorisanihBasti)
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }

    dohvatiBrojVlasnika = (req: express.Request, res: express.Response) => {
        Korisnik.countDocuments({ 'tip': "vlasnik", 'odobren': "da" })
            .then(brojVlasnika => {
                res.json(brojVlasnika)
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }

    dohvatiBrojDekoratera = (req: express.Request, res: express.Response) => {
        Korisnik.countDocuments({ 'tip': "dekorater" })
            .then(brojDekoratera => {
                res.json(brojDekoratera)
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }
        
    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let staraLozinka = req.body.staraLozinka;
        let novaLozinka = req.body.novaLozinka;
        Korisnik.findOne({ 'korisnickoIme': korisnickoIme })
            .then(korisnik => {
                if (korisnik) {
                    if (korisnik.lozinka) {
                        bcrypt.compare(staraLozinka, korisnik.lozinka, (err, isMatch) => {
                            if (err) {
                                console.log(err);
                            }
                            if (isMatch) {
                                bcrypt.hash(novaLozinka, 10, (err, hesiranaNovaLozinka) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    Korisnik.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'lozinka': hesiranaNovaLozinka } })
                                        .then(() => {
                                            res.json({ msg: 'ok' });
                                        })
                                        .catch(err => {
                                            console.log(err);
                                    });
                                });
                            }
                            else {
                                res.json({ msg: 'greska' });
                            }
                        });
                    }
                }
                else {
                    res.json({ msg: 'greska' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Greška prilikom pretrage korisnika' });
            });
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        Korisnik.findOne({ 'korisnickoIme': korisnickoIme }).then(korisnik=>{
            res.json(korisnik)
        }).catch(err=>{
            console.log(err)
        })
    }

    dohvatiKorisnikaNaOsnovuMejla = (req: express.Request, res: express.Response) => {
        let imejl = req.body.imejl;

        Korisnik.findOne({ 'imejl': imejl }).then(korisnik=>{
            res.json(korisnik)
        }).catch(err=>{
            console.log(err)
        })
    }

    dohvatiVlasnike = (req: express.Request, res: express.Response) => {
        Korisnik.find({ 'tip': "vlasnik", 'odobren': "da" })
            .then(vlasnici => {
                res.json(vlasnici);
            })
            .catch(err => {
                console.log(err);
            });
    }

    dohvatiDekoratere = (req: express.Request, res: express.Response) => {
        Korisnik.find({ 'tip': "dekorater" })
            .then(vlasnici => {
                res.json(vlasnici);
            })
            .catch(err => {
                console.log(err);
            });
    }

    dohvatiZahteve = (req: express.Request, res: express.Response) => {
        Korisnik.find({ 'tip': "vlasnik", 'odobren': "ne", 'deaktiviran': 'ne' })
            .then(vlasnici => {
                res.json(vlasnici);
            })
            .catch(err => {
                console.log(err);
            });
    }

    odobriVlasnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Korisnik.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'odobren': 'da' } }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        });
    }

    aktivirajKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Korisnik.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'deaktiviran': 'ne' } }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        });
    }

    deaktivirajKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Korisnik.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'deaktiviran': 'da' } }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        });
    }

    blokirajDekoratera = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Korisnik.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'blokiran': 'da' } }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        });
    }

    odblokirajDekoratera = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Korisnik.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'blokiran': 'ne' } }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        });
    }

    azurirajPodatke = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let telefon = req.body.telefon;
        let imejl = req.body.imejl;
        let profilnaSlika = req.file ? req.file.filename : req.body.profilnaSlika;
        let tip = req.body.tip;

        if (tip == "vlasnik") {
            let brojKartice = req.body.brojKartice;
            Korisnik.updateOne({ 'korisnickoIme': korisnickoIme},
                { $set: {
                   'ime': ime,
                   'prezime': prezime,
                   'adresa': adresa,
                   'telefon': telefon,
                   'imejl': imejl,
                   'brojKartice': brojKartice,
                   'profilnaSlika': profilnaSlika
                }}).then(ok=>{
               res.json({ 'msg': 'ok' })
           }).catch(err=>{
               res.json({ 'msg': err })
           })
        }
        else if (tip == "dekorater") {
            let firma = req.body.firma;
            Korisnik.updateOne({ 'korisnickoIme': korisnickoIme},
                { $set: {
                   'ime': ime,
                   'prezime': prezime,
                   'adresa': adresa,
                   'telefon': telefon,
                   'imejl': imejl,
                   'firma': firma,
                   'profilnaSlika': profilnaSlika
                }}).then(ok=>{
               res.json({ 'msg': 'ok' })
           }).catch(err=>{
               res.json({ 'msg': err })
           })
        }
    }

    obrisiProfilnuSliku = (req: express.Request, res: express.Response) => {
        let profilnaSlika = req.body.profilnaSlika;
        let filePath = path.join('pictures/profiles', profilnaSlika);
    
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Greška pri brisanju slike' });
            }
            res.json({ msg: 'Slika obrisana' });
        });
    }

    dohvatiRadnike = (req: express.Request, res: express.Response) => {
        let naziv = req.body.nazivFirme;
        Korisnik.find({ 'firma': naziv })
            .then(radnici => {
                res.json(radnici);
            })
            .catch(err => {
                console.log(err);
            });
    }

}