import * as express from 'express';
import Firma from '../models/firma';

export class FirmaController {
    dohvatiFirme = (req: express.Request, res: express.Response) => {
        Firma.find()
            .then(firme => {
                res.json(firme);
            })
            .catch(err => {
                console.log(err);
            });
    }

    registracijaFirme = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let adresa = req.body.adresa;
        let lokacija = req.body.lokacija;
        let odmorPocetak = req.body.odmorPocetak;
        let odmorKraj = req.body.odmorKraj;
        let telefon = req.body.telefon;
        let usluge = req.body.usluge;
        let dekorateri = req.body.dekorateri;
        let komentari: Array<{ tekst: string, ocena: number }> = [];

        const novaFirma = new Firma({
            'naziv': naziv,
            'adresa': adresa,
            'lokacija': lokacija,
            'odmorPocetak': odmorPocetak,
            'odmorKraj': odmorKraj,
            'telefon': telefon,
            'usluge': usluge,
            'dekorateri': dekorateri,
            'komentari': komentari
        });

        novaFirma.save()
            .then(() => {
                return res.json({ msg: 'ok' });
            })
            .catch((err: any) => {
                return res.json({ msg: 'Грешка при регистрацији' });
             });
    }

    zaposliUFirmu = (req: express.Request, res: express.Response) => {
        let naziv = req.body.firma;
        let dekorater = req.body.dekorater;
        
        Firma.updateOne( 
            { 'naziv': naziv },
            { $push: { 'dekorateri': dekorater } })
        .then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            res.json({ 'msg': err })
        })
        
    }

    dohvatiFirmu = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        Firma.findOne({ 'naziv': naziv }).then(firma => {
            res.json(firma)
        }).catch(err=>{
            console.log(err)
        })
    }

}