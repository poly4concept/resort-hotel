import React, { useContext } from 'react';
import { RoomContext } from '../Context';
import Title from './Title';

//To get unique values
const getUnique = (items,value) => {
    return [...new Set(items.map(item => item[value]))]
}
function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    const { 
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        price,
        pets,
        breakfast,
        type,
        capacity,
        handleChange
    } = context;
//get unique type
    let types = getUnique(rooms, 'type');
    let people = getUnique(rooms, 'capacity');
// get all types
    types = ['all',...types]
    return (
        <section className="filter-container">
            <Title title="search rooms"/> 
            <form className="filter-form">
                {/*select group*/}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {types.map((item,index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select> 
                </div>
                {/*Guest*/}
                <div className="form-group">
                    <label htmlFor="capacity">Guest</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people.map((item,index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select> 
                </div>
                {/*Price*/}
                <div className="form-group">
                <label htmlFor="price">room price ${price}</label>
                    <input
                        type="range"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/*Size*/}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input
                            type="number"
                            name="minSize"
                            id="size"
                            value={minSize}
                            onChange={handleChange}
                            className="size-input"
                        />
                        <input
                        type="number"
                        name="maxSize"
                        id="size"
                        value={maxSize}
                        onChange={handleChange}
                        className="size-input"
                        />
                    </div>
                </div>
                 {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" id="breakfast" name="breakfast"  onChange={handleChange} checked={breakfast} />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" id="pets"  onChange={handleChange} name="pets" checked={pets} />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default RoomsFilter;