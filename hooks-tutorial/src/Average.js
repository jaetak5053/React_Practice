import React, { useState, useMemo } from 'react';

const getAverage = (numbers) => {
  console.log('평균값 계산중...');
  if (numbers.map((e) => e.value).length === 0) return 0;
  const sum = numbers.map((e) => e.value).reduce((a, b) => a + b);
  return sum / numbers.length;
};
const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
  const [nextId, setNextId] = useState(1);
  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = () => {
    const nextList = list.concat({
      id: nextId,
      value: parseInt(number),
    });
    setList(nextList);
    setNumber('');
    setNextId(nextId + 1);
  };

  const onRemove = (id) => {
    const nextList = list.filter((number) => number.id !== id);
    setList(nextList);
  };

  const numbersList = list.map((number) => (
    <li key={number.id} onDoubleClick={() => onRemove(number.id)}>
      {number.value}
    </li>
  ));

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>{numbersList}</ul>
      <b>평균값:</b>
      {avg}
    </div>
  );
};
export default Average;
