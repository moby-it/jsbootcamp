CREATE TABLE
  IF NOT EXISTS "user" (
    ID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Salt VARCHAR(50) NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS "pokemon" (
    pokedex_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image_url text NOT NULL,
    types JSON NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS "user_pokemon" (
    ID SERIAL PRIMARY KEY,
    pokedex_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (ID),
    CONSTRAINT fk_pokemon FOREIGN KEY (pokedex_id) REFERENCES "pokemon" (pokedex_id)
  );

CREATE TABLE
  IF NOT EXISTS "daily_pokemon" (
    ID SERIAL PRIMARY KEY,
    pokedex_id SMALLINT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_pokemon FOREIGN KEY (pokedex_id) REFERENCES "pokemon" (pokedex_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (ID)
  );