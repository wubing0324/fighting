<template>
  <div class="table_list">
    <table>
      <thead>
        <tr class="head">
          <th v-for="(item, index) in columns" :key="index" class="head-th" :style="{width: item.width}">{{ item.label }}</th>
        </tr>
      </thead>
      <tbody v-if="data.length">
        <tr v-for="(item, index) in data" :key="index" class="row poi" @click="handleRowClick(item, index)" :class="{active: activeIndex === index}">
          <td v-for="(_item, _index) in columns" :key="_index" :class="`col${_index}`" class="col" :style="{width: _item.width}">
            <div v-if="_item.render">
              <expand-dom
                :column="_item"
                :index="index"
                :render="_item.render"
                :row="item"
              />
            </div>
            <div v-else>
              <sc-tooltip class="item" effect="dark" :content="item[_item.prop]||'—'" placement="top">
                <span>{{formatValue(item[_item.prop])}}</span>
              </sc-tooltip>
            </div>
          </td>
        </tr>
      </tbody>
      <div v-else class="nodata">
        <span>暂无数据</span>
      </div>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeIndex: -1
    }
  },
  methods: {
    formatValue (val) {
      if (val || val === 0) {
        return val
      }
      return '-'
    },
    handleRowClick (item, index) {
      this.$emit('rowClick', item)
      this.activeIndex = index
    }
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const defaultParams = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) defaultParams.column = ctx.props.column
        return ctx.props.render(h, defaultParams)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.head
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-size: .14rem;
  line-height: .24rem;
  color: #fff
  size 100% .27rem
  background: linear-gradient(175.34deg, rgba(123, 229, 255, 0) 3.77%, rgba(32, 144, 248, 0.33) 78.07%, rgba(114, 32, 248, 0.6) 108.21%);
  .head-th
    position sticky
    top 0
    white-space nowrap
  th
    border-bottom solid .01rem white
.row
  height: .36rem
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-size: .16rem;
  line-height: .36rem;
  color #fff
  text-align: center
  &.active
    background linear-gradient(175.34deg, rgba(123, 229, 255, 0) 3.77%, rgba(32, 144, 248, 0.33) 78.07%, rgba(114, 32, 248, 0.6) 108.21%)
  div
    max-height .36rem
.col
  max-width 25%
  div
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
.col0
  color #37ABFF
.col&:last-child
  color #37ABFF
.table_list
  size 100%
  overflow auto
  top 0
  table
    height 100%
    width calc(100% - .2rem)
    margin-left 0.1rem
    overflow auto
    table-layout: fixed;
    border-collapse:collapse
tr
  // padding-left .1rem
  th, td
    &:first-child
      padding-left .1rem
tbody
  size 100% calc(100% - .3rem)
  overflow auto
.nodata
  text-align center
table>tbody>tr,table>thead{
  display: table;
  width: 100%;
  table-layout: fixed; /* 重要  表格固定算法 */
}
table>tbody{
  overflow: hidden;
  display: block;
  overflow: hidden;
  overflow-y: auto;
}
</style>
