export const useTwSwiper = () => {


    const arrayToRGBString = (rgb: number[], opacity?: number) => {
        if (opacity !== undefined) return `rgba(${rgb.join(',')}, ${opacity})`

        return `rgb(${rgb.join(',')})`
    };

    const hexToRGBArray = (hex: string) => hex.match(/[A-Za-z0-9]{2}/g)!.map(v => parseInt(v, 16));

    const hexToRGBString = (hex: string, opacity?: number) => arrayToRGBString(hexToRGBArray(hex), opacity);

    function swiperOverflowVisible() {
        return `
    .swiper {
        overflow: visible;
    }`
    }

    /*   function swiperPagination(color?: string) {
        const background = hexToRGBString("#ffffff", .1);

        return `
        .swiper {
            overflow: visible;
            padding-bottom: 60px;
        }

        .swiper-pagination-bullet {
            --swiper-pagination-bottom: 0;
            --swiper-pagination-bullet-horizontal-gap: 12px;
            --swiper-pagination-bullet-size: 12px;
            --swiper-theme-color: #ffffff;
            --swiper-pagination-bullet-inactive-opacity: 0.5;
            --swiper-pagination-bullet-inactive-color: #ffffff;
        }
    `;
      }*/


// Another example

    type SwiperPaginationOptions = {
        swiper?: { padding?: string },
        pagination?: { paddingBottom?: string }
        theme?: 'white' | 'yellow-300'
    };

    function swiperPagination(options?: SwiperPaginationOptions) {

        const defaultOptions = {
            swiper: {
                padding: '0 0 64px 0'
            },
            pagination: {
                paddingBottom: '0'
            },
            theme: 'yellow-300'
        }

        const mergedOptions = {

            swiper: {
                ...defaultOptions.swiper,
                ...(options?.swiper || {})
            },
            pagination: {
                ...defaultOptions.pagination,
                ...(options?.pagination || {})
            },
            theme: options?.theme || defaultOptions.theme

        };

        return `
    .swiper {
      padding: ${mergedOptions.swiper.padding}
    }

    .swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {

    --swiper-pagination-bottom: ${mergedOptions.pagination.paddingBottom};
    }

    .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
    --swiper-pagination-bullet-horizontal-gap: 8px;
    }

    .swiper-pagination-bullet {
    --swiper-pagination-bullet-size: 10px;
    --swiper-pagination-bullet-width: 10px;
    --swiper-pagination-bullet-inactive-opacity: 1;
    --swiper-pagination-bullet-inactive-color: #ffe8d5;
    transition: width 0.3s ease-in-out;
    }

    .swiper-pagination-bullet-active {
    --swiper-pagination-color: var(--color-${mergedOptions.theme});
    width: 28px;
    border-radius: 30px;
    }
      `
    }

    function swiperProgressbar(options?: { colorVar?: string, height?: string, gap?: string }) {
        const colorVar = options?.colorVar || 'var(--color-yellow-300)';
        const height = options?.height || '4px';
        const gap = options?.gap || '48px';
        return `
    .swiper {
      padding-bottom: ${gap};
    }
    .swiper-horizontal>.swiper-pagination-progressbar, .swiper-pagination-progressbar.swiper-pagination-horizontal {
      left: 0;
      width: 100%;
      height: ${height};
      top: auto;
      bottom: 0;
      background: #232323;
    }
    .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
      background: ${colorVar};
    }
    `
    }

    return {
        swiperPagination,
        swiperOverflowVisible,
        swiperProgressbar
    }

}