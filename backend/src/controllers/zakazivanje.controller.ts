import * as express from 'express';
import Zakazivanje from '../models/zakazivanje';

export class ZakazivanjeController {

    zakazivanjePrivatno = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let datumVreme = req.body.datumVreme;
        let kvadraturaUkupno = req.body.kvadraturaUkupno;
        let tip = req.body.tip;
        let opis = req.body.opis;
        let usluge = req.body.usluge;
        let kvadraturaZelenilo = req.body.kvadraturaZelenilo;
        let izgledBaste = req.body.izgledBaste;
        let status = "aktivno";
        let trenutakZakazivanja = new Date();
        let komentar = "";
        let ocena = 0;
        let dekorater = "";
        let poslednjeOdrzavanje = req.body.datumVreme;
        let kvadraturaBazen = req.body.kvadraturaBazen;
        let kvadraturaNamestaj = req.body.kvadraturaNamestaj;

        const novoZakazivanje = new Zakazivanje({
            'korisnik': korisnik,
            'firma': firma,
            'datumVreme': datumVreme,
            'kvadraturaUkupno': kvadraturaUkupno,
            'tip': tip,
            'opis': opis,
            'usluge': usluge,
            'kvadraturaZelenilo': kvadraturaZelenilo,
            'izgledBaste': izgledBaste,
            'status': status,
            'trenutakZakazivanja': trenutakZakazivanja,
            'komentar': komentar,
            'ocena': ocena,
            'dekorater': dekorater,
            'poslednjeOdrzavanje': poslednjeOdrzavanje,
            'kvadraturaBazen': kvadraturaBazen,
            'kvadraturaNamestaj': kvadraturaNamestaj
        });

