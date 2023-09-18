import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { IAdresse } from '../../shared/models/adresse.model';


type EntityResponseType = HttpResponse<IAdresse>;
type EntityArrayResponseType = HttpResponse<IAdresse[]>;
@Injectable({providedIn: 'root'})
export class AdresseService {

    public resourceUrl = SERVER_API_URL + 'api/adresses';
    
    constructor(private http: HttpClient) { }

    create(client: IAdresse): Observable<EntityResponseType> {
        return this.http.post<IAdresse>(this.resourceUrl, client, { observe: 'response', withCredentials:true });
      }
    
      update(client: IAdresse): Observable<EntityResponseType> {
        return this.http.put<IAdresse>(this.resourceUrl, client, { observe: 'response', withCredentials:true });
      }
    
      find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAdresse>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
      }
    
      query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<IAdresse[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
      }
    
      delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
      }
    
      save(utilisateur: IAdresse): Observable<HttpResponse<IAdresse>> {
        return this.http.post<IAdresse>(SERVER_API_URL + 'api/register', utilisateur, { observe: 'response' });
      }

      getUtilisateurforEdit(id:number){
        return this.http.get<IAdresse>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
      }
}