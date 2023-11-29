CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "firstName" varchar,
  "lastName" varchar,
  "birthday" timestamp,
  "address" varchar,
  "city" varchar,
  "state" varchar,
  "zipcode" varchar,
  "username" varchar UNIQUE,
  "email" varchar UNIQUE,
  "password" varchar,
  "role_id" integer,
  "orders" list,
  "created_at" timestamp
);

CREATE TABLE "products" (
  "id" integer PRIMARY KEY,
  "name" varchar UNIQUE,
  "description" text,
  "price" float,
  "category_id" integer,
  "added_by" integer
);

CREATE TABLE "orders" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "product_id" integer,
  "quantity" integer,
  "ordered_on" timestamp
);

CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "name" varchar UNIQUE,
  "age_restricted" boolean,
  "shippable" boolean
);

CREATE TABLE "reviews" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "product_id" integer,
  "review" text,
  "rating" integer
);

CREATE TABLE "complaints" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "body" text,
  "resolved" boolean,
  "resolved_by" integer
);

CREATE TABLE "roles" (
  "id" integer PRIMARY KEY,
  "name" varchar UNIQUE
);

CREATE TABLE "favorites" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "products" list
);

CREATE TABLE "wishlists" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "products" list
);

CREATE TABLE "timecards" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "clocked_in" timestamp,
  "clocked_out" timestamp
);

COMMENT ON COLUMN "users"."role_id" IS 'backend decided';

COMMENT ON COLUMN "users"."orders" IS 'joins tables implemented';

COMMENT ON COLUMN "favorites"."products" IS 'joins tables implemented';

COMMENT ON COLUMN "wishlists"."products" IS 'joins tables implemented';

ALTER TABLE "timecards" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "complaints" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "complaints" ADD FOREIGN KEY ("resolved_by") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "favorites" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "wishlists" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
