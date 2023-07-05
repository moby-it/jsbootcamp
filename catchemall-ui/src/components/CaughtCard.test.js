const { render, screen } = require("@testing-library/react");
const { CaughtCard } = require("./CaughtCard");

/**
 * @type {import("../pokedexContext").Pokemon}
 */
const pokemon = {
  id: 15,
  name: 'beedrill',
  types: ['bug'],
  imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png'
};

test("CaughtCard Component", () => {

  render(<CaughtCard pokemon={pokemon} />);

  expect(screen.getByAltText("beedrill")).toBeInTheDocument();

});