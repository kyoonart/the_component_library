

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

主要代码~ 可以看出button组件还是非常简单的 

~~~ js
const classes = classNames("btn", className, {
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link") {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button disabled={disabled} className={classes} {...restProps}>
        {children}
      </button>
    );
  }
~~~

测试case  这里使用的是[jest](https://jestjs.bootcss.com/docs//getting-started)  react默认支持的测试框架 很好用 使用它需要看看文档、学习基础测试如何编写

简单示例

~~~js
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
~~~

button测试case  刚开始眼睛看晕了~~~

~~~js
describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>nice</Button>)
    const element = wrapper.getByText('nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()// 证明元素存在
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()

    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>nice</Button>)
    const element = wrapper.getByText('nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button {...testProps} btnType='link' href='https://www.baidu.com/'>nice</Button>)
    const element = wrapper.getByText('nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disabled button when disable set to true', () => {
    const wrapper = render(<Button {...disabledProps}>nice</Button>)
    const element = wrapper.getByText('nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})

~~~

最后一步 编写stories文件 展示我们的button

~~~
const defaultButton = () => (
  <Button onClick={action("clicked")}>default button</Button>
);

const buttonWithSize = () => (
  <div>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
  </div>
);

const buttonWithType = () => (
  <div>
    <Button btnType="danger">danger button</Button>
    <Button btnType="primary">primary button</Button>
    <Button btnType="link" target="_blank" href="https://www.baidu.com/">
      link button
    </Button>
  </div>
);

storiesOf("Button 组件", module)
  .add("Button", defaultButton)
  // .add('不同尺寸的 Button', buttonWithSize, {info: {inline: false}})
  .add("不同尺寸的 Button", buttonWithSize)
  .add("不同类型的 Button", buttonWithType);

~~~

效果

![](https://s1.ax1x.com/2020/09/20/woHSvd.jpg)

![](https://s1.ax1x.com/2020/09/20/woHA58.jpg)

到这组件就算完成了













