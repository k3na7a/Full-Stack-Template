<script setup lang="ts">
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'

import { useUserAdminHandler } from '../handlers/user.handler.ts'
import { UserDto } from '@/core/apis/dto/user.dto.ts'

const { t } = useI18n()
const handler = useUserAdminHandler(t)

const props = defineProps<{
  user: UserDto
  callback: (values: UserDto) => void
}>()

const user = toRef(props, 'user')

function update(_: MouseEvent): void {
  handler.uploadAvatar(user.value, props.callback)
}

function remove(_: MouseEvent): void {
  handler.removeAvatar(user.value, props.callback)
}
</script>

<template>
  <div class="profile-picture-settings d-flex flex-column flex-sm-row p-3 gap-3 align-items-sm-center">
    <div class="d-flex row-header justify-content-center justify-content-sm-start">
      <img class="avatar-icon rounded-circle" :src="user.profile.avatar" />
    </div>
    <div class="d-flex flex-column align-items-start flex-grow-1 gap-1">
      <div class="d-flex gap-2 flex-nowrap align-items-center">
        <div>
          <button class="btn btn-secondary px-2" type="button" @click="update">
            {{ $t('actions.update-avatar') }}
          </button>
        </div>
        <div>
          <button class="btn btn-dark btn-icon px-0 fw-normal" type="button" @click="remove">
            <font-awesome-icon :icon="['fas', 'trash-can']" />
          </button>
        </div>
      </div>
      <p class="text-light-alt">
        {{ $t('forms.img-input-warning') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/shared/sass/variables/index';

.profile-picture-settings {
  img {
    width: 9.6rem;
    height: 9.6rem;
    object-fit: cover;
  }
}
</style>
