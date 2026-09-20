import { useInView } from '../../hooks/hooks';

/* Word-masked headline reveal. `text` may contain \n for line breaks. */
export default function Split({ text, as: Tag = 'span', className = '', delay = 0 }) {
  const [ref, inView] = useInView(0.2);
  let idx = 0;
  const lines = text.split('\n');
  return (
    <Tag ref={ref} className={`split ${inView ? 'is-in' : ''} ${className}`} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span className="split__line" key={li} aria-hidden="true">
          {line.split(' ').map((w, wi) => (
            <span key={wi}>
              {wi > 0 ? ' ' : ''}
              <span className="rv" style={{ '--i': idx++ + delay }}>
                <span>{w}</span>
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
