import React from "react";
import {Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
function Groupdetail({friends}) {
    return (
        <div className={'p-4 grid grid-cols-4 gap-2'}>
            <div className={'col-span-1'}>
            </div>
            <div className={'grid col-span-3'}>
                <h1 className={'text-xl'}>
                    {friends.name}
                </h1>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary={'Dale'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary={'Steezy'}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary={'Vince'}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}
export default Groupdetail;