import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { DataSource, DataSourceElement, SortDirection } from "../models/types";

@Component({
  selector: 'gb-grid-body',
  template: `
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
          *ngFor="let el of dataSource | search: keys : searchTerm | sort: { key: keyInput.value, order: orderInput.value }; let i = index; trackBy: trackBy"
          class="row w-100 mx-0 pb-1 pt-4 justify-content-between element"
          (click)="clickRow.emit({ el, index: i })"
        >
          <p class="col-1 text-center mb-0" *ngIf="showIndex">{{ i + 1 }}</p>
          <p class="col-3 col-md text-center mb-0" *ngFor="let key of keys">{{ el[key] }}</p>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-2">
        <h6>N° Elementi {{ (dataSource | search: keys : searchTerm).length }}</h6>
      </div>
    </div>
  `,
  styles: [`
    .grid-container {
      .header {
        border-bottom: 1px solid #a4a4a4;
        background-color: #efefef;

        .cursor-pointer {
          cursor: pointer;
        }

        .pointer-event-none {
          pointer-events: none;
        }
      }

      .body {
        height: 70vh;
        overflow: auto;

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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridBodyComponent {
  @Input() showIndex = false;
  @Input() enableSort = false;
  @Input() keys: string[] = [];
  @Input() dataSource: DataSource = []
  @Input() searchTerm = '';
  @Output() clickRow = new EventEmitter< { el: DataSourceElement, index: number }>();

  public sortingInput = new FormGroup({
    order: new FormControl<SortDirection>('asc', { nonNullable: true }),
    key: new FormControl('', { nonNullable: true })
  });

  public changeSorting(key: string): void {
    this.keyInput.patchValue(key);
    this.orderInput.value === 'asc'
      ? this.orderInput.patchValue('desc')
      : this.orderInput.patchValue('asc');
  }

  public get orderInput(): FormControl<SortDirection> {
    return this.sortingInput.get('order') as FormControl;
  }

  public get keyInput(): FormControl<string> {
    return this.sortingInput.get('key') as FormControl;
  }

  public trackBy(index: number, item: any): number | null {
    if (!item.id) return index;
    return item.id;
  }
}
