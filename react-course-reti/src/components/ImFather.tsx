import React, { useState } from 'react';
import ImChild from './ImChild';

const ImFather: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <ImChild count={count}>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </ImChild>
    );
}

export default ImFather;