// index.test.js

import { openDB } from 'idb';
import {
  addToFavorites,
  removeFromFavorites,
  showFavoriteList,
  showRestaurantList,
  showRestaurantDetail,
} from '../src/scripts/index';
import FavoriteRestaurantIdb from '../src/scripts/data/idb';

const mockRestaurant = {
  id: 'rqdv5juczeskfw1e867',
  name: 'Melting Pot',
  description: 'Lorem ipsum dolor sit amet',
  pictureId: '14',
  city: 'Medan',
  rating: 4.2,
};

describe('Favorite restaurant functionality', () => {
  let db;

  beforeEach(async () => {
    document.body.innerHTML = `
      <div id="favorite-restaurants"></div>
      <div class="restaurant-list" style="display: none;">
        <div id="restaurant-list"></div>
      </div>
      <div id="favorite-list"></div>
    `;

    db = await openDB('restaurant-database', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('restaurants')) {
          db.createObjectStore('restaurants', { keyPath: 'id' });
        }
      },
    });
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await db.close();
    await indexedDB.deleteDatabase('restaurant-database');
  });

  test('should add a restaurant to favorites', async () => {
    FavoriteRestaurantIdb.putRestaurant = jest.fn().mockResolvedValue(mockRestaurant);
    await addToFavorites(mockRestaurant);
    expect(FavoriteRestaurantIdb.putRestaurant).toHaveBeenCalledWith(mockRestaurant);
  });

  test('should not add a restaurant to favorites if it is already in favorites', async () => {
    FavoriteRestaurantIdb.getRestaurant = jest.fn().mockResolvedValue(mockRestaurant);
    FavoriteRestaurantIdb.putRestaurant = jest.fn();
    await addToFavorites(mockRestaurant);
    expect(FavoriteRestaurantIdb.putRestaurant).not.toHaveBeenCalled();
  });

  test('should not add a restaurant to favorites if it has no id', async () => {
    const restaurantWithoutId = { ...mockRestaurant, id: undefined };
    FavoriteRestaurantIdb.putRestaurant = jest.fn();
    await addToFavorites(restaurantWithoutId);
    expect(FavoriteRestaurantIdb.putRestaurant).not.toHaveBeenCalled();
  });

  test('should remove a restaurant from favorites', async () => {
    await addToFavorites(mockRestaurant);
    FavoriteRestaurantIdb.deleteRestaurant = jest.fn().mockResolvedValue(mockRestaurant.id);
    await removeFromFavorites(mockRestaurant.id);
    expect(FavoriteRestaurantIdb.deleteRestaurant).toHaveBeenCalledWith(mockRestaurant.id);
  });

  test('should not fail if trying to remove a restaurant that is not in favorites', async () => {
    FavoriteRestaurantIdb.deleteRestaurant = jest.fn().mockResolvedValue(undefined);
    await removeFromFavorites(mockRestaurant.id);
    expect(FavoriteRestaurantIdb.deleteRestaurant).toHaveBeenCalledWith(mockRestaurant.id);
  });
});