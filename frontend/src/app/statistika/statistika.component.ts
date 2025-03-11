import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import Zakazivanje from '../models/zakazivanje';
import { ZakazivanjeService } from '../services/zakazivanje.service';

@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  arhivaDekoratera: Zakazivanje[] = [];
  arhivaFirme: Zakazivanje[] = [];
  brojPoslovaPoDekorateru: { [dekorater: string]: number } = {};

  dijagramPoslovaPoMesecima: any;
  dijagramRaspodelePosla: any;
  dijagramProsecnogBrojaPoslovaPoDanuUNedelji: any;

  constructor(private korisnikService: KorisnikService, private zakazivanjeService: ZakazivanjeService) {}

  ngOnInit(): void {
    let ulogovan = localStorage.getItem('ulogovan');
    if (ulogovan) {
      this.korisnikService.dohvatiKorisnika(ulogovan).subscribe(k => {
        this.korisnik = k;
        this.zakazivanjeService.dohvatiArhivuDekoratera(this.korisnik.korisnickoIme).subscribe(a => {
          this.arhivaDekoratera = a;
          this.nacrtajDijagramPoslovaPoMesecima();
        });
        this.zakazivanjeService.dohvatiArhivuFirme(this.korisnik.firma).subscribe(a => {
          this.arhivaFirme = a;
          this.nacrtajDijagramRaspodelePosla();
          this.nacrtajDijagramProsecnogBrojaPoslovaPoDanuUNedelji();
        });
      });
    }
  }

  nacrtajDijagramPoslovaPoMesecima() {
    let brojPoslovaUMesecu = Array(12).fill(0);
    this.arhivaDekoratera.forEach(p => {
      let mesec = new Date(p.datumVreme).getMonth();
      brojPoslovaUMesecu[mesec]++;
    });
  
    let chartDom = document.getElementById('dijagramPoslovaPoMesecima')!;
    this.dijagramPoslovaPoMesecima = echarts.init(chartDom);
    let option = {
      xAxis: {
        type: 'category',
        data: ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'],
        boundaryGap: false,
        axisLabel: {
          interval: 0,
          rotate: 45,
          formatter: (value: string) => value
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [{
        data: brojPoslovaUMesecu,
        type: 'bar',
        color: 'rgba(0, 128, 0, 1)'
      }]
    };
    this.dijagramPoslovaPoMesecima.setOption(option);
  }

  nacrtajDijagramRaspodelePosla() {
    this.arhivaFirme.forEach(p => {
      if (!this.brojPoslovaPoDekorateru[p.dekorater]) {
        this.brojPoslovaPoDekorateru[p.dekorater] = 0;
      }
      this.brojPoslovaPoDekorateru[p.dekorater]++;
    });

    let chartDom = document.getElementById('dijagramRaspodelePosla')!;
    this.dijagramRaspodelePosla = echarts.init(chartDom);
    let option = {
      series: [{
        name: 'Расподела послова међу декоратерима',
        type: 'pie',
        radius: '50%',
        data: Object.keys(this.brojPoslovaPoDekorateru).map(dekorater => ({
          name: dekorater,
          value: this.brojPoslovaPoDekorateru[dekorater]
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    this.dijagramRaspodelePosla.setOption(option);
  }

  nacrtajDijagramProsecnogBrojaPoslovaPoDanuUNedelji() {
    let dvaMesecaPre = new Date();
    dvaMesecaPre.setMonth(dvaMesecaPre.getMonth() - 2);
    let brojPoslovaPoDanuUNedelji: { [dan: string]: number } = {'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0};
    let brojDanaPoDanuUNedelji: { [dan: string]: number } = {'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0};
  
    this.arhivaFirme.forEach(p => {
      let datum = new Date(p.datumVreme);
      if (datum > dvaMesecaPre) {
        let danUNedelji = datum.toLocaleDateString('en-US', { weekday: 'short' });
        brojPoslovaPoDanuUNedelji[danUNedelji]++;
        brojDanaPoDanuUNedelji[danUNedelji]++;
      }
    });
  
    let prosecanBrojPoslovaPoDanuUNedelji = Object.keys(brojPoslovaPoDanuUNedelji).map(dan => {
      return brojDanaPoDanuUNedelji[dan] > 0 ? brojPoslovaPoDanuUNedelji[dan] / brojDanaPoDanuUNedelji[dan] : 0;
    });
  
    let chartDom = document.getElementById('dijagramProsecnogBrojaPoslovaPoDanuUNedelji')!;
    this.dijagramProsecnogBrojaPoslovaPoDanuUNedelji = echarts.init(chartDom);
    let option = {
      xAxis: {
        type: 'category',
        data: ['ПОН', 'УТО', 'СРЕ', 'ЧЕТ', 'ПЕТ', 'СУБ', 'НЕД'],
        boundaryGap: false,
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [{
        data: prosecanBrojPoslovaPoDanuUNedelji,
        type: 'bar',
        color: 'rgba(0, 128, 0, 1)'
      }]
    };
    this.dijagramProsecnogBrojaPoslovaPoDanuUNedelji.setOption(option);
  }

}