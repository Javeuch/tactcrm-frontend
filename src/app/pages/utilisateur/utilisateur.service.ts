import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUtilisateur } from '../../shared/models/utilisateur.model';
import { SERVER_API_URL } from '../../utils/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../shared/utils/request-util';
import { IStats } from '../../shared/models/stats.model';
import { ILineChartOutput } from '../../shared/models/LineChartOutput.model';
import { IPieChartOutput } from '../../shared/models/pie-chart-output.model';


type EntityResponseType = HttpResponse<IUtilisateur>;
type EntityArrayResponseType = HttpResponse<IUtilisateur[]>;
@Injectable({providedIn: 'root'})
export class UtilisateurService {

    public resourceUrl = SERVER_API_URL + 'api/utilisateurs';
    
    constructor(private http: HttpClient) { }

    create(client: IUtilisateur): Observable<EntityResponseType> {
        return this.http.post<IUtilisateur>(this.resourceUrl, client, { observe: 'response', withCredentials:true });
      }
    
      update(client: IUtilisateur): Observable<EntityResponseType> {
        return this.http.put<IUtilisateur>(this.resourceUrl, client, { observe: 'response', withCredentials:true });
      }
    
      find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUtilisateur>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
      }
    
      query(req?: any): Observable<EntityArrayResponseType> {

        const options = createRequestOption(req);

        return this.http.get<IUtilisateur[]>(this.resourceUrl, { params: options, withCredentials:true, observe: 'response' });
      }
    
      delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials:true });
      }
    
      save(utilisateur: IUtilisateur): Observable<HttpResponse<IUtilisateur>> {
        return this.http.post<IUtilisateur>(SERVER_API_URL + 'api/register', utilisateur, { observe: 'response' });
      }

      getUtilisateurforEdit(id:number){
        return this.http.get<IUtilisateur>(`${this.resourceUrl}/${id}`, { observe: 'response', withCredentials: true, });
      }

      getAsList(): Observable<EntityArrayResponseType> {
        return this.http.get<IUtilisateur[]>(this.resourceUrl+'/all', {withCredentials:true, observe: 'response' });
    }
    
    getStats(): Observable<HttpResponse<IStats>> {
      return this.http.get<IStats>(`${this.resourceUrl}/utilisateur/stats`, { observe: 'response', withCredentials: true });
    }

    getLineChartData(): Observable<HttpResponse<ILineChartOutput>> {
      return this.http.get<ILineChartOutput>(`${this.resourceUrl}/dashboard/line-chart`, { observe: 'response', withCredentials: true });
    }

    getPieChartData(): Observable<HttpResponse<IPieChartOutput>> {
      return this.http.get<IPieChartOutput>(`${this.resourceUrl}/dashboard/pie-charts`, { observe: 'response', withCredentials: true });
    }
}
