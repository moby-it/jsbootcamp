CREATE TABLE IF NOT EXISTS pokemon_trade (
    id SERIAL PRIMARY KEY,
    initiator_user_pokemon_id INT NOT NULL,
    responder_user_pokemon_id INT NOT NULL,
    accepted bool,
    created_at TIMESTAMP DEFAULT current_timestamp,
    CONSTRAINT fk_initiator_user_pokemon_id FOREIGN KEY(initiator_user_pokemon_id) REFERENCES user_pokemon(id),
    CONSTRAINT fk_responder_user_pokemon_id FOREIGN KEY(responder_user_pokemon_id) REFERENCES user_pokemon(id)
);

DROP TRIGGER IF EXISTS swap_pokemon ON pokemon_trade cascade;

DROP FUNCTION IF EXISTS swap_pokemon() cascade;

CREATE OR REPLACE PROCEDURE swap_pokemon(
    pokemon_trade_id INT
)
    LANGUAGE plpgsql
AS
$$
    DECLARE
        initiator_up_id int;
        responder_up_id int;
        initiator_pokedex_id int;
        responder_pokedex_id int;
BEGIN
        initiator_up_id = (SELECT initiator_user_pokemon_id FROM pokemon_trade WHERE id = pokemon_trade_id);
        responder_up_id = (SELECT responder_user_pokemon_id FROM pokemon_trade WHERE id = pokemon_trade_id);
        initiator_pokedex_id = (SELECT pokedex_id FROM user_pokemon WHERE id = initiator_up_id);
        responder_pokedex_id= (SELECT pokedex_id FROM user_pokemon WHERE id = responder_up_id);
        UPDATE user_pokemon SET pokedex_id = responder_pokedex_id WHERE id = initiator_up_id;
        UPDATE user_pokemon SET pokedex_id = initiator_pokedex_id WHERE id = responder_up_id;
        UPDATE pokemon_trade
        SET accepted = false
        WHERE (initiator_user_pokemon_id = initiator_up_id OR responder_user_pokemon_id = responder_up_id)
            AND pokemon_trade.id != pokemon_trade_id;
END;
$$;