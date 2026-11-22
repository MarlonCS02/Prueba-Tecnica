import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type CardElevation = 'flat' | 'raised' | 'outlined';

@Component({
  selector: 'ui-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses()">
      <header
        class="px-4 py-3 border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition"
        (click)="headerClicked.emit()"
        role="button"
        tabindex="0"
        (keydown.enter)="headerClicked.emit()"
      >
        <h3 class="text-lg font-rick tracking-wide text-slate-900">{{ title() }}</h3>
        @if (subtitle()) {
          <p class="text-sm text-slate-500">{{ subtitle() }}</p>
        }
      </header>
      <div class="p-4">
        <ng-content />
      </div>
    </div>
  `,
})
export class UiCardComponent {
  /** Título del header. */
  readonly title = input.required<string>();
  /** Subtítulo opcional. */
  readonly subtitle = input<string | null>(null);
  /** Estilo del contenedor. */
  readonly elevation = input<CardElevation>('raised');

  /** Emite al hacer click en header. */
  readonly headerClicked = output<void>();

  readonly containerClasses = () => {
    const base = 'bg-white rounded-xl overflow-hidden';
    const map: Record<CardElevation, string> = {
      flat: 'border border-slate-200',
      raised: 'shadow-lg',
      outlined: 'border-2 border-portal-green',
    };
    return `${base} ${map[this.elevation()]}`;
  };
}