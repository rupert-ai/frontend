import useMediaQuery from "./useMediaQuery"

export const useIsMobile = () => {
  const isMobile = useMediaQuery('(max-width: 65.98rem)');
  return isMobile;
}

export default useIsMobile;