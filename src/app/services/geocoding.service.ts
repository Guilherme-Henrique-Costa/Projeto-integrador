import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  buscarCoordenadas(endereco: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`;
    return this.http.get<any[]>(url).pipe(
      map((resultados) => {
        if (resultados.length > 0) {
          return {
            latitude: parseFloat(resultados[0].lat),
            longitude: parseFloat(resultados[0].lon)
          };
        } else {
          throw new Error('Endereço não encontrado');
        }
      })
    );
  }
}
