import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Lokacija = new Schema({
    geografskaSirina: {
        type: Number
    },
    geografskaDuzina: {
        type: Number
    }
});

let Datum = new Schema({
    mesec: {
        type: Number
    },
    dan: {
        type: Number
    }
});

let Firma = new Schema({
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    lokacija: Lokacija,
    usluge: [{
        naziv: {
            type: String
        },
        cena: {
            type: Number
        }
    }],
    odmorPocetak: Datum,
    odmorKraj: Datum,
    dekorateri: {
        type: Array
    },
    telefon: {
        type: String
    },
    komentari: [{
        tekst: {
            type: String
        },
        ocena: {
            type: Number
        }
    }]
})

export default mongoose.model('Firma', Firma, 'firme');