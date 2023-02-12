import React from 'react';

export const useMediaQuery = (queryString: string) => {
  const [matches, setMatches] = React.useState<boolean>();

  React.useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia?.(queryString);
    const handleChange = ({ matches }: MediaQueryListEvent) =>
      setMatches(matches);

    if (mediaQueryList != undefined) {
      setMatches(mediaQueryList.matches);
      try {
        mediaQueryList.addEventListener('change', handleChange);
      } catch {
        mediaQueryList.addListener?.(handleChange);
      }
    }

    return () => {
      try {
        mediaQueryList?.removeEventListener('change', handleChange);
      } catch {
        mediaQueryList?.removeListener?.(handleChange);
      }
    };
  }, [queryString]);

  return !!matches;
};

export default useMediaQuery;
