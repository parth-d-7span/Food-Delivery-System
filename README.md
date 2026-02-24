# Food-Delivery-System

Basic restaurant and order management system

##🎯 Project Overview

The Food Delivery System is a basic restaurant and order management platform built with Node.js. The goal of this system is to provide a way for customers to browse restaurants, place orders, manage their cart, and view past orders, all while providing basic restaurant and menu management features. It also includes user authentication for registration and login.

##🛠️ Technologies Used

Node.js – Backend runtime environment
Express.js – Web framework for Node.js
MongoDB – NoSQL database for storing user and restaurant data
Mongoose – ODM (Object Data Modeling) library for MongoDB
JWT (JSON Web Tokens) – For user authentication and session management
Bcrypt.js – For hashing and securing user passwords

##🚀 Features

1. Authentication (Customer)
   Register – Allows a customer to create an account with an email and password.
   Login – Allows a customer to log in with their credentials.
   (Optional) Admin Role – Admin functionality for managing restaurants, menus, and orders.

2. Restaurant Management
   Add Restaurant – Admins can add a new restaurant.
   View All Restaurants – Customers can view a list of available restaurants.

3. Menu Management
   Add Menu Item – Admins can add menu items with details like name, price, and category.
   Get Menu by Restaurant – Customers can view the menu of a specific restaurant.
   Update/Delete Menu Item – Admins can update or remove existing menu items.

4. Cart Features
   Add Item to Cart – Customers can add menu items to their cart.
   Update Item Quantity – Customers can adjust the quantity of items in their cart.
   Remove Item from Cart – Customers can remove items from the cart.
   View User Cart – Customers can view the current items in their cart.
   Clear Cart – Customers can clear all items in their cart.
   Calculate Total Price Automatically – The total price of the cart is calculated automatically as items are added/removed.

5. Order System
   Add Items to Order – Customers can place an order from their cart.
   Place Order – Customers can submit the order.
   Order Status – Tracks the order's status (Pending, Cancelled, Delivered).

6. Order History
   View Past Orders – Customers can view a history of their past orders.
