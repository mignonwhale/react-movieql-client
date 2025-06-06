import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import styled from "styled-components"

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
      medium_cover_image
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`
const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`
const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`
const PosterContainer = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`
const PosterBg = styled.div`
  background-image: url(${(props) => props.background});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
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
    <Container>
      <Header>
        <Title>Apollo Movies</Title>
      </Header>
      {loading && <Loading>Loading...</Loading>}

      <MoviesGrid>
        {data.allMovies.map((movie) => (
          <PosterContainer key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <PosterBg background={movie.medium_cover_image} />
            </Link>
          </PosterContainer>
        ))}
      </MoviesGrid>
    </Container>
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
