import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import Hero from '../components/Hero';
import { RoomContext } from '../Context';
import DefaultBcg from '../images/room-1.jpeg';
import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {
    constructor(props){
            super(props)
            this.state = {
                slug: this.props.match.params.slug,
                DefaultBcg
            }
    }

    static contextType = RoomContext;
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        if(!room){
            return <div className="error">
                    <h3>No such room found..</h3>
                    <Link to="/rooms" className="btn-primary">back to rooms</Link>
                </div>
        }
        const { name, images, pets, description, capacity, size, price, breakfast, extras} = room;
        const [ mainImg, ...supplementImg ] = images;
        return (
            <>
                <StyledHero img={mainImg}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">back to rooms</Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {supplementImg.map((item, index) => {
                           return  <img key={index} src={item} alt={name}/>
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>Price : ${price}</h6>
                            <h6>Size : ${size} SQFT</h6>
                            <h6> Max capacity : { capacity> 1 ? ` ${capacity} people` : `${capacity} person`} </h6>
                            <h6> { pets ? "pets allowed" : "no pets allowed"} </h6>
                            <h6>{ breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className='room-extras'>
                    <h6>Extras</h6>
                    <ul className="extras">
                        {extras.map((item, index) =>{
                            return <li key="index">- {item}</li>
                        })}
                    </ul>
                </section>
            </>
        )
    }
}
