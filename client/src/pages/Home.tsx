// Import necessary modules
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Avatar } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  LikeOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';

import { webApiEndPoint,redirectUrlPrefix,redirectUrlSuffix } from '../constants';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Meta } = Card;

const Home = (props:{changeScreen:any}) => { 
  const [allCatItems, setAllCatItems] = useState([]);
  const [trendingItems, setTrendingItems] = useState([]);
  console.log(webApiEndPoint+"/getinitData") ;
  useEffect(() => {
  fetch(webApiEndPoint+"/getinitData")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`);
      }
      return response.json();
    })
    .then((actualData) => {
      setAllCatItems(actualData.data.categories);
      setTrendingItems(actualData.data.trends);
    })
    .catch((err) => {
      console.log(err.message);
      })
 
}, []);


  const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
    margin:"5px",
    padding:"0px"
  };
  console.log("cat items: ",allCatItems);
  console.log("trend items: ",trendingItems);
  let catHeaders:string[]=[];
  allCatItems.forEach((cat:any) => {
    if(! (catHeaders.includes(cat.header) ))  {
      catHeaders.push(cat.header)
    }
  });
  console.log("catHeaders",catHeaders)
  return (
    <>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {
            catHeaders.map((element:any)=>{
              let temp = allCatItems.filter((i:any)=>{
                return i.header == element
              });
              return (
                <>  
                  <SubMenu key={"sub"+ catHeaders.indexOf(element) } title={element}>
                    {
                    temp.map((item:any)=>{
                      return <Menu.Item key={item.ID}>{item.name}</Menu.Item>
                    })
                    }
                  </SubMenu>
                </>
              )
            }
            )
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            className="site-layout-background"
            style={{ padding: 12, minHeight: 360 }}
          >
            

    <Card title="Trending Nearby" >
      {
        trendingItems.map((element:any)=>[
          <Card.Grid style={gridStyle}>
            <Card
              style={{ borderRadius: 0 }}
              cover={
                <img
                  alt={element.name}
                  src={element.imgUrl}
                />
              }
              actions={[
                <> <a href={redirectUrlPrefix+element.url+redirectUrlSuffix}> <EllipsisOutlined rev={undefined}  /><span style={{fontSize:"12px"}}> Browse Category</span></a></>,
                <> <a href={redirectUrlPrefix+element.url+redirectUrlSuffix}> <EyeOutlined rev={undefined}  /><span style={{fontSize:"12px"}}> View</span></a></>,
              ]}
            >
              <h4 style={{paddingLeft:"3px",paddingRight:"3px"}}>{element.name}</h4>
              {/* <div><Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" /></div> */}
              {/* <Meta
              style={{fontSize:"8px"}}
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                title="Card title"
                description="This is the description"
              /> */}
            </Card>
          {/* <>
          <p>{element.name}</p>
          <Button type="primary" > Visit Site</Button>
          </> */}
          </Card.Grid>
        ])
      }
      
        
    </Card>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Mille Webspaces
        </Footer>
      </Layout>
    </Layout>
    </>
  );
}
export default Home;
