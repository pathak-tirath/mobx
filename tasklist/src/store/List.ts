import { makeAutoObservable } from "mobx";

class StoreList {
  list: { title: string; completed: boolean }[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  addItem(item: string) {
    this.list.push({ title: item, completed: false });
  }

  editItem(index: number, item: string) {
    console.log(index, item);
    
    this.list[index].title = item;
  }

  toggleChecked(index: number) {
    this.list[index].completed = !this.list[index].completed;
  }

  get unfinishedTask() {
    return this.list.filter((item) => !item.completed).length;
  }
  deleteItem(index: number) {
    this.list.splice(index, 1);
  }
}

export const storeList = new StoreList();
