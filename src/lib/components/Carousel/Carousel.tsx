import {
  Children,
  ReactNode,
  isValidElement,
  useMemo,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import styles from "./Carousel.module.scss";

type CarouselSharedProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  dark?: boolean;
  enableTouch?: boolean;
  fade?: boolean;
  interval?: number | string | boolean;
  keyboard?: boolean;
  pause?: "hover" | false;
  ride?: "carousel";
  slide?: boolean;
};

export type CarouselProps<T extends { id: string | number; caption?: string }> =
  | (CarouselSharedProps & { items: T[]; renderItem: (item: T) => ReactNode })
  | (CarouselSharedProps & { children: ReactNode });

type SlideDescriptor = {
  key: string;
  content: ReactNode;
  caption?: string;
};

const isItemsMode = <T extends { id: string | number; caption?: string }>(
  props: CarouselProps<T>,
): props is CarouselSharedProps & { items: T[]; renderItem: (item: T) => ReactNode } =>
  "items" in props &&
  Array.isArray(props.items) &&
  "renderItem" in props &&
  typeof props.renderItem === "function";

const buildSlides = <T extends { id: string | number; caption?: string }>(
  props: CarouselProps<T>,
): SlideDescriptor[] => {
  if (isItemsMode(props)) {
    return props.items.map((item, index) => ({
      key: `${item.id}-${index}`,
      content: props.renderItem(item),
      caption: item.caption,
    }));
  }

  return Children.toArray(props.children).map((child, index) => ({
    key:
      isValidElement(child) && child.key !== null && child.key !== undefined && child.key !== "."
        ? String(child.key)
        : `slide-${index}`,
    content: child,
  }));
};

const pickCarouselSharedProps = <T extends { id: string | number; caption?: string }>(
  props: CarouselProps<T>,
): CarouselSharedProps => {
  const shared = { ...props } as Record<string, unknown>;
  delete shared.items;
  delete shared.renderItem;
  delete shared.children;
  return shared as CarouselSharedProps;
};

export const Carousel = <T extends { id: string | number; caption?: string }>(
  props: CarouselProps<T>,
) => {
  const slides = buildSlides(props);
  const slideCount = slides.length;
  const carouselSharedProps = pickCarouselSharedProps(props);
  const {
    className,
    dark: _dark,
    enableTouch: _enableTouch,
    fade: _fade,
    interval: _interval,
    keyboard = true,
    pause: _pause,
    ride: _ride,
    slide: _slide,
    ...domProps
  } = carouselSharedProps;

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  const previous = () => {
    setActiveIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const goToIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const isMany = slideCount > 1;
  const indicatorItems = useMemo(() => slides.map((slide) => ({ key: slide.key })), [slides]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    domProps.onKeyDown?.(event);

    if (event.defaultPrevented || !keyboard || !isMany) {
      return;
    }

    if (event.key === "ArrowLeft") {
      previous();
    }

    if (event.key === "ArrowRight") {
      next();
    }
  };

  if (!slideCount) {
    return null;
  }

  if (!isMany) {
    return <div className={styles.carouselWrapper}>{slides[0].content}</div>;
  }

  return (
    <div className={styles.carouselWrapper}>
      <div
        {...domProps}
        className={[styles.carousel, className].filter(Boolean).join(" ")}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
      >
        <div className={styles.viewport}>
          {slides.map((slide, index) => (
            <div
              key={slide.key}
              className={[styles.slide, index === activeIndex ? styles.activeSlide : ""]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={index !== activeIndex}
            >
              <div className={styles.itemContent}>{slide.content}</div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.carouselControl}
            type="button"
            onClick={previous}
            aria-label="Previous slide"
          >
            <span className={styles.prevIcon} aria-hidden="true" />
          </button>

          <div className={styles.indicators}>
            {indicatorItems.map((item, index) => (
              <button
                key={item.key}
                className={index === activeIndex ? styles.activeIndicator : undefined}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>

          <button
            className={styles.carouselControl}
            type="button"
            onClick={next}
            aria-label="Next slide"
          >
            <span className={styles.nextIcon} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
