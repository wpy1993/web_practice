// STEP 8 Hooks

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

  updateDom(dom, {}, fiber.props)

  return dom
}

const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)

// 更新dom 遍历两次旧props，移除事件和属性；遍历两遍新props，添加属性和事件
function updateDom(dom, prevProps, nextProps) {
  // remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => (
      !(key in nextProps) || isNew(prevProps, nextProps)(key)
    ))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })

  // remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ''
    })
  
  // set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
  
  // add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps)
    })
}

// 一次性 commit
function commitRoot() {
  deletions.forEach(commitWork) // 删除 删除队列 中的fiber
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

// 真实commit 执行
function commitWork(fiber) {
  if (!fiber) {
    return
  }

  let domParentFiber = fiber.parent
  while(!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom


  // 丰富不同的逻辑中的执行内容
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent)
  }
  
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

// 改为 wipRoot
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot,
  }

  deletions = []
  nextUnitOfWork = wipRoot
}

// 任务调度
let nextUnitOfWork = null
// 添加wipRoot
let wipRoot = null
// 始终存储着上次的末次 commit fiber tree
let currentRoot = null
let deletions = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }

  // 增加 提交commit 的判断
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

// extract 摘取 大量改动
function performUnitOfWork(fiber) {
  // 增加function的判断
  const isFunctionComponent = fiber.type instanceof function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
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

//! hooks
let wipFiber = null
let hookIndex = null

// function 组件创建fiber的子/兄弟
function updateFunctionComponent(fiber) {
  //! 创建函数fiber自动给wipFiber赋值
  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []

  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

//!
function useState(initial) {
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }

  const actions = oldHook ? oldHook.queue : []
  actions.forEach(action => {
    hook.state = action(hook.state)
  })

  const setState = action => {
    hook.queue.push(action)
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }

  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, setState]
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  reconcileChildren(fiber, fiber.props.children)
}

// 从 performUnitOfWork 中提取出来 并对比
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let prevSibling = null  // 帮助把 fiber的child 形成一个链表
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child

  while (index < elements.length || oldFiber !== null) {
    const element = elements[index]
    let newFiber = null

    // compare oldfiber to element  这一步、真实react use keys进行判断
    const sameType = oldfiber && element && element.type == oldFiber.type

    if (sameType) {
      // update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }

    if (element && !sameType) {
      // add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    }

    if (oldFiber && !sameType) {
      // delete the oldFiber's node
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber)
    }
    // compare done

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      wipFiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}



const Didact = {
  createElement,
  render,
  useState,
}


/** @jsx Didact.createElement */
// function App(props) {
//   return <h1>Hi {props.name}</h1>
// }
// const element = <App name="foo" />
//!
function Counter() {
  const [state, setState] = Didact.useState(1)

  return (
    <h1 onClick={() => setState(c => c + 1)}>
      Count: {state}
    </h1>
  )
}
const element = <Counter />

const container = document.getElementById("root");
Didact.render(element, container);
