import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import {Avatar, Button} from "@mui/material";
import CreateGroupDialog from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import {authedRequest} from "../../http";

function Groups() {
    const grouptext = '';
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [reloadGroups, setReloadGroups] = useState(true);
    useEffect(() => {
        // Fetch group data from the server when the component mounts
        authedRequest.get(`/api/groups`)
            .then(res => {
                if (res && res.data) {
                   setJoinedGroups(res.data);
                }
            }).catch(err => {

        })


    }, [reloadGroups]);

        // Function to update the list of groups when a new group is created
    const onGroupCreated = async ({groupName}) => {
        try {
            await authedRequest.post(`/api/groups`, {
                name: groupName,
                members: []
            });
            setReloadGroups(!reloadGroups);

        } catch (err) {

        }
    };

    return (
        <div className="container mx-auto mt-5">
            <div className={'flex items-center gap-2'}>
                <Button startIcon={<GroupsIcon />}>
                    Groups
                </Button>
                <CreateGroupDialog onGroupCreated={onGroupCreated} />
                <JoinGroup />
            </div>
            <ul className="space-y-4">
            {joinedGroups.map((group, index) => (
    <li key={index} className="flex items-center p-4 rounded-lg shadow-md bg-white">
        <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center mr-4">
            <Avatar>
                {group.name[0]}
            </Avatar>
        </div>
        <div>
            <h2 className="text-lg font-semibold">
                {group && group.name ? group.name : 'No Name Available'}
            </h2>
        </div>
    </li>
))}

            </ul>
        </div>
    );
}

export default Groups;
