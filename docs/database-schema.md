# Database Schema Documentation

## Overview
This document describes the database schema for the Mini Product Marketplace System.

## Tables

### Users
Stores user account information and authentication data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | string | PRIMARY KEY | Unique user identifier |
| email | string | UNIQUE, NOT NULL | User email address |
| password | string | NOT NULL | Hashed password |
| firstName | string | NOT NULL | User's first name |
| lastName | string | NOT NULL | User's last name |
| role | enum | NOT NULL | User role (admin, user) |
| createdAt | datetime | NOT NULL | Account creation timestamp |
| updatedAt | datetime | NOT NULL | Last update timestamp |

### Categories
Product categorization system.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | string | PRIMARY KEY | Unique category identifier |
| name | string | NOT NULL | Category display name |
| description | text | | Category description |
| slug | string | UNIQUE, NOT NULL | URL-friendly category identifier |
| createdAt | datetime | NOT NULL | Creation timestamp |
| updatedAt | datetime | NOT NULL | Last update timestamp |

### Products
Product catalog with inventory and pricing.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | string | PRIMARY KEY | Unique product identifier |
| name | string | NOT NULL | Product name |
| description | text | | Product description |
| price | decimal | NOT NULL | Product price |
| categoryId | string | FOREIGN KEY | Reference to categories.id |
| imageUrl | string | | Primary product image URL |
| images | json | | Array of additional image URLs |
| inventory | integer | NOT NULL | Available stock quantity |
| sku | string | UNIQUE, NOT NULL | Stock keeping unit |
| status | enum | NOT NULL | Product status (active, inactive) |
| createdAt | datetime | NOT NULL | Creation timestamp |
| updatedAt | datetime | NOT NULL | Last update timestamp |

## Relationships

- Products.categoryId → Categories.id (Many-to-One)
- Each product belongs to one category
- Each category can have multiple products

## Indexes

For optimal performance, the following indexes should be created:

- Users: email (unique index)
- Categories: slug (unique index)
- Products: categoryId, status, price
- Products: name, description (for search functionality)

## Sample Data

The system includes sample data:
- 5 users (1 admin, 4 regular users)
- 5 categories (Electronics, Clothing, Books, Home & Garden, Sports)
- 20+ products distributed across categories
