export const DOM_TYPES = {
  TEXT: 'text',
  ELEMENT: 'element',
  FRAGMENT: 'fragment',
  COMPONENT: 'component',
}

/**
 * Hypertext.
 *
 * If tag is a string, it is assumed to be a DOM node.
 * If tag is a class (typeof == function), it is assumed to be a component.
 */
export function h(tag, props = {}, children = []) {
  const type =
    typeof tag === 'string' ? DOM_TYPES.ELEMENT : DOM_TYPES.COMPONENT

  return { tag, props, children, type }
}

/**
 * Creates a text virtual node.
 */
export function hString(str) {
  return { type: DOM_TYPES.TEXT, value: str }
}

/**
 * Wraps the virtual nodes in a fragment, adding the passed in props to the
 * individual nodes.
 */
export function hFragment(vNodes, props = {}) {
  if (!Array.isArray(vNodes)) {
    throw new Error('hFragment expects an array of vNodes')
  }

  for (const child of vNodes) {
    if (child.type !== DOM_TYPES.TEXT) {
      child.props = { ...child.props, ...props }
    }
  }

  return {
    type: DOM_TYPES.FRAGMENT,
    children: vNodes,
  }
}