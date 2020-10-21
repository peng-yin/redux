## store

通过核心方法**createStore**得到渲染视图必要的API【getState, dispatch, subscribe】，再将渲染函数注册到监听流当中，每当dispatch触发时，所有注册到监听流的函数都会执行，这也是为什么状态改变时视图也会更新的关键。

## reducers

通过combineReducers将多个reducer合并成一个，此时state是一个对象，每一个reducer的状态对应state的一个键值

## action

action定义好了之后，就可以在视图上触发action来改变state的值，更新视图。通过action.type来匹配reducer中对应的类型来得到新的state值，值得注意的是，原始的Redux只支持返回一个包含type字段的对象，通过redux-thunk中间件，可以进行异步操作，比如说请求接口，拿到数据后触发dispatch。


## bindActionCreators

通过bindActionCreators将dispatch和action绑定在一起，然后直接调用就可以了。 它返回一个方法集合，直接调用来触发dispatch。

```
// 可以不用绑定
this.props.dispatch(counterCreator.increment())
```

## createStore

> 这个方法是Redux核心中的核心，它将所有其他的功能连接在一起，暴露操作的API供开发者调用。

在初始化时，createStore会主动触发一次dispach，它的action.type是系统内置的INIT，所以在reducer中不会匹配到任何开发者自定义的action.type，它走的是switch中default的逻辑，目的是为了得到初始化的状态。

当然也可以手动指定initialState，这里做了一层判断，当initialState没有定义时，才会dispatch，而在源码中是都会执行一次dispatch，我认为没有必要，这是一次多余的操作。因为这个时候，监听流中没有注册函数，走了一遍reducer中的default逻辑，得到新的state和initialState是一样的。

第三个参数enhancer只有在使用中间件时才会用到，通常情况下搭配applyMiddleware来使用，它可以增强dispatch的功能，如常用的logger和thunk，都是增强了dispatch的功能。

同时createStore会返回一些操作API，包括：

- getState：获取当前的state值
- dispatch：触发reducer并执行listeners中的每一个方法
- subscribe：将方法注册到listeners中，通过dispatch来触发


## applyMiddleware

> 这个方法通过中间件来增强dispatch的功能。

中间件是有执行顺序的。像在这里，第一个参数是thunk，然后才是logger，因为假如logger在前，那么这个时候action可能是一个包含异步操作的方法，不能正常输出action的信息。

## combineReucers

combineReucers将单个reducer塞到一个对象中，每个reducer对应一个唯一键值，单个reducer状态改变时，对应键值的值也会改变，然后返回整个state。


## 心得体会

每一次dispatch都会重新渲染整个视图，虽然React是在虚拟DOM上进行diff，然后定向渲染需要更新的真实DOM，但是我们知道，一般使用Redux的场景都是中大型应用，管理庞大的状态数据，这个时候整个虚拟DOM进行diff可能会产生比较明显的性能损耗（diff过程实际上是对象和对象的各个字段挨个比较，**如果数据达到一定量级**，虽然没有操作真实DOM，也可能产生可观的性能损耗，在小型应用中，由于数据较少，因此diff的性能损耗可以忽略不计）
