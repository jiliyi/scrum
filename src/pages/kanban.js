import { Button, Input, Select } from "antd"

export default () => {
  return (
    <>
      <h1 className="kanban_title">快递管理看板</h1>
      <div className="kanban_search">
        <Input placeholder="任务名" />
        <Select
          style={{
            width: 120,
          }}
          defaultValue="jack"
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'jhon',
              label: 'jhon',
            }
          ]
          }></Select>
        <Select
          style={{
            width: 120,
          }}
          defaultValue="jack"
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'jhon',
              label: 'jhon',
            }
          ]
          }></Select>
        <Button >清除筛选器</Button>
      </div>
    </>
  )
}
