import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SelectOption,
  TableColumn,
  TableAction,
  UiButtonComponent,
  UiCardComponent,
  UiSelectComponent,
  UiTableComponent,
} from 'ui-lib';
import { ResourceService, ResourceType, StatusFilter } from './services/resource.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    UiButtonComponent,
    UiCardComponent,
    UiSelectComponent,
    UiTableComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html', // 👈 Apunta al app.html que acabas de crear
})
export class App implements OnInit {
  readonly svc = inject(ResourceService);

  readonly resourceOptions: SelectOption[] = [
    { label: 'Characters', value: 'characters' },
    { label: 'Episodes', value: 'episodes' },
    { label: 'Locations', value: 'locations' },
  ];

  readonly statusOptions: SelectOption[] = [
    { label: 'Alive', value: 'alive' },
    { label: 'Dead', value: 'dead' },
    { label: 'Unknown', value: 'unknown' },
  ];

  readonly columns = signal<TableColumn[]>([]);
  readonly selectedRecord = signal<unknown | null>(null);
  readonly showModal = signal<boolean>(false);

  ngOnInit(): void {
    this.updateColumns();
    void this.svc.load();
  }

  onResourceChange(option: SelectOption): void {
    this.svc.setResource(option.value as ResourceType);
    this.updateColumns();
  }

  onStatusChange(option: SelectOption): void {
    this.svc.setStatusFilter(option.value as StatusFilter);
  }

  onAction(action: TableAction<unknown>): void {
    if (action.action === 'view') {
      this.selectedRecord.set(action.row);
      this.showModal.set(true);
    } else if (action.action === 'delete') {
      const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este registro?');
      if (confirmDelete) {
        console.log('Registro a eliminar:', action.row);
      }
    }
  }

  private updateColumns(): void {
    const map: Record<ResourceType, TableColumn[]> = {
      characters: [
        { key: 'name', header: 'Nombre' },
        { key: 'status', header: 'Status' },
        { key: 'species', header: 'Especie' },
      ],
      episodes: [
        { key: 'name', header: 'Episodio' },
        { key: 'episode', header: 'Código' },
        { key: 'air_date', header: 'Fecha de Emisión' },
      ],
      locations: [
        { key: 'name', header: 'Nombre' },
        { key: 'type', header: 'Tipo' },
        { key: 'dimension', header: 'Dimensión' },
      ],
    };
    this.columns.set(map[this.svc.resource()]);
  }
}