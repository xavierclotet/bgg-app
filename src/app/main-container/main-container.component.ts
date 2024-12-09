import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { globalStore } from '@app/store';

@Component({
  selector: 'app-main-container',
  imports: [CommonModule],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  readonly store = inject(globalStore);
  user = signal('darklife74');
   
  constructor() {
    effect(() => {
      this.store.loadCollectionByUser(this.user())
    }) 
  }

  navigateToBgg(gameId: number) {
    const url = `https://boardgamegeek.com/boardgame/${gameId}`;
    window.open(url, '_blank');
  }

  
}
