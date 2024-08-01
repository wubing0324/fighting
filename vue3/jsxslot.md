
```javascript
import { ref, defineComponent } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon, ElTooltip } from 'element-plus'
export default defineComponent({
  name: 'RenderMenu',
  components: {
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElIcon,
    ElTooltip
  },
  render() {
    // 递归处理子菜单内容
    const renderChildren = (menuList = [], level = 0) => {
      return menuList.map((menuItem) => {
        let subList
        if (menuItem.children && menuItem.children.length > 0) {
          subList = renderChildren(menuItem.children, level + 1)
        }
        const link = (
          <span class={`menu-item-title${level === 0 ? ' has-icon' : ''}`}>{menuItem.title}</span>
        )
        const slots = {
          title: () => {
            return (
              <>
                {link}
              </>
            )
          }
        }
        const subslots = {
          title: () => {
            return (
              <>
                {link}
              </>
            )
          }
        }
        return (
          <section>
            {subList ? (
              // 有子菜单
              <el-sub-menu
                v-slots={slots}
              >
                {subList}
              </el-sub-menu>
            ) : (
              // 没有子菜单
              <el-menu-item index={menuItem.path} v-show={!menuItem.hidden} v-slots={subslots}>
                {icon}
              </el-menu-item>
            )}
          </section>
        )
      })
    }
    const renderedMenu = renderChildren(this.menuList, 0)
    return (
      <el-menu
        ref="scMenu"
      >
        {renderedMenu}
      </el-menu>
    )
  }
})

```