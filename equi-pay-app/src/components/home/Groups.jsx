import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import {Button, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CreateGroupDialog from "./CreateGroup";
import JoinGroup from "./JoinGroup";
function Groups() {
    const joinedGroups = [
        { name: 'Party', members: 25 },
        { name: 'Hotel', members: 18 },
        { name: 'Travel', members: 42 },
    ];

    return (
        <div className="container mx-auto mt-5">
            <div className={'flex items-center gap-2'}>
                <Button startIcon={<GroupsIcon />}>
                    Groups
                </Button>
                <CreateGroupDialog />
                <JoinGroup />
            </div>
            <ul className="space-y-4">
                {joinedGroups.map((group, index) => (
                    <li key={index} className="flex items-center p-4 rounded-lg shadow-md bg-white">
                        <div className="rounded-full h-8 w-8 bg-blue-500 text-white flex items-center justify-center mr-4">
                            {group.members}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">{group.name}</h2>
                            <p className="text-gray-600">{group.members} members</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Groups;
