import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    imejl: {
        type: String
    },
    profilnaSlika: {
        type: String
    },
    tip: {
        type: String
    },
    deaktiviran: {
        type: String
    },
    brojKartice: {
        type: String
    },
    odobren: {
        type: String
    },
    firma: {
        type: String
    },
    blokiran: {
        type: String
    }
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');