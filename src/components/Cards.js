import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import GDI from 'assets/images/GradientDescentImg.png';
import KNNI from 'assets/images/KnnImg.png';
import LRI from 'assets/images/LinearRegressionImag.png';
import LogisticRI from 'assets/images/LogisticRegressionImg.png';
import NNI from 'assets/images/NeuralNetworksImg.png';

function Cards() {
    return (
      <div className='cards' id="cards_id">
        {/* Don't delet this line, it prevent the window slide from stopping on h1 */}
        <div className='cards__pos'></div> 
        <h1>Main Algorithms</h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src= { LRI }
                text='Learn the Linear Regression Algorithm'
                info='This algorithm finds the closest linear line to all the points'
                label='Linear Regression'
                path='/algorithms'
              />
              <CardItem
                src= { GDI }
                text='Learn the Gradient Descent Algorithm'
                info='This algorithm helps in finiding the minimal point of a function'
                label='Gradiant Descent'
                path='/algorithms/gd'
              />
            </ul>
            <ul className='cards__items'>
            <CardItem
                src= { KNNI }
                text='Learn the K-Nearest Neighbors Algorithm'
                info='This algorithm predicts the type of an object based on its k-nearest-neighbors'
                label='K Nearest Neighbors'
                path='/algorithms'
              />
              <CardItem
                src= { NNI }
                text='Learn the Neural Networks Algorithm'
                info='This algorithm predicts the right answer'
                label='Neural Networks'
                path='/algorithms'
              />
              <CardItem
                src= { LogisticRI }
                text='Learn the Linear Regression Algorithm'
                info='This algorithm finds the closest line to all the points'
                label='Logistic Regression'
                path='/algorithms'
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default Cards;
