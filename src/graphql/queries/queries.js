import { gql } from "@apollo/client";

export const INSERT_PREFERENCES = gql`
  mutation InsertPreferences($userId: String!, $category: [String!]!) {
    insert_preferences(objects: { user_id: $userId, category: $category }) {
      returning {
        id
        user_id
        category
      }
    }
  }
`;

export const GET_PREFERENCES = gql`
  query GET_PREFERENCES($userId: uuid!) {
    user_preferences(where: { user_id: { _eq: $userId } }) {
      category
    }
  }
`;

export const IS_SAVED = gql`
  query IS_SAVED($userId: uuid!, $articleUrl: String!) {
    is_saved(
      where: { user_id: { _eq: $userId }, article_url: { _eq: $articleUrl } }
    ) {
      user_id
      article_url
    }
  }
`;

export const IS_READ = gql`
  query IS_READ($userId: uuid!, $articleUrl: String!) {
    is_read(
      where: { user_id: { _eq: $userId }, article_url: { _eq: $articleUrl } }
    ) {
      user_id
      article_url
    }
  }
`;

export const MARK_AS_READ = gql`
  mutation InsertIsRead($userId: uuid!, $articleUrl: String!) {
    insert_is_read_one(object: { user_id: $userId, article_url: $articleUrl }) {
      user_id
      article_url
    }
  }
`;
