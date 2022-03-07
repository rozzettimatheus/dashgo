import { Model } from 'miragejs'

import { User } from '@models/user'

export const models = {
  user: Model.extend<Partial<User>>({}),
}
