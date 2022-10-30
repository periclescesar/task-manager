import WebSocket from 'ws'
import jwt from 'jsonwebtoken'
import TaskManagerJwtPayload from '@app/TaskManagerJwtPayload'
import { Role } from '@domain/users'
import appConfig from '@config/appConfig'

export default (expressServer) => {
  const webSocketServer = new WebSocket.Server({
    noServer: true,
    path: '/notify',
  })

  expressServer.on('upgrade', (request, socket, head) => {
    const token = request.headers.authorization ?? ''

    if (token !== appConfig.webSocketKey) {
      const jwtPayload = jwt.decode(token.replace('Bearer ', '')) as TaskManagerJwtPayload

      if (jwtPayload?.role !== Role.MANAGER) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return
      }
    }

    webSocketServer.handleUpgrade(request, socket, head, (websocket) => {
      webSocketServer.emit('connection', websocket, request)
    })
  })

  webSocketServer.on(
    'connection',
    function connection (websocketConnection: WebSocket, connectionRequest) {
      websocketConnection.on('message', (message) => {
        if (connectionRequest.headers.authorization !== appConfig.webSocketKey) {
          return
        }

        webSocketServer.clients.forEach(function each (client) {
          if (client !== websocketConnection && client.readyState === WebSocket.OPEN) {
            client.send(message)
          }
        })
      })
    },
  )

  return webSocketServer
}
