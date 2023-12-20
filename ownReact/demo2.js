// STEP 1 The CreateElement Function
// STEP 2 The Render Function

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
