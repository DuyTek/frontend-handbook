export function useEffect(effect, deps) {
  let prevDeps = null;
  let cleanup = null;

  function run(newDeps) {
    if (prevDeps !== null && newDeps.every((v, i) => v === prevDeps[i])) return;
    prevDeps = newDeps;

    cleanup?.();
    cleanup = effect() ?? null;
  }

  function stop() {
    cleanup?.();
    cleanup = null;
  }

  run(deps);

  return { run, stop };
}

export function useQuery(query, onResult, onError) {
  const effect = useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    fetch(`/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => onResult(data))
      .catch(err => {
        if (err.name !== 'AbortError') onError?.(err);
      });

    return () => controller.abort();
  }, [query]);

  return effect;
}
