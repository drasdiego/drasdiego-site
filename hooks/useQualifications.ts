import { useEffect, useState } from 'react';
import type { Qualification, SheetStatus } from '@/types';
import { fetchQualifications, QUAL_SEED } from '@/services/sheets';

/** Live qualifications from the public Google Sheet, with a local fallback.
    Re-fetches on every mount (cache-busted) so sheet edits appear without a redeploy. */
export function useQualifications(): { items: Qualification[]; status: SheetStatus } {
  const [items, setItems] = useState<Qualification[]>(QUAL_SEED);
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
          setItems(QUAL_SEED);
          setStatus('fallback');
        }
      })
      .catch(() => {
        if (alive) {
          setItems(QUAL_SEED);
          setStatus('fallback');
        }
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
