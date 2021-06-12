import React, { Component } from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer  } from "react-icons/fa";

export class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail/>,
                title: "Free Cocktail",
                info: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, quidem."
            },
            {
                icon: <FaHiking/>,
                title: "Endless Hiking",
                info: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, quidem."
            },
            {
                icon: <FaShuttleVan/>,
                title: "Free Shuttle",
                info: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, quidem."
            },
            {
                icon: <FaBeer/>,
                title: "Strongest Beer",
                info: "Lorem ipsum, dol sit amet consectetur adipisicing elit. Alias, quidem."
            }
        ]
    }
    render() {
        return (
            <section className="services">
               <Title title="Services"/>
               <div className="services-center">
                   {this.state.services.map(( item, index ) => {
                       return (
                           <article key={index} className="service">
                               <span>{item.icon}</span>
                               <h6>{item.title}</h6>
                               <p>{item.info}</p>
                           </article>
                       )
                   })}
               </div>
            </section>
        )
    }
}

export default Services
