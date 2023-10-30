import {Stack} from "@mui/material";

import Chip from '@mui/material/Chip';
import {useState} from "react";
import UsersSelector from "./UsersSelector";
import GroupsSelector from "./GroupsSelector";

const friends = [
    {
        id: 1,
        name: 'Dale'
    },
    {
        id: 2,
        name: 'Steezy'
    }
]
function PayerSelector() {

    const [selectedUsers, setSelectedUsers] = useState([]);
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    const handleSelectFriends = (friends) => {
        const newUsers = [...selectedUsers, ...friends];
        setSelectedUsers([...new Set(newUsers)]);
    }
    const handleSelectGroup = (group) => {
        const newUsers = [...selectedUsers];
        for (let key in group) {
            let ids = group[key];
            newUsers.push(...ids);
        }
        setSelectedUsers([...new Set(newUsers)]);
    }
    return (
        <div>
            <h2 className={'text-xl font-bold mb-3'}>Payer</h2>
            <Stack direction={'row'} spacing={1}>
                <Chip label="Dale" variant="outlined" onDelete={handleDelete} />
                <Chip label="Steezy" variant="outlined" onDelete={handleDelete} />

            </Stack>
            <div className={'mt-3'}>

                <h3 className={'font-bold'}>Friend List</h3>
                <UsersSelector onChange={handleSelectFriends} friends={friends}/>
            </div>
            <div className={'mt-3'}>
               <GroupsSelector onChange={handleSelectGroup}/>
            </div>
        </div>
    )
}
export default PayerSelector;