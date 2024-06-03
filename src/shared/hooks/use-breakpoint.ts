import { useWindowSize } from "@uidotdev/usehooks";

interface WidthRange {
  min: number;
  max: number;
}

class AppLayoutService {
  constructor(
    readonly breakpoints: {
      mobile: WidthRange;
      laptop: WidthRange;
      desktop: WidthRange;
    },
  ) {}

  isMobile(width: number | null) {
    return this.compare(width, this.breakpoints.mobile);
  }

  isLaptop(width: number | null) {
    return this.compare(width, this.breakpoints.laptop);
  }

  isDesktop(width: number | null) {
    return this.compare(width, this.breakpoints.desktop);
  }

  private compare(width: number | null, range: WidthRange) {
    return width && width <= range.max && width >= range.min;
  }

  getAll(width: number | null) {
    return {
      isMobile: this.isMobile(width),
      isLaptop: this.isLaptop(width),
      isDesktop: this.isDesktop(width),
    };
  }
}

const appLayoutService = new AppLayoutService({
  mobile: {
    min: 0,
    max: 767,
  },
  laptop: {
    min: 768,
    max: 1023,
  },
  desktop: {
    min: 1024,
    max: 10000,
  },
});

export const useBreakpoint = () => {
  const { width } = useWindowSize();
  return appLayoutService.getAll(width);
};
