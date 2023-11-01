import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button } from "@mui/material";
import CreateGroupDialog from "./CreateGroup";
import JoinGroup from "./JoinGroup";

function Groups() {
    const initialGroups = JSON.parse(localStorage.getItem('groups')) || [];

    const [groups, setGroups] = useState(initialGroups);

    const addGroup = (newGroup) => {
        const updatedGroups = [...groups, newGroup];
        setGroups(updatedGroups);
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
    };

    const deleteGroup = (groupToDelete) => {
        const updatedGroups = groups.filter(group => group.name !== groupToDelete.name);
        setGroups(updatedGroups);
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
    };

    return (
        <div className="container mx-auto mt-5">
            <div className={'flex items-center gap-2'}>
                <Button startIcon={<GroupsIcon />}>
                    Groups
                </Button>
                <CreateGroupDialog onGroupCreated={addGroup} />
                <JoinGroup />
            </div>
            <ul className="space-y-4">
                {groups.map((group, index) => (
                    <li key={index} className="flex items-center p-4 rounded-lg shadow-md bg-white">
                        <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center mr-4">
                            {group.members}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">{group.name}</h2>
                            <p className="text-gray-600">{group.members} members</p>
                        </div>
                        <button onClick={() => deleteGroup(group)}>Delete</button> {/* Add a delete button */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Groups;
