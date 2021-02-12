import { AfterViewInit, Component, Input } from '@angular/core';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-code-highlight',
  template: ` <pre class="language-{{ language }}"><code><ng-content></ng-content></code></pre>`,
  styleUrls: ['./code-highlight.component.css'],
})
export class CodeHighlightComponent implements AfterViewInit {
  @Input() language?: string;

  ngAfterViewInit(): void {
    Prism.highlightAll();
  }
}
