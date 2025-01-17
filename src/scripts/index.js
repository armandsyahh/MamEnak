/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable arrow-parens */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import RestaurantApi from './data/RestaurantApi';
import FavoriteRestaurantIdb from './data/idb';
import swRegister from './utils/sw-register';
import { parseUrl, routes } from './routes/routes';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

console.log('Hello Coders! :)');

// Fungsi untuk mendapatkan URL gambar berdasarkan resolusi
function getImageUrl(pictureId, resolution) {
    return `https://restaurant-api.dicoding.dev/images/${resolution}/${pictureId}`;
}

// Router function
function router() {
    const { resource, id } = parseUrl();
    const url = (resource ? `/${resource}` : '/') + (id ? '/:id' : '');
    console.log('Navigating to:', url); // Debugging
    const route = routes[url] || routes['/'];
    route(id);
}

document.addEventListener('DOMContentLoaded', () => {
    router();
    swRegister();

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const drawer = document.querySelector('.drawer');

    hamburgerMenu.addEventListener('click', () => {
        const isExpanded = drawer.classList.toggle('open');
        hamburgerMenu.setAttribute('aria-expanded', isExpanded);
    });

    // Handle keyboard accessibility for the hamburger menu
    hamburgerMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const isExpanded = drawer.classList.toggle('open');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
            event.preventDefault();
        }
    });

    // Event listener for hash change
    window.addEventListener('hashchange', () => {
        const parsedUrl = parseUrl();
        router();
    });

    // Event listener for initial page load
    window.addEventListener('load', () => {
        router();
    });

    // Load the initial restaurant list
    showRestaurantList();
});

// Fungsi untuk menampilkan daftar restoran
export async function showRestaurantList() {
    try {
        const restaurants = await RestaurantApi.listRestaurants();
        const restaurantList = document.getElementById('restaurant-list');
        restaurantList.innerHTML = ''; // Clear previous content

        restaurants.forEach(restaurant => {
            const restaurantCard = document.createElement('div');
            restaurantCard.classList.add('restaurant-card');
            restaurantCard.innerHTML = `
                <picture>
                    <source data-srcset="${getImageUrl(restaurant.pictureId, 'small')}" media="(max-width: 600px)">
                    <source data-srcset="${getImageUrl(restaurant.pictureId, 'medium')}" media="(max-width: 1200px)">
                    <img class="lazyload" data-src="${getImageUrl(restaurant.pictureId, 'large')}" alt="${restaurant.name}">
                </picture>
                <h3>${restaurant.name}</h3>
                <p>${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
                <button class="favorite-button" data-id="${restaurant.id}">Favorite</button>
                <button class="detail-button" data-id="${restaurant.id}">View Details</button>
            `;
            restaurantList.appendChild(restaurantCard);

            // Add event listener to favorite button
            const favoriteButton = restaurantCard.querySelector('.favorite-button');
            favoriteButton.addEventListener('click', async (event) => {
                event.stopPropagation();
                const restaurantData = {
                    id: restaurant.id,
                    name: restaurant.name,
                    pictureId: restaurant.pictureId,
                    city: restaurant.city,
                    rating: restaurant.rating,
                };
                await addToFavorites(restaurantData);
                alert(`${restaurant.name} has been added to favorites`);
            });

            // Add event listener to detail button
            const detailButton = restaurantCard.querySelector('.detail-button');
            detailButton.addEventListener('click', () => {
                window.location.hash = `#/detail/${restaurant.id}`;
            });
        });
    } catch (error) {
        console.error('Error fetching or adding restaurant data:', error); // Menambahkan penanganan kesalahan saat fetching atau menambahkan data restoran
    }
}

