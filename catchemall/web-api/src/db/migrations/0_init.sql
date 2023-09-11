begin;

create table if not exists "user" (
  ID SERIAL PRIMARY KEY,
  Username varchar(50) NOT NULL UNIQUE,
  Password varchar(255) NOT NULL,
  Salt varchar(50) NOT NULL
);

create table if not exists "pokemon" (
  pokedex_id INT PRIMARY KEY,
  name varchar(50) NOT NULL,
  image_url text NOT NULL,
  types json NOT NULL
);

create table if not exists "user_pokemon" (
  ID SERIAL PRIMARY KEY,
  pokedex_id int NOT NULL,
  user_id int NOT NULL,
  constraint fk_user FOREIGN KEY (user_id) references "user"(ID),
  constraint fk_pokemon FOREIGN KEY (pokedex_id) references "pokemon"(pokedex_id)
);

create table if not exists "daily_pokemon" (
  ID SERIAL PRIMARY KEY,
  pokedex_id SMALLINT NOT NULL,
  user_id int NOT NULL,
  constraint fk_pokemon FOREIGN KEY (pokedex_id) references "pokemon"(pokedex_id),
  constraint fk_user FOREIGN KEY (user_id) references "user"(ID)
);

commit;