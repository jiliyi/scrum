import { Button } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux'
import { set_task_modal } from '../../redux/slice/kanban';
export default (prop) => {
    const { task, index } = prop;
    const kanban_key = task.kanban_key;
    const list = task.task;
    const dispatch = useDispatch();

    const edit_click = (task_id,kanban_key)=>{
        dispatch(set_task_modal({
            show : true, // 打开弹窗
            type : 'edit',
            task_id,
            kanban_key

        }))
    }
    
    return (


        <Droppable droppableId={task.kanban_key} type="task">
            {(provided, snapshot) => (
                <div className='task_drop_wrap'
                    ref={provided.innerRef}

                    {...provided.droppableProps}
                >

                    {list.map((task, index) => {
                        return (

                            <Draggable key={'nes'+task.task_id+'nes'} draggableId={task.task_id} index={index}>
                                {(provided, snapshot) => (
                                    <div className='task_drag_wrap'
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                       <div className="task_card" onClick={()=>{
                                        edit_click(task.task_id,kanban_key)
                                       }}>
                                            <div className='task_card_name'>{task.name}</div>
                                            <div className={
                                                [ task.type === "bug" ? "red" : '',
                                               
                                                task.type === "task" ? "blue" : ''
                                            ].join(" ")
                                                
                                            }>
                                                {task.type}
                                            </div>
                                           
                                       </div>
                                    </div>
                                )}

                            </Draggable>

                        )
                    })}


                    
                    {provided.placeholder}
                </div>
            )}
        </Droppable>



    )
}