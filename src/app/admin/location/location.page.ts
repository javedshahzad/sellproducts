import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { UtilService } from 'src/app/services/util.service';
declare var google;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  @ViewChild('mapElement',{ static: true }) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
    destination:any
    source:any;
    marker: any;
    settingList:any=[];
    address: any;
    lang_data: any = {};
    location:any={};
  town: string;
  constructor(
    private geolocation: Geolocation,
    private util: UtilService,
    private activeroute: ActivatedRoute
    ) { 
      this.location.name=this.activeroute.snapshot.paramMap.get("town");
      console.log(this.town)
      
    }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
    setTimeout(() => {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 15,
      center: this.currentLocation,
    });
    new google.maps.Marker({
      position: this.currentLocation,
      map,
      title: "My Current Location",
    });
    this.directionsDisplay.setMap(map);
    }, 1000);
   
  }
  calculateAndDisplayRoute() {
    const that = this;
    this.util.startLoad();
    this.directionsService.route({
      origin: this.currentLocation,
      destination:this.location.name,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
        this.util.dismissLoader();
      } else {
        this.util.dismissLoader();
        alert('Directions request failed due to ' + status);
      }
    });
  }
}
