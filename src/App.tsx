import React, { useState } from "react";
import "./styles//index.scss";
import Button from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
import Input from "./components/Input";
import Upload from "./components/Upload/";
export const App = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="App" style={{ padding: 40 }}>
      <h2>组件展示</h2>
      <Button className="custom">默认按钮</Button>
      <Button disabled>禁用</Button>
      <Button size="lg" btnType="primary">
        大按钮
      </Button>
      <Button size="sm">小按钮</Button>
      <Button btnType="link" target="_blank" href="https://www.baidu.com/">
        按钮链接
      </Button>
      <Button btnType="link" href="https://www.baidu.com/" disabled>
        禁用按钮链接
      </Button>

      <div style={{ marginTop: 20, width: 400 }}>
        <Alert closable onClose={(e) => alert(e)}></Alert>
        <hr />
        <Alert type="success" closable description="成功"></Alert>
        <hr />
        <Alert type="danger" closable description="失败"></Alert>
        <hr />
        <hr />
        <Alert closable title="标题" description="自定义描述"></Alert>
      </div>

      <div style={{ marginTop: 20, width: 400 }}>
        <Menu
          defaultIndex="2"
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem>link 1</MenuItem>
          <MenuItem disabled>link 2</MenuItem>
          <MenuItem>link 3</MenuItem>
          <SubMenu title="下拉菜单">
            <MenuItem>菜单1</MenuItem>
            <MenuItem>菜单2</MenuItem>
          </SubMenu>
        </Menu>
        <div style={{ marginTop: 100 }}></div>
        <Menu
          mode="vertical"
          onSelect={(index) => {
            alert(index);
          }}
          defaultOpenSubMenus={["3"]}
        >
          <MenuItem>link 1</MenuItem>
          <MenuItem disabled>link 2</MenuItem>
          <MenuItem>link 3</MenuItem>
          <SubMenu title="下拉菜单">
            <MenuItem>菜单1</MenuItem>
            <MenuItem>菜单2</MenuItem>
          </SubMenu>
          <SubMenu title="下拉菜单2">
            <MenuItem>菜单11</MenuItem>
            <MenuItem>菜单22</MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div style={{ marginTop: 20, width: 400, height: 600 }}>
        <Icon icon="coffee" theme="success" size="10x"></Icon>

        <Button
          size="lg"
          onClick={() => {
            setShow(!show);
          }}
        >
          切换动画
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>家居</p>
            <p>甲氨基</p>
            <p>商城</p>
          </div>
        </Transition>
        <Transition wrapper in={show} timeout={3000} animation="zoom-in-top">
          <Button size="lg">答案呢</Button>
        </Transition>
      </div>
      <Input></Input>
      <Upload action="https://jsonplaceholder.typicode.com/posts"></Upload>
    </div>
  );
};

export default App;
