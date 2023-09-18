import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { IContrat } from '../../shared/models/contrat.model';


type EntityResponseType = HttpResponse<IContrat>;
type EntityArrayResponseType = HttpResponse<IContrat[]>;
@Injectable({providedIn: 'root'})
export class ContratService {

    public resourceUrl = SERVER_API_URL + 'api/contrats';
    
    constructor(private http: HttpClient) { }

    create(contrat: IContrat): Observable<EntityResponseType> {
        return this.http.post<IContrat>(this.resourceUrl, contrat, { observe: 'response', withCredentials:true });
      }
    
    update(contrat: IContrat): Observable<EntityResponseType> {
        return this.http.put<IContrat>(this.resourceUrl, contrat, { observe: 'response', withCredentials:true });
    }
    
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContrat>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
    }

    findByClientId(id: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContrat[]>(`${this.resourceUrl}/client/${id}`, {params:options, observe: 'response', withCredentials: true, });
    }
    
    query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<IContrat[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
    }
}