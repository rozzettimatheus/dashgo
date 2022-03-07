import { createServer, Model, Factory, ActiveModelSerializer } from 'miragejs'
import { faker } from '@faker-js/faker'

import { routes } from './routes'
import { models } from './models'

export function initMockServer() {
  const server = createServer({
    models,
    serializers: {
      application: ActiveModelSerializer,
      // como interpretar os dados
      /**
       * user
       * address
       *
       * // relacionamento
       * 1 forma - cadastra o address e passa o id (ruim - 2 chamadas a api)
       * 2 forma - cadastra tudo de uma vez
       *  - padrao de escrita de apis: activemodelSerializer (modelo acima)
       *  - pesquisar tipos de serializers
       *
       * { name: '', email: "", address: { }}
       */
    },
    // formas de gerar dados em massa
    factories: {
      // mesmo nome do model
      user: Factory.extend({
        name(idx: number) {
          return `User ${idx + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(20)
        },
      }),
    },
    seeds(server) {
      server.createList('user', 500) // factory name key
    },
    routes,
  })

  return server
}
