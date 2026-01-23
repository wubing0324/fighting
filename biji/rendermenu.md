```javascript
export default defineComponent({
  name: "RenderMenu",
  mixins: [layoutMX],
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    pageCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activeMenuName: this.pageCode,
      oldPath: "",
    };
  },
  computed: {
    ...mapState({
      collapseMenu: (state) => state.menu.hideAsideMenu,
      menuMap: (state) => state.menu.menuMap,
    }),
  },
  watch: {
    // 监听页面code变化，设置新的选中code
    pageCode(newCode) {
      this.activeMenuName = newCode;
    },
  },
  created() {
    bus1.$on("moveMenu", () => {
      let menu = document.getElementsByClassName("nav-menu-container");
      let actives = menu[0].getElementsByClassName("is-active");
      let active = Array.from(actives).pop();
      active.scrollIntoView({ behavior: "smooth" });
    });
  },
  methods: {
    /**
     * @name 项圣
     * @Date 2021-09-08 15:36:45
     * @introduction 菜单项点击事件回调
     * @description 阻止冒泡，保存当前激活子菜单code，跳转路由
     * @param {参数类型} 参数 参数说明
     * @return {返回类型说明}
     * @exception [违例类型] [违例类型说明]
     */
    openMenuHandler(event, menuItem = {}) {
      event.stopPropagation();
      // 如果有fChildName属性，说明不是子菜单，需要手动展开menu
      if (!menuItem.fChildName) {
        this.activeMenuName = menuItem.name;
      }
      if (menuItem.isStaticLink) {
        window.open(menuItem.path, menuItem.target);
      } else if (!menuItem.fChildName && menuItem.path !== this.$route.path) {
        this.$router.push(menuItem.path);
      }
      bus.$emit("close-main-submenu");
      // 如果当前路由不是隐藏路由，则保存
      const { hidden } = this.menuMap.get(menuItem.path) || { hidden: true };
      if (!hidden) {
        sessionStorage.setItem("lastPath", menuItem.path);
      }
    },
  },
  render(h) {
    // 递归处理子菜单内容
    const renderChildren = (menuList = [], level = 0) => {
      return menuList.map((menuItem) => {
        let subList;
        if (menuItem.children && menuItem.children.length > 0) {
          subList = renderChildren(menuItem.children, level + 1);
        }
        const icon =
          level === 0 ? (
            <sc-icon class="menu-icon" type={menuItem.icon} />
          ) : undefined;
        const map = ["ing", "old", "new"];
        const link = (
          <span class={`menu-item-title${level === 0 ? " has-icon" : ""}`}>
            {menuItem.title}
          </span>
        );
        return (
          <section vOn:click={(event) => this.openMenuHandler(event, menuItem)}>
            {subList ? (
              // 有子菜单
              <sc-submenu
                index={menuItem.path ? menuItem.path + level : ""}
                class={`main-submenu-level${level}`}
                popper-class={`main-submenu-popup ${this.currentSkinClass}`}
              >
                <template slot="title">
                  {icon}
                  {link}
                </template>
                {subList}
              </sc-submenu>
            ) : (
              // 没有子菜单
              <sc-menu-item index={menuItem.path} v-show={!menuItem.hidden}>
                {icon}
                <template slot="title">{link}</template>
              </sc-menu-item>
            )}
          </section>
        );
      });
    };
    const renderedMenu = renderChildren(this.menuList, 0);
    return (
      <sc-menu
        ref="scMenu"
        class={`main-app-sc-menu ${this.currentSkinClass}`}
        mode="vertical"
        router
        collapse={this.collapseMenu}
        default-active={this.$route.path}
      >
        {renderedMenu}
      </sc-menu>
    );
  },
});
```
