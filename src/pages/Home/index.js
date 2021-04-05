import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Container, Grid, Input } from 'semantic-ui-react';
import { includes, some, upperFirst } from 'lodash';

import { getBreeds } from '../../api';
import './index.scss';

const { Content: CardContent } = Card

const Home = () => {
  const history = useHistory();
  const [breeds, setBreeds] = useState([]);
  const [search, setSearch] = useState('');
  const onChangeSearch = event => {
    const {target: {value}} = event;

    setSearch(value);
  };
  const onCardClick = key => {
    history.push(`/breed/${key}`);
  };

  useEffect(() => {
    const getBreedList = async () => {

      try {
        const {data: {message}} = await getBreeds();
  
        setBreeds(message);
      } catch (error) {
        throw new Error(error);
      }
    };

    getBreedList();
  }, []);

  return (
    <>
      <Container className={'input-container'}>
        <Input onChange={onChangeSearch} placeholder='Search...' value={search} />
      </Container>
      <Grid verticalAlign='top' container columns={5}>
        {
          Object.keys(breeds).map(key => {
            const someIncludes = some(breeds[key], breed => includes(breed, search));
            const description = breeds[key].map(breed => upperFirst(breed)).join(', ');

            if (!includes(key, search) && !someIncludes) {
              return null;
            }

            return (
              <Grid.Column key={key}>
                <Card onClick={() => onCardClick(key)}>
                  <CardContent header={upperFirst(key)} />
                  {
                    !!breeds[key].length && <CardContent description={description} />
                  }
                </Card>
              </Grid.Column>
            );
          })
        }
      </Grid>
    </>
  );
}

export default Home;
