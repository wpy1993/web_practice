import { list2Chain, chain2List } from "./utils.js";

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// 21. 合并两个有序链表
var mergeTwoLists = function (list1, list2) {
  const newChain = new ListNode(-1);
  let p = newChain;

  let p1 = list1;
  let p2 = list2;

  while (p1 && p2) {
    if ((p1 && p1.val) < (p2 && p2.val)) {
      p.next = p1;
      p = p.next;
      p1 = p1.next;
    } else {
      p.next = p2;
      p = p.next;
      p2 = p2.next;
    }
  }

  if (p1) {
    p.next = p1;
  }
  if (p2) {
    p.next = p2;
  }

  return newChain.next;
};

const chain1 = list2Chain([2, 5, 7, 10]);
const chain2 = list2Chain([2, 4, 7, 8]);
console.log(mergeTwoLists(chain1, chain2));

/* ------ */

// LCR 140. 训练计划 II
var trainingPlan = function (head, cnt) {
  let p1 = head;
  let p2 = head;

  while (cnt > 0) {
    p1 = p1.next;
    cnt--;
  }

  while (p1 !== null) {
    p1 = p1.next;
    p2 = p2.next;
  }

  return p2.val;
};

// const chain = list2Chain([2, 4, 7, 8]);
// console.log(trainingPlan(chain, 2));

/* ------ */

// 86 分隔链表 - 未解决
var partition = function (head, x) {
  const prevChain = new ListNode();
  const suffixChain = new ListNode();

  let i = prevChain;
  let j = suffixChain;
  console.log("head is", head);

  let p = head;

  while (p) {
    if (p.val < x) {
      i.next = p;
      i = i.next;
    } else {
      j.next = p;
      j = j.next;
    }

    p = p.next;
  }

  // 断开一下j和head的联系
  j.next = null;
  i.next = suffixChain.next;

  return prevChain.next;
};

// const chain = list2Chain([1, 4, 3, 2, 5, 2]);
// console.log(chain2List(partition(chain, 3)));
