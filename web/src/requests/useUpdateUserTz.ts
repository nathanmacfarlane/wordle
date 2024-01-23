import {
  UpdateUserTzMutation,
  UpdateUserTzMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

export const UPDATE_USER_TZ_QUERY = gql`
  mutation UpdateUserTzMutation($timezone: String!) {
    updateUserTz(timezone: $timezone)
  }
`

export const useUpdateUserTz = (
  options?: GraphQLMutationHookOptions<
    UpdateUserTzMutation,
    UpdateUserTzMutationVariables
  >
) => {
  return useMutation<UpdateUserTzMutation, UpdateUserTzMutationVariables>(
    UPDATE_USER_TZ_QUERY,
    options
  )
}
