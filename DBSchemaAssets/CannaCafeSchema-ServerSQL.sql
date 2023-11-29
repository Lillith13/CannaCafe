CREATE TABLE [users] (
  [id] integer PRIMARY KEY,
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [birthday] timestamp,
  [address] nvarchar(255),
  [city] nvarchar(255),
  [state] nvarchar(255),
  [zipcode] nvarchar(255),
  [username] nvarchar(255) UNIQUE,
  [email] nvarchar(255) UNIQUE,
  [password] nvarchar(255),
  [role_id] integer,
  [orders] list,
  [created_at] timestamp
)
GO

CREATE TABLE [products] (
  [id] integer PRIMARY KEY,
  [name] nvarchar(255) UNIQUE,
  [description] text,
  [price] float,
  [category_id] integer,
  [added_by] integer
)
GO

CREATE TABLE [orders] (
  [id] integer PRIMARY KEY,
  [user_id] integer,
  [product_id] integer,
  [quantity] integer,
  [ordered_on] timestamp
)
GO

CREATE TABLE [categories] (
  [id] integer PRIMARY KEY,
  [name] nvarchar(255) UNIQUE,
  [age_restricted] boolean,
  [shippable] boolean
)
GO

CREATE TABLE [reviews] (
  [id] integer PRIMARY KEY,
  [user_id] integer,
  [product_id] integer,
  [review] text,
  [rating] integer
)
GO

CREATE TABLE [complaints] (
  [id] integer PRIMARY KEY,
  [user_id] integer,
  [body] text,
  [resolved] boolean,
  [resolved_by] integer
)
GO

CREATE TABLE [roles] (
  [id] integer PRIMARY KEY,
  [name] nvarchar(255) UNIQUE
)
GO

CREATE TABLE [favorites] (
  [id] integer PRIMARY KEY,
  [user_id] integer,
  [products] list
)
GO

CREATE TABLE [wishlists] (
  [id] integer PRIMARY KEY,
  [user_id] integer,
  [products] list
)
GO

CREATE TABLE [timecards] (
  [id] integer PRIMARY KEY,
  [user_id] integer,
  [clocked_in] timestamp,
  [clocked_out] timestamp
)
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'backend decided',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'users',
@level2type = N'Column', @level2name = 'role_id';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'joins tables implemented',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'users',
@level2type = N'Column', @level2name = 'orders';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'joins tables implemented',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'favorites',
@level2type = N'Column', @level2name = 'products';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'joins tables implemented',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'wishlists',
@level2type = N'Column', @level2name = 'products';
GO

ALTER TABLE [timecards] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [reviews] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [reviews] ADD FOREIGN KEY ([product_id]) REFERENCES [products] ([id])
GO

ALTER TABLE [complaints] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [complaints] ADD FOREIGN KEY ([resolved_by]) REFERENCES [users] ([id])
GO

ALTER TABLE [users] ADD FOREIGN KEY ([role_id]) REFERENCES [roles] ([id])
GO

ALTER TABLE [orders] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [orders] ADD FOREIGN KEY ([product_id]) REFERENCES [products] ([id])
GO

ALTER TABLE [favorites] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [wishlists] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [products] ADD FOREIGN KEY ([category_id]) REFERENCES [categories] ([id])
GO

ALTER TABLE [products] ADD FOREIGN KEY ([added_by]) REFERENCES [users] ([id])
GO
