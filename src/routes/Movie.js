import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import styled from "styled-components"

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`
const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`

export default function Movie() {
  const { id } = useParams()
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  })

  if (loading) {
    return <h1>Fetcing Movie...</h1>
  }

  const onClick = () => {
    // cache 정보는 브라우저가 닫히기 전까지 유지
    cache.writeFragment({
      id: `Movie:${id}`, // Apollo development tool > Cache 참고

      // fragment는 타입의 일종으로 gql에 어떤 타입이 쓰일것인지 알려준다.
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,

      // data는 실제 어떤 데이터가 들어가는지 알려준다.
      data: {
        isLiked: !data.movie.isLiked,
      },
    })
  }
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClick}>{data?.movie?.isLiked ? "UnLike" : "Like"}</button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  )
}
