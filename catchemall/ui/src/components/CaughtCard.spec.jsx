import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AppProviders } from '../providers';
import { CaughtCard } from './CaughtCard';

/**
 * @type {import("../utils/transformPokemon").Pokemon}
 */
const pokemon = {
    id: 129,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png',
    name: 'magikarp',
    types: ['water'],
};

describe('CatchPokemonCard', () => {
    render(
        <AppProviders>
            <CaughtCard pokemon={pokemon} />
        </AppProviders>,
    );
    test('should render a simple pokemon card', () => {
        expect(screen.getByAltText('magikarp')).toBeInTheDocument();
        expect(screen.getByAltText('pokeball')).toBeInTheDocument();
    });
});
