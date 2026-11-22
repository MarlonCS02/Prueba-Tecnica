import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="block mb-2 text-sm font-semibold text-slate-700">{{ label() }}</label>

    @if (loading()) {
      <div class="h-10 bg-slate-200 rounded-lg animate-pulse"></div>
    } @else {
      <select
        class="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-portal-green disabled:bg-slate-100 disabled:cursor-not-allowed"
        [disabled]="disabled()"
        [value]="value() ?? ''"
        (change)="onChange($event)"
      >
        <option value="" disabled>{{ placeholder() }}</option>
        @for (opt of options(); track opt.value) {
          <option [value]="opt.value">{{ opt.label }}</option>
        }
      </select>
    }
  `,
})
export class UiSelectComponent {
  /** Opciones disponibles. */
  readonly options = input<SelectOption[]>([]);
  /** Etiqueta visible. */
  readonly label = input<string>('');
  /** Placeholder sin selección. */
  readonly placeholder = input<string>('Selecciona...');
  /** Estado de carga. */
  readonly loading = input<boolean>(false);
  /** Bloquea interacción. */
  readonly disabled = input<boolean>(false);

  /** Valor seleccionado con two-way binding. */
  readonly value = model<string | null>(null);

  /** Emite el objeto completo al cambiar. */
  readonly selectionChange = output<SelectOption>();

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newValue = target.value || null;
    this.value.set(newValue);
    const selected = this.options().find((o) => o.value === newValue);
    if (selected) this.selectionChange.emit(selected);
  }
}