<script setup lang="ts">
import RenderedView from '@/shared/components/page/page.component.vue'
import { useIsAuthenticatedGuard } from './composables/is-authenticated.composable'

const { isAuthenticated } = useIsAuthenticatedGuard()
</script>

<template>
  <template v-if="!isAuthenticated">
    <div class="d-flex flex-grow-1 justify-content-center align-items-center p-3">
      <div style="max-width: 40rem" class="d-flex flex-row flex-nowrap gap-3 align-items-center">
        <div class="flex-shrink-0">
          <svg width="9.6rem" viewBox="0 0 30 30">
            <path
              fill="#B5B5BF"
              d="M20.354 28.826c.4.351.85.63 1.334.826l.312.115a4.7 4.7 0 0 0 1.462.233h1.23V15.247c0-6.297-5.08-11.4-11.346-11.4S2 8.95 2 15.246V30h1.23a4.698 4.698 0 0 0 3.108-1.174l.758-.653c.405-.356.904-.48 1.442-.48.538 0 1.038.124 1.443.48l1.026.944a3.542 3.542 0 0 0 4.678 0l.997-.912c.405-.356.934-.513 1.472-.513.538 0 1.037.157 1.442.513l.758.621z"
            />
            <path
              fill="#53535F"
              d="M18.923 13.077a1.923 1.923 0 1 1 3.846 0 1.923 1.923 0 0 1-3.846 0zm-5.385-1.923a1.923 1.923 0 1 1 0 3.846 1.923 1.923 0 0 1 0-3.846zM24.2 24.98l-.758-.621c-.404-.356-.904-.513-1.442-.513-.538 0-1.068.157-1.472.513l-.996.912a3.542 3.542 0 0 1-4.68 0l-1.025-.944c-.405-.356-.905-.48-1.443-.48-.537 0-1.037.124-1.442.48l-.758.653a4.713 4.713 0 0 1-3.108 1.174h-1.23V11.4c0-6.296 5.08-11.4 11.346-11.4 6.267 0 11.346 5.104 11.346 11.4v14.754h-1.23a4.7 4.7 0 0 1-1.462-.234l-.311-.114a4.719 4.719 0 0 1-1.335-.826zm.978-2.68.668.548V11.4c0-4.823-3.884-8.708-8.654-8.708-4.769 0-8.654 3.885-8.654 8.708v11.443l.639-.55c1.048-.914 2.26-1.14 3.208-1.14.951 0 2.169.228 3.22 1.152l.022.02 1.019.937a.85.85 0 0 0 1.094-.002l1.01-.923c1-.88 2.211-1.183 3.25-1.183 1.062 0 2.211.316 3.178 1.146z"
            />
          </svg>
        </div>
        <div class="flex-grow-1">
          <h4 class="fw-normal text-muted">{{ $t('authentication.not-logged-in') }}</h4>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <RenderedView />
  </template>
</template>
