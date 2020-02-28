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
  btn.on('click', () => console.log('event 1'));
  btn.on('click', () => console.log('event 2'));
  btn.on('click', () => console.log('event 3'));

  setTimeout(() => {
    console.log('second event off!');
    btn.off('click', 1);
  }, 5000);

  setTimeout(() => {
    console.log('all event off!');
    btn.off('click');
  }, 10000);
  return btn.getEl();
};

export const Class = () => {
  const dom = ExElement.create('div');

  dom.setStyle({
    fontSize: '30px',
    color: 'red !important'
  });
  dom.text = 'DOM Test';

  dom.addClasses('c1', 'c2', 'c3', 'c4');
  console.log(dom.classList());

  return dom.getEl();
}