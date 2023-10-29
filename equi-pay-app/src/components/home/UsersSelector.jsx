import {useEffect, useState} from "react";
import {Avatar} from "@mui/material";


function UsersSelector({friends, onChange}) {
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    useEffect(() => {
        onChange(selectedUserIds.map(id => friends.find(friend => friend.id === id)));
    }, [selectedUserIds]);

    return (
        <div>
            <div style={{
                maxHeight: '30vh',
                overflow: 'auto'
            }}>
                <ul className={'w-full cursor-pointer'}>
                    {friends.map(friend => {
                        const selected = selectedUserIds.includes(friend.id);
                        return (
                            <li key={friend.id}
                                onClick={() => {

                                    if (selectedUserIds.includes(friend.id)) {
                                        setSelectedUserIds(selectedUserIds.filter(item => item !== friend.id))
                                    } else {
                                        setSelectedUserIds([...selectedUserIds, friend.id])
                                    }
                                }}
                                className={`w-full 
                                    ${!selected ? 'hover:bg-gray-100' : ''} 
                                    ${selected ? 'bg-sky-200' : ''}
                                    flex items-center gap-2 p-3`}>
                                <input
                                    readOnly
                                    checked={selected}
                                    type={'checkbox'}/>
                                <Avatar sx={{
                                    width: '20px',
                                    height: '20px'
                                }}/>
                                <span>
                                        {friend.name}
                                    </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default UsersSelector;