import { Component, ViewChild, AfterContentInit, HostListener, Input, ElementRef } from '@angular/core';
import { SensorService } from 'src/app/services/sensor.service';
import { Sensor } from '../sensores/sensores.component';

/*

  25.671235803


  17.931702366

                    −444.531555176          −434.506530762

*/

@Component({
  selector: 'app-openmap',
  templateUrl: './openmap.component.html',
  styleUrls: ['./openmap.component.scss']
})
export class OpenmapComponent implements AfterContentInit {
  /// CONSTANTES

  /// Coordenadas
  @Input() data: OpenMapData;

  MIN_LAT = 25.671235803;
  MAX_LAT = 17.931702366;
  MIN_LON = -444.531555176;
  MAX_LON = -434.506530762;

  /// Intensidad de la señal
  MIN_SIGNAL = -90;
  MAX_SIGNAL = 0;

  /// Visual
  CARET_RADIO = 10;

  // @Input('carets') carets: LocationPoint[];

  @ViewChild('map', { static: true }) map: ElementRef<HTMLImageElement>;

  carets: Point[];
  newCarets: LocationPoint[];
  caretColors: string[];
  maxLat: number;
  maxLon: number;

  constructor(private sensors: SensorService) {
    this.carets = [];
    this.newCarets = [];
    this.caretColors = [];

    for (let i = 0x20; i <= 0xd4; i += 1) {
      this.caretColors.push('#d4' + ('0' + (i).toString(16)).substr(-2, 2) + '20');
    }

    for (let i = 0xd3; i >= 0x3e; i -= 1) {
      this.caretColors.push('#' + ('0' + (i).toString(16)).substr(-2, 2) + 'd420');
    }

    this.maxLat = this.maxLon = 0;

    this.sensors.getSensors().subscribe((list: Sensor[]) => {
      this.carets = list.map((e: Sensor) => [ e.lat, e.lon, e.val ] );
      this.maxLat = this.map.nativeElement.clientHeight;
      this.maxLon = this.map.nativeElement.clientWidth;
      this.newCarets = this.transform(this.carets);
    });
  }

  ngAfterContentInit() {

    if ( this.data.maxLat ) { this.MAX_LAT = this.data.maxLat; }
    if ( this.data.maxLon ) { this.MAX_LON = this.data.maxLon; }
    if ( this.data.minLat ) { this.MIN_LAT = this.data.minLat; }
    if ( this.data.minLon ) { this.MIN_LON = this.data.minLon; }
    if ( this.data.maxSignal ) { this.MAX_SIGNAL = this.data.maxSignal; }
    if ( this.data.minSignal ) { this.MIN_SIGNAL = this.data.minSignal; }
    if ( this.data.caretRadio ) { this.CARET_RADIO = this.data.caretRadio; }

    this.map.nativeElement.addEventListener('load', (e) => {
      const target = e.target as HTMLImageElement;
      this.maxLat = target.clientHeight;
      this.maxLon = target.clientWidth;

      this.newCarets = this.transform(this.carets);
      // console.log(this.carets, this.newCarets);

    }, false);
  }

  @HostListener('window:resize')
  resizeListener() {
    this.maxLat = this.map.nativeElement.clientHeight;
    this.maxLon = this.map.nativeElement.clientWidth;
    this.newCarets = this.transform(this.carets);
  }

  map_coords(point: number, fromOld: number, toOld: number, fromNew: number, toNew: number): number {
    if ( Math.abs(toOld - fromOld) < 1e-9 ) {
      return fromNew;
    }
    return (point - fromOld) * ( toNew - fromNew ) / (toOld - fromOld) + fromNew;
  }

  signalToColor(signal: number): string {

    let index = this.map_coords(signal, this.MIN_SIGNAL, this.MAX_SIGNAL, 0, this.caretColors.length - 1);
    index = Math.round(index);
    index = Math.min(index, this.caretColors.length - 1);
    index = Math.max(index, 0);

    return this.caretColors[index];
  }

  percent(part: number, total: number) {
    return part * 100 / total;
  }

  transform(oldCarets: Point[]): LocationPoint[] {

    const temp: LocationPoint[] = [];

    // console.log(this.maxLat, this.maxLon);

    for (let i = 0; i < oldCarets.length; i += 1) {
      temp.push({
        lat: this.map_coords( oldCarets[i][0], this.MIN_LAT, this.MAX_LAT, 0, this.maxLat ) - this.CARET_RADIO / 2,
        lon: this.map_coords( oldCarets[i][1], this.MIN_LON, this.MAX_LON, 0, this.maxLon ) - this.CARET_RADIO / 2,
        val: oldCarets[i][2],
        color: this.signalToColor(oldCarets[i][2]),
        description: `[sensor ${i}]: Intensidad ${oldCarets[i][2]} dBm`
      });
      // console.log('TEMP[', i, '] = ', temp[ temp.length - 1 ]);
    }

    return temp;

  }

  isInside(caret: LocationPoint) {
    // console.log(0 <= caret[0] && caret[0] <= this.maxLat && 0 <= caret[1] && caret[1] <= this.maxLon);
    return 0 <= caret.lat && caret.lat <= this.maxLat && 0 <= caret.lon && caret.lon <= this.maxLon;
  }

}

interface Point {
  0: number; // Latitud
  1: number; // Longitud
  2: number; // Intensidad
}

export interface LocationPoint {
  lat: number;         // Latitud
  lon: number;         // Longitud
  val: number;         // Intensidad
  color?: string;       // Intensidad (color)
  description?: string; // Descripcion
}

interface OpenMapData {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
  minSignal: number;
  maxSignal: number;
  caretRadio: number;
}
