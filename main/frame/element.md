# element



## el-input 限制只输入数字

```vue
<lk-input
	v-model="value"
	@change="handleChange"
	oninput="value = value.replace(/[^\d]/g, '')"
	:placeholder="iPlaceholder"
/>
```

