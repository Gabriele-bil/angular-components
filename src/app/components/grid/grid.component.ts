import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export type Element = { [key: string]: any }
export type DataSource = Element[]

@Component({
  selector: 'gb-grid',
  template: `
    <div id="container" class="p-3">
      <ng-container *ngIf="dataSource.length; else noElements">
        <div class="d-flex justify-content-between mb-3" *ngIf="enableSearch">
          <h3 class="mb-0">{{ title }}</h3>
          <input type="search" class="form-control w-25" id="search" placeholder="Cerca" [formControl]="searchInput">
        </div>

        <div class="grid-container">
          <div class="header row mx-0 w-100 justify-content-between py-3">
            <h5 class="col-1 text-center mb-0" *ngIf="showIndex">No.</h5>
            <h5
              *ngFor="let key of keys"
              class="col-3 col-md text-center mb-0"
              [class]="enableSort ? 'cursor-pointer' : 'pointer-event-none'"
              (click)="changeSorting(key)"
            >
              {{ key | titlecase }}
              <ng-container *ngIf="keyInput.value === key">
                <i class="bi" [class]="orderInput.value === 'asc' ? 'bi-arrow-up-short' : 'bi-arrow-down-short'"></i>
              </ng-container>
            </h5>
          </div>

          <div class="body">
            <div
              *ngFor="let el of dataSource | search: keys : searchInput.value | sort: { key: keyInput.value, order: orderInput.value }; let i = index; trackBy: trackBy"
              class="row w-100 mx-0 pb-1 pt-4 justify-content-between element"
              (click)="clickRow.emit({ el, index: i })"
            >
              <p class="col-1 text-center mb-0" *ngIf="showIndex">{{ i + 1 }}</p>
              <p class="col-3 col-md text-center mb-0" *ngFor="let key of keys">{{ el[key] }}</p>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end mt-2">
          <h6>N° Elementi {{ (dataSource | search: keys : searchInput.value).length }}</h6>
        </div>
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

      .grid-container {
        .header {
          border-bottom: 1px solid #a4a4a4;
          background-color: #efefef;
        }

        .body {
          height: 70vh;
          overflow: scroll;

          .element {
            border-bottom: 1px solid #e3e3e3;

            &:nth-child(even) {
              background-color: #fafafa;
            }

            &:nth-child(odd) {
              background-color: #fff;
            }
          }
        }
      }
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .pointer-event-none {
      pointer-events: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
  @Input() title = '';
  @Input() dataSource: DataSource = []
  @Input() showIndex = false;
  @Input() enableSearch = false;
  @Input() enableSort = false;

  @Output() clickRow = new EventEmitter< { el: Element, index: number }>();

  public keys: string[] = [];
  public searchInput = new FormControl('', { nonNullable: true });

  public sortingInput = new FormGroup({
    order: new FormControl<'asc' | 'desc'>('asc', { nonNullable: true }),
    key: new FormControl('', { nonNullable: true })
  });

  public ngOnInit(): void {
   this.keys = this.initKeys(this.dataSource);
  }

  public trackBy(index: number, item: any): number | null {
    if (!item) return null;
    return item.id;
  }

  public changeSorting(key: string): void {
    this.keyInput.patchValue(key);
    this.orderInput.value === 'asc'
      ? this.orderInput.patchValue('desc')
      : this.orderInput.patchValue('asc');
  }

  public get orderInput(): FormControl<'asc' | 'desc'> {
    return this.sortingInput.get('order') as FormControl;
  }

  public get keyInput(): FormControl {
    return this.sortingInput.get('key') as FormControl;
  }

  private initKeys(source: DataSource): string[] {
    const element = source.find(el => el);
    if (element) return Object.keys(element);
    return [];
  }
}
