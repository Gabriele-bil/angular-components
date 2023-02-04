import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'gb-grid-header',
  template: `
    <div class="d-flex justify-content-between mb-3">
      <h3 class="mb-0">{{ title }}</h3>
      <input type="search" class="form-control w-25"  placeholder="Cerca" [formControl]="searchInput">
    </div>
  `,
  styles: [
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: GridHeaderComponent, multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridHeaderComponent implements OnDestroy, ControlValueAccessor {
  @Input() title = '';
  public searchInput = new FormControl('');

  private destroy$ = new Subject<void>();
  private valueChanges$ = this.searchInput.valueChanges.pipe(takeUntil(this.destroy$))

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public writeValue(search: string): void {
    this.searchInput.patchValue(search)
  }

  public registerOnChange(fn: any): void {
    this.valueChanges$.subscribe(x => fn(x));
  }

  public registerOnTouched(fn: any): void {
    this.valueChanges$.subscribe(_ => fn());
  }
}
