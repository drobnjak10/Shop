import React, { useRef, useState } from 'react';

function CategoryItem({category, categoryId, setCategoryId}) {
    const [isChecked, setIsChecked] = useState(true);
    const checkBoxRef = useRef();

    const clickHandler = (id) => {
        setIsChecked(!isChecked)
        
        if(checkBoxRef.current.value !== 'no') {
            setCategoryId([...categoryId, id])
        }

        if(checkBoxRef.current.value !== 'yes') {
            setCategoryId([...categoryId.filter(cat => cat !== id)])
        }
    }



    return <div key={category._id}>
        <input type="checkbox" 
        value={isChecked ? 'yes' : 'no'} 
        name='category' ref={checkBoxRef} 
        onClick={e => clickHandler(category._id) }
        id={category._id}
        />
        <label htmlFor="">{category.name}</label>
    </div>
}
export default CategoryItem;
