


export default async function Index() {
    const session = await auth();
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col rounded-md bg-gray-100">  
                <div className="rounded-t-md bg-gray-200 p-4 font-bold">
                    Current Session
                    