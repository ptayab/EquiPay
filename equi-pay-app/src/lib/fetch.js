const URL = 'http://localhost:4000/api'

export async function get(route, filters) {
    if(!route) { console.log("Fetch Error: No route declered"); return {}}
    // Convert the filters object to a query string

    let apiUrl = `${URL}/${route}`;
    // Append the query string to the URL
    if (filters) { 
        const queryString = Object.keys(filters)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
            .join('&');
        apiUrl += `?${queryString}`
    }

    // Fetch data using the dynamic URL
    const responsePromise = await fetch(apiUrl);
    const responseData = await responsePromise.json();
    
    // console.log('ResponseData:', responseData);
    
    return responseData;
}

export async function post(route, data) {
    if (!route) { console.log("Fetch Error: No route declared");return {}; }
    const apiUrl = `${URL}/${route}`;

    // Fetch data using the dynamic URL and POST method
    const responsePromise = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed
        },
        body: JSON.stringify(data),
    });
    const responseData = await responsePromise.json();
    console.log('ResponseData from',route,':', responseData);
    return responseData;
}

