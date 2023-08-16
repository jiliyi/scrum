import { Button, Input, Select, Space, Table, Tag } from "antd"
import { Link } from "react-router-dom"
import CreateProjectmodal from "./components/create_project_modal";

// import axios from "../util/http";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getProjectListAsync,  projectSelect, set_delete_modal, set_id, set_show, set_type } from "../redux/slice/project";
import CreateDeleteModal from "./components/create_delete_modal";

export default () => {
  const dispatch = useDispatch();
  const list = useSelector(projectSelect)
  function handleChange() {

  }
  useEffect(() => {
    dispatch(getProjectListAsync())

  }, [])
  const add_click = ()=>{
    dispatch(set_show(true))
    dispatch(set_type('create'))
  }
  const edit_click = (r)=>{
    dispatch(set_show(true))
    dispatch(set_type('edit'))
    
    dispatch(set_id(r._id))

  }
  const delete_click = (r)=>{
    dispatch(set_delete_modal({
      show : true,
      id : r._id
    }))
  }
  const columns = [
    {
      title: '收藏',
      key: 'collect',
      dataIndex: "collect",
      render: (collect) => {
        return <i style={{
          color: collect ? 'yellow' : '#ccc'
        }}
          className="iconfont icon-xingxing"></i>
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a - b,
      showSorterTooltip: false,
      render: (text, record) => <Link to={`/project/${record._id}/kanban`}>{text}</Link>,
    },
    {
      title: '部门',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: '创建时间',
      key: 'created',
      dataIndex: 'created',
      render: (text) => (
        <span>
          {text}
        </span>
      ),
    },
    {
      title: '编辑',
      key: 'edit',
      dataIndex: 'edit',
      render: (_,record) => <>
      <Button
      style={{
        width :"auto"
      }}
       onClick={()=>{edit_click(record)}} type="primary">编辑</Button>
      <Button
      style={{
        width :"auto",
        marginLeft : '10px'
      }} 
      onClick={()=>{delete_click(record)}} type="primary" danger>删除</Button>
      </>
    }
  ];

  
  return (
    <div className="_project">
      <div className="_project_header">
        <h1>项目列表</h1>
        <Button onClick={add_click}>创建项目</Button>
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
      <Table columns={columns} dataSource={list} />
      <CreateProjectmodal />
      <CreateDeleteModal />
    </div>
  )
}
