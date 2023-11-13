import GroupsIcon from "@mui/icons-material/Groups";
import {Button, IconButton} from "@mui/material";
import React from "react";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AddIcon from "@mui/icons-material/Add";
import AddFriend from "./AddFriend";

function Friends(callback) {
    const { profileStatus, setProfileStatus } = callback;
    const friends = [
        { name: 'Friend 1', needPay: 12 },
        { name: 'Friend 2', needPay: 8 },
        { name: 'Friend 3', needPay: 17 },
    ];


    return (
        <div className="container mx-auto mt-5">
            <div className={'flex items-center gap-2'}>
                <Button color={'error'} startIcon={<PeopleOutlineIcon />}>
                    Friend
                </Button>
                <AddFriend />
            </div>
            <ul className="space-y-4">
                {friends.map((friend, index) => (
                    <li key={index} className="flex items-center p-4 rounded-lg shadow-md bg-white">
                        <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center mr-4">
                            {friend.needPay}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">{friend.name}</h2>
                            <p className="text-gray-600">Mutual Friends: {friend.needPay}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Friends;
