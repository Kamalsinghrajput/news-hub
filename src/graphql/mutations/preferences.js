import { gql } from "graphql-request";

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
