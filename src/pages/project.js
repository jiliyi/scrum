import { Input, Select, Space, Table, Tag } from "antd"
import { Link } from "react-router-dom"
import CreateProjectmodal from "./components/create_project_modal";

export default project => {
  function handleChange() {

  }
  const columns = [
    {
      title: <i style={{color:"#f2cb51"}} className="iconfont  icon-xingxing"></i>,
      key: 'collect',
      dataIndex: "collect",
      render: (text) => <td>{text}</td>
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      sorter : (a,b)=>a-b,
      showSorterTooltip : false,
      render: (text) => <td>{text}</td>,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '负责人',
      dataIndex: 'head',
      key: 'head',
    },
    {
      title: '创建时间',
      key: 'creationTime',
      dataIndex: 'creationTime',
      render: (text) => (
        <td>
          {text}
        </td>
      ),
    },
    {
      title : '',
      key : 'edit',
      dataIndex : 'edit',
      render : ()=><td>...</td>
    }
  ];
  const data = [
    {
      key: '1',
      collect: <i className="iconfont icon-xingxing1"></i>,
      name: 'John Brown',
      department: 32,
      head: "xxx",
      creationTime: '12121',
     
    }
  ];
  return (
    <div className="_project">
      <div className="_project_header">
        <h1>项目列表</h1>
        <Link>创建项目</Link>
      </div>
      <div className="_project_search">
        <Input />
        <Select
          defaultValue="jack"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'jack',
              label: 'Jack',
              disabled: true
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'Yiminghe',
              label: 'yiminghe',
            },
            {
              value: 'disabled',
              label: 'Disabled',
            },
          ]}
        />


      </div>
      <Table columns={columns} dataSource={data} />
      <CreateProjectmodal />
    </div>
  )
}
