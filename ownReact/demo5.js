// STEP 5 render and commit phases
// phase 阶段
// 放弃 performUnitOfWork 中的一次次的 appendChild，改为一次

function createElement(type, props, ...children) {
  return (
    type,
    props: {
      ...props,
      children: children.map(child => {
        typeof child === 'object' ? child : createTextElement(child)
      })
    }
  )
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

// split render to createDom && render
function createDom (fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' 
    ? document.createTextNode('')
    : document.createElement(fiber.type)

  // 属性放在dom上
  const isProperty = key => key !== 'children'
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })

  return dom
}

//! 一次性 commit
function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}

//! 真实commit 执行
function commitWork(fiber) {
  if (!fiber) {
    return
  }

  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

//! 改为 wipRoot
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  }

  nextUnitOfWork = wipRoot
  
  // container.appendChild(dom)
}

// 任务调度
let nextUnitOfWork = null
//! 添加wipRoot
let wipRoot = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }

  //! 增加 提交commit 的判断
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
  // add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  //! 放弃一次次的append
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }

  // create new fibers
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null  // 帮助把 fiber的child 形成一个链表

  while (index < elements.length) {
    const element = elements[index]

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }

    prevSibling = newfiber
    index++
  }

  // return next unit of work
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}



const Didact = {
  createElement,
  render
}

// const element = Didact.createElement(
//   "div",
//   { id: "foo" },
//   Didact.createElement("a", null, "bar"),
//   Didact.createElement("b")
// );
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)

const container = document.getElementById("root");
Didact.render(element, container);
