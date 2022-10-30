import { Notifiable } from '@domain/tasks/notifyTaskCreated'
import WebSocket from 'ws'
import appConfig from '@config/appConfig'

export class NotifyWebsocketService implements Notifiable {
  notify (string): void {
    try {
      const ws = new WebSocket(`ws://localhost:${appConfig.port}/notify`, {
        headers: { Authorization: appConfig.webSocketKey },
      })

      ws.on('open', () => {
        ws.send(string)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
