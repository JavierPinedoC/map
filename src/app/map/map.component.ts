import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { DataApiService } from '../_services/data-api.service';
import { MarkerService } from '../_services/marker.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map;
  selectedEstado;
  selectedMunicipio;
  selectedUnidad;
  selectedLocalidad;


  arrEstados= [];
  arrMunicipios = [];
  arrActividades = [];
  arrLocalidades = [];

  constructor(private markerService: MarkerService, private dataApiService: DataApiService) {
  }

  ngAfterViewInit(): void {
    // this.getEstados();
    this.getAllEstados();
    this.getUnidades();
    this.initMap();
    // this.markerService.makeCapitalMarkers(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

//   private getEstados(){
//   this.dataApiService.getEstados().subscribe((estados: any) => {
    
//     this.arrEstados = estados.content;
//     console.log(this.arrEstados);
//    });
 
//  }

  private getAllEstados(){
    this.dataApiService.getAllEstados().subscribe((estados:any)=> {
      this.arrEstados = estados;
      console.log(estados);
      
    })
  }

  private getUnidades(){
  this.dataApiService.getUnidades().subscribe((unidades: any) => {
    this.arrActividades = unidades.content;
   });
 
 }
 
  changeEstado()
 {
   this.dataApiService.getMunicipios(this.selectedEstado)
   .subscribe((municipios: any) => {
     console.log(municipios);
     
    this.arrMunicipios = municipios;

   });
 
 }

 changeMunicipio()
 {
   this.dataApiService.getlocalidades(this.selectedMunicipio)
   .subscribe((localidades: any) => {
     console.log(localidades);
     
    this.arrLocalidades = localidades;

   });
 
 }
 

  buscarDenues()
 {

  this.markerService.makeDenuesMarkers(this.map,
    this.selectedEstado,
    this.selectedMunicipio,
    this.selectedUnidad
    );

 }

}