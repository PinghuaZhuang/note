# UMIJS

## 桥套路由

https://segmentfault.com/a/1190000024491097

````jsx
<Content>
     <Switch>
         <Route path="/" component={dataPage} exact />
         <Route path="/charts" component={dataPage} exact />
         <Route path="/charts/data" component={dataPage} exact />
         <Route path="/charts/chart" component={chartPage} />
     </Switch>
 </Content>
````

注入 history

```jsx
import {withRouter} from 'react-router-dom';
//...
export default withRouter(IndexLayout);
```

