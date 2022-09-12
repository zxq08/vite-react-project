import * as React from 'react';
import { useState, useEffect, FC } from 'react';
import { Button } from 'antd';
import './index.css'

interface MyButtonProps {

}

const MyButton: FC<MyButtonProps> = () => {
    return (<Button type="primary" className='my-button'>MyButton</Button>);
}

export default MyButton;