import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataSource, DataSourceElement } from "./models/types";

@Component({
  selector: 'gb-grid',
  template: `
    <div id="container" class="p-3">
      <ng-container *ngIf="dataSource.length; else noElements">
        <gb-grid-header [title]="title" [formControl]="searchInput" *ngIf="enableSearch"/>

        <gb-grid-body
          [showIndex]="showIndex"
          [enableSort]="enableSort"
          [keys]="keys"
          [dataSource]="dataSource"
          [searchTerm]="searchInput.value"
          (clickRow)="clickRow.emit($event)"
        >
          <ng-container *ngIf="template">
            <ng-template #itemTemplate let-item let-el>
              <ng-container
                [ngTemplateOutlet]="template"
                [ngTemplateOutletContext]="{ $implicit: el }"
              />
            </ng-template>
          </ng-container>
        </gb-grid-body>
      </ng-container>

      <ng-template #noElements>
        <h4 class="text-center mb-0">Non ci sono elementi</h4>
      </ng-template>
    </div>
  `,
  styles: [`
    #container {
      border-radius: 0.5rem;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
  @ContentChild('itemTemplate') public template!: TemplateRef<any>;
  @Input() title = '';
  @Input() dataSource: DataSource = [];
  @Input() showIndex = false;
  @Input() enableSearch = false;
  @Input() enableSort = false;

  @Output() clickRow = new EventEmitter< { el: DataSourceElement, index: number }>();

  public keys: string[] = [];
  public searchInput = new FormControl('', { nonNullable: true });

  public ngOnInit(): void {
   this.keys = this.initKeys(this.dataSource);
  }

  private initKeys(source: DataSource): string[] {
    const element = source.find(el => el);
    if (element) return Object.keys(element).filter(key => typeof element[key] !== 'object');
    return [];
  }
}
