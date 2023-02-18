import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCTS = [
  { name: 'astronaut_crystal.png', path: '/assets/images/products/1.jpg' },
  { name: '3d_model_character.3ds', path: '/assets/images/products/2.jpeg' },
  { name: 'Source_of_best_software.css', path: '/assets/images/products/3.png' },
  { name: '3d_model_character.unity', path: '/assets/images/products/4.png' },
  { name: 'house_scetch.png', path: '/assets/images/products/5.png' },
  { name: 'news_post.txt', path: '/assets/images/products/6.jpg' },
  { name: 'final_master.wav', path: '/assets/images/products/7.png' },
  { name: 'house_scetch2.png', path: '/assets/images/products/8.jpeg' },
];

// ----------------------------------------------------------------------

const products = PRODUCTS.map((item, index) => {
  return {
    id: faker.datatype.uuid(),
    ...item,
  };
});

export default products;
