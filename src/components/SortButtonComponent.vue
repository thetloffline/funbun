<template>
  <button
    :key="label"
    :id="id"
    :class="{ btnSelected: isSelected === true }"
    class="btn-card btn-sort"
    @click="setSortParam(id, $event.target)"
  >
    {{ label }}
    <span
      :class="{
        'desc sort-icon': sortStateData.value && isSelected,
        'asc sort-icon': !sortStateData.value && isSelected
      }"
      
    >
    </span>
  </button>
</template>

<script>
import store from '../store/store'
import { mapGetters } from 'vuex'

export default {
  name: 'sortButton',

  props: {
    label: '',
    id: ''
  },

  data () {
    return {
      sortStateData: {
        value: true,
        sortParam: ''
      }
    }
  },

  computed: {
    ...mapGetters(['selectedSortButton']),

    isSelected () {
      return this.selectedSortButton === this.id
    }
  },

  methods: {

    async setSortParam (sortParam, e) {
      this.sortStateData.sortParam = sortParam

      this.sortStateData.value = !this.sortStateData.value

      await this.$store.dispatch(
        'setSelectedButton',
        this.sortStateData.sortParam
      )

      await this.$store.dispatch(
        'setSortDirection',
        this.sortStateData.value
      )
    }
  }
}
</script>

<style scoped>
/* BUTTON */
.btnSelected {
  color: white !important;
  background-image: linear-gradient(#fe515c);
  box-shadow: 0 12px 30px rgba(254, 81, 9, 0.3) !important;
}
.btn-sort {
  flex-grow: 1;
  justify-content: center;
  margin: 0 1.2rem 0 0;
  padding: 12px 18px;
  background-color: white;
  color: darkslategray;
  border: none;
  transition: 0.2s all;
  outline: 0;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.02);
  font-weight: 500;
  font-size: 1rem;
}
/* .btn-sort:hover {
  background-color: midnightblue;
  color: white !important;
} */
.sort-icon {
  pointer-events: none;
  margin: auto 0 auto 6px;
  width: 12px;
  height: 16px;
}
.asc {
  background: url(./../assets/asc-arrow.svg) no-repeat center;
  background-size: 12px;
}
.desc {
  background: url(./../assets/desc-arrow.svg) no-repeat center;
  background-size: 12px;
}
</style>
