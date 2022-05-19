import {gql} from '@apollo/client';

export const listPost = gql`
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        User {
          id
          name
          username
          image
        }
        Comments(limit: 2) {
          items {
            id
            comment
            User {
              id
              name
              username
            }
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            _deleted
            User {
              id
              username
            }
          }
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
