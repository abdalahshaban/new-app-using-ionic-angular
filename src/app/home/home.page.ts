import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/interface/news';
import { NewsFeedService } from '../services/news-feed.service';
import * as countryList from 'country-list';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
enum Category {
  Business = "business",
  Entertainment = "entertainment",
  General = "general",
  Health = "health",
  Sports = "sports",
  Technology = "technology"
}
enum Country {
  USA = "us",
  ARABIC = "ar",
  EGYPT = "eg"
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  articles: Article[] = []
  pageNo = 0;
  articlesCount: number = 0;
  pageCount: number = 0;
  showLoadingCard: boolean = false;

  countrySelect: string
  categorySelect: string
  public get categoryData(): typeof Category {
    return Category;
  }

  public get countryData(): typeof Country {
    return Country;
  }

  countriesCode = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']

  getName = (value) => countryList.getName(value);



  customAlertOptions: any = {
    header: 'Countries',
    translucent: true
  };


  constructor(private newsSevices: NewsFeedService, private iab: InAppBrowser) { }

  ngOnInit() {
    this.countrySelect = 'us'
    this.categorySelect = this.categoryData.General
    this.onSearch();
  }

  onSearch(event?: any) {
    if (!event) {
      this.showLoadingCard = true;
      this.pageNo = this.pageCount = 0;
    }
    this.newsSevices.getNews(this.countrySelect, this.categorySelect, this.pageNo).subscribe(data => {
      this.articles = this.articles.concat(data.articles);
      if (event) {
        event.target.complete()
      } else {
        this.articles = data.articles;
        this.articlesCount = data.totalResults;
        this.pageCount = Math.ceil(this.articlesCount / 10) - 1;
        this.showLoadingCard = false;
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  loadData(event: any) {
    this.pageNo++;
    if (this.articlesCount === 0) {
      return event.target.disabled = true;
    }
    this.onSearch(event);
    if (this.pageNo === this.pageCount) {
      event.target.disabled = true;
    }
  }

  getByCountry(event: any) {
    this.countrySelect = event.detail.value
    this.onSearch();
  }

  getByCategory(event: any) {
    this.categorySelect = event.detail.value
    this.onSearch();
  }

  openBlank(url) {
    this.iab.create(url, `_blank`, {
      fullscreen: "yes"
    });
  }


}
