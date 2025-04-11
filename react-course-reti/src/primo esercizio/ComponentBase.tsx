import usePersonalFetch from "../custom-hooks/usePersonalFetch";

interface DataItem {
    id: number;
}

function ComponentBase() {

    const { data, loading, error } = usePersonalFetch<DataItem>("https://api.github.com/users/microsoft/repos")

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    return (
        <>
            {data.map(element => (
                <div key={element.id}>{element.id}</div>
            ))}
        </>
    )
}

export default ComponentBase;