import {
  createServer,
  Model,
  Factory,
  Response,
  ActiveModelSerializer,
} from 'miragejs'
import { faker } from '@faker-js/faker'

type User = {
  name: string
  email: string
  created_at: string
}

export function initMockServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },
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
    routes() {
      // caminho
      this.namespace = 'api' // api/users
      this.timing = 750 // ms

      // crud - shorthands
      // adicionar paginacao
      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        // reduzir pagina (pagina 1 mas na vdd é 0)
        //
        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        // serializers - dados retornados passem pelo processo de serializacao
        // controle dos dados para converter
        const users = this.serialize(schema.all('user'))['users'].slice(
          pageStart,
          pageEnd
        )

        // retorna os dados de paginacao no header - são meta dados
        // nao faz parte da listagem

        return new Response(200, { 'x-total-count': String(total) }, { users })
      })

      this.get('/users/:id')

      this.post('/users', function (schema, request) {
        const { user } = JSON.parse(request.requestBody)

        const isEmailAlreadyExists = schema.findBy('user', {
          email: user.email,
        })

        if (isEmailAlreadyExists) {
          return new Response(
            400,
            {
              'Content-Type': 'application/json',
            },
            { errors: 'User email already exists' }
          )
        }

        return new Response(200)
      })

      // no next existe rotas de api, precisa ou colocar namespace diferente
      // ou resetar
      this.namespace = ''

      // rotas nao detectadas, sao repassadas para o network request
      this.passthrough()
    },
  })

  return server
}
