import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardGameCollection } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class BggDataService {
  private readonly baseUrl = 'https://bgg-json.azurewebsites.net/';
  private http = inject(HttpClient);

  getBoardgameCollection(user: string): Observable<BoardGameCollection[]> {
    const url = `${this.baseUrl}collection/${user}`;
    return this.http.get<BoardGameCollection[]>(url);
  }
}
