import { Cancel } from 'iconoir-react';
export function Modal({ show, children, title, close }) {
  if (!show) return;
  return <div className="modal">
    <div className="header">
      <span>{title}</span>
      <Cancel className='cursor-pointer red' onClick={() => close()} />
    </div>
    <div className='content'>
      {children}
    </div>
  </div>;
}