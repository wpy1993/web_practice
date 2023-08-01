// from leetcode 一个链表结构
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

// 数组 -> 链表
const list2Chain = (list) => {
  let newChain = new ListNode(-1)
  let head = newChain
  for(let i = 0; i < list.length; i++) {
    head.next = new ListNode(list[i])
    head = head.next
  }

  return newChain.next
};

// 链表 -> 数组
const chain2List = (chain) => {
  let newList = []
  let head = chain
  while (head) {
    newList.push(head.val)
    head = head.next
  }

  return newList
}

console.log('chain2list is', chain2List({val: 1, next: {val: 2, next: {val: 3, next: null}}}))
console.log('chain2list is', list2Chain([1, 2, 3]))

export default {
  list2Chain,
  chain2List
}