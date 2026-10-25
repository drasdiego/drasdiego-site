import { useEffect, useState } from 'react';
import type { Qualification, SheetStatus } from '@/types';
import { fetchQualifications, QUAL_SEED } from '@/services/sheets';
import { useInitialQualifications } from './qualificationsContext';

export function useQualifications(): { items: Qualification[]; status: SheetStatus } {
  const initial = useInitialQualifications();
  const [items, setItems] = useState<Qualification[]>(initial && initial.length ? initial : QUAL_SEED);
  const [status, setStatus] = useState<SheetStatus>('loading');

  useEffect(() => {
    const ctrl = new AbortController();
    let alive = true;
    const timeout = setTimeout(() => ctrl.abort(), 9000);

    fetchQualifications(ctrl.signal)
      .then((data) => {
        if (!alive) return;
        if (data.length) {
          setItems(data);
          setStatus('live');
        } else {
          setStatus('fallback');
        }
      })
      .catch(() => {
        if (alive) setStatus('fallback');
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      alive = false;
      clearTimeout(timeout);
      ctrl.abort();
    };
  }, []);

  return { items, status };
}
