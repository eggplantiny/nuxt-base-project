<script setup lang="ts">
import KStack from '~/components/atoms/KStack.vue'
import KBoard from '~/components/atoms/KBoard.vue'

interface Todo {
  id: number
  title: string
  completed: boolean
  userId: number
}

const { data: todos, pending } = await useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos')
</script>

<template>
  <main>
    <KStack>
      <template v-if="pending">
        Loading...
      </template>
      <template v-else>
        <KBoard
          v-for="todo in todos"
          :key="todo.id"
          hover="accent"
        >
          <div class="d-card outline-1 outline outline-base-300 dark:outline-white border-box w-full transition-colors">
            <div class="d-card-body">
              <div class="d-card-side">
                {{ todo.id }}
              </div>
              <div class="d-card-title">
                {{ todo.title }}
              </div>
            </div>
          </div>
        </KBoard>
      </template>
    </KStack>
  </main>
</template>

<style scoped>

</style>
