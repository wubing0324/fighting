class SimpleRouter {
constructor() {
this.beforeHooks = []; // 存储全局前置守卫
this.currentRoute = null;
}

// 添加全局前置守卫
beforeEach(fn) {
this.beforeHooks.push(fn);
return () => {
this.beforeHooks = this.beforeHooks.filter(hook => hook !== fn);
};
}

// 执行守卫队列
runQueue(queue, from, to, fn) {
const step = index => {
if (index >= queue.length) {
fn();
return;
}

      const hook = queue[index];
      if (hook) {
        hook(from, to, (next) => {
          if (next === false) {
            // 中断导航
            console.log('Navigation aborted');
            return;
          }
          step(index + 1);
        });
      }
    };

    step(0);

}

// 模拟路由跳转
push(to) {
const from = this.currentRoute;
this.currentRoute = to;

    this.runQueue(
      this.beforeHooks,
      from,
      to,
      () => {
        console.log(`Navigation to ${to} completed`);
      }
    );

}
}

// 使用示例
const router = new SimpleRouter();

// 添加第一个守卫
router.beforeEach((from, to, next) => {
console.log(`Guard 1: from ${from} to ${to}`);
setTimeout(() => {
next(); // 必须调用 next()才会继续
}, 500);
});

// 添加第二个守卫
router.beforeEach((from, to, next) => {
console.log(`Guard 2: from ${from} to ${to}`);
next();
});

// 模拟路由跳转
router.push('/home');
// 输出:
// Guard 1: from null to /home
// (500ms 后)
// Guard 2: from null to /home
// Navigation to /home completed
