export function useTodoItems(todoLists: any){
  // Create new item in specified list
  const createTodoItem = (listIndex:any, itemName:String) => {
    const newItem = { name: itemName, done: false };
    todoLists.value[listIndex].items.push(newItem);
  };

  // Delete specified list
  const deleteTodoItem = (listIndex:any, itemId:any) => {
    const updatedLists = todoLists.value.map((list:any, index:any) => {
      if(index == listIndex){
        return {...list, items: list.items.filter((_item:any, i:any) => i !== itemId)};
      }
      return list;
    });

    todoLists.value = updatedLists;
  }

  // Toggles 'done' in specific itemId located in specified listIndex
  const toggleTodoItem = (listIndex:any, itemId:any) => {
    const updatedLists = todoLists.value.map((list:any, index:any) => {
      if(index == listIndex){
        const updatedItems = list.items.map((item:any, i:any) => {
          if(i == itemId){
            const newDone = !list.items[i].done;
            return{ ...item, done: newDone };
          }
          return item;
        });
        return { ...list, items: updatedItems};
      }
      return list;
    });

    todoLists.value = updatedLists;
  }

  return {
    createTodoItem,
    deleteTodoItem,
    toggleTodoItem
  }
}