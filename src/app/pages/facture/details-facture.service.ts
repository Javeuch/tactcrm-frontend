import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { IDetailsFacture } from '../../shared/models/details-facture.model';


type EntityResponseType = HttpResponse<IDetailsFacture>;
type EntityArrayResponseType = HttpResponse<IDetailsFacture[]>;
@Injectable({providedIn: 'root'})
export class DetailsFactureService {

    public resourceUrl = SERVER_API_URL + 'api/details-factures';
    
    constructor(private http: HttpClient) { }

    create(facture: IDetailsFacture): Observable<EntityResponseType> {
        return this.http.post<IDetailsFacture>(this.resourceUrl, facture, { observe: 'response', withCredentials:true });
      }
    
    update(facture: IDetailsFacture): Observable<EntityResponseType> {
        return this.http.put<IDetailsFacture>(this.resourceUrl, facture, { observe: 'response', withCredentials:true });
    }
    
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDetailsFacture>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
    }
    
    query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<IDetailsFacture[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
    }
    getDetailsFactureByFactureId(id:number){
        return this.http.get<IDetailsFacture[]>(`${this.resourceUrl}/facture/${id}`, { observe: 'response', withCredentials: true, });
    }
}