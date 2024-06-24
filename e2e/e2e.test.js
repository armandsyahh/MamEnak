const assert = require('assert');

Feature('add favorite, unfavorite dan add review');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.waitForElement('.restaurant-card', 5);
    I.seeElement('.restaurant-card .favorite-button');
    I.click(locate('.restaurant-card .favorite-button').first());

    // Ambil nama restoran pertama yang disukai
    const firstRestaurantName = await I.grabTextFrom(locate('.restaurant-card h3').first());

    I.amOnPage('/#/favorite');
    I.waitForElement('.restaurant-card', 5);
    I.seeElement('.restaurant-card');

    // Ambil nama restoran dari halaman favorit
    const favoriteRestaurantName = await I.grabTextFrom('.restaurant-card h3');

    // Membandingkan nama restoran yang disukai dengan yang ada di halaman favorit
    assert.strictEqual(firstRestaurantName, favoriteRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
    I.waitForElement('.restaurant-card', 5);
    I.seeElement('.restaurant-card .favorite-button');
    I.click(locate('.restaurant-card .favorite-button').first());

    I.amOnPage('/#/favorite');
    I.waitForElement('.restaurant-card', 5);
    I.seeElement('.restaurant-card .unfavorite-button');
    I.click(locate('.restaurant-card .unfavorite-button').first());

    I.amOnPage('/#/favorite');
    I.dontSeeElement('.restaurant-card');
});

Scenario('adding a review to a restaurant', async ({ I }) => {
    I.waitForElement('.restaurant-card', 5);
    I.seeElement('.restaurant-card .detail-button');
    I.click(locate('.restaurant-card .detail-button').first());

    I.waitForElement('.restaurant-detail', 5);
    I.seeElement('#add-review-form');

    I.fillField('#reviewer-name', 'Test User');
    I.fillField('#review-text', 'This is a test review');
    I.click('Submit');

    I.waitForElement('.review', 5);
    I.see('Test User', '.review');
    I.see('This is a test review', '.review');
});