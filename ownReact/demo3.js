// STEP 3 Concurrent Mode 
// 解决render过久堵塞主线程
// 改动点用 //! 标记

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

function reander(element, container) {
  // const dom = document.createElement(element.type)
  const dom = element.type === 'TEXT_ELEMENT' 
    ? document.createTextNode('')
    : document.createElement(element.type)

  // 属性放在dom上
  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  element.props.children.forEach(child => {
    render(child, dom)
  })
  
  container.appendChild(dom)
}

//! 任务调度
let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {
  // 利用fiber tree
  

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
Didact.reander(element, container);
