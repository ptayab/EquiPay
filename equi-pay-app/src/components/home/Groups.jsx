import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button } from "@mui/material";
import CreateGroupDialog from "./CreateGroup";
import JoinGroup from "./JoinGroup";

function Groups() {
    const grouptext = '';
    const [joinedGroups, setJoinedGroups] = useState([]);

    useEffect(() => {
        // Fetch group data from the server when the component mounts
        fetch('http://localhost:4000/api/groups/all')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then((data) => {
                setJoinedGroups(data.data);

            })
            .catch((error) => console.error('Error fetching group data', error));
    }, []);

        // Function to update the list of groups when a new group is created
    const onGroupCreated = (newGroup) => {
        // Update the state with the new group

        setJoinedGroups([...joinedGroups, newGroup]);
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
            {group && group.name ? group.name : 'No Name Available'}
        </div>
        <div>
            <h2 className="text-lg font-semibold">
                {group && group.name ? group.name : 'No Name Available'}
            </h2>
            {/* You can include other information here if available */}
        </div>
    </li>
))}

            </ul>
        </div>
    );
}

export default Groups;
