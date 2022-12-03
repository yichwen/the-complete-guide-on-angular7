import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Article } from './article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  // the CSS class we want to apply to the "host" of this component
  // In Angular, a component host is the element this component is attached to
  // We can set properties on the host element by using the @HostBinding() decorator
  // we want to set the class attribute to have "row"
  // Using the @HostBinding() is nice because it means we can encapsulate the app-article markup within our component
  // That is, we don’t have to both use an app-article tag and require a class="row" in the markup of the parent view
  @HostBinding('attr.class') cssClass = 'row';
  @Input() article: Article;

  constructor() {
  }

  ngOnInit() {
  }

  // JavaScript, by default, propagates the click event to all the parent components
  // Because the click event is propagated to parents, our browser is trying to follow the empty link, 
  // which tells the browser to reload
  // To fix that, we need to make the click event handler to return false
  // This will ensure the browser won't try to refresh the page
  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }

  voteDown(): boolean {
    this.article.voteDown();
    return false;
  }

}
