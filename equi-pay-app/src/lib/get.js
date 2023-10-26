export async function TestGet() {
    const responsePromise = fetch('http://localhost:4000/api/test');
    const responseData = await responsePromise.json();
    console.log('testData:', responseData);
    return responseData;
}