import { Server } from 'miragejs'

export function routes(this: Server) {
  this.namespace = 'api' // api/users
  this.timing = 750 // ms

  // routes
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
  this.post('/users')

  // no next existe rotas de api, precisa ou colocar namespace diferente
  // ou resetar
  this.namespace = ''

  // rotas nao detectadas, sao repassadas para o network request
  this.passthrough()
}
