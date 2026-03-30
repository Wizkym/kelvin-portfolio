import { Injectable, signal } from '@angular/core';

export type ModalId = 'about' | 'resume' | 'portfolio' | 'contact' | null;
export type OverlayState = 'idle' | 'animate-up' | 'animate-down';

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly activeModal = signal<ModalId>(null);
  readonly overlayState = signal<OverlayState>('idle');

  open(id: ModalId): void {
    this.overlayState.set('animate-up');
    setTimeout(() => this.activeModal.set(id), 350);
  }

  close(): void {
    this.overlayState.set('animate-down');
    setTimeout(() => this.activeModal.set(null), 350);
    setTimeout(() => this.overlayState.set('idle'), 1000);
  }
}
