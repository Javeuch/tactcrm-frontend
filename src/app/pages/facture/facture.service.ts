import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { IFacture, IFactureView } from '../../shared/models/facture.model';


type EntityResponseType = HttpResponse<IFacture>;
type EntityArrayResponseType = HttpResponse<IFacture[]>;
@Injectable({providedIn: 'root'})
export class FactureService {

    public resourceUrl = SERVER_API_URL + 'api/factures';
    
    constructor(private http: HttpClient) { }

    create(facture: IFacture): Observable<EntityResponseType> {
        return this.http.post<IFacture>(this.resourceUrl, facture, { observe: 'response', withCredentials:true });
      }
    
    update(facture: IFacture): Observable<EntityResponseType> {
        return this.http.put<IFacture>(this.resourceUrl, facture, { observe: 'response', withCredentials:true });
    }
    
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFacture>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
    }

    findByClientId(id: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFacture[]>(`${this.resourceUrl}/client/${id}`, {params:options, observe: 'response', withCredentials: true, });
    }
    
    query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<IFacture[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
    }

    findAllForView(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);

        return this.http.get<IFacture[]>(`${this.resourceUrl}/view`, { params: options, withCredentials:true, observe: 'response' });
    }

    findOneForViewById(id: number): Observable<HttpResponse<IFactureView>> {
        return this.http.get<IFactureView>(`${this.resourceUrl}/${id}/view`, { observe: 'response', withCredentials: true, });
    }

}