# 方案设计

## 如何在 JavaScript 中实现不可变对象？

todo：

## 命令模式 模拟Undo，Redo操作

**命令模式**： 将一个动作封装成一个对象，从而使您可以用不同的请求对客户进行参数化。

``` js
class CommandManager {
  undoStack = [];
  redoStack = [];

  constructor(store) {
    this.store = store;
  }
  

  execute = (params) => {
    const command = { ...params }

    if (command) {
      this.undoStack.push(this.store);
      this.store={ ...params };
      this.redoStack = [];
    }
  };

  undo = () => {
    const command = this.undoStack.pop();
    if (command) {
      this.redoStack.push(this.store);
      this.store={ ...command };
    }
  };

  redo = () => {
    const command = this.redoStack.pop();
    if (command) {
      this.undoStack.push(this.store);
      this.store={ ...command };
    }
  }
}
```

**跟策略模式的配合**

```html
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
<button id="replay">播放录像</button>

</body>
<script>
    var Ryu = {
        attack: function(){
            console.log( '攻击' );
        },
        defense: function(){
            console.log( '防御' );
        },
        jump: function(){
            console.log( '跳跃' );
        },
        crouch: function(){
            console.log( '蹲下' );
        }
    };

    // ----------------正常思路用法------------------------
    // //  需要以此类推写四个命令
    // var AttackCommand = function(reciver){
    //     this.reciver = reciver
    // }
    // AttackCommand.prototype.execute = function(){
    //     this.reciver.attack()
    // }
    // // invoker 调用者
    // var setCommand = function(command){
    //     command.execute()
    // }
    // --------------------------------------------------
    // 利用策略模式配合 解决需要写四个 命令
    var makeCommand = function( receiver, state ){ // 创建命令
        return function(){
            receiver[ state ]();
        }
    };

    var commands = {
        "119": "jump", // W
        "115": "crouch", // S
        "97": "defense", // A
        "100": "attack" // D
    };
    var commandStack = []; // 保存命令的堆栈
    document.onkeypress = function( ev ){
        var keyCode = ev.keyCode,
            command = makeCommand( Ryu, commands[ keyCode ] );
        if ( command ){
            command(); // 执行命令
            commandStack.push( command ); // 将刚刚执行过的命令保存进数组队列中
        }
    };

    document.getElementById( 'replay' ).onclick = function(){ // 点击播放录像
        var command;
        while( command = commandStack.shift() ){ // 从队列里依次取出命令并执行
            command();
        }
    };
</script>

</html>
```

## 单例模式

**定义**： 保证一个类有且仅有一个实例，并提供一个访问它的全局访问点。  
**实现**： 用闭包来实现，这样我们可以使用new来实例化

```js
const createSingleton = (function () {
  let instance = null;
  return function () {
    if (instance) {
      return instance;
    }
    // 你的业务逻辑 todo

    return (instance = this);
  };
})();

// test
const a = new Singleton();
const b = new Singleton();

console.log(a === b); // true
```
