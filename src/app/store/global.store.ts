import { computed, inject, InjectionToken } from "@angular/core";
import { BoardGameCollection } from "@app/models"
import { BggDataService } from "@app/services";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { exhaustMap, lastValueFrom, tap } from "rxjs";

type StoreState = {
    collection: BoardGameCollection[],
}

const initialState: StoreState = {
    collection: [],
}

const STORE_STATE = new InjectionToken<StoreState>('StoreState', {
    factory: () => initialState
});

 export const globalStore = signalStore(
    {providedIn: 'root' },
    withState(() => inject(STORE_STATE)),
    withMethods((store, bggDataService = inject(BggDataService)) => ({
        getCollection() { 
            return store.collection()
        },
        updateCollection(collection: BoardGameCollection[]) {
            patchState(store, {collection});
        },
        async loadCollectionByUser(user: string): Promise<void> {
          const collection = await lastValueFrom(bggDataService.getBoardgameCollection(user));
          this.updateCollection(collection);
        }
      /*   loadCollectionByuser:  rxMethod<string>(
      
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          exhaustMap((user) => bggDataService.getBoardgameCollection(user).pipe(
            tap((collection) => {
              patchState(store, collection, { isLoading: false})
 
            }),
            catchError((error) => {
              console.error('Error loading hotness:', error);
              patchState(store, { isLoading: false })
              return [];
            })
          )), */
 
    })),
    withComputed(({collection}) =>({
      collectionCount: computed(() => collection().length),
      ownedCount: computed(() => collection().filter(game => game.owned).length),
      getOwned: computed(() => collection().filter(game => game.owned))
    })),
   
);
