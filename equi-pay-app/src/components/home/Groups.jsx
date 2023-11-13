import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button } from "@mui/material";
import CreateGroupDialog from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import * as fetch from "./../../lib/fetch"
import { useParams } from 'react-router-dom';

function Groups({callback}) {
    const { userId } = useParams();
    const {  profileStatus, setProfileStatus  } = callback;
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [otherGroups, setOtherGroups] = useState([]);
    const [ selectedItem, setSelectedItem] = useState({id: "", valid: false});

    // On Load
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
                const data = await fetch.get("groups/user",{ id: userId});
                setJoinedGroups(sortData(data, 'name'));

                const moredata = await fetch.get("groups");

                const OtherGroups = moredata.filter(itemMoreData => !data.some(itemData => itemData.group_id === itemMoreData.id));
                setOtherGroups(sortData(OtherGroups, 'name'));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [userId]);

    const onSelected = (item) => { 
        setSelectedItem({id:item.id, valid:false}) 
        if(!item.valid) {
            setProfileStatus({...profileStatus, group: item.id})
        }
    }

    // Function to update the list of groups when a new group is created
    const onNewGroup = (newGroup) => {
        // Update the state with the new group
        const CheckOtherIndex = otherGroups.findIndex(item => item.id === newGroup.id);
        if (CheckOtherIndex !== -1) {
            setJoinedGroups([...joinedGroups, otherGroups[CheckOtherIndex]])
            otherGroups.splice(CheckOtherIndex, 1);
            setOtherGroups([...otherGroups]);
        } else {
            setJoinedGroups([...joinedGroups, newGroup]);
        }

        
    };

    return (
        <div className="container mx-auto mt-5">
            <div className={'flex items-center gap-2'}>
                <Button startIcon={<GroupsIcon />}>Groups</Button>

                <CreateGroupDialog onGroupCreated={onNewGroup}  />

                { selectedItem.valid ? <JoinGroup groupId={selectedItem.id} newGroupCallback={onNewGroup}  /> : <></>}
            </div>
            <ul className="space-y-4">
                {joinedGroups.map((group, index) => (
                    <li key={index} 
                        className={`
                            flex items-center p-4 rounded-lg shadow-md
                            ${group.id === selectedItem.id ? "bg-blue-100 hover:bg-blue-200" : "bg-white hover:bg-blue-50" }
                        `}
                        onClick={() => onSelected({id:group.id, valid:false})}

                    >
                        <div 
                            className={`rounded-full h-8 w-8 flex items-center justify-center mr-4bg-blue-500 text-white`}
                        >
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

                {otherGroups.map((group, index) => (
                    <li key={index} 
                        className={`
                            flex items-center p-4 rounded-lg shadow-md
                            ${group.id === selectedItem.id ? "bg-red-200 hover:bg-red-300" : "bg-red-50 hover:bg-red-100" }
                        `}
                        onClick={() => onSelected({id:group.id, valid:true})}

                    >
                        <div 
                            className={`rounded-full h-8 w-8 flex items-center justify-center mr-4bg-blue-500 text-white`}
                        >
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
