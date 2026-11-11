import Link from 'next/link';
import type { Lang } from '@/types';
import { servicosUI } from '@/lib/servicos';

export function Servicos({ lang }: { lang: Lang }) {
  const ui = servicosUI(lang);
  return (
    <section className="section servicos" id="servicos" aria-labelledby="servicos-titulo">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="servicos-titulo">{ui.title}</h2>
          <p className="section-sub">{ui.sub}</p>
        </div>
        <ul className="servicos-lista" role="list">
          {ui.offers.map((o) => (
            <li className="servico" data-area={o.area} key={o.title}>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <p className="servico-exemplo">
                {ui.exampleLabel}{' '}
                {o.href ? <Link className="inline-link" href={o.href}>{o.example}</Link> : o.example}
              </p>
            </li>
          ))}
        </ul>
        <div className="servicos-rodape">
          <p className="servicos-ia">{ui.ai}</p>
          <Link className="btn btn-primary" href={ui.contact}>{ui.cta}</Link>
        </div>
      </div>
    </section>
  );
}
