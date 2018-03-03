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
	password_hash text not null,
);

commit;