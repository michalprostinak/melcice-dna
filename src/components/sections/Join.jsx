import { useState } from 'react';
import { SITE } from '../../data/site';
import { sync } from '../../lib/store';
import MagneticButton from '../ui/MagneticButton';
import Split from '../ui/Split';

export default function Join() {
  const [on, setOn] = useState(false);
  const fill = (v) => () => {
    sync.fillTarget = v;
    setOn(!!v);
  };
  return (
    <section id="join" data-node="11" className="join">
      <p className="meta join__meta">
        SEQUENCE_011 / BASE PAIR <b className={on ? 'is-on' : ''}>{on ? '2/2' : '1/2'}</b>
      </p>
      <div className="join__body">
        <h2 className="mega mega--join">
          <Split text={"YOUR DNA\nIS MISSING."} />
        </h2>
        <p className="statement">Add yourself to the sequence.</p>
        <MagneticButton
          as="a"
          className="btn btn--solid btn--xl"
          href={SITE.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          onPointerEnter={fill(1)}
          onPointerLeave={fill(0)}
          onPointerDown={fill(1)}
          onFocus={fill(1)}
          onBlur={fill(0)}
        >
          JOIN HACK CLUB MELČICE →
        </MagneticButton>
      </div>
    </section>
  );
}
