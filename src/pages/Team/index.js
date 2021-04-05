import React, { Fragment, useEffect, useState } from 'react';
import { Accordion, Container, Grid, Icon, Image } from 'semantic-ui-react'
import { groupBy, remove, upperFirst } from 'lodash';

import { Button } from '../../components';
import './index.scss';

const { Content: AccordionContent, Title: AccordionTitle } = Accordion
const { Column: GridColumn } = Grid;

const Team = () => {
  const [activeIndex, setActiveIndex] = useState();
  const [myTeam, setMyTeam] = useState([]);
  const myTeamGrouped = groupBy(myTeam, 'breed');
  const onAccordionClick = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const onDelete = dog => {
    const myTeamStorage = JSON.parse(localStorage.getItem('myTeam'));
    remove(myTeamStorage, member => member.dog === dog);

    localStorage.setItem('myTeam', JSON.stringify(myTeamStorage));
    setMyTeam(myTeamStorage);
  };

  useEffect(() => {
    const myTeamStorage = JSON.parse(localStorage.getItem('myTeam'));

    setMyTeam(myTeamStorage);
  }, []);

  return (
    <Container className={'my-team-container'}>
      <Accordion fluid styled>
        {
          Object.keys(myTeamGrouped).map((key, index) => {
            return (
              <Fragment key={key}>
                <AccordionTitle
                  active={activeIndex === index}
                  index={index}
                  onClick={() => onAccordionClick(index)}
                >
                  <Icon name='dropdown' />
                  {upperFirst(key)}
                </AccordionTitle>
                <AccordionContent active={activeIndex === index}>
                  <Grid centered container>
                    {
                      myTeamGrouped[key].map((member, memberIndex) =>
                        <GridColumn className={'member-container'} key={`${key} ${memberIndex}`} width={5}>
                          <Image className={'member-image'} size='small' src={member.dog} />
                          <Button onClick={() => onDelete(member.dog)} primary>Delete from my team</Button>
                        </GridColumn>
                      )
                    }
                  </Grid>
                </AccordionContent>
              </Fragment>
            )
          })
        }
      </Accordion>
    </Container>
  );
}

export default Team;