// Fungsi untuk menampilkan detail restoran
export async function showRestaurantDetail(restaurantId) {
    console.log('Fetching restaurant detail with ID:', restaurantId);
    try {
        const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${restaurantId}`);
        const data = await response.json();
        const { restaurant } = data;
        console.log('Restaurant detail:', restaurant);
        document.getElementById('favorite-list').style.display = 'none';
        document.querySelector('.restaurant-list').style.display = 'block';
        const restaurantDetail = document.getElementById('restaurant-list');
        restaurantDetail.innerHTML = `
            <div class="restaurant-detail">
                <picture>
                    <source data-srcset="${getImageUrl(restaurant.pictureId, 'small')}" media="(max-width: 600px)">
                    <source data-srcset="${getImageUrl(restaurant.pictureId, 'medium')}" media="(max-width: 1200px)">
                    <img class="lazyload" data-src="${getImageUrl(restaurant.pictureId, 'large')}" alt="${restaurant.name}">
                </picture>
                <h2>${restaurant.name}</h2>
                <p>${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
                <p>${restaurant.description}</p>
                <h2>Menu</h2>
                <h3>Makanan</h3>
                <ul>
                    ${restaurant.menus.foods.map(food => `<p>${food.name}</p>`).join('')}
                </ul>
                <h3>Minuman</h3>
                <ul>
                    ${restaurant.menus.drinks.map(drink => `<p>${drink.name}</p>`).join('')}
                </ul>
                <h2>Customer Reviews</h2>
                <div id="customer-reviews">
                    ${restaurant.customerReviews.map(review => `
                        <div class="review">
                            <p><strong>${review.name}</strong></p>
                            <p>${review.review}</p>
                            <p><em>${review.date}</em></p>
                        </div>
                    `).join('')}
                </div>
                <h2>Add Review</h2>
                <form id="add-review-form">
                    <input type="text" id="reviewer-name" name="name" style="" placeholder="Your name" required>
                    <textarea id="review-text" name="review" placeholder="Your review" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        `;
        restaurantDetail.style.display = 'block';
        const reviewForm = document.getElementById('add-review-form');
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            await addReview(restaurantId);
        });
    } catch (error) {
        console.error('Error fetching restaurant detail:', error);
    }
}

// Fungsi untuk menambahkan review
export async function addReview(restaurantId) {
    const name = document.getElementById('reviewer-name').value;
    const review = document.getElementById('review-text').value;

    const reviewData = {
        id: restaurantId,
        name,
        review,
    };

    try {
        const response = await fetch('https://restaurant-api.dicoding.dev/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        const data = await response.json();
        if (!data.error) {
            const { customerReviews } = data;
            const reviewContainer = document.getElementById('customer-reviews');
            reviewContainer.innerHTML = customerReviews.map(review => `
                <div class="review">
                    <p><strong>${review.name}</strong></p>
                    <p>${review.review}</p>
                    <p><em>${review.date}</em></p>
                </div>
            `).join('');

            document.getElementById('add-review-form').reset();
            alert('Review added successfully!');
        } else {
            alert('Failed to add review. Please try again.');
        }
    } catch (error) {
        console.error('Error adding review:', error);
        alert('Failed to add review. Please try again.');
    }
}

// Fungsi untuk menambahkan restoran ke favorit
export async function addToFavorites(restaurant) {
    if (!restaurant.id) {
        console.error('Restaurant must have an id');
        return;
    }

    const existingRestaurant = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);
    if (existingRestaurant) {
        console.log('Restaurant already in favorites');
        return;
    }

    try {
        await FavoriteRestaurantIdb.putRestaurant(restaurant);
    } catch (error) {
        console.error('Error adding to favorites:', error);
    }
}

// Fungsi untuk menghapus restoran dari favorit
export async function removeFromFavorites(restaurantId) {
    try {
        await FavoriteRestaurantIdb.deleteRestaurant(restaurantId);
    } catch (error) {
        console.error('Error removing from favorites:', error);
    }
}

// Fungsi untuk menampilkan daftar restoran favorit
export async function showFavoriteList() {
    try {
        const favorites = await FavoriteRestaurantIdb.getAllRestaurants();
        const favoriteList = document.getElementById('favorite-restaurants');
        favoriteList.innerHTML = '';
        favorites.forEach(restaurant => {
            const favoriteCard = document.createElement('div');
            favoriteCard.classList.add('restaurant-card');
            favoriteCard.innerHTML = `
                <picture>
                    <source data-srcset="${getImageUrl(restaurant.pictureId, 'small')}" media="(max-width: 600px)">
                    <source data-srcset="${getImageUrl(restaurant.pictureId, 'medium')}" media="(max-width: 1200px)">
                    <img class="lazyload" data-src="${getImageUrl(restaurant.pictureId, 'large')}" alt="${restaurant.name}">
                </picture>
                <h3>${restaurant.name}</h3>
                <p>${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
                <button class="detail-button" data-id="${restaurant.id}">View Details</button>
                <button class="unfavorite-button" data-id="${restaurant.id}">Unfavorite</button>
            `;
            favoriteList.appendChild(favoriteCard);

            // Add event listener to detail button
            const detailButton = favoriteCard.querySelector('.detail-button');
            detailButton.addEventListener('click', () => {
                window.location.hash = `#/detail/${restaurant.id}`;
            });

            // Add event listener to unfavorite button
            const unfavoriteButton = favoriteCard.querySelector('.unfavorite-button');
            unfavoriteButton.addEventListener('click', async (event) => {
                event.stopPropagation();
                await removeFromFavorites(restaurant.id);
                showFavoriteList();
                alert(`${restaurant.name} has been removed from favorites`);
            });
        });
        document.getElementById('favorite-list').style.display = 'block';
        const restaurantListSection = document.querySelector('.restaurant-list');
        restaurantListSection.style.display = 'none';
    } catch (error) {
        console.error('Error fetching favorite restaurants:', error);
    }
}
