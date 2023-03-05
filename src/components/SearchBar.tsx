import React from 'react';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons'

interface SearchBarProps {
    searchText: string;
    onTextChange: (value: string) => void;
}
const Container = styled.View`
  background-color: #f0eeee;
  height: 40px;
  border-radius:  5px;
  margin: 15px 0;
  flex-direction: row;
`;

const SearchIcon = styled(Feather)`
  margin: 0 5px;
  align-self: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
`;

export const SearchBar = (props: SearchBarProps) => {
    return (
        <Container>
            <SearchIcon name='search' size={30} />
            <SearchInput
                autoCapitalize={"none"}
                placeholder={'Search'}
                value={props.searchText}
                onChangeText={props.onTextChange}
            />
        </Container>
    )
}