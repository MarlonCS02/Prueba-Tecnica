import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  header: string;
}

export type TableActionType = 'view' | 'delete';
export interface TableAction<T = unknown> {
  action: TableActionType;
  row: T;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (errorMessage()) {
      <div class="p-6 text-center text-red-600 bg-red-50 rounded-lg">
        ⚠️ {{ errorMessage() }}
      </div>
    } @else {
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="w-full text-sm">
          <thead class="bg-slate-100">
            <tr>
              @for (col of columns(); track col.key) {
                <th class="px-3 py-2 text-left font-rick text-slate-700">{{ col.header }}</th>
              }
              <th class="px-3 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @if (loading()) {
              @for (i of skeletonRows; track i) {
                <tr class="border-t">
                  @for (col of columns(); track col.key) {
                    <td class="px-3 py-2">
                      <div class="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                    </td>
                  }
                  <td class="px-3 py-2"><div class="h-4 bg-slate-200 rounded animate-pulse w-16"></div></td>
                </tr>
              }
            } @else if (rows().length === 0) {
              <tr>
                <td [attr.colspan]="columns().length + 1" class="px-3 py-10 text-center text-slate-500">
                  🛸 {{ emptyMessage() }}
                </td>
              </tr>
            } @else {
              @for (row of rows(); track row) {
                <tr class="border-t hover:bg-slate-50">
                  @for (col of columns(); track col.key) {
                    <td class="px-3 py-2">{{ getCell(row, col.key) }}</td>
                  }
                  <td class="px-3 py-2 flex gap-2">
                    <button class="text-blue-600 hover:underline text-xs" (click)="emit('view', row)">Ver</button>
                    <button class="text-red-600 hover:underline text-xs" (click)="emit('delete', row)">Eliminar</button>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    }
  `,
})
export class UiTableComponent<T> {
  /** Columnas. */
  readonly columns = input<TableColumn[]>([]);
  /** Datos. */
  readonly rows = input<T[]>([]);
  /** Estado de carga. */
  readonly loading = input<boolean>(false);
  /** Mensaje vacío. */
  readonly emptyMessage = input<string>('Sin resultados');
  /** Error de red. */
  readonly errorMessage = input<string | null>(null);

  /** Emite acción sobre fila. */
  readonly actionTriggered = output<TableAction<T>>();

  readonly skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  getCell(row: T, key: string): string {
    const value = (row as Record<string, unknown>)[key];
    return value === undefined || value === null ? '—' : String(value);
  }

  emit(action: TableActionType, row: T): void {
    this.actionTriggered.emit({ action, row });
  }
}