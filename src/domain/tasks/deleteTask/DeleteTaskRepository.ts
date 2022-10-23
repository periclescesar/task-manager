export default interface DeleteTaskRepository {
  delete(id: number): Promise<void>
}
