import { Notifiable } from '@domain/tasks/notifyTaskCreated'

export class NotifyService implements Notifiable {
  notify (string): void {
    console.log(string)
  }
}
