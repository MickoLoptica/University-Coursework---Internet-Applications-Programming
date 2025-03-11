import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Oblik = new Schema({
    tip: {
        type: String,
        required: true
    },
    boja: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    sirina: {
        type: Number
    },
    visina: {
        type: Number
    },
    poluprecnik: {
        type: Number
    }
});

let Zakazivanje = new Schema({
    korisnik: {
        type: String
    },
    firma: {
        type: String
    },
    datumVreme: {
        type: String
    },
    kvadraturaUkupno: {
        type: Number
    },
    tip: {
        type: String
    },
    opis: {
        type: String
    },
    usluge: {
        type: Array
    },
    kvadraturaZelenilo: {
        type: Number
    },
    status: {
        type: String
    },
    trenutakZakazivanja: {
        type: String
    },
    komentar: {
        type: String
    },
    ocena: {
        type: Number
    },
    dekorater: {
        type: String
    },
    slikaPosla: {
        type: String
    },
    poslednjeOdrzavanje: {
        type: String
    },
    kvadraturaBazen: {
        type: Number
    },
    kvadraturaNamestaj: {
        type: Number
    },
    kvadraturaFontana: {
        type: Number
    },
    brojStolova: {
        type: Number
    },
    brojStolica: {
        type: Number
    },
    izgledBaste: [Oblik]
})

export default mongoose.model('Zakazivanje', Zakazivanje, 'zakazivanja');