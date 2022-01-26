import React, { useRef, useState } from 'react';

function CategoryItem({setAverage}) {
    const [isChecked, setIsChecked] = useState(true);
    const checkBoxRef = useRef();

    const clickHandler = (id) => {
        setIsChecked(!isChecked)
        
        if(checkBoxRef.current.value !== 'no') {
            setAverage(id)
        }
        
        if(checkBoxRef.current.value !== 'yes') {
            setAverage(null)
        }
    }



    return <div>
        <input type="checkbox" 
        value={isChecked ? 'yes' : 'no'} 
        name='average' ref={checkBoxRef} 
        onClick={e => clickHandler() }
        />
        <label htmlFor="">Average</label>
    </div>
}
export default CategoryItem;
