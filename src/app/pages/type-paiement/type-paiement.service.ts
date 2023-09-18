import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { ITypePaiement } from '../../shared/models/type-paiement.model';


type EntityResponseType = HttpResponse<ITypePaiement>;
type EntityArrayResponseType = HttpResponse<ITypePaiement[]>;
@Injectable({providedIn: 'root'})
export class TypePaiementService {

    public resourceUrl = SERVER_API_URL + 'api/type-paiements';
    
    constructor(private http: HttpClient) { }

    create(typePaiement: ITypePaiement): Observable<EntityResponseType> {
        return this.http.post<ITypePaiement>(this.resourceUrl, typePaiement, { observe: 'response', withCredentials:true });
    }
    
    update(typePaiement: ITypePaiement): Observable<EntityResponseType> {
        return this.http.put<ITypePaiement>(this.resourceUrl, typePaiement, { observe: 'response', withCredentials:true });
    }
    
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITypePaiement>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
    }
    
    query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);
        return this.http.get<ITypePaiement[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
    }
    getAsList(): Observable<EntityArrayResponseType> {
        return this.http.get<ITypePaiement[]>(this.resourceUrl+'/all', {withCredentials:true, observe: 'response' });
    }
    
}