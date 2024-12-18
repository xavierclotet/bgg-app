import { computed, inject, InjectionToken } from "@angular/core";
import { BoardGameCollection } from "@app/models"
import { BggDataService } from "@app/services";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { delay, exhaustMap, lastValueFrom, pipe, switchMap, tap } from "rxjs";

type StoreState = {
    collection: BoardGameCollection[],
    filteredCollection: BoardGameCollection[],
    isLoading: boolean
}

const initialState: StoreState = {
    collection: [],
    filteredCollection: [],
    isLoading: false
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
        },
        rxLoad: rxMethod<string>(pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((user) => bggDataService.getBoardgameCollection(user)),
          tap((collection) => {
            patchState(store, {collection, filteredCollection: collection}, { isLoading: false})
          }),
        )),
        filterByTerm(term:string) {
            const filteredCollection = store.collection().filter(game => game.owned).filter(game => game.name.toLowerCase().includes(term.toLowerCase()));
            patchState(store, {filteredCollection});
        }
    })),
    withComputed(({collection, filteredCollection}) =>({
      collectionCount: computed(() => collection().length),
      ownedCount: computed(() => filteredCollection().filter(game => game.owned).length),
      getOwned: computed(() => filteredCollection().filter(game => game.owned))
    })),
   
);
