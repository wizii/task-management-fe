import { useState, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    wrapperId: string;
}

function createWrapper(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}


function ReactPortal({ children, wrapperId = "react-portal-wrapper" }: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<Element>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapper(wrapperId);
    }
    setWrapperElement(element);
  
    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [wrapperId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null;

  return wrapperElement ? createPortal(children, wrapperElement) : null;
}

export default ReactPortal;