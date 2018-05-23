begin;

create table users
(
	id serial not null
		constraint users_pkey
			primary key,
	first_name text not null,
	last_name text not null,
	user_name text not null
		constraint users_user_name_key
			unique,
	password_hash text not null
);

create table roles
(
	id serial not null
		constraint roles_pkey
			primary key,
	name text not null
		constraint roles_name_key
			unique 
);

create table user_roles
(
	id serial not null
		constraint user_roles_pkey
			primary key,
	user_id integer references users(id),
	role_id integer references roles(id)
);

create table budgets
(
	id serial not null
		constraint budgets_pkey
			primary key,
	user_id integer references users(id),
	name text not null,
	description text,
	amount numeric not null,
	frequency integer not null,
	timeunit text not null,
	end_date timestamp
);

create table incomes
(
	id serial not null
		constraint incomes_pkey
			primary key,
	user_id integer references users(id),
	name text not null,
	description text,
	amount numeric not null,
	frequency integer,
	timeunit text,
	end_date timestamp
);

create table expenses
(
	id serial not null
		constraint expenses_pkey
			primary key,
	user_id integer references users(id),
	name text not null,
	description text,
	amount numeric not null,
	frequency integer,
	timeunit text,
	end_date timestamp
);

create table transactions
(
	id serial not null
		constraint transactions_pkey
			primary key,
	user_id integer references users(id),
	description text,
	amount numeric not null,
	dt timestamp
);

create table personal_information
(
	id serial not null
		constraint personal_information_pkey
			primary key,
	user_id integer references users(id) unique,
	first_name text,
	last_name text,
	birthday timestamp,
	gender text,
	phone_number text,
	email_address text,
	home_address text
);

create table user_settings
(
	id serial not null
		constraint user_settings_pkey
			primary key,
	user_id integer references users(id) unique,
	text_notification boolean,
	email_notification boolean,
	share_data boolean
);

commit;