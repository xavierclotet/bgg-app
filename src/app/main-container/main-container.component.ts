import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule } from '@angular/forms';
import { globalStore } from '@app/store';

@Component({
  selector: 'app-main-container',
  imports: [CommonModule, FormsModule],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  protected store = inject(globalStore);
  readonly #fb = inject(FormBuilder);
  user = signal('darklife74');
  protected searchTerm = signal(this.#fb.control(''));
  
  constructor() {
    this.store.rxLoad(this.user);
  }

  search(term: string) {
    console.log('search ', term);
   this.store.filterByTerm(term ?? '');
  }

  navigateToBgg(gameId: number) {
    const url = `https://boardgamegeek.com/boardgame/${gameId}`;
    window.open(url, '_blank');
  }

  
}
