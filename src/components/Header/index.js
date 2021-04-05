import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import dogLogo from '../../images/dog-api-logo.svg';
import './index.scss';

const Header = () => {
  return (
    <Container className={'header-container'} fluid>
      <Grid centered>
        <Grid.Column width={3}>
          <Image centered size='tiny' src={dogLogo} />
        </Grid.Column>
        <Grid.Column className={'header-links-container'} floated={'left'} width={4}>
          <Link className={'header-link'} to='/'>Home</Link>
          <Link className={'header-link'} to='/team'>My Team</Link>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Header;
