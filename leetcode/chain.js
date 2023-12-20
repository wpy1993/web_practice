function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// 86 分隔链表 - 未解决

var partition = function (head, x) {
  const newChain = new ListNode();

  const current = null;
  const currentChain = newChain.next;

  while (head.val || head.next) {
    if (head.val < x) {
      currentChain.next = new ListNode(head.val);
      currentChain = currentChain.next;

      head = head.next;
    }
  }

  currentChain.next = head;
};
