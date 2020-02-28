import ExElement from '../src/index';

export default {
  title: 'Example',
};

export const Create = () => {
  const h1 = ExElement.create('h1');

  h1.text = 'Hello ExElement';
  return h1.getEl();
};

export const Button = () => {
  const btn = ExElement.create('button');

  btn.text = 'Hello Button';
  btn.on('click', e => console.log(e));
  return btn.getEl();
};
