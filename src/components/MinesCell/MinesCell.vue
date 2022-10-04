<template>
  <div
    class="cell"
    :class="props.status === 'closed' ? 'cell--closed' : 'cell--opened'"
    @click.prevent="onLeftClick"
    @contextmenu.prevent="onRightClick"
  >
    <img
      v-if="showImage"
      class="cell__image"
      :src="getCellImage"
    />
  </div>
</template>

<script lang="ts" setup>
import { TCellStatus, TCellValue } from '@/models/cell.model'
import { computed } from 'vue'

import oneNumberImage from '@/assets/images/1.svg'
import twoNumberImage from '@/assets/images/2.svg'
import threeNumberImage from '@/assets/images/3.svg'
import fourNumberImage from '@/assets/images/4.svg'
import fiveNumberImage from '@/assets/images/5.svg'
import sixNumberImage from '@/assets/images/6.svg'
import sevenNumberImage from '@/assets/images/7.svg'
import eightNumberImage from '@/assets/images/8.svg'
import mineImage from '@/assets/images/mine.svg'
import flagImage from '@/assets/images/flag.svg'

interface IMinesCellProps {
  id: number,
  value: TCellValue,
  status: TCellStatus
  coords: {
    x: number,
    y: number,
  }
}

const props = defineProps<IMinesCellProps>()

const emit = defineEmits(['click:left', 'click:right'])

const onLeftClick = () => {
  emit('click:left', props)
}

const onRightClick = () => {
  emit('click:right', props)
}

const showImage = computed(() => {
  return (props.status === 'opened' || props.status === 'flagged') && props.value !== 'empty'
})

const getCellImage = computed(() => {
  if (props.status === 'flagged') return flagImage

  const cellValueImageMap = {
    1: oneNumberImage,
    2: twoNumberImage,
    3: threeNumberImage,
    4: fourNumberImage,
    5: fiveNumberImage,
    6: sixNumberImage,
    7: sevenNumberImage,
    8: eightNumberImage,
    mine: mineImage
  }

  return cellValueImageMap[props.value]
})
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  cursor: auto;
}

.cell--closed {
  background-color: lightgray;
  border: 2px outset black;
}

.cell--opened {
  background-color: #efeded;
  border: 1px inset #5d5c5c;
}

.cell__image {
  width: 80%;
  height: 80%;
}
</style>
