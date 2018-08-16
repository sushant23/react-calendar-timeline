import React from 'react';

const Box = ({selected, title}) => <div 
    style={{background: selected ? 'red' : 'blue', color: 'white', fontSize: '14px',overflow: 'hidden', height: '100%'}}>
    {title}
</div>

export default Box;