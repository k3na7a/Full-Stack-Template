<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'

import { useFormUtil } from '@/core/utilities/forms.util'
import { FormValues, validationSchema } from '../schema/image-upload-validation.schema'

import ModalTitleComponent from '@/shared/components/modal/modal-title.component.vue'
import FileInputComponent from '@/shared/components/inputs/file.input.vue'

const loading = ref<boolean>(false)
const props = defineProps<{
  callback: (values: FormValues) => Promise<void>
  title: string
  action: string
}>()

const { getSubmitFn } = useFormUtil()
const onSubmit = getSubmitFn(validationSchema, (values: FormValues) => {
  loading.value = true
  props.callback(values).finally(() => (loading.value = false))
})
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="validationSchema" v-slot="{ meta }">
    <div class="d-flex flex-column gap-3">
      <ModalTitleComponent :title="props.title" />
      <div class="d-flex flex-column">
        <FileInputComponent name="image" />
      </div>
      <div class="d-grid">
        <button :disabled="!meta.valid || loading || !meta.dirty" class="btn btn-primary px-0" type="submit">
          <div v-if="!loading" class="containter">{{ props.action }}</div>
          <div v-else class="containter">{{ $t('actions.loading') }}</div>
        </button>
      </div>
    </div>
  </Form>
</template>
