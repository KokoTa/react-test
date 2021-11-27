import { useEffect, useState } from 'react'
import axios from 'axios'

export function useAsyncData (id) {
  const [res, setRes] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setRes(null)
      let isMounted = true
      const res = await axios.get('https://run.mocky.io/v3/ba136a85-1d57-43d4-bfe4-8a4e6698e61b')
      isMounted && setRes(res.data)
      return () => {
        isMounted = false
      }
    }
    fetchData()
  }, [id])

  return res
}
