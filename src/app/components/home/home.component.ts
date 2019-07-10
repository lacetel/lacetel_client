import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_HOST_PORT } from 'src/app/config/server';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  labelOptions;

  constructor(private http: HttpClient) {
    this.labelOptions = {
      color: '#CC0000',
      fontFamily: '',
      fontSize: '14px',
      fontWeight: 'bold',
      text: 'Some Text',
    };

    // this.http.get(API_HOST_PORT + '/buffer', { responseType: 'arraybuffer' }).subscribe(
    //  (res) => { console.log('BUFFER: ',  ) },
    //  (err) => { console.log('ERROR: ', err) }
    // )
  }

  ngOnInit() {

  }

}
