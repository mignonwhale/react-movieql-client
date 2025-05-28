import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`

export default function Movie() {
  const { id } = useParams()
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  })

  if (loading) {
    return <h1>Fetcing Movie...</h1>
  }
  return <h1>{data.movie.title}</h1>
}
