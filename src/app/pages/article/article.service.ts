import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { SERVER_API_URL } from "../../utils/app.constants";
import { Observable } from "rxjs";
import { createRequestOption } from "../../shared/utils/request-util";
import { IArticle } from "../../shared/models/article.model";

type EntityResponseType = HttpResponse<IArticle>;
type EntityArrayResponseType = HttpResponse<IArticle[]>;
@Injectable({ providedIn: "root" })
export class ArticlesService {
  public resourceUrl = SERVER_API_URL + "api/articles";

  constructor(private http: HttpClient) {}

  create(articles: IArticle): Observable<EntityResponseType> {
    return this.http.post<IArticle>(this.resourceUrl, articles, {
      observe: "response",
      withCredentials: true,
    });
  }

  update(articles: IArticle): Observable<EntityResponseType> {
    return this.http.put<IArticle>(this.resourceUrl, articles, {
      observe: "response",
      withCredentials: true,
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArticle>(`${this.resourceUrl}/${id}`, {
      observe: "response",
      withCredentials: true,
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);

    return this.http.get<IArticle[]>(this.resourceUrl, {
      params: options,
      withCredentials: true,
      observe: "response",
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
      observe: "response",
      withCredentials: true,
    });
  }
  getAsList(): Observable<EntityArrayResponseType> {
    return this.http.get<IArticle[]>(this.resourceUrl + "/all", {
      withCredentials: true,
      observe: "response",
    });
  }
}
