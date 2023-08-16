import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskDrop from './task_drop';
import { useSelector, useDispatch } from 'react-redux'
import { add_kanban_item, kanban_order, kanban_selector, task_diff_order, task_order, update_kanban_async } from '../../redux/slice/drop';
import { useEffect } from 'react';
import { Button, Input } from 'antd';
import { set_task_modal } from '../../redux/slice/kanban';


export default () => {
    const dispatch = useDispatch();
    const onDragEnd = (e) => {
        if (!e.destination) return;
        if (e.type === "kanban") {
            dispatch(kanban_order({
                destination: e.destination.index,
                source: e.source.index
            }))
            dispatch(update_kanban_async())
        } else if (e.type === "task") {
            if (e.destination.droppableId === e.source.droppableId) {
                //同一个看板
                dispatch(task_order({
                    id: e.destination.droppableId,
                    destination: e.destination.index,
                    source: e.source.index
                }))
                dispatch(update_kanban_async())
            } else if (e.destination.droppableId !== e.source.droppableId) {
                //不同看板

                dispatch(task_diff_order({
                    destinationId: e.destination.droppableId,
                    sourceId: e.source.droppableId,
                    destination: e.destination.index,
                    source: e.source.index
                }))
                dispatch(update_kanban_async())
            }
        }
    }
    const kanban_data = useSelector(kanban_selector);
   
    const enter_click = (e)=>{
        const value = e.target.value;
        if(!value.trim()) return;
        dispatch(add_kanban_item(value))
        e.target.value = '12333';
        dispatch(update_kanban_async())
    }

    const task_add_click = (kanban_key)=>{
        //展示modal，更新看板key
        dispatch(set_task_modal({
            show : true,
            kanban_key,
            type : 'create'

        }))
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            



            <Droppable direction='horizontal' droppableId="droppable-xxxx" type="kanban">
                {(provided, snapshot) => (
                    <div className='drop_wrap'
                        ref={provided.innerRef}

                        {...provided.droppableProps}
                    >

                        {kanban_data.map((drag, index) => {
                            return (
                                <Draggable key={drag.kanban_key} draggableId={'nes' + drag.kanban_key + 'nes'} index={index}>
                                    {(provided, snapshot) => (
                                        <div className='drag_wrap'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <h2>{drag.kanban_key}</h2>
                                            <TaskDrop task={drag}></TaskDrop>
                                            <Button onClick={()=>{
                                                task_add_click(drag.kanban_key)
                                            }}>新建task</Button>   
                                        </div>
                                    )
                                    }
                                </Draggable>
                            )
                        })}



                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div className="drag_wrap">
                <Input onPressEnter={enter_click}/>
            </div>

        </DragDropContext>
    )

}