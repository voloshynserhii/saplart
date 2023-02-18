import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POSTS = [
  { name: 'astronaut_crystal.png', cover: '/assets/images/products/1.jpg', type: 1 },
  { name: '3d_model_character.3ds', cover: '/assets/images/products/2.jpeg', type: 2 },
  { name: '3d_model_character.unity', cover: '/assets/images/products/4.png', type: 2 },
  { name: 'house_scetch.png', cover: '/assets/images/products/5.png', type: 5 },
  { name: 'news_post.txt', cover: '/assets/images/products/6.jpg', type: 4 },
  { name: 'final_master.wav', cover: '/assets/images/products/7.png', type: 4 },
  { name: 'house_scetch2.png', cover: '/assets/images/products/8.jpeg', type: 5 },
];

const posts = POSTS.map((item, index) => ({
  id: faker.datatype.uuid(),
  ...item,
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
