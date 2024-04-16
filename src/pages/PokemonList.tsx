import React, { useState, useEffect, useRef } from 'react';
import { usePokemons } from '../hooks/usePokemons';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PokemonList: React.FC = () => {
    const { data: pokemons, isError, isLoading } = usePokemons();
    const [filter, setFilter] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const searchRef = useRef(null);
    const pokemonRefs = useRef([]);

    const handleKeyDown = (event: any) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const maxIndex = pokemonRefs.current.length - 1;
            let nextIndex = focusedIndex;
            if (event.key === 'ArrowDown' && focusedIndex < maxIndex) {
                nextIndex = focusedIndex + 1;
            } else if (event.key === 'ArrowUp' && focusedIndex > 0) {
                nextIndex = focusedIndex - 1;
            }
            setFocusedIndex(nextIndex);
            (pokemonRefs.current[nextIndex] as any).focus();
        }
    };
    const handleFocusedIndex = (index: number) => {
        setFocusedIndex(index);
        (pokemonRefs.current[index] as any).focus();
    };
    useEffect(() => {
        const handleShortcut = (event: any) => {
            if ((event.ctrlKey || event.metaKey) && event.key === '/') {
                event.preventDefault();
                (searchRef.current as any).focus();
            }
            if (event.target === searchRef.current && event.key === 'ArrowDown') {
                event.preventDefault();
                if (pokemonRefs.current[0]) {
                    (pokemonRefs.current as any)[0].focus();
                }
            }
        };


        document.addEventListener('keydown', handleShortcut);
        return () => document.removeEventListener('keydown', handleShortcut);
    }, [focusedIndex]);

    if (isLoading) {
        return <div className="flex justify-center p-5">Carregando...</div>;
    }
    if (isError) {
        return <Alert color="red" className="m-4">Erro ao carregar Pokémons.</Alert>;
    }

    const filteredPokemons = pokemons?.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <Input
                ref={searchRef}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar Pokémons..."
                className="mt-6 mb-6"
                onKeyDown={(e) => e.key === 'ArrowDown' && setFocusedIndex(0)}
            />
            {filteredPokemons?.map((pokemon, index) => (
                <Card key={pokemon.name} style={{
                    margin: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '10px'
                }}
                    tabIndex={0}
                    ref={el => (pokemonRefs.current as any)[index] = el}
                    onMouseEnter={() => handleFocusedIndex(index)}
                    onKeyDown={handleKeyDown}
                >
                    <div style={{
                        background: getColor(index),
                        color: 'white',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '1.5em',
                        marginRight: '10px',
                    }}>
                        {getInitials(pokemon.name)}
                    </div>
                    <div style={{ textTransform: 'capitalize' }}>
                        <CardTitle>{pokemon.name}</CardTitle>
                        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0px' }}>
                            {pokemon.abilities?.map((ability) => (
                                <Badge style={{ marginRight: '5px', marginBottom: '5px' }} key={ability.ability.name}>
                                    {ability.ability.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

function getColor(index: any) {
    const colors = ['#009688', '#f44336', '#3f51b5', '#ff9800'];
    return colors[index % colors.length];
}

function getInitials(name: any) {
    const splitName = name.split(' ');
    if (splitName.length > 1) {
        return `${splitName[0][0]}${splitName[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
}

export default PokemonList;
