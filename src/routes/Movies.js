import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
  }
`

// hook 사용
export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES)
  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>Could not fetch :(</h1>
  }

  return (
    <ul>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  )
}

// hook 미사용
// export default function Movies() {
//   const [movies, setMovies] = useState([])
//   const client = useApolloClient()
//   useEffect(() => {
//     client
//       .query({
//         query: gql`
//           {
//             allMovies {
//               title
//               id
//             }
//           }
//         `,
//       })
//       .then((result) => setMovies(result.data.allMovies))
//   }, [client])

//   return (
//     <ul>
//       {movies.map((movie) => (
//         <li key={movie.id}>{movie.title}</li>
//       ))}
//     </ul>
//   )
// }
