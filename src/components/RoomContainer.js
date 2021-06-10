import React from 'react';
import { WithRoomConsumer } from '../Context';
import RoomsFilter from './RoomFilter';
import RoomsList from './RoomList';
import Loading from './Loading';

function RoomConsumer({context}) {
    const {loading, sortedRooms, rooms} = context;
    if (loading) {
        return <Loading/>
    }
    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    )
}
export default WithRoomConsumer(RoomConsumer);