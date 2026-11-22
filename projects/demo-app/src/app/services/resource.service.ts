import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

export type ResourceType = 'characters' | 'episodes' | 'locations';
export type StatusFilter = 'alive' | 'dead' | 'unknown' | null;

export interface Character { id: number; name: string; status: string; species: string; gender: string; image: string; }
export interface Episode { id: number; name: string; episode: string; air_date: string; }
export interface Location { id: number; name: string; type: string; dimension: string; }

interface ApiResponse<T> { results: T[]; }

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private http = inject(HttpClient);
  private base = 'https://rickandmortyapi.com/api';

  readonly resource = signal<ResourceType>('characters');
  readonly statusFilter = signal<StatusFilter>(null);
  readonly rows = signal<unknown[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly endpoint = computed(() => {
    const map: Record<ResourceType, string> = {
      characters: 'character',
      episodes: 'episode',
      locations: 'location',
    };
    return `${this.base}/${map[this.resource()]}`;
  });

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const params: Record<string, string> = {};
      if (this.resource() === 'characters' && this.statusFilter()) {
        params['status'] = this.statusFilter()!;
      }
      const res = await firstValueFrom(
        this.http.get<ApiResponse<unknown>>(this.endpoint(), { params })
      );
      this.rows.set(res.results);
    } catch (e) {
      const err = e as HttpErrorResponse;
      this.error.set(err.status === 404 ? 'No hay resultados para este filtro.' : 'Error de red. Intenta de nuevo.');
      this.rows.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  setResource(r: ResourceType): void {
    this.resource.set(r);
    this.statusFilter.set(null); // ⬅️ RESET obligatorio
    void this.load();
  }

  setStatusFilter(s: StatusFilter): void {
    this.statusFilter.set(s);
    void this.load();
  }
}