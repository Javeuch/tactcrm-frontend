import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { IDepense } from '../../shared/models/depense.model';


type EntityResponseType = HttpResponse<IDepense>;
type EntityArrayResponseType = HttpResponse<IDepense[]>;
@Injectable({providedIn: 'root'})
export class DepenseService {

    public resourceUrl = SERVER_API_URL + 'api/depenses';
    
    constructor(private http: HttpClient) { }

    create(depense: IDepense): Observable<EntityResponseType> {
        return this.http.post<IDepense>(this.resourceUrl, depense, { observe: 'response', withCredentials:true });
      }
    
    update(depense: IDepense): Observable<EntityResponseType> {
        return this.http.put<IDepense>(this.resourceUrl, depense, { observe: 'response', withCredentials:true });
    }
    
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDepense>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
    }
    
    query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<IDepense[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
    }
    getAsList(): Observable<EntityArrayResponseType> {
        return this.http.get<IDepense[]>(this.resourceUrl+'/all', {withCredentials:true, observe: 'response' });
    }
}