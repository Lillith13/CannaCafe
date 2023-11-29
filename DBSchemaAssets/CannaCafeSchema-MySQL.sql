CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `birthday` timestamp,
  `address` varchar(255),
  `city` varchar(255),
  `state` varchar(255),
  `zipcode` varchar(255),
  `username` varchar(255) UNIQUE,
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `role_id` integer COMMENT 'backend decided',
  `orders` list COMMENT 'joins tables implemented',
  `created_at` timestamp
);

CREATE TABLE `products` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE,
  `description` text,
  `price` float,
  `category_id` integer,
  `added_by` integer
);

CREATE TABLE `orders` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `product_id` integer,
  `quantity` integer,
  `ordered_on` timestamp
);

CREATE TABLE `categories` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE,
  `age_restricted` boolean,
  `shippable` boolean
);

CREATE TABLE `reviews` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `product_id` integer,
  `review` text,
  `rating` integer
);

CREATE TABLE `complaints` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `body` text,
  `resolved` boolean,
  `resolved_by` integer
);

CREATE TABLE `roles` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE
);

CREATE TABLE `favorites` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `products` list COMMENT 'joins tables implemented'
);

CREATE TABLE `wishlists` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `products` list COMMENT 'joins tables implemented'
);

CREATE TABLE `timecards` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `clocked_in` timestamp,
  `clocked_out` timestamp
);

ALTER TABLE `timecards` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `complaints` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `complaints` ADD FOREIGN KEY (`resolved_by`) REFERENCES `users` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `wishlists` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
