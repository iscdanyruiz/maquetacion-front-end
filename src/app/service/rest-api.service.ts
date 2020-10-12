import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  retry,
  catchError
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'body'
  }

  /**
     * ----------------------------------------------------
     * GET JSON
     * ----------------------------------------------------
     */
  
    getJSON(): Observable < any > {
      return this.http.get('../../assets/js/programa.json')
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
  
    /**
     * --------------------------------------------------------------------
     * ERROR HANDLING
     * --------------------------------------------------------------------
     */
    handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Codigo del error: ${error.status}\nMensaje: ${error.message}`;
      }
      return throwError(errorMessage);
    }
}
