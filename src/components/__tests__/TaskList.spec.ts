import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect } from 'vitest'
import TaskList from '../Task/TaskList.vue'
import { useTaskStore } from '@/stores/TaskStore'

describe('TaskList.vue', () => {
  it('renders tasks from the store in priority order', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'low', priority: 3, completed: false, createdAt: '' },
      { id: 2, title: 'high', priority: 1, completed: false, createdAt: '' }
    ]

    const wrapper = mount(TaskList, { global: { plugins: [pinia] } })
    const items = wrapper.findAllComponents({ name: 'TaskItem' })
    expect(items).toHaveLength(2)
    // first element should be task with higher priority (1)
    expect((items[0].props('task') as any).id).toBe(2)
  })

  it('filters out completed tasks', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'done', priority: 2, completed: true, createdAt: '' },
      { id: 2, title: 'todo', priority: 1, completed: false, createdAt: '' }
    ]

    const wrapper = mount(TaskList, { global: { plugins: [pinia] } })
    const items = wrapper.findAllComponents({ name: 'TaskItem' })
    expect(items).toHaveLength(1)
    expect((items[0].props('task') as any).id).toBe(2)
  })
})
