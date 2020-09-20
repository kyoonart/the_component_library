本项目所涉及到的技术栈：React、TypeScript 、StoryBook、sass

第三方库的使用：react-transtion fontawesome、axios，classnames

React 是组件的世界，创造各种组件就是它的终极目标。

所以我打算仿照Antd的源码准备自己先写一些基础的组件（之前实习的时候也对antd的基础组件进行了二次封装，所以有一点经验），同时也为了夯实基础知识、也算是对自己的一种考验吧~

这里记录一下遇到的问题以及解决方法

### 1、主题变量

定制一系列主题变量、然后应用到各个组件上

~~~css
$white: #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
···
~~~

Mixin的使用，是可以重用的代码块。

使用@mixin命令，定义一个代码块。

~~~ css
@mixin left {
　　　　float: left;
　　　include 　margin-left: 10px;
　　}
~~~

使用@include命令，调用这个mixin

~~~css
　div {
　　　　@include left;
　　}
~~~

mixin的强大之处，在于可以指定参数和缺省值。

~~~css　
　　　　@mixin left($value: 10px) {
　　　　float: left;
　　　　margin-right: $value;
　　}
~~~

使用的时候，根据需要加入参数：

~~~css　　
　　　div {
　　　　@include left(20px);
　　}
~~~

统一导出

~~~ css
@import "./variables";
// layout
@import "./reboot";
// mixin
@import "./mixin";
// animation
@import "../styles/animation";
// Button
@import "../components/Button/style"
···
~~~

### 2、编写组件

（一）、Button

开发流程：

1、确定类型

2、定义接口

3、从props取出参数

4、使用classsNams为Button添加类名

5、根据参数返回逻辑以及HTML

6、编写测试case

7、最后编写stories方便预览

首先需要了解react官方定义的ts类型 例如  ReactNode, FC, ButtonHTMLAttributes,AnchorHTMLAttributes

使用ts时、我们需要考虑到各个参数的类型、确定类型，定义接口，使用接口去规范和约束代码

这里遇到一个问题：ts高级类型

（1）button 上的属性有可能在button上的必须的 但是在 a上不能填写button必须的属性 反之亦然 所以需要把属性设置为可选的 Partial

Partial<T>` 的作用就是将某个类型里的属性全部变为可选项 `?。

~~~js
// React.ButtonHTMLAttributes<HTMLButtonElement> 拿到button所有原生属性
// NativeButtonProps 为原生属性和扩展属性的集合
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
~~~





















