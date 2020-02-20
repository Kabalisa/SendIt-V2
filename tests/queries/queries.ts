export const GET_USERS = `
{
  getUsers {
    ... on GetUsers {
      results {
        id
        email
        isVerified
        role
      }
    }
    ... on RequestError{
      errorType
      errorMessage
    }
  }
}
`;
