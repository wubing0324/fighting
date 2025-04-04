为ref标注类型
```javascript
import { ref } from 'vue'

// 推导出的类型：Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'

// 有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 Ref 这个类型：
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // 成功！
// 或者，在调用 ref() 时传入一个泛型参数，来覆盖默认的推导行为：
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
```

###### 为 reactive() 标注类型
reactive() 也会隐式地从它的参数中推导类型：
```javascript
import { reactive } from 'vue'

// 推导得到的类型：{ title: string }
const book = reactive({ title: 'Vue 3 指引' })

要显式地标注一个 reactive 变量的类型，我们可以使用接口：
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 指引' })
```
https://cn.vuejs.org/guide/typescript/composition-api#typing-ref

自动类型推导：computed 会根据回调函数的返回值自动推导类型，不需要显式声明类型。
```javascript
const count = ref(0);

// 推导得到的类型：ComputedRef<number>
const double = computed(() => (count.value == 2 ? "123" : 456));

// => TS Error: Property 'split' does not exist on type '456'
const result = double.value.split("");
```
