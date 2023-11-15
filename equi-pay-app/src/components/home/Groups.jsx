import React, {useState, useEffect} from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import {Button} from "@mui/material";
import CreateGroupDialog from "./CreateGroup";
import * as fetch from "./../../lib/fetch";
import {useParams, useNavigate} from 'react-router-dom';

function Groups({callback}) {
    const {userId} = useParams();
    const {profileStatus, setProfileStatus} = callback;
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [selectedItem, setSelectedItem] = useState({id: "", group_id: "", valid: false});
    const navigate = useNavigate();

    useEffect(() => {
        // to sort the list of users by display name
        const sortData = (list, field) => {
            return [...list].sort((a, b) => {
                const fieldA = String(a[field]).toLowerCase();
                const fieldB = String(b[field]).toLowerCase();

                if (fieldA < fieldB) return -1;
                if (fieldA > fieldB) return 1;
                return 0;
            });
        };

        // to get the list of users for user selection
        async function fetchData() {
            try {
                const data = await fetch.get("groups/user", {id: userId});
                setJoinedGroups(sortData(data, 'name'));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [userId]);

    // Navigation to Expense Page when a group is selected
    const onSelected = (item) => {
        setSelectedItem({id: item.id, group_id: item.group_id, valid: item.valid});

        //navigate(`/ExpenseList/${item.group_id}`);
        navigate(`expenseList/group/${item.group_id}`)
    };

    // To add a new group to the list
    const onNewGroup = (newGroup) => {
        setJoinedGroups([...joinedGroups, newGroup]);
    };

    return (
        <div className="container mx-auto mt-5">
            <div className={'flex items-center gap-2'}>
                <Button startIcon={<GroupsIcon/>}>Groups</Button>
                <CreateGroupDialog onGroupCreated={onNewGroup}/>
            </div>
            <ul className="space-y-4">
                {joinedGroups.map((group, index) => (
                    <li key={index}
                        className={`
                              flex items-center p-4 rounded-lg shadow-md
                              ${group.id === selectedItem.id ? "bg-blue-100 hover:bg-blue-200" : "bg-white hover:bg-blue-50"}`}
                        onClick={() => onSelected({id: group.id, group_id: group.group_id, valid: false})}>
                        <div
                            className={`rounded-full h-8 w-8 flex items-center justify-center mr-4bg-blue-500 text-white`}>
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