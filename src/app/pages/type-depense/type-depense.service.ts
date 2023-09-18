import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { ITypeDepense } from '../../shared/models/type-depense.model';


type EntityResponseType = HttpResponse<ITypeDepense>;
type EntityArrayResponseType = HttpResponse<ITypeDepense[]>;
@Injectable({providedIn: 'root'})
export class TypeDepenseService {

    public resourceUrl = SERVER_API_URL + 'api/type-depenses';
    
    constructor(private http: HttpClient) { }

    create(typeDepense: ITypeDepense): Observable<EntityResponseType> {
        return this.http.post<ITypeDepense>(this.resourceUrl, typeDepense, { observe: 'response', withCredentials:true });
      }
    
    update(typeDepense: ITypeDepense): Observable<EntityResponseType> {
        return this.http.put<ITypeDepense>(this.resourceUrl, typeDepense, { observe: 'response', withCredentials:true });
    }
    
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITypeDepense>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
    }
    
    query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<ITypeDepense[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
    }

    getAsList(): Observable<EntityArrayResponseType> {
        return this.http.get<ITypeDepense[]>(this.resourceUrl+'/all', {withCredentials:true, observe: 'response' });
    }
}