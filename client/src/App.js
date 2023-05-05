
import React,{useState} from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Segmented, Avatar, List, Card, Tooltip, } from 'antd';
import { PlusOutlined, ShoppingCartOutlined,  AppstoreOutlined, MailOutlined, SettingOutlined  } from '@ant-design/icons';

import { Typography , Breadcrumb, Layout, Menu, theme, Carousel  } from 'antd';

const { Header, Content, Footer } = Layout;

const menuitems = [
  {
    label: 'Restaurants',
    key: 'mail',
    icon: <svg width="24" height="24" class="icon_svg"><path d="M12 15.25a1 1 0 01-.7-.29l-4.58-4.5A1.011 1.011 0 018.12 9L12 12.85 15.88 9a1 1 0 111.4 1.42L12.7 15a1 1 0 01-.7.25z"></path></svg>,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>,
    disabled: false,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

function App() {
  const [data, setData] = React.useState(null);
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const { Meta } = Card;
  const { Title } = Typography;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const category = [ 
    {
      label: (
        <div style={{ padding: 4 }}> 
          <Avatar src="https://assets.tendercuts.in/category/S/e/f9a8cb8c-ac77-44dd-9be2-e0e80c0db433.jpg" />
          <div>Fishes</div>
        </div>
      ),
      value: 'Fishes',
    },
    {
      label: (
        <div style={{ padding: 4 }}>
        <Avatar src="https://assets.tendercuts.in/product/C/H/0b2422c9-12d1-4c13-bd96-9948ad114c97.webp" />
          <div>Peeled Sea Foods</div>
        </div>
      ),
      value: 'PeeledSeaFoods',
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar src="https://assets.tendercuts.in/product/c/o/combo_rohu_prawns_medium.jpg" />
          <div>Dry Fishes</div> 
        </div>
      ),
      value: 'DryFishes',
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar src="https://assets.tendercuts.in/product/c/o/combo_rohu_prawns_medium.jpg" />
          <div>Ready To Cook</div> 
        </div>
      ),
      value: 'ReadyToCook',
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar src="https://assets.tendercuts.in/product/c/o/combo_rohu_prawns_medium.jpg" />
          <div>Crabs</div> 
        </div>
      ),
      value: 'Crabs',
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar src="https://assets.tendercuts.in/product/c/o/combo_rohu_prawns_medium.jpg" />
          <div>Prawns</div> 
        </div>
      ),
      value: 'Prawns',
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar src="https://assets.tendercuts.in/product/c/o/combo_rohu_prawns_medium.jpg" />
          <div>Squids</div> 
        </div>
      ),
      value: 'Squids',
    },
  ];
  const dataToCards = [
    {
      title: 'Freshwater Pomfret - Yeri Vavval',
      imgUrl:"https://assets.tendercuts.in/product/S/F/cab653d6-5fd0-46f2-8b73-5d9d36db65e9.webp",
      price:159,
      eliteprice:140,
      description:"Degutted, steak cut & packed with head & tail",
      grossWt:"500 - 700 Gms",
      netWt:"350 - 490 Gms"
    },
    {
      title: 'Emperor / Vilai Meen',
      imgUrl:"https://assets.tendercuts.in/product/S/F/b186532a-8bd5-41f3-81a5-0886a3d1a1dd.webp",
      price:329,
      eliteprice:319,
      description:"Degutted, steak cut & packed with head & tail",
      grossWt:"500 - 700 Gms",
      netWt:"350 - 490 Gms"
    },
    {
      title: 'Fish 3',
      imgUrl:"https://assets.tendercuts.in/product/S/F/b186532a-8bd5-41f3-81a5-0886a3d1a1dd.webp",
      price:120,
      eliteprice:140,
      description:"Degutted, steak cut & packed with head & tail",
      grossWt:"500 - 700 Gms",
      netWt:"350 - 490 Gms"
    },
    {
      title: 'Fish 4',
      imgUrl:"https://assets.tendercuts.in/product/S/F/cab653d6-5fd0-46f2-8b73-5d9d36db65e9.webp",
      price:120,
      eliteprice:140,
      description:"a very important ingredient for making the world famous curry",
      description:"Degutted, steak cut & packed with head & tail",
      grossWt:"500 - 700 Gms",
      netWt:"350 - 490 Gms"
    },
    {
      title: 'Fish 5',
      imgUrl:"https://assets.tendercuts.in/product/S/F/cab653d6-5fd0-46f2-8b73-5d9d36db65e9.webp",
      price:120,
      description:"a very important ingredient for making the world famous curry",
      description:"Degutted, steak cut & packed with head & tail",
      grossWt:"500 - 700 Gms",
      netWt:"350 - 490 Gms"
    },
    {
      title: 'Fish 6',
      imgUrl:"https://assets.tendercuts.in/product/S/F/b186532a-8bd5-41f3-81a5-0886a3d1a1dd.webp",
      price:120,
      description:"a very important ingredient for making the world famous curry",
      description:"Degutted, steak cut & packed with head & tail",
      grossWt:"500 - 700 Gms",
      netWt:"350 - 490 Gms"
    },
  ];

  return (
    <Layout>
      <Drawer title="Create New Site" placement="right" onClose={()=>{setOpen(false);}} open={open} 
        extra={
            <Space>
              <Button onClick={()=>{setOpen(false);}}>Cancel</Button>
              <Button onClick={()=>{setOpen(false);}} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" hideRequiredMark>
          <Row >
            <Col >
              <Form.Item
                name="name" 
                label="Website Name"
                rules={[{ required: true, message: 'Please enter website name' }]}
                
              >
                <Input placeholder="Please enter website name"/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col >
              <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore="https://"
                  addonAfter=".myflexiapp.com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => {return (!trigger.parentElement)}}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <Header style={{ 
        position: 'sticky', top: 0, zIndex: 1, width: '100%' ,display:"flex",justifyContent: "space-between",alignItems: "center"
      }}>
        <div
          style={{
            float: 'left',
            width: 180,
            height: "100%",
            display:"flex",
            alignItems:"center"
            // margin: '16px 24px 16px 0',
            // background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <img style={{height:"100%"}} src={require("./assets/logologo.png")}></img>
          <Title style={{color:"white",marginTop:"10px",marginBottom:"10px"}} level={5}>Mille Spaces</Title>
        </div>
        <Button type="primary" onClick={()=>{setOpen(true);}}>
            Create My Site
        </Button>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>

      <Menu style={{marginTop:"20px", marginBottom:"20px"}} onClick={(itm)=>{console.log("clicked", itm)}} mode="horizontal" items={menuitems} />
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      {/* //category List */}
      <Title style={{color:"black",marginTop:"10px",marginBottom:"10px"}} level={4}>Categories</Title>
      <div className="site-layout-content" style={{ background: colorBgContainer }}>
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 5,
            lg: 5,
            xl: 6,
            xxl: 6,
          }}
          dataSource={dataToCards}
          renderItem={(item) => (
            <List.Item>
              <Card
                // title="Default size card" 
                // style={{ width: 300 }}
                hoverable   
                cover={
                  <img
                    alt=""
                    src={item.imgUrl}
                  />
                }
                // actions={[
                //   <p>Browse More</p>,
                //   <div style={{position:"flex"}}><ShoppingCartOutlined /> Check </div>
                // ]}
              >
              <Meta title={item.title} />
            </Card>
            </List.Item>
          )}
        />
      </div>
      <Title style={{color:"black",marginTop:"10px",marginBottom:"10px"}} level={5}>Top Picks for you</Title>
      <div className="site-layout-content" style={{ background: colorBgContainer }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={dataToCards}
          renderItem={(item) => (
            <List.Item>
              <Card
                // title="Default size card" 
                // style={{ width: 300 }}
                hoverable   
                cover={
                  <img
                    alt=""
                    src={item.imgUrl}
                  />
                }
                actions={[
                  <div style={{padding:"2px",display:"flex",justifyContent: "center",alignItems: "flex-end"}}>
                      <div>
                        <span style={{textDecoration:"line-through",fontWeight:"200",fontSize:"13px"}}>₹{item.price} </span>
                        <p style={{fontSize:"10px"}}>MRP</p>
                      </div>
                      <div style={{paddingLeft:"3px"}}>
                        <span style={{fontWeight:"500",fontSize:"20px"}}>₹{item.price} </span>
                        <p style={{fontSize:"10px"}}>ELITE <Tooltip placement="leftBottom" title="This price is only applicable for OOM elite members."><span> ℹ</span></Tooltip></p>
                      </div>
                    
                  </div>,
                  <div style={{position:"flex"}}><ShoppingCartOutlined /> Add to Cart</div>
                ]}
              >
              <Meta title={item.title} description={item.description} />
            </Card>
            </List.Item>
          )}
        />
      </div>

      </Content>
      <Footer style={{ textAlign: 'center' }}>Mille spaces ©2023</Footer>
    </Layout>
  );
}

export default App;

