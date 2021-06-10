import React, { Component, createContext } from 'react';
//import items from './data';
import Client from './Contentful';

const RoomContext = createContext();

 class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        price: 0,
        pets: false,
        breakfast: false,
        type: 'all',
        capacity: 1
    };
//getData

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "hotelResort",
                order: "fields.name"
            });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter( room => room.featured === true);

            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price:maxPrice,
                maxPrice,
                maxSize
            });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount (){
        this.getData()
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images, id}; 
            return room; 
        });
        return tempItems;
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    }
    handleChange = e => {
        const target = e.target;
        const name = e.target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]:value
        }, this.filterRooms)    
    }
    filterRooms = () => {
       let{
        rooms,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        price,
        pets,
        breakfast,
        type,
        capacity
       } = this.state;
       //all rooms
       let tempRooms = [...rooms];
       //transform value
       capacity = parseInt(capacity);
       price = parseInt(price);
       //filter by type
       if (type !== 'all' ) {
            tempRooms = tempRooms.filter(room => room.type === type)
       }
       //filter by capacity
       if (capacity !== 1 ) {
        tempRooms = tempRooms.filter(room =>  room.capacity >= capacity)
        }
        //filter by price
        tempRooms = tempRooms.filter(room => room.price <= price)
        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
        //filter by breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        //filter by size
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
        //change state
       this.setState({
           sortedRooms: tempRooms
       });
    }
    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom:this.getRoom, handleChange:this.handleChange }}   >
               {this.props.children}
           </RoomContext.Provider>
        )
    }
}
const RoomConsumer = RoomContext.Consumer;

export function WithRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
       return <RoomConsumer>
            { value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}

export  { RoomContext, RoomConsumer, RoomProvider };
