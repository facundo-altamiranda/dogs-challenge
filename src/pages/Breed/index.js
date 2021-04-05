import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Image } from 'semantic-ui-react';
import Carousel from '@brainhubeu/react-carousel';
import { upperFirst } from 'lodash';

import { getImagesByBreed } from '../../api';
import { Button, Modal } from '../../components';
import './index.scss';

const Breed = () => {
  const [breedImages, setBreedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessages, setModalMessages] = useState({
    description: '',
    title: '',
  }); 
  const { breed } = useParams();

  const onBreedClick = breedImage => {
    const myTeam = JSON.parse(localStorage.getItem('myTeam'));
    const countObj = {};
    let duplicatedMember = false;
    let title = 'Successfully added to your team';
    let description = 'Thanks for building your team';

    myTeam?.forEach(member => {
      countObj[member.breed] = countObj[member.breed] ? countObj[member.breed] + 1 : 1;
      duplicatedMember = member.dog === breedImage;
    });

    if(duplicatedMember) {
      title = 'Error adding your last member';
      description = 'Duplicated member'
    } else if (!myTeam) {
      localStorage.setItem('myTeam', JSON.stringify([
        { dog: breedImage, breed },
      ]));
    } else if (myTeam.length < 10 && (!countObj[breed] || (countObj[breed] &&  countObj[breed] < 3))) {
      localStorage.setItem('myTeam', JSON.stringify([
        ...myTeam,
        { dog: breedImage, breed },
      ]));
    } else {
      title = 'Error adding your last member';
      description = 'Your team can have a maximum of 10 dogs and cannot have more than 3 dogs of the same breed.';
    }

    setIsModalOpen(true);
    setModalMessages({
      description,
      title,
    })
  };


  useEffect(() => {
    const setBreedImagesAsync = async () => {
      try {
        const {data: {message}} = await getImagesByBreed(breed);
  
        setBreedImages(message);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };

    setBreedImagesAsync();
  }, [breed]);

  return (
    <Container>
      <Header as='h2' className={'breed-header'} textAlign='center' >{upperFirst(breed)}</Header>

      {!isLoading && (
        <Carousel arrows plugins={['centered']}>
          {
            breedImages.map((breedImage, index) => 
              <div className={'breed-image-container'} key={breedImage}>
                <Image className={'breed-image'} size='medium' src={breedImage} />
                <Button onClick={() => onBreedClick(breedImage)} primary>Add to my team</Button>
              </div>
            )
          }
        </Carousel>
        )}
        <Modal
          description={modalMessages.description}
          onClose={() => setIsModalOpen(false)}
          open={isModalOpen}
          title={modalMessages.title}
        /> 
    </Container>
  );
}

export default Breed;
