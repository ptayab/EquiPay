import * as GetFunctions from ""


export async function TestGet() {
    const responsePromise = fetch('http://localhost:4000/api/test');
    const responseData = await responsePromise.json();
    console.log('testData:', responseData);
    return responseData;
}

export async function TestPost(){
    const content = {
        name: "Test Post",
    }

    const response  = await fetch('http://localhost:4000/api/test', {
        method: POST,
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content)
    });
    console.log(response);
    return response.json()
}