import React from 'react';
import './App.css';

const SimpleComponent = ({ number, componentReRenderedTimes }) => {
  componentReRenderedTimes.current++;

  const onPress = () => alert(number);

  return <div onClick={onPress}>Number: {number}</div>;
};

export default function App() {
  const componentReRenderedTimes = React.useRef(0);
  const [data, setData] = React.useState(
      new Array(1000)
          .fill({ number: 0 })
          .map((item, index) => ({ number: item.number, id: String(index + 1) }))
  );

  const random = () => setData(data.map(({id}) => ({number: Math.floor(1 + Math.random() * 10), id})));

  const addToTop = () => setData(data => [{ number: 0, id: Math.random() }, ...data])

  return (
      <div>
        <div>Was rendered: {componentReRenderedTimes.current}</div>
        <button onClick={random}>random</button>
        <button onClick={addToTop}>add to top</button>
        {data.map(item => (
            <SimpleComponent
                number={item.number}
                componentReRenderedTimes={componentReRenderedTimes}
            />
        ))}
      </div>
  );
}
