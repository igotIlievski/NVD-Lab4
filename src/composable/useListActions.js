export const useListActions = (items) => {
    const addItem = (newItem) => {
        items.value.push(newItem);
    }
    const deleteItem = (id) => {
        let index = items.value.findIndex((item)=> item.id === id);
        if(index >= 0){
            items.value.splice(index, 1);
        }
    }

    return {
        addItem,
        deleteItem
    }
}