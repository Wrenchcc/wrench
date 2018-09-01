import generateUser from './generateUser'
import generateId from './generateId'

export default () => [
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('1'),
    },
  },
  {
    cursor: Buffer.from('2').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('2'),
    },
  },
  {
    cursor: Buffer.from('3').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('3'),
    },
  },
  {
    cursor: Buffer.from('4').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('4'),
    },
  },
  {
    cursor: Buffer.from('5').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('5'),
    },
  },
  {
    cursor: Buffer.from('6').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('6'),
    },
  },
  {
    cursor: Buffer.from('7').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('7'),
    },
  },
  {
    cursor: Buffer.from('8').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('8'),
    },
  },
  {
    cursor: Buffer.from('9').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('9'),
    },
  },
  {
    cursor: Buffer.from('10').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('10'),
    },
  },
  {
    cursor: Buffer.from('11').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('11'),
    },
  },
  {
    cursor: Buffer.from('12').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('12'),
    },
  },
  {
    cursor: Buffer.from('13').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('13'),
    },
  },
  {
    cursor: Buffer.from('14').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('14'),
    },
  },
  {
    cursor: Buffer.from('15').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('15'),
    },
  },
  {
    cursor: Buffer.from('16').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('16'),
    },
  },
  {
    cursor: Buffer.from('17').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('17'),
    },
  },
  {
    cursor: Buffer.from('18').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('18'),
    },
  },
  {
    cursor: Buffer.from('19').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('19'),
    },
  },
  {
    cursor: Buffer.from('20').toString('base64'),
    node: {
      id: generateId(),
      ...generateUser('20'),
    },
  },
]
