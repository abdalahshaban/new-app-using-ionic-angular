import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsData } from 'src/interface/news';

const API_URL = "http://newsapi.org/v2/";
const API_KEY = "bffd1623c2d4415d891c23610ea16ebc";

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  constructor(private http: HttpClient) { }


  getNews(country: string, category: string, page: number = 0): Observable<NewsData> {
    return this.http.get<NewsData>(`${API_URL}/top-headlines?country=${country}&category=${category}&pageSize=10&page=${page}&apikey=${API_KEY}`)
  }
}
