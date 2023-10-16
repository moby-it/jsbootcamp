create table if not exists pokemon_trade (
    id serial primary key,
    initiator_user_pokemon_id INT not null,
    responder_user_pokemon_id INT not null,
    accepted bool,
    created_at timestamp default current_timestamp,
    constraint fk_initiator_user_pokemon_id foreign key(initiator_user_pokemon_id) references user_pokemon(id),
    constraint fk_responder_user_pokemon_id foreign key(responder_user_pokemon_id) references user_pokemon(id)
);