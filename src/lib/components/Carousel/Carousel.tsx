import { Children, ReactNode, isValidElement, useMemo, useState } from "react";
import {
  Carousel as CarouselReactstrap,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  CarouselProps as ReactstrapCarouselProps,
} from "reactstrap";
import styles from "./Carousel.scss";

type CarouselSharedProps = Omit<ReactstrapCarouselProps, "next" | "previous" | "activeIndex">;

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

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) {
      return;
    }
    setActiveIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  const previous = () => {
    if (animating) {
      return;
    }
    setActiveIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const goToIndex = (newIndex: number) => {
    if (animating) {
      return;
    }
    setActiveIndex(newIndex);
  };

  const isMany = slideCount > 1;

  const indicatorItems = useMemo(() => slides.map((slide) => ({ key: slide.key })), [slides]);

  if (!slideCount) {
    return null;
  }

  return (
    <div className={styles.stackWrapper}>
      <div className={styles.carouselWrapper}>
        {isMany ? (
          <CarouselReactstrap
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            className={styles.carousel}
            {...carouselSharedProps}
          >
            <div className="carousel-custom-control">
              <CarouselControl
                className={styles.carouselControl}
                direction="prev"
                directionText=" "
                onClickHandler={previous}
              />
              <CarouselIndicators
                items={indicatorItems}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
                className={styles.indicators}
              />
              <CarouselControl direction="next" directionText=" " onClickHandler={next} />
            </div>

            {slides.map((slide) => (
              <CarouselItem
                key={slide.key}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                className={styles.carouselItem}
              >
                <div className={styles.itemContent}>{slide.content}</div>
                {slide.caption ? (
                  <CarouselCaption
                    captionText={slide.caption}
                    captionHeader={slide.caption}
                    className={styles.caption}
                  />
                ) : null}
              </CarouselItem>
            ))}
          </CarouselReactstrap>
        ) : (
          slides[0].content
        )}
      </div>
    </div>
  );
};
