import { ChangeDetectionStrategy, Component, effect, inject, input, ResourceStatus } from '@angular/core';
import { BggDataService, BoardGameCollection } from '@app/services';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-collection',
  imports: [CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent {
  user = input.required<string>();
  status = ResourceStatus;
  #collection = inject(BggDataService);
  collectionResource = rxResource({
    request: () => this.user(),
    loader: ({request: user }) => this.#collection.getBoardgameCollection(user).pipe(
      map(collection => collection.filter(game => game.owned))
    ),
  }) 

  navigateToBgg(gameId: number) {
    const url = `https://boardgamegeek.com/boardgame/${gameId}`;
    window.open(url, '_blank');
  }

}
