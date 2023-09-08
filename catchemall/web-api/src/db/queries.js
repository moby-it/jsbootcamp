export const UsersTableCreateQuery = `
create table if not exists "user" (
  ID SERIAL PRIMARY KEY ,
  Username varchar(50) NOT NULL UNIQUE ,
  Password varchar(255) NOT NULL ,
  Salt varchar(50) NOT NULL
)
`;
export const UserPokemonCreateQuery = `
create table if not exists "user_pokemon"
(
    ID         SERIAL PRIMARY KEY,
    pokedex_id SMALLINT    NOT NULL,
    name       varchar(50) NOT NULL,
    image_url  text        NOT NULL,
    types      json        NOT NULL,
    user_id    int         NOT NULL,
    constraint fk_user
    FOREIGN KEY (user_id) references "user"(ID)
)
`;