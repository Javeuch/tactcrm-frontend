import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { IDevise } from '../../shared/models/devise.model';


type EntityResponseType = HttpResponse<IDevise>;
type EntityArrayResponseType = HttpResponse<IDevise[]>;
@Injectable({providedIn: 'root'})
export class DeviseService {

    public resourceUrl = SERVER_API_URL + 'api/devises';
    
    constructor(private http: HttpClient) { }

    create(devise: IDevise): Observable<EntityResponseType> {
        return this.http.post<IDevise>(this.resourceUrl, devise, { observe: 'response', withCredentials:true });
      }
    
    update(devise: IDevise): Observable<EntityResponseType> {
        return this.http.put<IDevise>(this.resourceUrl, devise, { observe: 'response', withCredentials:true });
    }
    
    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDevise>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
    }
    
    query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<IDevise[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
    }

    getAsList(): Observable<EntityArrayResponseType> {
        return this.http.get<IDevise[]>(this.resourceUrl+'/all', {withCredentials:true, observe: 'response' });
    }
}