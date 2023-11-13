import React, { createContext, useState, useEffect, useCallback  } from 'react';
import { useParams } from 'react-router-dom';
import * as Fetch from "../lib/fetch"

export const UserContextData = createContext();

export const UserProvider = ({ children }) => {
	const { userId } = useParams(); // Extract user ID from the URL
	const [userContext, setUserContext] = useState({
		id: userId ? parseInt(userId, 10) : 0, // Convert to integer, or set to 0 if not present
		name: "",
	  });

	const updateUserContext = useCallback((id, name) => {
		setUserContext({ ...userContext, id, name });
	}, [userContext]);

	// Check if the data has placeholder values
	const hasPlaceholders = userContext.id === 0 && userContext.name === "";

	// Perform an action if data has placeholder values
	useEffect(() => {
		if (hasPlaceholders && userId) {
			const fetchUserData = async () => {
				const userData = await Fetch.get("groups", { id: userId });
				updateUserContext(userData.id, userData.displayname);
		  	};
	  
		  	fetchUserData();
		}
	  }, [hasPlaceholders, updateUserContext, userId]); 

	return (
		<UserContextData.Provider value={{ userContext, updateUserContext }}>
		{children}
		</UserContextData.Provider>
	);
};