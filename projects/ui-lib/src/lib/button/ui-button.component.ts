import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      [class]="classes()"
      [disabled]="disabled() || loading()"
      (click)="onClick()"
      [attr.aria-busy]="loading()"
    >
      @if (loading()) {
        <svg
          class="animate-spin h-4 w-4 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25" />
          <path d="M12 2a10 10 0 0110 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
      }
      <ng-content />
      @if (label()) { <span>{{ label() }}</span> }
    </button>
  `,
})
export class UiButtonComponent {
  /** Texto visible del botón. */
  readonly label = input<string>('');
  /** Estilo visual. */
  readonly variant = input<ButtonVariant>('primary');
  /** Tamaño. */
  readonly size = input<ButtonSize>('md');
  /** Bloquea interacción. */
  readonly disabled = input<boolean>(false);
  /** Muestra spinner y bloquea click. */
  readonly loading = input<boolean>(false);

  /** Emite solo si no está disabled ni loading. */
  readonly clicked = output<void>();

  readonly classes = computed(() => {
    const base =
      'inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-portal-green text-slate-900 hover:bg-green-400 focus:ring-portal-green',
      secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    return `${base} ${variants[this.variant()]} ${sizes[this.size()]}`;
  });

  onClick(): void {
    if (this.disabled() || this.loading()) return;
    this.clicked.emit();
  }
}