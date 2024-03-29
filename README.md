# E-commerce-api
Nodejs backend for a shop
<br />
All APIs start with <code>/api</code> prefix
<br />

## AUTH APIs
|Route|Method|Body|Description|
|-----|------|----|-----------|
|/auth/signup|POST|name, email, password| for making new user account|
|/auth/login|POST|email, password|for logging in existing user, sets the token cookie|
|/auth/logout|GET| - | logs out the user, deletes the cookie|

## USER APIs
|Route|Method|Body|Description|
|-----|------|----|-----------|
|/user/|GET|-|get logged in user's details|
|/user/all|GET|-|accessible to admin only, get all users in the database|
|/user/get/:userId|GET|-|get a user's reviews, accessible to all|
|/user/|PUT|all user fields except user role|update user info|

## PRODUCT APIs
|Route|Method|Body|Description|
|-----|------|----|-----------|
|/product/add|POST|title, description, price, stalk|add a product to database|
|/product/:productId|GET|-|get a single product with all fields populated|
|/product/:productId|PUT|any product field|update a product, accessible only to admin|
|/product|GET|-|get all products|
|/product/product-photo/upload|POST (form-data)|productPhoto, productId|upload a photo for a product|
|/product|POST|productIds: []|get all products from an array|

## PRODUCT REVIEWS APIs
|Route|Method|Body|Description|
|-----|------|----|-----------|
|/review/|POST|productId, rating, review|add a review to product by the logged in user|
|/review/:reviewId|PUT|rating, review|update existing review|
|/review/:reviewId|DEL|-|delete a review|

## PRODUCT CATEGORIES APIs
|Route|Method|Body|Description|
|-----|------|----|-----------|
|/category/|GET|-|get all categories|
|/category/create|POST|category|add a category name|
|/category/assign/:productId|POST|categories: [categoryIds]|assign categories to a single product, accessible only to admin|
|/category/product/:categoryId|GET|-|get all products that belong to the category id|
|/category/:categoryId|DEL|-|delete single category, access to admin only|
|/category/:categoryId|PUT|category|updates category name|