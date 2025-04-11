import { useEffect, useState } from "react"

function usePersonalFetch<T>(url: string): { data: T[], loading: boolean, error: boolean }{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
       async function fetchData(){
           try {
               const response = await fetch(url)
               const json = await response.json()
               setData(json)
               setLoading(false)
           } catch (error) {
               setError(true)
               setLoading(false)
           }
       } 

       fetchData()
    }, [url])

    return { data, loading, error  }
}

export default usePersonalFetch