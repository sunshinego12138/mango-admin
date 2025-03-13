// 方法装饰器
function ConditionalExecution(shouldExecute: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
          if (shouldExecute) {
              // 如果 shouldExecute 为 true，则调用原方法
              return originalMethod.apply(this, args);
          } else {
              console.log(`Method ${propertyKey} is not executed.`);
              // 可以选择返回一个特定的值，或者什么都不做
              return null; // 或者返回其他值
          }
      };
  };
}

class MyClass {
  @ConditionalExecution(true) // 设置为 true，方法会被执行
  myMethod() {
      console.log('myMethod is executed.');
  }

  @ConditionalExecution(false) // 设置为 false，方法不会被执行
  anotherMethod() {
      console.log('anotherMethod is executed.');
  }
}

// 示例用法
const myClassInstance = new MyClass();
myClassInstance.myMethod();      // 输出: myMethod is executed.
myClassInstance.anotherMethod(); // 输出: Method anotherMethod is not executed.
