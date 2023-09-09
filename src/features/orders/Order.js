import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrder } from './orderSlice';



export function Counter() {
  const orders = useSelector(selectOrder);
  const dispatch = useDispatch();


  return (
    <div>
    
     <h1>hgh</h1>
    </div>
  );
}
