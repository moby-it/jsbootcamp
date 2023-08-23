export function Card({ children, classes = [] }) {
  return <div className={[...classes, 'card'].join(' ')}>
    {children}
  </div>;
}