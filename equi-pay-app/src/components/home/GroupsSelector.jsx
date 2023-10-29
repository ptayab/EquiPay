import {useEffect, useState} from "react";
import PeopleIcon from '@mui/icons-material/People';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {IconButton} from "@mui/material";
import UsersSelector from "./UsersSelector";
const friends = [
    {
        id: 1,
        name: 'Corey'
    },
    {
        id: 2,
        name: 'Dale'
    }
];

const groups = [
    {
        id: 1,
        name: 'Travel',
        users: [
            {
                id: 3,
                name: 'Randy'
            },
            {
                id: 4,
                name: 'Stezzy'
            }
        ]
    },
    {
        id: 2,
        name: 'Party',
        users: [
            {
                id: 5,
                name: 'Bob'
            }
        ]
    }
]
function GroupsSelector({onChange}) {
    const [activeGroup, setActiveGroup] = useState();
    const [selected, setSelected] = useState({});
    const handleSelect = (groupId, users) => {
        setSelected({
            ...selected,
            [groupId]: [...users]
        });
    }
    useEffect(() => {
        onChange(selected);
    }, [selected]);
    return (
        <div>
            <h3 className={'font-bold'}>Groups</h3>

            <ul className={'mt-2'}>
                {groups.map(group => {
                    const active = activeGroup === group.id;

                    return (
                        <li key={group.id}>
                            <div onClick={() => {
                                if (activeGroup === group.id) {
                                    setActiveGroup(null);
                                } else {
                                    setActiveGroup(group.id)
                                }
                            }} className={'flex items-center cursor-pointer'}>
                                <ArrowRightIcon
                                    style={{
                                        transition: '0.2s',
                                        transform: `rotate(${active ? '90deg' : '0deg'})`
                                    }}
                                    className={'mr-3'}/>
                                <PeopleIcon className={'mr-1'}/>
                                <small>{group.name}</small>
                            </div>
                            {active && (
                                <div className={`ps-10`}>
                                    <UsersSelector
                                        onChange={(users) => {
                                            handleSelect(group.id, users)
                                        }}
                                        friends={group.users}/>
                                </div>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default GroupsSelector;