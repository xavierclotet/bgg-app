import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainContainerComponent } from './main-container.component';
import { globalStore } from '@app/store';
import { BoardGameCollection } from '@app/models';
import { signal } from '@angular/core';

describe('MainContainerComponent', () => {
  let component: MainContainerComponent;
  let fixture: ComponentFixture<MainContainerComponent>;
  let mockStore: jest.Mocked<any>;

  beforeEach(async () => {
    
    const store = {
      collection: signal([]),
      getOwned: signal([]),
      ownedCount: signal(0),
      collectionCount: signal(0),
      loadCollectionByUser:  jest.fn()
    };
    mockStore = store;

    await TestBed.configureTestingModule({
      imports: [MainContainerComponent],
      providers: [
        { provide: globalStore, useValue: mockStore },

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default user and load collection', () => {
       
    expect(component.user()).toBe('darklife74');
    expect(mockStore.loadCollectionByUser).toHaveBeenCalledWith('darklife74');
  });

   it('should navigate to BGG when navigateToBgg is called', () => {
    const gameId = 123;
    window.open = jest.fn();
    
    component.navigateToBgg(gameId);
    
    expect(window.open).toHaveBeenCalledWith(
      `https://boardgamegeek.com/boardgame/${gameId}`,
      '_blank'
    );
  });

 
});
