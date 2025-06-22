import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTaskStore, type Task } from '@/stores/TaskStore.ts'
import * as api from '@/services/TaskApi'

describe('TaskStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads tasks from API', async () => {
    const tasks: Task[] = [
      { id: 1, title: 'first', priority: 1, completed: false, createdAt: '2024-01-01' }
    ]
    vi.spyOn(api, 'getAllTasks').mockResolvedValue(tasks)
    const store = useTaskStore()
    await store.loadTasks()
    expect(store.tasks).toEqual(tasks)
  })

  it('adds a task', async () => {
    const created: Task = { id: 2, title: 'second', priority: 2, completed: false, createdAt: '2024-01-01' }
    vi.spyOn(api, 'createTask').mockResolvedValue(created)
    const store = useTaskStore()
    await store.addTask({ title: 'second', priority: 2, dueDate: undefined, description: '', recurring: 'none' })
    expect(store.tasks[0]).toEqual(created)
  })

  it('deletes a task', async () => {
    vi.spyOn(api, 'deleteTask').mockResolvedValue()
    const store = useTaskStore()
    store.tasks = [{ id: 3, title: 't', priority: 1, completed: false, createdAt: '2024-01-01' }]
    await store.deleteTask(3)
    expect(store.tasks).toHaveLength(0)
  })
})
