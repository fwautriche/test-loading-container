import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading-container',
  templateUrl: './loading-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingContainerComponent {
  @Input()
  loading: boolean;
  @Input()
  error: boolean;
  @Input()
  errorMessage: string;
  @Input()
  loaded: boolean;
  @Input()
  isEmpty: boolean;
  @Input()
  emptyMessage: string;
}
