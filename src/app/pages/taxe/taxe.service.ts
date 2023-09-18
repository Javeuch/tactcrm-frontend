import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { ITaxe } from '../../shared/models/taxe.model';


type EntityResponseType = HttpResponse<ITaxe>;
type EntityArrayResponseType = HttpResponse<ITaxe[]>;
@Injectable({providedIn: 'root'})
export class TaxeService {

    public resourceUrl = SERVER_API_URL + 'api/taxes';
    
    constructor(private http: HttpClient) { }

    create(taxe: ITaxe): Observable<EntityResponseType> {
        return this.http.post<ITaxe>(this.resourceUrl, taxe, { observe: 'response', withCredentials:true });
      }
    
    update(taxe: ITaxe): Observable<EntityResponseType> {
        return this.http.put<ITaxe>(this.resourceUrl, taxe, { observe: 'response', withCredentials:true });
    }
    
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITaxe>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
    }
    
    query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<ITaxe[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
    }

    getAsList(): Observable<EntityArrayResponseType> {
        return this.http.get<ITaxe[]>(this.resourceUrl+'/all', {withCredentials:true, observe: 'response' });
    }
}