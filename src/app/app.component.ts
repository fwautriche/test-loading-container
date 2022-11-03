import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  delay,
  filter,
  finalize,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

export interface MyData {
  id: number;
  label: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private routeIdSimulation: number = 1;
  private activatedRouteSubject = new BehaviorSubject<number>(
    this.routeIdSimulation
  );

  data$: Observable<MyData>;
  isDataLoading: boolean;
  isDataLoadingError: boolean;
  isDataLoaded: boolean;
  isData$: Observable<boolean>;

  private destroySubject = new Subject<void>();
  private destroyed$ = this.destroySubject.asObservable();

  ngOnInit() {
    // This is the simulation a angular route change (cf. this.activatedRoute.params.pipe(...))
    const routeId$ = this.activatedRouteSubject
      .asObservable()
      .pipe(filter((id) => id != null));

    this.data$ = routeId$.pipe(
      tap(() => {
        this.isDataLoading = true;
        this.isDataLoadingError = false;
        this.isDataLoaded = false;
      }),
      switchMap((id) =>
        this.getAsyncData(id).pipe(
          finalize(() => {
            this.isDataLoading = false;
            this.isDataLoaded = true;
          }),
          catchError((error) => {
            this.isDataLoadingError = true;
            return of(null);
          }),
          takeUntil(this.destroyed$)
        )
      ),
      shareReplay()
    );
    this.isData$ = this.data$.pipe(map((data) => data != null));
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }

  simulateRouteChange() {
    this.routeIdSimulation++;
    this.activatedRouteSubject.next(this.routeIdSimulation);
  }

  // Simulate a remote query
  private getAsyncData(id: number): Observable<MyData> {
    return of({
      id,
      label: `test ${id}`,
    }).pipe(
      delay(2000) // Simulate delay from backend
    );
  }
}
