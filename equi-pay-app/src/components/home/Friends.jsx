import GroupsIcon from "@mui/icons-material/Groups";
import {Button, IconButton} from "@mui/material";
import React, { useState, useEffect } from "react";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AddIcon from "@mui/icons-material/Add";
import AddFriend from "./AddFriend";
import * as fetch from "./../../lib/fetch"
import { useParams } from 'react-router-dom';

function Friends({callback}) {
    const {  profileStatus, setProfileStatus  } = callback;
    const [friends, setFriends] = useState([]);
    const { userId } = useParams();
    
    useEffect(() => {
            const sortData = (list, field) => {
                return [...list].sort((a, b) => {
                const fieldA = String(a[field]).toLowerCase();
                const fieldB = String(b[field]).toLowerCase();
        
                if (fieldA < fieldB) return -1;
                if (fieldA > fieldB) return 1;
                return 0;
                });
            };

            async function fetchData() {
                try {
                    const data = await fetch.get("users");
                    const filteredData = data.filter(item => item.id !== parseInt(userId, 10));
                    setFriends(sortData(filteredData, 'displayname'));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
        }, []);

    // const friends = [
    //     { name: 'Friend 1', needPay: 12 },
    //     { name: 'Friend 2', needPay: 8 },
    //     { name: 'Friend 3', needPay: 17 },
    // ];
    function FriendEntry({profile}){
        const [entryData, setEntryData] = useState(profile);
        
        useEffect(() => {
            console.log(profile)
            async function fetchData() {
                try {
                    const data = await fetch.get("expenses", { user_id: profile.id, group_id:profileStatus.group });
                    let totalBalance = 0;

                    if (data && data.length > 0) {
                      totalBalance = data.reduce((sum, entry) => sum + entry.balance, 0);
                    }
                    setEntryData({...entryData, needPay: totalBalance})

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
        }, []);
        return (
            <li  className="flex items-center p-4 rounded-lg shadow-md bg-white">
                <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center mr-4">
                    ${entryData.needPay}
                </div>
                            <div>
                                <h2 className="text-lg font-semibold">{entryData.displayname}</h2>
                                <p className="text-gray-600">Mutual Friends: {Math.floor(Math.random() * 5) + 1}</p>
                            </div>
            </li>
        )
    }

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
                    <FriendEntry key={index} profile={friend} />
                ))}
            </ul>
        </div>
    );
}

export default Friends;