        novoZakazivanje.save()
            .then(() => {
                return res.json({ msg: 'ok' });
            })
            .catch((err: any) => {
                return res.json({ msg: 'Грешка при слању захтева' });
             });
    }

    zakazivanjeRestoransko = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let datumVreme = req.body.datumVreme;
        let kvadraturaUkupno = req.body.kvadraturaUkupno;
        let tip = req.body.tip;
        let opis = req.body.opis;
        let usluge = req.body.usluge;
        let kvadraturaZelenilo = req.body.kvadraturaZelenilo;
        let izgledBaste = req.body.izgledBaste;
        let status = "aktivno";
        let trenutakZakazivanja = new Date();
        let komentar = "";
        let ocena = 0;
        let dekorater = "";
        let poslednjeOdrzavanje = req.body.datumVreme;
        let kvadraturaFontana = req.body.kvadraturaFontana;
        let brojStolova = req.body.brojStolova;
        let brojStolica = req.body.brojStolica;

        const novoZakazivanje = new Zakazivanje({
            'korisnik': korisnik,
            'firma': firma,
            'datumVreme': datumVreme,
            'kvadraturaUkupno': kvadraturaUkupno,
            'tip': tip,
            'opis': opis,
            'usluge': usluge,
            'kvadraturaZelenilo': kvadraturaZelenilo,
            'izgledBaste': izgledBaste,
            'status': status,
            'trenutakZakazivanja': trenutakZakazivanja,
            'komentar': komentar,
            'ocena': ocena,
            'dekorater': dekorater,
            'poslednjeOdrzavanje': poslednjeOdrzavanje,
            'kvadraturaFontana': kvadraturaFontana,
            'brojStolova': brojStolova,
            'brojStolica': brojStolica
        });

        novoZakazivanje.save()
            .then(() => {
                return res.json({ msg: 'ok' });
            })
            .catch((err: any) => {
                return res.json({ msg: 'Грешка при слању захтева' });
             });
    }

    dohvatiZakazivanjaVlasnika = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        Zakazivanje.find({ 'korisnik': korisnik, 'status': { $in: ["aktivno", "prihvaceno"]}})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
            });
    }

    dohvatiArhivuVlasnika = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let sadasnjost = new Date();
        Zakazivanje.find({ 'korisnik': korisnik, 'status': { $in: ["zavrseno", "odbijeno", "odrzavanje"]},
            $expr: { $lt: [ 'poslednjeOdrzavanje', sadasnjost] }
        })
        .then(zakazivanja => {
            res.json(zakazivanja);
        })
        .catch(err => {
            console.log(err);
        });
    }

    dohvatiArhivuDekoratera = (req: express.Request, res: express.Response) => {
        let dekorater = req.body.dekorater;
        let sadasnjost = new Date();
        Zakazivanje.find({ 'dekorater': dekorater, 'status': { $in: ["zavrseno", "odrzavanje"]},
            $expr: { $lt: [ 'poslednjeOdrzavanje', sadasnjost] }
        })
        .then(zakazivanja => {
            res.json(zakazivanja);
        })
        .catch(err => {
            console.log(err);
        });
    }

    dohvatiArhivuFirme = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;
        let sadasnjost = new Date();
        Zakazivanje.find({ 'firma': firma, 'status': { $in: ["zavrseno", "odrzavanje"]},
            $expr: { $lt: ['poslednjeOdrzavanje', sadasnjost] }
        })
        .then(zakazivanja => {
            res.json(zakazivanja);
        })
        .catch(err => {
            console.log(err);
        });
    }

    dohvatiArhivuVlasnikaBezOdrzavanja = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        Zakazivanje.find({ 'korisnik': korisnik, 'status': { $in: ["zavrseno", "odbijeno"]}})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
            });
    }

    dohvatiZakazivanjaFirme = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;
        Zakazivanje.find({ 'firma': firma, 'status': "aktivno"})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
            });
    }

    dohvatiZakazivanjaDekoratera = (req: express.Request, res: express.Response) => {
        let dekorater = req.body.dekorater;
        Zakazivanje.find({ 'dekorater': dekorater, 'status': "prihvaceno"})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
            });
    }

    otkaziZakazivanje = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let trenutakZakazivanja = req.body.trenutakZakazivanja;
        Zakazivanje.updateOne({ 'korisnik': korisnik, 'firma': firma, 'trenutakZakazivanja': trenutakZakazivanja }, { $set: { 'status': 'otkazano'} }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        })
        
    }

    dohvatiOcenjenaZakazivanja = (req: express.Request, res: express.Response) => {
        Zakazivanje.find({ 'status': { $in: ["zavrseno", "odrzavanje"]}, 'ocena': { $ne: 0 }})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
            });
    }

    dohvatiOcenjenaZakazivanjaFirme = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma
        Zakazivanje.find({ 'firma': firma, 'status': { $in: ["zavrseno", "odrzavanje"]}, 'ocena': { $ne: 0 }})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
            });
    }

    dohvatiZavrsenaZakazivanja = (req: express.Request, res: express.Response) => {
        Zakazivanje.find({ 'status': "zavrseno"})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
            });
    }

    ostaviKomentar = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let trenutakZakazivanja = req.body.trenutakZakazivanja;
        let komentar = req.body.komentar;
        let ocena = req.body.ocena;
        Zakazivanje.updateOne({ 'korisnik': korisnik, 'firma': firma, 'trenutakZakazivanja': trenutakZakazivanja },
             { $set: {'komentar': komentar, 'ocena': ocena} }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }

    odbijZakazivanje = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let trenutakZakazivanja = req.body.trenutakZakazivanja;
        let komentar = req.body.komentar;
        Zakazivanje.updateOne({ 'korisnik': korisnik, 'firma': firma, 'trenutakZakazivanja': trenutakZakazivanja },
             { $set: {'komentar': komentar, 'status': 'odbijeno'} }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }

    potvrdiZakazivanje = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let trenutakZakazivanja = req.body.trenutakZakazivanja;
        let dekorater = req.body.dekorater;
        Zakazivanje.updateOne({ 'korisnik': korisnik, 'firma': firma, 'trenutakZakazivanja': trenutakZakazivanja },
             { $set: {'dekorater': dekorater, 'status': 'prihvaceno'} }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }

    zavrsiPosao = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let trenutakZakazivanja = req.body.trenutakZakazivanja;
        let slikaPosla = req.file ? req.file.filename : "";
        Zakazivanje.updateOne({ 'korisnik': korisnik, 'firma': firma, 'trenutakZakazivanja': trenutakZakazivanja },
            { $set: {'status': 'zavrseno', 'slikaPosla': slikaPosla} }).then(ok=>{
           res.json({ 'msg': 'ok' })
       }).catch(err=>{
           res.json({ 'msg': err })
       })
    }

    oznaciZaOdrzavanje = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let trenutakZakazivanja = req.body.trenutakZakazivanja;
        Zakazivanje.updateOne({ 'korisnik': korisnik, 'firma': firma, 'trenutakZakazivanja': trenutakZakazivanja },
             { $set: {'status': "odrzavanje"} }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }

    dohvatiOdrzavanjaVlasnika = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let sadasnjost = new Date();
        Zakazivanje.find({ 'korisnik': korisnik, $or: [
            { 'status': 'odrzavanje' },
            { 'status': 'zavrseno', $expr: { $gt: [ 'poslednjeOdrzavanje', sadasnjost] } }
        ]})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
        });
    }

    dohvatiOdrzavanjaFirme = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;
        Zakazivanje.find({ 'firma': firma, 'status': "odrzavanje"})
            .then(zakazivanja => {
                res.json(zakazivanja);
            })
            .catch(err => {
                console.log(err);
        });
    }

    odbijOdrzavanje = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let trenutakZakazivanja = req.body.trenutakZakazivanja;
        Zakazivanje.updateOne({ 'korisnik': korisnik, 'firma': firma, 'trenutakZakazivanja': trenutakZakazivanja },
             { $set: {'status': 'zavrseno'} }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }

    obaviOdrzavanje = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik;
        let firma = req.body.firma;
        let trenutakZakazivanja = req.body.trenutakZakazivanja;
        let vremeOdrzavanja = req.body.vremeOdrzavanja;
        Zakazivanje.updateOne({ 'korisnik': korisnik, 'firma': firma, 'trenutakZakazivanja': trenutakZakazivanja },
             { $set: {'poslednjeOdrzavanje': vremeOdrzavanja, 'status': "zavrseno"}}).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        }) 
    }

}